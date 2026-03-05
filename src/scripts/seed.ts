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

const questionsData = (adminId: mongoose.Types.ObjectId) => [
  // Mathematics
  {
    subject: "Mathematics" as const,
    topic: "Number System",
    difficulty: "Easy" as const,
    year: 2022,
    exam: "RRB NTPC",
    questionText: "What is the LCM of 12, 18, and 24?",
    options: [
      { key: "A" as const, text: "48" },
      { key: "B" as const, text: "72" },
      { key: "C" as const, text: "36" },
      { key: "D" as const, text: "60" },
    ],
    correctOption: "B" as const,
    explanation: "LCM(12, 18, 24): Prime factorization gives 2^3 × 3^2 = 72.",
    isPYQ: true,
    tags: ["lcm", "number system", "rrb ntpc"],
    createdBy: adminId,
  },
  {
    subject: "Mathematics" as const,
    topic: "Percentage",
    difficulty: "Medium" as const,
    year: 2021,
    exam: "RRB NTPC",
    questionText: "A shopkeeper marks an item 40% above the cost price and gives a 20% discount. What is the profit percentage?",
    options: [
      { key: "A" as const, text: "10%" },
      { key: "B" as const, text: "12%" },
      { key: "C" as const, text: "15%" },
      { key: "D" as const, text: "20%" },
    ],
    correctOption: "B" as const,
    explanation: "Let CP = 100. MP = 140. SP = 140 × 0.8 = 112. Profit% = (112-100)/100 × 100 = 12%.",
    isPYQ: true,
    tags: ["percentage", "profit loss", "rrb ntpc"],
    createdBy: adminId,
  },
  {
    subject: "Mathematics" as const,
    topic: "Time and Work",
    difficulty: "Medium" as const,
    year: 2020,
    exam: "RRB Group D",
    questionText: "A can complete a work in 15 days and B can complete the same work in 20 days. In how many days can they complete the work together?",
    options: [
      { key: "A" as const, text: "8 days" },
      { key: "B" as const, text: "8.57 days" },
      { key: "C" as const, text: "9 days" },
      { key: "D" as const, text: "7.5 days" },
    ],
    correctOption: "B" as const,
    explanation: "Together per day = 1/15 + 1/20 = 4/60 + 3/60 = 7/60. Days = 60/7 ≈ 8.57 days.",
    isPYQ: true,
    tags: ["time and work", "rrb group d"],
    createdBy: adminId,
  },
  {
    subject: "Mathematics" as const,
    topic: "Simple Interest",
    difficulty: "Easy" as const,
    year: 2022,
    exam: "RRB NTPC",
    questionText: "What is the simple interest on Rs. 5000 at 8% per annum for 3 years?",
    options: [
      { key: "A" as const, text: "Rs. 1000" },
      { key: "B" as const, text: "Rs. 1200" },
      { key: "C" as const, text: "Rs. 1500" },
      { key: "D" as const, text: "Rs. 900" },
    ],
    correctOption: "B" as const,
    explanation: "SI = (P × R × T) / 100 = (5000 × 8 × 3) / 100 = Rs. 1200.",
    isPYQ: true,
    tags: ["simple interest", "rrb ntpc"],
    createdBy: adminId,
  },
  {
    subject: "Mathematics" as const,
    topic: "Speed, Distance and Time",
    difficulty: "Hard" as const,
    year: 2019,
    exam: "RRB NTPC",
    questionText: "Two trains of lengths 200m and 150m are running towards each other at speeds of 60 km/h and 40 km/h respectively. How long will they take to cross each other?",
    options: [
      { key: "A" as const, text: "12.6 seconds" },
      { key: "B" as const, text: "13 seconds" },
      { key: "C" as const, text: "12 seconds" },
      { key: "D" as const, text: "11.5 seconds" },
    ],
    correctOption: "A" as const,
    explanation: "Relative speed = 60+40 = 100 km/h = 100×1000/3600 = 250/9 m/s. Total length = 350m. Time = 350 ÷ (250/9) = 350×9/250 = 12.6 seconds.",
    isPYQ: true,
    tags: ["trains", "speed distance time", "rrb ntpc"],
    createdBy: adminId,
  },
  {
    subject: "Mathematics" as const,
    topic: "Ratio and Proportion",
    difficulty: "Easy" as const,
    exam: "RRB Group D",
    questionText: "The ratio of boys to girls in a class is 3:2. If there are 30 students total, how many are girls?",
    options: [
      { key: "A" as const, text: "18" },
      { key: "B" as const, text: "12" },
      { key: "C" as const, text: "15" },
      { key: "D" as const, text: "10" },
    ],
    correctOption: "B" as const,
    explanation: "Total parts = 5. Girls = (2/5) × 30 = 12.",
    isPYQ: false,
    tags: ["ratio", "proportion"],
    createdBy: adminId,
  },
  {
    subject: "Mathematics" as const,
    topic: "Algebra",
    difficulty: "Medium" as const,
    year: 2021,
    exam: "RRB JE",
    questionText: "If x + 1/x = 5, what is the value of x² + 1/x²?",
    options: [
      { key: "A" as const, text: "23" },
      { key: "B" as const, text: "25" },
      { key: "C" as const, text: "27" },
      { key: "D" as const, text: "21" },
    ],
    correctOption: "A" as const,
    explanation: "x² + 1/x² = (x + 1/x)² - 2 = 25 - 2 = 23.",
    isPYQ: true,
    tags: ["algebra", "rrb je"],
    createdBy: adminId,
  },

  // Reasoning
  {
    subject: "Reasoning" as const,
    topic: "Analogy",
    difficulty: "Easy" as const,
    year: 2022,
    exam: "RRB NTPC",
    questionText: "Book : Library :: Painting : ?",
    options: [
      { key: "A" as const, text: "Artist" },
      { key: "B" as const, text: "Gallery" },
      { key: "C" as const, text: "Canvas" },
      { key: "D" as const, text: "Museum" },
    ],
    correctOption: "B" as const,
    explanation: "A Book is stored/displayed in a Library; similarly, a Painting is stored/displayed in a Gallery.",
    isPYQ: true,
    tags: ["analogy", "reasoning", "rrb ntpc"],
    createdBy: adminId,
  },
  {
    subject: "Reasoning" as const,
    topic: "Series Completion",
    difficulty: "Medium" as const,
    year: 2021,
    exam: "RRB NTPC",
    questionText: "Find the missing term: 2, 6, 12, 20, 30, ?",
    options: [
      { key: "A" as const, text: "40" },
      { key: "B" as const, text: "42" },
      { key: "C" as const, text: "44" },
      { key: "D" as const, text: "46" },
    ],
    correctOption: "B" as const,
    explanation: "Pattern: n(n+1) → 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.",
    isPYQ: true,
    tags: ["series", "number pattern", "rrb ntpc"],
    createdBy: adminId,
  },
  {
    subject: "Reasoning" as const,
    topic: "Coding-Decoding",
    difficulty: "Medium" as const,
    year: 2020,
    exam: "RRB Group D",
    questionText: "If TRAIN is coded as USBJK, how is RAILWAY coded?",
    options: [
      { key: "A" as const, text: "SBMMBXBZ" },
      { key: "B" as const, text: "SBMMBZBZ" },
      { key: "C" as const, text: "SBMMXBZ" },
      { key: "D" as const, text: "SBMMBXBZ" },
    ],
    correctOption: "A" as const,
    explanation: "Each letter is shifted by +1 in the alphabet. R→S, A→B, I→J, L→M, W→X, A→B, Y→Z.",
    isPYQ: true,
    tags: ["coding decoding", "rrb group d"],
    createdBy: adminId,
  },
  {
    subject: "Reasoning" as const,
    topic: "Blood Relations",
    difficulty: "Hard" as const,
    year: 2022,
    exam: "RRB NTPC",
    questionText: "A is B's brother. C is A's mother. D is C's father. E is D's mother. How is A related to D?",
    options: [
      { key: "A" as const, text: "Grandson" },
      { key: "B" as const, text: "Son" },
      { key: "C" as const, text: "Great Grandson" },
      { key: "D" as const, text: "Grandson" },
    ],
    correctOption: "A" as const,
    explanation: "D is C's father → D is A's grandfather. Therefore A is D's Grandson.",
    isPYQ: true,
    tags: ["blood relations", "rrb ntpc"],
    createdBy: adminId,
  },
  {
    subject: "Reasoning" as const,
    topic: "Direction Sense",
    difficulty: "Medium" as const,
    year: 2021,
    exam: "RRB Group D",
    questionText: "Ravi walks 10 km north, turns right and walks 5 km, then turns right and walks 10 km. How far is he from the starting point?",
    options: [
      { key: "A" as const, text: "10 km" },
      { key: "B" as const, text: "0 km" },
      { key: "C" as const, text: "5 km" },
      { key: "D" as const, text: "15 km" },
    ],
    correctOption: "C" as const,
    explanation: "He went N 10km, E 5km, S 10km. Net displacement: 5km East from start.",
    isPYQ: true,
    tags: ["direction", "rrb group d"],
    createdBy: adminId,
  },
  {
    subject: "Reasoning" as const,
    topic: "Syllogism",
    difficulty: "Easy" as const,
    exam: "RRB NTPC",
    questionText: "All dogs are animals. All animals are living beings. Which conclusion is correct?",
    options: [
      { key: "A" as const, text: "All living beings are dogs" },
      { key: "B" as const, text: "All dogs are living beings" },
      { key: "C" as const, text: "Some animals are not living beings" },
      { key: "D" as const, text: "No dog is a living being" },
    ],
    correctOption: "B" as const,
    explanation: "By syllogism: All dogs → animals → living beings. Therefore all dogs are living beings.",
    isPYQ: false,
    tags: ["syllogism", "logic"],
    createdBy: adminId,
  },

  // General Knowledge
  {
    subject: "General Knowledge" as const,
    topic: "Indian Constitution",
    difficulty: "Easy" as const,
    year: 2022,
    exam: "RRB NTPC",
    questionText: "The Constitution of India was adopted on:",
    options: [
      { key: "A" as const, text: "15 August 1947" },
      { key: "B" as const, text: "26 January 1950" },
      { key: "C" as const, text: "26 November 1949" },
      { key: "D" as const, text: "2 October 1947" },
    ],
    correctOption: "C" as const,
    explanation: "The Constitution was adopted on 26 November 1949 and came into force on 26 January 1950 (Republic Day).",
    isPYQ: true,
    tags: ["constitution", "indian polity", "rrb ntpc"],
    createdBy: adminId,
  },
  {
    subject: "General Knowledge" as const,
    topic: "Indian Railways",
    difficulty: "Easy" as const,
    year: 2021,
    exam: "RRB NTPC",
    questionText: "When was the first passenger railway line opened in India?",
    options: [
      { key: "A" as const, text: "1835" },
      { key: "B" as const, text: "1853" },
      { key: "C" as const, text: "1857" },
      { key: "D" as const, text: "1869" },
    ],
    correctOption: "B" as const,
    explanation: "India's first passenger railway ran from Bori Bunder (Mumbai) to Thane on 16 April 1853.",
    isPYQ: true,
    tags: ["indian railways", "history", "rrb ntpc"],
    createdBy: adminId,
  },
  {
    subject: "General Knowledge" as const,
    topic: "Geography",
    difficulty: "Medium" as const,
    year: 2020,
    exam: "RRB Group D",
    questionText: "Which is the longest river in India?",
    options: [
      { key: "A" as const, text: "Brahmaputra" },
      { key: "B" as const, text: "Yamuna" },
      { key: "C" as const, text: "Ganga" },
      { key: "D" as const, text: "Godavari" },
    ],
    correctOption: "C" as const,
    explanation: "The Ganga is the longest river in India at approximately 2525 km.",
    isPYQ: true,
    tags: ["geography", "rivers", "rrb group d"],
    createdBy: adminId,
  },
  {
    subject: "General Knowledge" as const,
    topic: "Science",
    difficulty: "Medium" as const,
    year: 2022,
    exam: "RRB NTPC",
    questionText: "The chemical formula of table salt (common salt) is:",
    options: [
      { key: "A" as const, text: "KCl" },
      { key: "B" as const, text: "NaHCO₃" },
      { key: "C" as const, text: "NaCl" },
      { key: "D" as const, text: "CaCl₂" },
    ],
    correctOption: "C" as const,
    explanation: "Table salt is Sodium Chloride with chemical formula NaCl.",
    isPYQ: true,
    tags: ["chemistry", "science", "rrb ntpc"],
    createdBy: adminId,
  },
  {
    subject: "General Knowledge" as const,
    topic: "Indian Railways",
    difficulty: "Easy" as const,
    year: 2022,
    exam: "RRB NTPC",
    questionText: "The headquarters of Indian Railways is located in:",
    options: [
      { key: "A" as const, text: "Mumbai" },
      { key: "B" as const, text: "Kolkata" },
      { key: "C" as const, text: "Chennai" },
      { key: "D" as const, text: "New Delhi" },
    ],
    correctOption: "D" as const,
    explanation: "The headquarters of Indian Railways (Rail Bhavan) is located in New Delhi.",
    isPYQ: true,
    tags: ["indian railways", "general knowledge"],
    createdBy: adminId,
  },
  {
    subject: "General Knowledge" as const,
    topic: "History",
    difficulty: "Medium" as const,
    year: 2021,
    exam: "RRB Group D",
    questionText: "Who is known as the 'Iron Man of India'?",
    options: [
      { key: "A" as const, text: "Jawaharlal Nehru" },
      { key: "B" as const, text: "Subhas Chandra Bose" },
      { key: "C" as const, text: "Sardar Vallabhbhai Patel" },
      { key: "D" as const, text: "Bhagat Singh" },
    ],
    correctOption: "C" as const,
    explanation: "Sardar Vallabhbhai Patel is known as the 'Iron Man of India' for unifying 562 princely states post-independence.",
    isPYQ: true,
    tags: ["history", "freedom struggle", "rrb group d"],
    createdBy: adminId,
  },

  // Current Affairs
  {
    subject: "Current Affairs" as const,
    topic: "Sports",
    difficulty: "Easy" as const,
    year: 2024,
    exam: "RRB NTPC",
    questionText: "India won how many medals at the Paris 2024 Olympics?",
    options: [
      { key: "A" as const, text: "5" },
      { key: "B" as const, text: "6" },
      { key: "C" as const, text: "7" },
      { key: "D" as const, text: "8" },
    ],
    correctOption: "B" as const,
    explanation: "India won 6 medals (1 Silver and 5 Bronze) at the Paris 2024 Olympics.",
    isPYQ: false,
    tags: ["sports", "olympics", "current affairs 2024"],
    createdBy: adminId,
  },
  {
    subject: "Current Affairs" as const,
    topic: "Government Schemes",
    difficulty: "Easy" as const,
    year: 2023,
    exam: "RRB NTPC",
    questionText: "Which scheme was launched by the Government of India to provide free food grains to the poor?",
    options: [
      { key: "A" as const, text: "PM Kisan Samman Nidhi" },
      { key: "B" as const, text: "Pradhan Mantri Garib Kalyan Anna Yojana" },
      { key: "C" as const, text: "Antyodaya Anna Yojana" },
      { key: "D" as const, text: "National Food Security Mission" },
    ],
    correctOption: "B" as const,
    explanation: "Pradhan Mantri Garib Kalyan Anna Yojana (PMGKAY) provides free food grains to about 81 crore beneficiaries.",
    isPYQ: false,
    tags: ["government schemes", "social welfare", "current affairs"],
    createdBy: adminId,
  },
  {
    subject: "Current Affairs" as const,
    topic: "Science and Technology",
    difficulty: "Medium" as const,
    year: 2023,
    exam: "RRB NTPC",
    questionText: "India's Chandrayaan-3 successfully landed on the Moon's south pole in which year?",
    options: [
      { key: "A" as const, text: "2021" },
      { key: "B" as const, text: "2022" },
      { key: "C" as const, text: "2023" },
      { key: "D" as const, text: "2024" },
    ],
    correctOption: "C" as const,
    explanation: "Chandrayaan-3's Vikram lander successfully touched down near the Moon's south pole on 23 August 2023, making India the first country to achieve this feat.",
    isPYQ: false,
    tags: ["isro", "space", "chandrayaan", "current affairs 2023"],
    createdBy: adminId,
  },

  // Technical
  {
    subject: "Technical" as const,
    topic: "Electrical Engineering",
    difficulty: "Medium" as const,
    year: 2021,
    exam: "RRB JE",
    questionText: "What is the unit of electrical resistance?",
    options: [
      { key: "A" as const, text: "Volt" },
      { key: "B" as const, text: "Ampere" },
      { key: "C" as const, text: "Ohm" },
      { key: "D" as const, text: "Watt" },
    ],
    correctOption: "C" as const,
    explanation: "Electrical resistance is measured in Ohms (Ω), named after Georg Simon Ohm. V=IR is Ohm's Law.",
    isPYQ: true,
    tags: ["electrical", "basic concepts", "rrb je"],
    createdBy: adminId,
  },
  {
    subject: "Technical" as const,
    topic: "Mechanical Engineering",
    difficulty: "Hard" as const,
    year: 2022,
    exam: "RRB JE",
    questionText: "Which type of gear is used to transmit power between parallel shafts?",
    options: [
      { key: "A" as const, text: "Bevel Gear" },
      { key: "B" as const, text: "Worm Gear" },
      { key: "C" as const, text: "Spur Gear" },
      { key: "D" as const, text: "Spiral Gear" },
    ],
    correctOption: "C" as const,
    explanation: "Spur gears are the simplest and most common type used to transmit motion between parallel shafts.",
    isPYQ: true,
    tags: ["mechanical", "gears", "rrb je"],
    createdBy: adminId,
  },
  {
    subject: "Technical" as const,
    topic: "Civil Engineering",
    difficulty: "Medium" as const,
    year: 2020,
    exam: "RRB JE",
    questionText: "The ratio of water to cement by weight in a concrete mix is known as:",
    options: [
      { key: "A" as const, text: "Workability ratio" },
      { key: "B" as const, text: "Water-cement ratio" },
      { key: "C" as const, text: "Mix ratio" },
      { key: "D" as const, text: "Hydration ratio" },
    ],
    correctOption: "B" as const,
    explanation: "The water-cement (W/C) ratio directly influences the strength and durability of concrete. A lower W/C ratio gives higher strength.",
    isPYQ: true,
    tags: ["civil", "concrete", "rrb je"],
    createdBy: adminId,
  },
  {
    subject: "Technical" as const,
    topic: "Electronics",
    difficulty: "Medium" as const,
    year: 2021,
    exam: "RRB ALP",
    questionText: "A diode allows current to flow in:",
    options: [
      { key: "A" as const, text: "Both directions" },
      { key: "B" as const, text: "Only reverse direction" },
      { key: "C" as const, text: "Only forward direction" },
      { key: "D" as const, text: "No direction" },
    ],
    correctOption: "C" as const,
    explanation: "A diode is a semiconductor device that allows current to flow only in the forward direction (anode to cathode).",
    isPYQ: true,
    tags: ["electronics", "diode", "rrb alp"],
    createdBy: adminId,
  },
];

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
  const createdQuestions = await Question.insertMany(questionsData(adminUser._id as mongoose.Types.ObjectId));
  console.log(`  ${createdQuestions.length} questions created.`);

  // ── MOCK TESTS ─────────────────────────────────────────────────────────────
  console.log("Seeding mock tests...");

  const mathQs = createdQuestions.filter((q) => q.subject === "Mathematics").map((q) => q._id as mongoose.Types.ObjectId);
  const reasoningQs = createdQuestions.filter((q) => q.subject === "Reasoning").map((q) => q._id as mongoose.Types.ObjectId);
  const gkQs = createdQuestions.filter((q) => q.subject === "General Knowledge").map((q) => q._id as mongoose.Types.ObjectId);
  const caQs = createdQuestions.filter((q) => q.subject === "Current Affairs").map((q) => q._id as mongoose.Types.ObjectId);
  const techQs = createdQuestions.filter((q) => q.subject === "Technical").map((q) => q._id as mongoose.Types.ObjectId);

  const ntpcTestQuestions = [...mathQs, ...reasoningQs, ...gkQs, ...caQs];
  const groupDTestQuestions = [...mathQs.slice(0, 5), ...reasoningQs.slice(0, 4), ...gkQs.slice(0, 4)];
  const jeTestQuestions = [...mathQs.slice(0, 3), ...reasoningQs.slice(0, 3), ...techQs];

  const mockTestsData = [
    {
      title: "RRB NTPC Full Length Mock Test – 1",
      exam: "RRB NTPC",
      description: "Complete 100-question mock test covering all sections of RRB NTPC CBT-1 as per the latest pattern.",
      totalQuestions: ntpcTestQuestions.length,
      duration: 90,
      totalMarks: ntpcTestQuestions.length,
      sections: [
        { subject: "Mathematics", questionCount: mathQs.length, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Reasoning", questionCount: reasoningQs.length, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "General Knowledge", questionCount: gkQs.length, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Current Affairs", questionCount: caQs.length, marksPerQuestion: 1, negativeMarks: 0.33 },
      ],
      questions: ntpcTestQuestions,
      difficulty: "Medium" as const,
      isPremium: false,
      isActive: true,
      totalAttempts: 124,
      averageScore: 68.5,
      createdBy: adminUser._id as mongoose.Types.ObjectId,
    },
    {
      title: "RRB Group D Practice Test – 1",
      exam: "RRB Group D",
      description: "Covers Mathematics, Reasoning and General Knowledge as per RRB Group D 100-mark pattern.",
      totalQuestions: groupDTestQuestions.length,
      duration: 90,
      totalMarks: groupDTestQuestions.length,
      sections: [
        { subject: "Mathematics", questionCount: 5, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Reasoning", questionCount: 4, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "General Knowledge", questionCount: 4, marksPerQuestion: 1, negativeMarks: 0.33 },
      ],
      questions: groupDTestQuestions,
      difficulty: "Easy" as const,
      isPremium: false,
      isActive: true,
      totalAttempts: 87,
      averageScore: 61.2,
      createdBy: adminUser._id as mongoose.Types.ObjectId,
    },
    {
      title: "RRB JE CBT-1 Mock Test – Engineering Basics",
      exam: "RRB JE",
      description: "Technical questions covering Electrical, Mechanical, Civil and Electronics for RRB JE aspirants.",
      totalQuestions: jeTestQuestions.length,
      duration: 90,
      totalMarks: jeTestQuestions.length,
      sections: [
        { subject: "Mathematics", questionCount: 3, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Reasoning", questionCount: 3, marksPerQuestion: 1, negativeMarks: 0.33 },
        { subject: "Technical", questionCount: techQs.length, marksPerQuestion: 1, negativeMarks: 0.33 },
      ],
      questions: jeTestQuestions,
      difficulty: "Hard" as const,
      isPremium: true,
      isActive: true,
      totalAttempts: 43,
      averageScore: 72.8,
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
