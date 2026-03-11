import mongoose, { Document, Schema } from "mongoose";

export interface ISquad extends Document {
  name: string;
  description?: string;
  inviteCode: string;
  ownerId: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  maxMembers: number;
  targetExam: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISquadMessage extends Document {
  squadId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  text: string;
  isModerated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const squadSchema = new Schema<ISquad>(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    description: { type: String, trim: true, maxlength: 200 },
    inviteCode: { type: String, required: true, unique: true, uppercase: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    maxMembers: { type: Number, default: 10, max: 10 },
    targetExam: { type: String, default: "RRB NTPC" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

squadSchema.set("toJSON", { versionKey: false });
export const Squad = mongoose.model<ISquad>("Squad", squadSchema);

const squadMessageSchema = new Schema<ISquadMessage>(
  {
    squadId: { type: Schema.Types.ObjectId, ref: "Squad", required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true, maxlength: 500 },
    isModerated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

squadMessageSchema.set("toJSON", { versionKey: false });
export const SquadMessage = mongoose.model<ISquadMessage>("SquadMessage", squadMessageSchema);
