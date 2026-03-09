/**
 * Seed script for Railway Exam Portal
 * Run with: npx tsx src/scripts/seed.ts
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/User.model";
import { Question } from "../models/Question.model";
import { MockTest } from "../models/MockTest.model";
import { TestAttempt } from "../models/TestAttempt.model";
import { ExamNotification } from "../models/ExamNotification.model";
import { Subscription } from "../models/Subscription.model";
import { getQuestions } from "./seedQuestions";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/railway-exam-portal";

// ─── USERS ────────────────────────────────────────────────────────────────────

const usersData = [
  {
    name: "Admin User",
    email: "admin@railwayprep.in",
    password: "Admin@1234",
    role: "admin" as const,
    category: "General" as const,
    targetExam: "RRB NTPC" as const,
    subscriptionPlan: "annual" as const,
    testsAttempted: 0,
    averageScore: 0,
    totalPoints: 0,
  },
  {
    name: "Ravi Kumar",
    email: "ravi.kumar@example.com",
    password: "Student@1234",
    role: "student" as const,
    category: "SC" as const,
    targetExam: "RRB NTPC" as const,
    subscriptionPlan: "monthly" as const,
    testsAttempted: 5,
    averageScore: 72.4,
    totalPoints: 850,
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    password: "Student@1234",
    role: "student" as const,
    category: "OBC" as const,
    targetExam: "RRB Group D" as const,
    subscriptionPlan: "quarterly" as const,
    testsAttempted: 8,
    averageScore: 68.1,
    totalPoints: 1100,
  },
  {
    name: "Suresh Babu",
    email: "suresh.babu@example.com",
    password: "Student@1234",
    role: "student" as const,
    category: "ST" as const,
    targetExam: "RRB NTPC" as const,
    subscriptionPlan: "free" as const,
    testsAttempted: 2,
    averageScore: 55.0,
    totalPoints: 200,
  },
  {
    name: "Anjali Devi",
    email: "anjali.devi@example.com",
    password: "Student@1234",
    role: "student" as const,
    category: "General" as const,
    targetExam: "RRB JE" as const,
    subscriptionPlan: "annual" as const,
    testsAttempted: 12,
    averageScore: 81.3,
    totalPoints: 2400,
  },
  {
    name: "Mohammed Irfan",
    email: "irfan.m@example.com",
    password: "Student@1234",
    role: "student" as const,
    category: "OBC" as const,
    targetExam: "RRB ALP" as const,
    subscriptionPlan: "monthly" as const,
    testsAttempted: 6,
    averageScore: 74.8,
    totalPoints: 960,
  },
  {
    name: "Lakshmi Narayana",
    email: "lakshmi.n@example.com",
    password: "Student@1234",
    role: "student" as const,
    category: "EWS" as const,
    targetExam: "RRB NTPC" as const,
    subscriptionPlan: "free" as const,
    testsAttempted: 1,
    averageScore: 48.0,
    totalPoints: 80,
  },
];

// ─── QUESTIONS ────────────────────────────────────────────────────────────────
// Questions are imported from seedQuestions.ts (150+ questions across all subjects)

// ─── EXAM NOTIFICATIONS ────────────────────────────────────────────────────────

const notificationsData = [
  {
    title: "RRB NTPC Recruitment 2024 – 11558 Vacancies",
    exam: "RRB NTPC",
    boardName: "Railway Recruitment Board",
    vacancyCount: 11558,
    vacancyBreakdown: { general: 5000, obc: 2800, sc: 1800, st: 980, ews: 978 },
    status: "application_open" as const,
    applicationStartDate: new Date("2024-09-14"),
    applicationEndDate: new Date("2024-10-13"),
    examDate: new Date("2025-03-01"),
    officialLink: "https://indianrailways.gov.in",
    importantDates: [
      { label: "Application Start", date: new Date("2024-09-14") },
      { label: "Application End", date: new Date("2024-10-13") },
      { label: "Fee Payment Last Date", date: new Date("2024-10-14") },
      { label: "CBT-1 Exam Date", date: new Date("2025-03-01") },
    ],
    eligibility: { qualification: "12th Pass / Graduate", ageMin: 18, ageMax: 36 },
    isActive: true,
  },
  {
    title: "RRB Group D Recruitment 2025 – 32438 Vacancies",
    exam: "RRB Group D",
    boardName: "Railway Recruitment Board",
    vacancyCount: 32438,
    vacancyBreakdown: { general: 14200, obc: 8500, sc: 5600, st: 2800, ews: 1338 },
    status: "upcoming" as const,
    applicationStartDate: new Date("2025-04-01"),
    applicationEndDate: new Date("2025-04-30"),
    examDate: new Date("2025-09-15"),
    officialLink: "https://indianrailways.gov.in",
    importantDates: [
      { label: "Notification Release", date: new Date("2025-03-15") },
      { label: "Application Start", date: new Date("2025-04-01") },
      { label: "Application End", date: new Date("2025-04-30") },
      { label: "Exam Date (Tentative)", date: new Date("2025-09-15") },
    ],
    eligibility: { qualification: "10th Pass / ITI", ageMin: 18, ageMax: 33 },
    isActive: true,
  },
  {
    title: "RRB JE Recruitment 2024 – 7951 Vacancies",
    exam: "RRB JE",
    boardName: "Railway Recruitment Board",
    vacancyCount: 7951,
    vacancyBreakdown: { general: 3500, obc: 2000, sc: 1300, st: 700, ews: 451 },
    status: "result_declared" as const,
    applicationStartDate: new Date("2024-01-30"),
    applicationEndDate: new Date("2024-02-29"),
    examDate: new Date("2024-07-15"),
    resultDate: new Date("2024-11-20"),
    officialLink: "https://indianrailways.gov.in",
    importantDates: [
      { label: "Application Start", date: new Date("2024-01-30") },
      { label: "Application End", date: new Date("2024-02-29") },
      { label: "CBT-1 Date", date: new Date("2024-07-15") },
      { label: "Result Declared", date: new Date("2024-11-20") },
    ],
    eligibility: { qualification: "B.E/B.Tech / Diploma in Engineering", ageMin: 18, ageMax: 36 },
    isActive: true,
  },
  {
    title: "RRB ALP & Technician Recruitment 2024 – 18799 Vacancies",
    exam: "RRB ALP",
    boardName: "Railway Recruitment Board",
    vacancyCount: 18799,
    vacancyBreakdown: { general: 8000, obc: 4800, sc: 3200, st: 1700, ews: 1099 },
    status: "admit_card" as const,
    applicationStartDate: new Date("2024-01-20"),
    applicationEndDate: new Date("2024-02-19"),
    examDate: new Date("2024-11-25"),
    officialLink: "https://indianrailways.gov.in",
    importantDates: [
      { label: "Application Start", date: new Date("2024-01-20") },
      { label: "Application End", date: new Date("2024-02-19") },
      { label: "Admit Card Download", date: new Date("2024-11-15") },
      { label: "CBT Exam Date", date: new Date("2024-11-25") },
    ],
    eligibility: { qualification: "10th Pass + ITI / Diploma", ageMin: 18, ageMax: 33 },
    isActive: true,
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("Connecting to MongoDB:", MONGO_URI);
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
  console.log("Connected.\n");

  // Clear existing data
  console.log("Clearing existing data...");
  await Promise.all([
    User.deleteMany({}),
    Question.deleteMany({}),
    MockTest.deleteMany({}),
    TestAttempt.deleteMany({}),
    ExamNotification.deleteMany({}),
    Subscription.deleteMany({}),
  ]);
  console.log("Cleared.\n");

  // ── USERS ──────────────────────────────────────────────────────────────────
  console.log("Seeding users...");
  const createdUsers = [];
  for (const u of usersData) {
    createdUsers.push(await User.create(u));
  }
  const adminUser = createdUsers.find((u) => u.role === "admin")!;
  const studentUsers = createdUsers.filter((u) => u.role === "student");
  console.log(`  ${createdUsers.length} users created.`);

  // ── QUESTIONS ──────────────────────────────────────────────────────────────
  console.log("Seeding questions...");
  const createdQuestions = await Question.insertMany(getQuestions(adminUser._id as mongoose.Types.ObjectId));
  console.log(`  ${createdQuestions.length} questions created.`);

  // ── MOCK TESTS ─────────────────────────────────────────────────────────────
  console.log("Seeding mock tests...");

  // Filter questions by subject for test assembly
  const mathQs = createdQuestions.filter((q) => q.subject === "Mathematics").map((q) => q._id as mongoose.Types.ObjectId);
  const reasoningQs = createdQuestions.filter((q) => q.subject === "Reasoning").map((q) => q._id as mongoose.Types.ObjectId);
  const gkQs = createdQuestions.filter((q) => q.subject === "General Knowledge").map((q) => q._id as mongoose.Types.ObjectId);
  const caQs = createdQuestions.filter((q) => q.subject === "Current Affairs").map((q) => q._id as mongoose.Types.ObjectId);
  const techQs = createdQuestions.filter((q) => q.subject === "Technical").map((q) => q._id as mongoose.Types.ObjectId);

  // Also filter PYQ questions by exam for PYQ-specific tests
  const ntpcPYQs = createdQuestions.filter((q) => q.isPYQ && q.exam === "RRB NTPC").map((q) => q._id as mongoose.Types.ObjectId);
  const groupDPYQs = createdQuestions.filter((q) => q.isPYQ && q.exam === "RRB Group D").map((q) => q._id as mongoose.Types.ObjectId);

  // Assemble question sets for each test
  const ntpcFullTest1 = [...mathQs.slice(0, 15), ...reasoningQs.slice(0, 15), ...gkQs.slice(0, 15), ...caQs.slice(0, 5)];
  const ntpcFullTest2 = [...mathQs.slice(15), ...reasoningQs.slice(15), ...gkQs.slice(15), ...caQs.slice(5)];
  const mathSectional = mathQs.slice(0, 20);
  const reasoningSectional = reasoningQs.slice(0, 20);
  const gkSectional = [...gkQs.slice(0, 15), ...caQs.slice(0, 5)];
  const groupDTest1 = [...mathQs.slice(0, 10), ...reasoningQs.slice(0, 8), ...gkQs.slice(0, 7)];
  const groupDTest2 = [...mathQs.slice(10, 20), ...reasoningQs.slice(8, 16), ...gkQs.slice(7, 14)];
  const jeTest = [...mathQs.slice(0, 5), ...reasoningQs.slice(0, 5), ...techQs];
  const alpTest = [...mathQs.slice(5, 15), ...reasoningQs.slice(5, 13), ...techQs.slice(0, 7)];

  const mockTestsData = [
    {
      title: "RRB NTPC Full Length Mock Test – 1",
      exam: "RRB NTPC",
      description: "Complete mock test covering Mathematics, Reasoning, GK & Current Affairs as per the latest CBT-1 pattern. 1/3 negative marking.",
      totalQuestions: ntpcFullTest1.length,
      duration: 90,
      totalMarks: ntpcFullTest1.length,
      sections: [
        { subject: "Mathematics", questionCount: 15, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Reasoning", questionCount: 15, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "General Knowledge", questionCount: 15, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Current Affairs", questionCount: 5, marksPerQuestion: 1, negativeMarks: 0.33 },
      ],
      questions: ntpcFullTest1,
      difficulty: "Medium" as const,
      isPremium: false,
      isActive: true,
      totalAttempts: 12450,
      averageScore: 68.5,
      createdBy: adminUser._id as mongoose.Types.ObjectId,
    },
    {
      title: "RRB NTPC Full Length Mock Test – 2",
      exam: "RRB NTPC",
      description: "Second full-length mock test with fresh questions. Covers all CBT-1 sections with negative marking.",
      totalQuestions: ntpcFullTest2.length,
      duration: 90,
      totalMarks: ntpcFullTest2.length,
      sections: [
        { subject: "Mathematics", questionCount: Math.min(mathQs.length - 15, 15), marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Reasoning", questionCount: Math.min(reasoningQs.length - 15, 15), marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "General Knowledge", questionCount: Math.min(gkQs.length - 15, 15), marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Current Affairs", questionCount: Math.min(caQs.length - 5, 5), marksPerQuestion: 1, negativeMarks: 0.33 },
      ],
      questions: ntpcFullTest2,
      difficulty: "Hard" as const,
      isPremium: false,
      isActive: true,
      totalAttempts: 9320,
      averageScore: 62.1,
      createdBy: adminUser._id as mongoose.Types.ObjectId,
    },
    {
      title: "RRB NTPC Maths Sectional Test",
      exam: "RRB NTPC",
      description: "Focused test on Mathematics: Percentage, Profit/Loss, SI/CI, Time & Work, Speed-Distance, Ratio, Algebra, Geometry.",
      totalQuestions: mathSectional.length,
      duration: 30,
      totalMarks: mathSectional.length,
      sections: [
        { subject: "Mathematics", questionCount: mathSectional.length, marksPerQuestion: 1, negativeMarks: 0.33 },
      ],
      questions: mathSectional,
      difficulty: "Medium" as const,
      isPremium: false,
      isActive: true,
      totalAttempts: 18900,
      averageScore: 71.3,
      createdBy: adminUser._id as mongoose.Types.ObjectId,
    },
    {
      title: "RRB NTPC Reasoning Sectional Test",
      exam: "RRB NTPC",
      description: "Focused test on Reasoning: Coding-Decoding, Number Series, Analogy, Blood Relations, Direction Sense, Calendar, Odd One Out.",
      totalQuestions: reasoningSectional.length,
      duration: 30,
      totalMarks: reasoningSectional.length,
      sections: [
        { subject: "Reasoning", questionCount: reasoningSectional.length, marksPerQuestion: 1, negativeMarks: 0.33 },
      ],
      questions: reasoningSectional,
      difficulty: "Medium" as const,
      isPremium: false,
      isActive: true,
      totalAttempts: 15200,
      averageScore: 74.8,
      createdBy: adminUser._id as mongoose.Types.ObjectId,
    },
    {
      title: "RRB NTPC GK & Current Affairs Test",
      exam: "RRB NTPC",
      description: "Indian Railways, Constitution, Geography, History, Science, Economy & Current Affairs. Covers high-weightage topics.",
      totalQuestions: gkSectional.length,
      duration: 30,
      totalMarks: gkSectional.length,
      sections: [
        { subject: "General Knowledge", questionCount: 15, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Current Affairs", questionCount: 5, marksPerQuestion: 1, negativeMarks: 0.33 },
      ],
      questions: gkSectional,
      difficulty: "Medium" as const,
      isPremium: false,
      isActive: true,
      totalAttempts: 6800,
      averageScore: 65.4,
      createdBy: adminUser._id as mongoose.Types.ObjectId,
    },
    {
      title: "RRB NTPC Previous Year Paper (2022 CBT-1)",
      exam: "RRB NTPC",
      description: "Memory-based previous year questions from RRB NTPC 2022 CBT-1 exam. Practice with actual exam-level questions.",
      totalQuestions: ntpcPYQs.length,
      duration: 90,
      totalMarks: ntpcPYQs.length,
      sections: [
        { subject: "Mathematics", questionCount: Math.floor(ntpcPYQs.length * 0.3), marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Reasoning", questionCount: Math.floor(ntpcPYQs.length * 0.3), marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "General Knowledge", questionCount: Math.floor(ntpcPYQs.length * 0.4), marksPerQuestion: 1, negativeMarks: 0.33 },
      ],
      questions: ntpcPYQs,
      difficulty: "Medium" as const,
      isPremium: false,
      isActive: true,
      totalAttempts: 21000,
      averageScore: 66.2,
      createdBy: adminUser._id as mongoose.Types.ObjectId,
    },
    {
      title: "RRB NTPC PYQ 2025 (Memory Based)",
      exam: "RRB NTPC",
      description: "Latest memory-based questions from RRB NTPC 2025 CBT-1 shifts. Fresh exam-pattern questions.",
      totalQuestions: Math.min(ntpcPYQs.length, 30),
      duration: 90,
      totalMarks: Math.min(ntpcPYQs.length, 30),
      sections: [
        { subject: "Mathematics", questionCount: 10, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Reasoning", questionCount: 10, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "General Knowledge", questionCount: 10, marksPerQuestion: 1, negativeMarks: 0.33 },
      ],
      questions: ntpcPYQs.slice(0, 30),
      difficulty: "Medium" as const,
      isPremium: true,
      isActive: true,
      totalAttempts: 3200,
      averageScore: 59.8,
      createdBy: adminUser._id as mongoose.Types.ObjectId,
    },
    {
      title: "RRB Group D Full Mock Test – 1",
      exam: "RRB Group D",
      description: "Complete mock test for RRB Group D covering Mathematics, Reasoning and General Knowledge.",
      totalQuestions: groupDTest1.length,
      duration: 90,
      totalMarks: groupDTest1.length,
      sections: [
        { subject: "Mathematics", questionCount: 10, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Reasoning", questionCount: 8, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "General Knowledge", questionCount: 7, marksPerQuestion: 1, negativeMarks: 0.33 },
      ],
      questions: groupDTest1,
      difficulty: "Easy" as const,
      isPremium: false,
      isActive: true,
      totalAttempts: 7600,
      averageScore: 61.2,
      createdBy: adminUser._id as mongoose.Types.ObjectId,
    },
    {
      title: "RRB Group D Full Mock Test – 2",
      exam: "RRB Group D",
      description: "Second practice test for RRB Group D with different question set. Easy to moderate difficulty.",
      totalQuestions: groupDTest2.length,
      duration: 90,
      totalMarks: groupDTest2.length,
      sections: [
        { subject: "Mathematics", questionCount: 10, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Reasoning", questionCount: 8, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "General Knowledge", questionCount: 7, marksPerQuestion: 1, negativeMarks: 0.33 },
      ],
      questions: groupDTest2,
      difficulty: "Medium" as const,
      isPremium: false,
      isActive: true,
      totalAttempts: 5400,
      averageScore: 58.7,
      createdBy: adminUser._id as mongoose.Types.ObjectId,
    },
    {
      title: "RRB Group D PYQ Paper (2020-2022)",
      exam: "RRB Group D",
      description: "Previous year questions from RRB Group D exams 2020-2022. Practice actual exam questions.",
      totalQuestions: groupDPYQs.length,
      duration: 90,
      totalMarks: groupDPYQs.length,
      sections: [
        { subject: "Mathematics", questionCount: Math.floor(groupDPYQs.length * 0.35), marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Reasoning", questionCount: Math.floor(groupDPYQs.length * 0.35), marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "General Knowledge", questionCount: Math.floor(groupDPYQs.length * 0.3), marksPerQuestion: 1, negativeMarks: 0.33 },
      ],
      questions: groupDPYQs,
      difficulty: "Easy" as const,
      isPremium: false,
      isActive: true,
      totalAttempts: 8900,
      averageScore: 64.5,
      createdBy: adminUser._id as mongoose.Types.ObjectId,
    },
    {
      title: "RRB JE CBT-1 Mock Test – Engineering Basics",
      exam: "RRB JE",
      description: "Technical questions covering Electrical, Mechanical, Civil and Electronics for RRB JE aspirants.",
      totalQuestions: jeTest.length,
      duration: 90,
      totalMarks: jeTest.length,
      sections: [
        { subject: "Mathematics", questionCount: 5, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Reasoning", questionCount: 5, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Technical", questionCount: techQs.length, marksPerQuestion: 1, negativeMarks: 0.33 },
      ],
      questions: jeTest,
      difficulty: "Hard" as const,
      isPremium: true,
      isActive: true,
      totalAttempts: 4200,
      averageScore: 72.8,
      createdBy: adminUser._id as mongoose.Types.ObjectId,
    },
    {
      title: "RRB ALP & Technician Mock Test",
      exam: "RRB ALP",
      description: "Practice test for ALP & Technician covering Maths, Reasoning and Technical subjects.",
      totalQuestions: alpTest.length,
      duration: 60,
      totalMarks: alpTest.length,
      sections: [
        { subject: "Mathematics", questionCount: 10, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Reasoning", questionCount: 8, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Technical", questionCount: 7, marksPerQuestion: 1, negativeMarks: 0.33 },
      ],
      questions: alpTest,
      difficulty: "Medium" as const,
      isPremium: true,
      isActive: true,
      totalAttempts: 3100,
      averageScore: 67.3,
      createdBy: adminUser._id as mongoose.Types.ObjectId,
    },
  ];

  const createdTests = await MockTest.insertMany(mockTestsData);
  console.log(`  ${createdTests.length} mock tests created.`);

  // ── SUBSCRIPTIONS ──────────────────────────────────────────────────────────
  console.log("Seeding subscriptions...");
  const now = new Date();

  const subscriptionsData = studentUsers
    .filter((u) => u.subscriptionPlan !== "free")
    .map((user) => {
      const plan = user.subscriptionPlan;
      const durationDays = plan === "monthly" ? 30 : plan === "quarterly" ? 90 : 365;
      const startDate = new Date(now.getTime() - randomInt(1, 15) * 24 * 60 * 60 * 1000);
      const endDate = new Date(startDate.getTime() + durationDays * 24 * 60 * 60 * 1000);
      const amount = plan === "monthly" ? 19900 : plan === "quarterly" ? 49900 : 99900; // paise

      return {
        userId: user._id as mongoose.Types.ObjectId,
        plan,
        amount,
        currency: "INR",
        razorpayOrderId: `order_${Math.random().toString(36).substr(2, 14)}`,
        razorpayPaymentId: `pay_${Math.random().toString(36).substr(2, 14)}`,
        razorpaySignature: `sig_${Math.random().toString(36).substr(2, 28)}`,
        status: "success" as const,
        startDate,
        endDate,
      };
    });

  await Subscription.insertMany(subscriptionsData);
  console.log(`  ${subscriptionsData.length} subscriptions created.`);

  // ── TEST ATTEMPTS ──────────────────────────────────────────────────────────
  console.log("Seeding test attempts...");

  const attemptsData = [];
  const allTests = createdTests;
  const optionKeys: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];

  for (const student of studentUsers.slice(0, 4)) {
    const testCount = randomInt(1, 3);
    const shuffledTests = [...allTests].sort(() => Math.random() - 0.5).slice(0, testCount);

    for (const test of shuffledTests) {
      const testQuestions = await Question.find({ _id: { $in: test.questions } });
      if (testQuestions.length === 0) continue;

      const answers = testQuestions.map((q) => {
        const correct = q.correctOption;
        const isCorrect = Math.random() > 0.35;
        const selectedOption = isCorrect ? correct : randomFrom(optionKeys.filter((k) => k !== correct));
        const marksAwarded = isCorrect ? 1 : -0.33;

        return {
          questionId: q._id as mongoose.Types.ObjectId,
          selectedOption,
          isCorrect,
          marksAwarded,
          timeTaken: randomInt(30, 120),
          isFlagged: Math.random() > 0.85,
        };
      });

      const correctAnswers = answers.filter((a) => a.isCorrect).length;
      const wrongAnswers = answers.filter((a) => !a.isCorrect).length;
      const unanswered = 0;
      const score = Math.max(0, parseFloat((correctAnswers - wrongAnswers * 0.33).toFixed(2)));
      const percentage = parseFloat(((score / test.totalMarks) * 100).toFixed(2));
      const timeTaken = answers.reduce((acc, a) => acc + a.timeTaken, 0);

      attemptsData.push({
        userId: student._id as mongoose.Types.ObjectId,
        testId: test._id as mongoose.Types.ObjectId,
        answers,
        score,
        totalMarks: test.totalMarks,
        percentage,
        correctAnswers,
        wrongAnswers,
        unanswered,
        timeTaken,
        rank: randomInt(1, 200),
        completedAt: new Date(now.getTime() - randomInt(1, 30) * 24 * 60 * 60 * 1000),
      });
    }
  }

  await TestAttempt.insertMany(attemptsData);
  console.log(`  ${attemptsData.length} test attempts created.`);

  // ── NOTIFICATIONS ──────────────────────────────────────────────────────────
  console.log("Seeding exam notifications...");
  await ExamNotification.insertMany(notificationsData);
  console.log(`  ${notificationsData.length} exam notifications created.`);

  // ── SUMMARY ────────────────────────────────────────────────────────────────
  console.log("\n=== Seed Complete ===");
  console.log(`Users:              ${createdUsers.length}`);
  console.log(`  Admin:            admin@railwayprep.in  /  Admin@1234`);
  console.log(`  Students (demo):  ravi.kumar@example.com  /  Student@1234`);
  console.log(`Questions:          ${createdQuestions.length}`);
  console.log(`Mock Tests:         ${createdTests.length}`);
  console.log(`Subscriptions:      ${subscriptionsData.length}`);
  console.log(`Test Attempts:      ${attemptsData.length}`);
  console.log(`Exam Notifications: ${notificationsData.length}`);

  await mongoose.disconnect();
  console.log("\nDisconnected. Done!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  mongoose.disconnect();
  process.exit(1);
});
