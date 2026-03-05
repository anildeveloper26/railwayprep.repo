import mongoose, { Document, Schema } from "mongoose";

export type NotificationStatus =
  | "upcoming"
  | "application_open"
  | "application_closed"
  | "admit_card"
  | "result_declared";

export interface IVacancyBreakdown {
  general: number;
  obc: number;
  sc: number;
  st: number;
  ews: number;
}

export interface IExamNotification extends Document {
  title: string;
  exam: string;
  boardName: string;
  vacancyCount: number;
  vacancyBreakdown: IVacancyBreakdown;
  status: NotificationStatus;
  applicationStartDate?: Date;
  applicationEndDate?: Date;
  examDate?: Date;
  resultDate?: Date;
  officialLink: string;
  importantDates: { label: string; date: Date }[];
  eligibility: { qualification: string; ageMin: number; ageMax: number };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const examNotificationSchema = new Schema<IExamNotification>(
  {
    title: { type: String, required: true, trim: true },
    exam: { type: String, required: true, trim: true },
    boardName: { type: String, required: true, trim: true },
    vacancyCount: { type: Number, required: true, min: 0 },
    vacancyBreakdown: {
      general: { type: Number, default: 0 },
      obc: { type: Number, default: 0 },
      sc: { type: Number, default: 0 },
      st: { type: Number, default: 0 },
      ews: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: ["upcoming", "application_open", "application_closed", "admit_card", "result_declared"],
      required: true,
    },
    applicationStartDate: { type: Date },
    applicationEndDate: { type: Date },
    examDate: { type: Date },
    resultDate: { type: Date },
    officialLink: { type: String, required: true },
    importantDates: [
      {
        label: { type: String, required: true },
        date: { type: Date, required: true },
      },
    ],
    eligibility: {
      qualification: { type: String, default: "10th / 12th Pass" },
      ageMin: { type: Number, default: 18 },
      ageMax: { type: Number, default: 33 },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

examNotificationSchema.index({ status: 1, isActive: 1 });

examNotificationSchema.set("toJSON", { versionKey: false });

export const ExamNotification = mongoose.model<IExamNotification>(
  "ExamNotification",
  examNotificationSchema
);
