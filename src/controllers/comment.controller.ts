import { Request, Response } from "express";
import { Comment } from "../models/Comment.model";
import { User } from "../models/User.model";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

// GET /comments?questionId=
export const getComments = asyncHandler(async (req: Request, res: Response) => {
  const { questionId } = req.query as { questionId: string };
  if (!questionId) throw new AppError("questionId is required", 400);

  const comments = await Comment.find({ questionId, parentId: null, isHidden: false })
    .populate("userId", "name")
    .sort({ isPinned: -1, createdAt: 1 })
    .limit(50);

  const topLevelIds = comments.map((c) => c._id);
  const replies = await Comment.find({ parentId: { $in: topLevelIds }, isHidden: false })
    .populate("userId", "name")
    .sort({ createdAt: 1 });

  const replyMap = new Map<string, typeof replies>();
  for (const r of replies) {
    const key = r.parentId!.toString();
    if (!replyMap.has(key)) replyMap.set(key, []);
    replyMap.get(key)!.push(r);
  }

  const result = comments.map((c) => ({
    ...c.toJSON(),
    replies: replyMap.get(c._id.toString()) ?? [],
    upvoteCount: c.upvotes.length,
    downvoteCount: c.downvotes.length,
  }));

  sendSuccess(res, { comments: result });
});

// POST /comments
export const createComment = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { questionId, text, parentId } = req.body as {
    questionId: string; text: string; parentId?: string;
  };

  if (!questionId || !text?.trim()) throw new AppError("questionId and text required", 400);

  const comment = await Comment.create({
    questionId,
    userId,
    text: text.trim(),
    parentId: parentId ?? null,
  });

  await comment.populate("userId", "name");

  // Check if user has 50+ upvoted comments → award Mentor badge (stored in user profile)
  const upvotedCount = await Comment.countDocuments({
    userId,
    upvotes: { $size: { $gte: 50 } },
  });
  if (upvotedCount >= 1) {
    await User.findByIdAndUpdate(userId, { mentorBadge: true });
  }

  sendSuccess(res, { comment }, "Comment posted", 201);
});

// POST /comments/:id/vote  body: { type: "up" | "down" }
export const voteComment = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { type } = req.body as { type: "up" | "down" };
  const comment = await Comment.findById(req.params.id);
  if (!comment) throw new AppError("Comment not found", 404);

  const addField = type === "up" ? "upvotes" : "downvotes";
  const removeField = type === "up" ? "downvotes" : "upvotes";

  const alreadyVoted = comment[addField].some((id) => id.toString() === userId);
  if (alreadyVoted) {
    await Comment.findByIdAndUpdate(req.params.id, { $pull: { [addField]: userId } });
  } else {
    await Comment.findByIdAndUpdate(req.params.id, {
      $addToSet: { [addField]: userId },
      $pull: { [removeField]: userId },
    });
  }

  sendSuccess(res, null, alreadyVoted ? "Vote removed" : "Vote recorded");
});

// DELETE /comments/:id  — admin or own comment
export const deleteComment = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const role = req.user!.role;
  const comment = await Comment.findById(req.params.id);
  if (!comment) throw new AppError("Comment not found", 404);
  if (comment.userId.toString() !== userId && role !== "admin") {
    throw new AppError("Not authorised", 403);
  }
  await Comment.findByIdAndUpdate(req.params.id, { isHidden: true });
  sendSuccess(res, null, "Comment removed");
});

// PATCH /comments/:id/pin  — admin only
export const pinComment = asyncHandler(async (req: Request, res: Response) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) throw new AppError("Comment not found", 404);
  comment.isPinned = !comment.isPinned;
  await comment.save();
  sendSuccess(res, { isPinned: comment.isPinned }, "Pin toggled");
});
