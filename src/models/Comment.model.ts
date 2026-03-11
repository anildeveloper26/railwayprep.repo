import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  questionId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  parentId?: mongoose.Types.ObjectId; // null = top-level, set = reply
  text: string;
  upvotes: mongoose.Types.ObjectId[];
  downvotes: mongoose.Types.ObjectId[];
  isPinned: boolean;
  isHidden: boolean; // admin soft-delete
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
    text: { type: String, required: true, trim: true, maxlength: 1000 },
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isPinned: { type: Boolean, default: false },
    isHidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

commentSchema.index({ questionId: 1, parentId: 1, createdAt: -1 });
commentSchema.set("toJSON", { versionKey: false });

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
