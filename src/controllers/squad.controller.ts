import { Request, Response } from "express";
import crypto from "crypto";
import { Squad, SquadMessage } from "../models/Squad.model";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

function makeCode(): string {
  return crypto.randomBytes(3).toString("hex").toUpperCase(); // 6 chars
}

// GET /squads/mine  — all squads I'm a member of
export const getMySquads = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const squads = await Squad.find({ members: userId, isActive: true })
    .populate("members", "name")
    .populate("ownerId", "name");
  sendSuccess(res, { squads });
});

// POST /squads  — create a squad
export const createSquad = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { name, description, targetExam } = req.body as {
    name: string; description?: string; targetExam?: string;
  };

  if (!name?.trim()) throw new AppError("Squad name is required", 400);

  let inviteCode = makeCode();
  while (await Squad.findOne({ inviteCode })) inviteCode = makeCode();

  const squad = await Squad.create({
    name: name.trim(),
    description: description?.trim(),
    inviteCode,
    ownerId: userId,
    members: [userId],
    targetExam: targetExam ?? "RRB NTPC",
  });

  await squad.populate("members", "name");
  sendSuccess(res, { squad }, "Squad created", 201);
});

// GET /squads/:id
export const getSquad = asyncHandler(async (req: Request, res: Response) => {
  const squad = await Squad.findById(req.params.id)
    .populate("members", "name averageScore testsAttempted")
    .populate("ownerId", "name");
  if (!squad) throw new AppError("Squad not found", 404);
  sendSuccess(res, { squad });
});

// POST /squads/:id/join  body: { inviteCode }
export const joinSquad = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { inviteCode } = req.body as { inviteCode: string };

  const squad = await Squad.findOne({ inviteCode: inviteCode?.toUpperCase(), isActive: true });
  if (!squad) throw new AppError("Invalid invite code", 404);
  if (squad.members.length >= squad.maxMembers) throw new AppError("Squad is full (max 10)", 400);
  if (squad.members.some((m) => m.toString() === userId)) throw new AppError("Already a member", 409);

  squad.members.push(new (require("mongoose").Types.ObjectId)(userId));
  await squad.save();
  await squad.populate("members", "name");

  sendSuccess(res, { squad }, "Joined squad");
});

// DELETE /squads/:id/leave
export const leaveSquad = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const squad = await Squad.findById(req.params.id);
  if (!squad) throw new AppError("Squad not found", 404);

  squad.members = squad.members.filter((m) => m.toString() !== userId);
  if (squad.ownerId.toString() === userId && squad.members.length > 0) {
    squad.ownerId = squad.members[0];
  }
  if (squad.members.length === 0) squad.isActive = false;
  await squad.save();

  sendSuccess(res, null, "Left squad");
});

// GET /squads/:id/leaderboard
export const getSquadLeaderboard = asyncHandler(async (req: Request, res: Response) => {
  const squad = await Squad.findById(req.params.id)
    .populate("members", "name averageScore testsAttempted totalPoints targetExam");
  if (!squad) throw new AppError("Squad not found", 404);

  const members = (squad.members as unknown as {
    _id: string; name: string; averageScore: number; testsAttempted: number; totalPoints: number;
  }[]).sort((a, b) => b.averageScore - a.averageScore);

  sendSuccess(res, { leaderboard: members.map((m, i) => ({ ...m, rank: i + 1 })) });
});

// GET /squads/:id/messages?limit=50
export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const { limit = "50" } = req.query as { limit?: string };
  const messages = await SquadMessage.find({ squadId: req.params.id, isModerated: false })
    .populate("userId", "name")
    .sort({ createdAt: -1 })
    .limit(parseInt(limit));
  sendSuccess(res, { messages: messages.reverse() });
});

// POST /squads/:id/messages
export const postMessage = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { text } = req.body as { text: string };
  if (!text?.trim()) throw new AppError("Message text required", 400);

  const squad = await Squad.findById(req.params.id);
  if (!squad) throw new AppError("Squad not found", 404);
  if (!squad.members.some((m) => m.toString() === userId)) {
    throw new AppError("You are not a member of this squad", 403);
  }

  const message = await SquadMessage.create({
    squadId: req.params.id,
    userId,
    text: text.trim(),
  });
  await message.populate("userId", "name");
  sendSuccess(res, { message }, "Message sent", 201);
});
