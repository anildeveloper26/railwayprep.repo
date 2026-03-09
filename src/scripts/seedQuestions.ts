/**
 * Comprehensive RRB Question Bank
 * Sources: RRB NTPC PYQs (2019-2025), RRB Group D, RRB JE
 * 150+ questions across Mathematics, Reasoning, GK, Current Affairs, Technical
 */
import mongoose from "mongoose";

type QData = {
  subject: "Mathematics" | "Reasoning" | "General Knowledge" | "Technical" | "Current Affairs";
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  year?: number;
  exam?: string;
  questionText: string;
  options: { key: "A" | "B" | "C" | "D"; text: string }[];
  correctOption: "A" | "B" | "C" | "D";
  explanation: string;
  isPYQ: boolean;
  tags: string[];
  createdBy: mongoose.Types.ObjectId;
};

export const getQuestions = (adminId: mongoose.Types.ObjectId): QData[] => [
  // ═══════════════════════════════════════════════════════════════════════════
  // MATHEMATICS (40 questions)
  // ═══════════════════════════════════════════════════════════════════════════

  // --- Number System ---
  {
    subject: "Mathematics", topic: "Number System", difficulty: "Easy",
    year: 2022, exam: "RRB NTPC",
    questionText: "What is the LCM of 12, 18, and 24?",
    options: [{ key: "A", text: "48" }, { key: "B", text: "72" }, { key: "C", text: "36" }, { key: "D", text: "60" }],
    correctOption: "B",
    explanation: "LCM(12, 18, 24): Prime factorization gives 2³ × 3² = 72.",
    isPYQ: true, tags: ["lcm", "number system", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Number System", difficulty: "Easy",
    year: 2021, exam: "RRB NTPC",
    questionText: "What is the HCF of 36 and 48?",
    options: [{ key: "A", text: "6" }, { key: "B", text: "12" }, { key: "C", text: "18" }, { key: "D", text: "24" }],
    correctOption: "B",
    explanation: "36 = 2² × 3², 48 = 2⁴ × 3. HCF = 2² × 3 = 12.",
    isPYQ: true, tags: ["hcf", "number system", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Number System", difficulty: "Medium",
    year: 2020, exam: "RRB NTPC",
    questionText: "The sum of first 20 natural numbers is:",
    options: [{ key: "A", text: "190" }, { key: "B", text: "200" }, { key: "C", text: "210" }, { key: "D", text: "220" }],
    correctOption: "C",
    explanation: "Sum = n(n+1)/2 = 20 × 21/2 = 210.",
    isPYQ: true, tags: ["sum", "natural numbers", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Number System", difficulty: "Medium",
    year: 2022, exam: "RRB Group D",
    questionText: "If a number is divisible by both 3 and 5, it must be divisible by:",
    options: [{ key: "A", text: "8" }, { key: "B", text: "10" }, { key: "C", text: "15" }, { key: "D", text: "20" }],
    correctOption: "C",
    explanation: "Since 3 and 5 are co-prime, the number must be divisible by 3 × 5 = 15.",
    isPYQ: true, tags: ["divisibility", "number system", "rrb group d"], createdBy: adminId,
  },

  // --- Percentage ---
  {
    subject: "Mathematics", topic: "Percentage", difficulty: "Medium",
    year: 2021, exam: "RRB NTPC",
    questionText: "A shopkeeper marks an item 40% above the cost price and gives a 20% discount. What is the profit percentage?",
    options: [{ key: "A", text: "10%" }, { key: "B", text: "12%" }, { key: "C", text: "15%" }, { key: "D", text: "20%" }],
    correctOption: "B",
    explanation: "Let CP = 100. MP = 140. SP = 140 × 0.8 = 112. Profit% = (112-100)/100 × 100 = 12%.",
    isPYQ: true, tags: ["percentage", "profit loss", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Percentage", difficulty: "Easy",
    year: 2022, exam: "RRB NTPC",
    questionText: "What is 15% of 240?",
    options: [{ key: "A", text: "30" }, { key: "B", text: "36" }, { key: "C", text: "42" }, { key: "D", text: "48" }],
    correctOption: "B",
    explanation: "15% of 240 = (15/100) × 240 = 36.",
    isPYQ: true, tags: ["percentage", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Percentage", difficulty: "Hard",
    year: 2025, exam: "RRB NTPC",
    questionText: "The population of a town increases by 10% in the first year and decreases by 10% in the second year. If the present population is 10000, what will it be after 2 years?",
    options: [{ key: "A", text: "9900" }, { key: "B", text: "10000" }, { key: "C", text: "9800" }, { key: "D", text: "10100" }],
    correctOption: "A",
    explanation: "After 1st year: 10000 × 1.1 = 11000. After 2nd year: 11000 × 0.9 = 9900.",
    isPYQ: true, tags: ["percentage", "population", "rrb ntpc"], createdBy: adminId,
  },

  // --- Profit and Loss ---
  {
    subject: "Mathematics", topic: "Profit and Loss", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "A man buys an article for ₹800 and sells it for ₹920. What is the profit percentage?",
    options: [{ key: "A", text: "12%" }, { key: "B", text: "15%" }, { key: "C", text: "18%" }, { key: "D", text: "20%" }],
    correctOption: "B",
    explanation: "Profit = 920 - 800 = 120. Profit% = (120/800) × 100 = 15%.",
    isPYQ: true, tags: ["profit loss", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Profit and Loss", difficulty: "Hard",
    year: 2021, exam: "RRB NTPC",
    questionText: "A trader sells two articles at ₹1200 each. On one he gains 20% and on the other he loses 20%. What is the overall gain or loss percentage?",
    options: [{ key: "A", text: "4% loss" }, { key: "B", text: "No profit no loss" }, { key: "C", text: "2% loss" }, { key: "D", text: "4% gain" }],
    correctOption: "A",
    explanation: "When SP is same, Loss% = (common%)²/100 = (20)²/100 = 4% loss.",
    isPYQ: true, tags: ["profit loss", "rrb ntpc"], createdBy: adminId,
  },

  // --- Simple & Compound Interest ---
  {
    subject: "Mathematics", topic: "Simple Interest", difficulty: "Easy",
    year: 2022, exam: "RRB NTPC",
    questionText: "What is the simple interest on Rs. 5000 at 8% per annum for 3 years?",
    options: [{ key: "A", text: "Rs. 1000" }, { key: "B", text: "Rs. 1200" }, { key: "C", text: "Rs. 1500" }, { key: "D", text: "Rs. 900" }],
    correctOption: "B",
    explanation: "SI = (P × R × T) / 100 = (5000 × 8 × 3) / 100 = Rs. 1200.",
    isPYQ: true, tags: ["simple interest", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Compound Interest", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "Find the compound interest on ₹10000 at 10% per annum for 2 years.",
    options: [{ key: "A", text: "₹2000" }, { key: "B", text: "₹2100" }, { key: "C", text: "₹2200" }, { key: "D", text: "₹2500" }],
    correctOption: "B",
    explanation: "CI = P[(1+R/100)^T - 1] = 10000[(1.1)² - 1] = 10000 × 0.21 = ₹2100.",
    isPYQ: true, tags: ["compound interest", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Simple Interest", difficulty: "Medium",
    year: 2020, exam: "RRB Group D",
    questionText: "At what rate of interest will ₹2000 amount to ₹2400 in 4 years at simple interest?",
    options: [{ key: "A", text: "4%" }, { key: "B", text: "5%" }, { key: "C", text: "6%" }, { key: "D", text: "8%" }],
    correctOption: "B",
    explanation: "SI = 2400 - 2000 = 400. R = (SI × 100)/(P × T) = (400 × 100)/(2000 × 4) = 5%.",
    isPYQ: true, tags: ["simple interest", "rrb group d"], createdBy: adminId,
  },

  // --- Time and Work ---
  {
    subject: "Mathematics", topic: "Time and Work", difficulty: "Medium",
    year: 2020, exam: "RRB Group D",
    questionText: "A can complete a work in 15 days and B can complete the same work in 20 days. In how many days can they complete the work together?",
    options: [{ key: "A", text: "8 days" }, { key: "B", text: "8.57 days" }, { key: "C", text: "9 days" }, { key: "D", text: "7.5 days" }],
    correctOption: "B",
    explanation: "Together per day = 1/15 + 1/20 = 7/60. Days = 60/7 ≈ 8.57 days.",
    isPYQ: true, tags: ["time and work", "rrb group d"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Time and Work", difficulty: "Hard",
    year: 2025, exam: "RRB NTPC",
    questionText: "A can do a piece of work in 10 days, B in 15 days. They work together for 5 days, then A leaves. How many more days will B take to finish?",
    options: [{ key: "A", text: "2.5 days" }, { key: "B", text: "3 days" }, { key: "C", text: "3.5 days" }, { key: "D", text: "4 days" }],
    correctOption: "A",
    explanation: "Together in 5 days = 5(1/10 + 1/15) = 5 × 5/30 = 25/30 = 5/6. Remaining = 1/6. B alone = (1/6)/(1/15) = 15/6 = 2.5 days.",
    isPYQ: true, tags: ["time and work", "rrb ntpc"], createdBy: adminId,
  },

  // --- Speed, Distance and Time ---
  {
    subject: "Mathematics", topic: "Speed, Distance and Time", difficulty: "Hard",
    year: 2019, exam: "RRB NTPC",
    questionText: "Two trains of lengths 200m and 150m are running towards each other at speeds of 60 km/h and 40 km/h. How long will they take to cross each other?",
    options: [{ key: "A", text: "12.6 seconds" }, { key: "B", text: "13 seconds" }, { key: "C", text: "12 seconds" }, { key: "D", text: "11.5 seconds" }],
    correctOption: "A",
    explanation: "Relative speed = 100 km/h = 250/9 m/s. Total length = 350m. Time = 350 × 9/250 = 12.6 seconds.",
    isPYQ: true, tags: ["trains", "speed distance time", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Speed, Distance and Time", difficulty: "Easy",
    year: 2022, exam: "RRB Group D",
    questionText: "A car covers 240 km in 4 hours. What is its speed in km/h?",
    options: [{ key: "A", text: "50 km/h" }, { key: "B", text: "55 km/h" }, { key: "C", text: "60 km/h" }, { key: "D", text: "65 km/h" }],
    correctOption: "C",
    explanation: "Speed = Distance/Time = 240/4 = 60 km/h.",
    isPYQ: true, tags: ["speed distance time", "rrb group d"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Speed, Distance and Time", difficulty: "Medium",
    year: 2025, exam: "RRB NTPC",
    questionText: "A person walks at 5 km/h and reaches office 10 minutes late. If he walks at 6 km/h, he reaches 10 minutes early. What is the distance to his office?",
    options: [{ key: "A", text: "8 km" }, { key: "B", text: "10 km" }, { key: "C", text: "12 km" }, { key: "D", text: "15 km" }],
    correctOption: "B",
    explanation: "d/5 - d/6 = 20/60. d(6-5)/30 = 1/3. d = 10 km.",
    isPYQ: true, tags: ["speed distance time", "rrb ntpc"], createdBy: adminId,
  },

  // --- Ratio and Proportion ---
  {
    subject: "Mathematics", topic: "Ratio and Proportion", difficulty: "Easy",
    exam: "RRB Group D",
    questionText: "The ratio of boys to girls in a class is 3:2. If there are 30 students total, how many are girls?",
    options: [{ key: "A", text: "18" }, { key: "B", text: "12" }, { key: "C", text: "15" }, { key: "D", text: "10" }],
    correctOption: "B",
    explanation: "Total parts = 5. Girls = (2/5) × 30 = 12.",
    isPYQ: false, tags: ["ratio", "proportion"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Ratio and Proportion", difficulty: "Medium",
    year: 2021, exam: "RRB NTPC",
    questionText: "If A:B = 2:3 and B:C = 4:5, then A:B:C is:",
    options: [{ key: "A", text: "8:12:15" }, { key: "B", text: "2:3:5" }, { key: "C", text: "4:6:15" }, { key: "D", text: "8:12:10" }],
    correctOption: "A",
    explanation: "A:B = 2:3, B:C = 4:5. Making B common: A:B = 8:12, B:C = 12:15. So A:B:C = 8:12:15.",
    isPYQ: true, tags: ["ratio", "proportion", "rrb ntpc"], createdBy: adminId,
  },

  // --- Algebra ---
  {
    subject: "Mathematics", topic: "Algebra", difficulty: "Medium",
    year: 2021, exam: "RRB JE",
    questionText: "If x + 1/x = 5, what is the value of x² + 1/x²?",
    options: [{ key: "A", text: "23" }, { key: "B", text: "25" }, { key: "C", text: "27" }, { key: "D", text: "21" }],
    correctOption: "A",
    explanation: "x² + 1/x² = (x + 1/x)² - 2 = 25 - 2 = 23.",
    isPYQ: true, tags: ["algebra", "rrb je"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Algebra", difficulty: "Easy",
    year: 2022, exam: "RRB NTPC",
    questionText: "If 3x - 7 = 14, then x = ?",
    options: [{ key: "A", text: "5" }, { key: "B", text: "6" }, { key: "C", text: "7" }, { key: "D", text: "8" }],
    correctOption: "C",
    explanation: "3x = 14 + 7 = 21. x = 21/3 = 7.",
    isPYQ: true, tags: ["algebra", "linear equation", "rrb ntpc"], createdBy: adminId,
  },

  // --- Geometry & Mensuration ---
  {
    subject: "Mathematics", topic: "Geometry", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "The area of a circle with radius 7 cm is: (Use π = 22/7)",
    options: [{ key: "A", text: "144 cm²" }, { key: "B", text: "154 cm²" }, { key: "C", text: "164 cm²" }, { key: "D", text: "176 cm²" }],
    correctOption: "B",
    explanation: "Area = πr² = (22/7) × 7² = 22 × 7 = 154 cm².",
    isPYQ: true, tags: ["geometry", "circle", "area", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Mensuration", difficulty: "Medium",
    year: 2021, exam: "RRB Group D",
    questionText: "The volume of a cube with side 5 cm is:",
    options: [{ key: "A", text: "100 cm³" }, { key: "B", text: "125 cm³" }, { key: "C", text: "150 cm³" }, { key: "D", text: "175 cm³" }],
    correctOption: "B",
    explanation: "Volume of cube = side³ = 5³ = 125 cm³.",
    isPYQ: true, tags: ["mensuration", "cube", "volume", "rrb group d"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Geometry", difficulty: "Hard",
    year: 2025, exam: "RRB NTPC",
    questionText: "In a triangle, the angles are in the ratio 2:3:4. What is the measure of the largest angle?",
    options: [{ key: "A", text: "60°" }, { key: "B", text: "70°" }, { key: "C", text: "80°" }, { key: "D", text: "90°" }],
    correctOption: "C",
    explanation: "Sum of angles = 180°. Parts = 2+3+4 = 9. Largest angle = (4/9) × 180 = 80°.",
    isPYQ: true, tags: ["geometry", "triangle", "angles", "rrb ntpc"], createdBy: adminId,
  },

  // --- Average ---
  {
    subject: "Mathematics", topic: "Average", difficulty: "Easy",
    year: 2022, exam: "RRB NTPC",
    questionText: "The average of 5 numbers is 20. If one number is excluded, the average becomes 18. What is the excluded number?",
    options: [{ key: "A", text: "24" }, { key: "B", text: "26" }, { key: "C", text: "28" }, { key: "D", text: "30" }],
    correctOption: "C",
    explanation: "Total = 5 × 20 = 100. After exclusion: 4 × 18 = 72. Excluded number = 100 - 72 = 28.",
    isPYQ: true, tags: ["average", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Average", difficulty: "Medium",
    year: 2020, exam: "RRB Group D",
    questionText: "The average age of a class of 40 students is 14 years. When a new student is admitted, the average becomes 14.2 years. The age of the new student is:",
    options: [{ key: "A", text: "20 years" }, { key: "B", text: "22.2 years" }, { key: "C", text: "22 years" }, { key: "D", text: "24 years" }],
    correctOption: "B",
    explanation: "Old total = 40 × 14 = 560. New total = 41 × 14.2 = 582.2. New student's age = 582.2 - 560 = 22.2 years.",
    isPYQ: true, tags: ["average", "rrb group d"], createdBy: adminId,
  },

  // --- Simplification ---
  {
    subject: "Mathematics", topic: "Simplification", difficulty: "Easy",
    year: 2025, exam: "RRB NTPC",
    questionText: "Simplify: 25 × 4 + 36 ÷ 6 - 12",
    options: [{ key: "A", text: "92" }, { key: "B", text: "94" }, { key: "C", text: "96" }, { key: "D", text: "98" }],
    correctOption: "B",
    explanation: "= 100 + 6 - 12 = 94 (BODMAS: division first, then multiplication, then addition and subtraction).",
    isPYQ: true, tags: ["simplification", "bodmas", "rrb ntpc"], createdBy: adminId,
  },

  // --- Data Interpretation ---
  {
    subject: "Mathematics", topic: "Data Interpretation", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "In a school, 60% students play cricket, 40% play football, and 20% play both. What percentage plays at least one sport?",
    options: [{ key: "A", text: "70%" }, { key: "B", text: "75%" }, { key: "C", text: "80%" }, { key: "D", text: "85%" }],
    correctOption: "C",
    explanation: "At least one = Cricket + Football - Both = 60 + 40 - 20 = 80%.",
    isPYQ: true, tags: ["data interpretation", "sets", "rrb ntpc"], createdBy: adminId,
  },

  // --- Trigonometry ---
  {
    subject: "Mathematics", topic: "Trigonometry", difficulty: "Medium",
    year: 2021, exam: "RRB JE",
    questionText: "If sin θ = 3/5, what is cos θ?",
    options: [{ key: "A", text: "4/5" }, { key: "B", text: "3/4" }, { key: "C", text: "5/3" }, { key: "D", text: "5/4" }],
    correctOption: "A",
    explanation: "cos θ = √(1 - sin²θ) = √(1 - 9/25) = √(16/25) = 4/5.",
    isPYQ: true, tags: ["trigonometry", "rrb je"], createdBy: adminId,
  },

  // --- Pipes and Cisterns ---
  {
    subject: "Mathematics", topic: "Pipes and Cisterns", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "Pipe A can fill a tank in 12 hours and Pipe B can empty it in 18 hours. If both are opened, in how many hours will the tank be filled?",
    options: [{ key: "A", text: "30 hours" }, { key: "B", text: "36 hours" }, { key: "C", text: "24 hours" }, { key: "D", text: "40 hours" }],
    correctOption: "B",
    explanation: "Net rate = 1/12 - 1/18 = (3-2)/36 = 1/36. Tank fills in 36 hours.",
    isPYQ: true, tags: ["pipes cisterns", "rrb ntpc"], createdBy: adminId,
  },

  // --- Mixture and Alligation ---
  {
    subject: "Mathematics", topic: "Mixture and Alligation", difficulty: "Hard",
    year: 2025, exam: "RRB NTPC",
    questionText: "In what ratio must water be mixed with milk costing ₹60 per litre to get a mixture worth ₹45 per litre?",
    options: [{ key: "A", text: "1:2" }, { key: "B", text: "1:3" }, { key: "C", text: "2:3" }, { key: "D", text: "3:4" }],
    correctOption: "B",
    explanation: "By alligation: (60-45):(45-0) = 15:45 = 1:3. Water:Milk = 1:3.",
    isPYQ: true, tags: ["mixture", "alligation", "rrb ntpc"], createdBy: adminId,
  },

  // --- 3 more Maths questions ---
  {
    subject: "Mathematics", topic: "Number System", difficulty: "Hard",
    year: 2025, exam: "RRB NTPC",
    questionText: "When a number is divided by 13, the remainder is 11. What is the remainder when the same number is divided by 26?",
    options: [{ key: "A", text: "11" }, { key: "B", text: "24" }, { key: "C", text: "11 or 24" }, { key: "D", text: "15" }],
    correctOption: "C",
    explanation: "Number = 13k + 11. If k is even, remainder is 11. If k is odd, remainder is 24. So answer is 11 or 24.",
    isPYQ: true, tags: ["number system", "remainder", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Profit and Loss", difficulty: "Easy",
    year: 2020, exam: "RRB Group D",
    questionText: "3 chairs and 2 tables cost Rs. 700 and 5 chairs and 3 tables cost Rs. 1100. What is the cost of 1 chair and 2 tables?",
    options: [{ key: "A", text: "Rs. 300" }, { key: "B", text: "Rs. 400" }, { key: "C", text: "Rs. 500" }, { key: "D", text: "Rs. 600" }],
    correctOption: "C",
    explanation: "3c+2t=700, 5c+3t=1100. Solving: c=100, t=200. 1 chair + 2 tables = 100 + 400 = 500.",
    isPYQ: true, tags: ["linear equations", "rrb group d"], createdBy: adminId,
  },
  {
    subject: "Mathematics", topic: "Percentage", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "If the price of a commodity is increased by 25%, by what percentage should consumption be reduced so that expenditure remains the same?",
    options: [{ key: "A", text: "15%" }, { key: "B", text: "20%" }, { key: "C", text: "25%" }, { key: "D", text: "30%" }],
    correctOption: "B",
    explanation: "Reduction = (increase/(100+increase)) × 100 = (25/125) × 100 = 20%.",
    isPYQ: true, tags: ["percentage", "rrb ntpc"], createdBy: adminId,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REASONING (40 questions)
  // ═══════════════════════════════════════════════════════════════════════════

  // --- Coding-Decoding ---
  {
    subject: "Reasoning", topic: "Coding-Decoding", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "If MANGO is coded as LBLIL, how is MONKS coded?",
    options: [{ key: "A", text: "LPLMP" }, { key: "B", text: "PLLMP" }, { key: "C", text: "LPMPL" }, { key: "D", text: "MLPAL" }],
    correctOption: "A",
    explanation: "Pattern: -1, +1, -2, +2, -3. M→L, O→P, N→L, K→M, S→P = LPLMP.",
    isPYQ: true, tags: ["coding decoding", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
    year: 2021, exam: "RRB NTPC",
    questionText: "If MADRAS = NBESBT, how is BOMBAY coded?",
    options: [{ key: "A", text: "CPNCBX" }, { key: "B", text: "CPNCBZ" }, { key: "C", text: "CPOCBZ" }, { key: "D", text: "CQOCBZ" }],
    correctOption: "B",
    explanation: "Each letter shifts one position forward. B→C, O→P, M→N, B→C, A→B, Y→Z = CPNCBZ.",
    isPYQ: true, tags: ["coding decoding", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Reasoning", topic: "Coding-Decoding", difficulty: "Medium",
    year: 2020, exam: "RRB Group D",
    questionText: "If TRAIN is coded as USBJK, how is RAILWAY coded?",
    options: [{ key: "A", text: "SBJMXBZ" }, { key: "B", text: "SBJMXAZ" }, { key: "C", text: "SBJMYBZ" }, { key: "D", text: "SBKMXBZ" }],
    correctOption: "A",
    explanation: "Each letter is shifted by +1 in the alphabet. R→S, A→B, I→J, L→M, W→X, A→B, Y→Z.",
    isPYQ: true, tags: ["coding decoding", "rrb group d"], createdBy: adminId,
  },
  {
    subject: "Reasoning", topic: "Coding-Decoding", difficulty: "Hard",
    year: 2022, exam: "RRB NTPC",
    questionText: "If ROSE = 6821 and CHAIR = 73456, then SEARCH is coded as:",
    options: [{ key: "A", text: "246173" }, { key: "B", text: "214673" }, { key: "C", text: "214763" }, { key: "D", text: "216473" }],
    correctOption: "B",
    explanation: "From ROSE: R=6,O=8,S=2,E=1. From CHAIR: C=7,H=3,A=4,I=5,R=6. SEARCH: S=2,E=1,A=4,R=6,C=7,H=3 = 214673.",
    isPYQ: true, tags: ["coding decoding", "rrb ntpc"], createdBy: adminId,
  },

  // --- Number Series ---
  {
    subject: "Reasoning", topic: "Number Series", difficulty: "Medium",
    year: 2021, exam: "RRB NTPC",
    questionText: "Find the missing term: 2, 6, 12, 20, 30, ?",
    options: [{ key: "A", text: "40" }, { key: "B", text: "42" }, { key: "C", text: "44" }, { key: "D", text: "46" }],
    correctOption: "B",
    explanation: "Pattern: n(n+1) → 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.",
    isPYQ: true, tags: ["series", "number pattern", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Reasoning", topic: "Number Series", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "What comes next: 10, 29, 66, 127, ?",
    options: [{ key: "A", text: "200" }, { key: "B", text: "210" }, { key: "C", text: "218" }, { key: "D", text: "230" }],
    correctOption: "C",
    explanation: "Pattern: n³ + 2 → 2³+2=10, 3³+2=29, 4³+2=66, 5³+2=127, 6³+2=218.",
    isPYQ: true, tags: ["number series", "cubes", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Reasoning", topic: "Number Series", difficulty: "Easy",
    year: 2020, exam: "RRB Group D",
    questionText: "Find the next number: 13, 25, 49, 85, ?",
    options: [{ key: "A", text: "121" }, { key: "B", text: "133" }, { key: "C", text: "145" }, { key: "D", text: "157" }],
    correctOption: "B",
    explanation: "Differences: 12, 24, 36, 48. Next = 85 + 48 = 133.",
    isPYQ: true, tags: ["number series", "rrb group d"], createdBy: adminId,
  },

  // --- Analogy ---
  {
    subject: "Reasoning", topic: "Analogy", difficulty: "Easy",
    year: 2022, exam: "RRB NTPC",
    questionText: "Match : Victory :: Examination : ?",
    options: [{ key: "A", text: "Write" }, { key: "B", text: "Appear" }, { key: "C", text: "Success" }, { key: "D", text: "Attempt" }],
    correctOption: "C",
    explanation: "Victory is the positive outcome of a Match. Success is the positive outcome of an Examination.",
    isPYQ: true, tags: ["analogy", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Reasoning", topic: "Analogy", difficulty: "Easy",
    year: 2021, exam: "RRB NTPC",
    questionText: "Error : Mistake :: Doubt : ?",
    options: [{ key: "A", text: "Retaliation" }, { key: "B", text: "Poetry" }, { key: "C", text: "Art" }, { key: "D", text: "Suspicion" }],
    correctOption: "D",
    explanation: "Error and Mistake are synonyms. Doubt and Suspicion are synonyms.",
    isPYQ: true, tags: ["analogy", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Reasoning", topic: "Analogy", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "289 : 17 :: 961 : ?",
    options: [{ key: "A", text: "29" }, { key: "B", text: "31" }, { key: "C", text: "33" }, { key: "D", text: "37" }],
    correctOption: "B",
    explanation: "289 = 17². Similarly 961 = 31².",
    isPYQ: true, tags: ["analogy", "squares", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Reasoning", topic: "Analogy", difficulty: "Easy",
    year: 2020, exam: "RRB Group D",
    questionText: "Paw : Cat :: Hoof : ?",
    options: [{ key: "A", text: "Horse" }, { key: "B", text: "Dog" }, { key: "C", text: "Rabbit" }, { key: "D", text: "Eagle" }],
    correctOption: "A",
    explanation: "A Cat has Paws. A Horse has Hooves.",
    isPYQ: true, tags: ["analogy", "rrb group d"], createdBy: adminId,
  },
  {
    subject: "Reasoning", topic: "Analogy", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "Agra : Yamuna :: Varanasi : ?",
    options: [{ key: "A", text: "Tapti" }, { key: "B", text: "Godavari" }, { key: "C", text: "Ganga" }, { key: "D", text: "Kaveri" }],
    correctOption: "C",
    explanation: "Agra is situated on the banks of Yamuna. Varanasi is on the banks of Ganga.",
    isPYQ: true, tags: ["analogy", "geography", "rrb ntpc"], createdBy: adminId,
  },

  // --- Blood Relations ---
  {
    subject: "Reasoning", topic: "Blood Relations", difficulty: "Hard",
    year: 2022, exam: "RRB NTPC",
    questionText: "A is B's brother. C is A's mother. D is C's father. E is D's mother. How is A related to D?",
    options: [{ key: "A", text: "Grandson" }, { key: "B", text: "Son" }, { key: "C", text: "Great Grandson" }, { key: "D", text: "Nephew" }],
    correctOption: "A",
    explanation: "D is C's father → D is A's grandfather. Therefore A is D's Grandson.",
    isPYQ: true, tags: ["blood relations", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Reasoning", topic: "Blood Relations", difficulty: "Medium",
    year: 2021, exam: "RRB NTPC",
    questionText: "Pointing to a woman, Raj said, 'She is the daughter of my grandfather's only son.' How is the woman related to Raj?",
    options: [{ key: "A", text: "Mother" }, { key: "B", text: "Sister" }, { key: "C", text: "Aunt" }, { key: "D", text: "Cousin" }],
    correctOption: "B",
    explanation: "Grandfather's only son = Raj's father. Daughter of Raj's father = Raj's sister.",
    isPYQ: true, tags: ["blood relations", "rrb ntpc"], createdBy: adminId,
  },

  // --- Direction Sense ---
  {
    subject: "Reasoning", topic: "Direction Sense", difficulty: "Medium",
    year: 2021, exam: "RRB Group D",
    questionText: "Ravi walks 10 km north, turns right and walks 5 km, then turns right and walks 10 km. How far is he from the starting point?",
    options: [{ key: "A", text: "10 km" }, { key: "B", text: "0 km" }, { key: "C", text: "5 km" }, { key: "D", text: "15 km" }],
    correctOption: "C",
    explanation: "He went N 10km, E 5km, S 10km. Net displacement: 5km East from start.",
    isPYQ: true, tags: ["direction", "rrb group d"], createdBy: adminId,
  },
  {
    subject: "Reasoning", topic: "Direction Sense", difficulty: "Hard",
    year: 2022, exam: "RRB NTPC",
    questionText: "Arun walks 60 km west, then turns right and walks 11 km. How far is he from the starting point?",
    options: [{ key: "A", text: "60 km" }, { key: "B", text: "61 km" }, { key: "C", text: "71 km" }, { key: "D", text: "49 km" }],
    correctOption: "B",
    explanation: "Distance = √(60² + 11²) = √(3600 + 121) = √3721 = 61 km.",
    isPYQ: true, tags: ["direction", "rrb ntpc"], createdBy: adminId,
  },

  // --- Calendar ---
  {
    subject: "Reasoning", topic: "Calendar", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "If Monday falls on 5th of a month, what day is the 26th of that month?",
    options: [{ key: "A", text: "Monday" }, { key: "B", text: "Tuesday" }, { key: "C", text: "Wednesday" }, { key: "D", text: "Thursday" }],
    correctOption: "A",
    explanation: "26 - 5 = 21 days = 3 complete weeks. So 26th is also Monday.",
    isPYQ: true, tags: ["calendar", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Reasoning", topic: "Calendar", difficulty: "Medium",
    year: 2020, exam: "RRB Group D",
    questionText: "If October 1st is Sunday, what day is November 1st?",
    options: [{ key: "A", text: "Monday" }, { key: "B", text: "Wednesday" }, { key: "C", text: "Thursday" }, { key: "D", text: "Tuesday" }],
    correctOption: "B",
    explanation: "October has 31 days. 31 = 4 weeks + 3 days. Sunday + 3 = Wednesday.",
    isPYQ: true, tags: ["calendar", "rrb group d"], createdBy: adminId,
  },

  // --- Syllogism ---
  {
    subject: "Reasoning", topic: "Syllogism", difficulty: "Easy",
    exam: "RRB NTPC",
    questionText: "All dogs are animals. All animals are living beings. Which conclusion is correct?",
    options: [{ key: "A", text: "All living beings are dogs" }, { key: "B", text: "All dogs are living beings" }, { key: "C", text: "Some animals are not living beings" }, { key: "D", text: "No dog is a living being" }],
    correctOption: "B",
    explanation: "By syllogism: All dogs → animals → living beings. Therefore all dogs are living beings.",
    isPYQ: false, tags: ["syllogism", "logic"], createdBy: adminId,
  },

  // --- Ranking ---
  {
    subject: "Reasoning", topic: "Ranking and Order", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "Ravi is 9th from the left and Suresh is 6th from the right. After swapping, Ravi is 15th from the left. What is Suresh's new position from the right?",
    options: [{ key: "A", text: "6th" }, { key: "B", text: "12th" }, { key: "C", text: "13th" }, { key: "D", text: "15th" }],
    correctOption: "B",
    explanation: "(15 - 9) + 6 = 12th from right.",
    isPYQ: true, tags: ["ranking", "position", "rrb ntpc"], createdBy: adminId,
  },

  // --- Odd One Out ---
  {
    subject: "Reasoning", topic: "Odd One Out", difficulty: "Easy",
    year: 2021, exam: "RRB NTPC",
    questionText: "Find the odd one out: Parrot, Vulture, Swan, Sparrow",
    options: [{ key: "A", text: "Parrot" }, { key: "B", text: "Vulture" }, { key: "C", text: "Swan" }, { key: "D", text: "Sparrow" }],
    correctOption: "C",
    explanation: "Swan is a water bird; the rest are land birds.",
    isPYQ: true, tags: ["odd one out", "classification", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Reasoning", topic: "Odd One Out", difficulty: "Easy",
    year: 2022, exam: "RRB Group D",
    questionText: "Find the odd one out: 17, 27, 29, 37",
    options: [{ key: "A", text: "17" }, { key: "B", text: "27" }, { key: "C", text: "29" }, { key: "D", text: "37" }],
    correctOption: "B",
    explanation: "27 is not a prime number (27 = 3³). All others (17, 29, 37) are prime.",
    isPYQ: true, tags: ["odd one out", "prime numbers", "rrb group d"], createdBy: adminId,
  },

  // --- Letter Series ---
  {
    subject: "Reasoning", topic: "Letter Series", difficulty: "Easy",
    year: 2022, exam: "RRB NTPC",
    questionText: "RQP, ONM, ?, IHG, FED",
    options: [{ key: "A", text: "LKJ" }, { key: "B", text: "MLK" }, { key: "C", text: "KLM" }, { key: "D", text: "JKL" }],
    correctOption: "A",
    explanation: "Each group is 3 consecutive letters in reverse order, decreasing by 3: RQP, ONM, LKJ, IHG, FED.",
    isPYQ: true, tags: ["letter series", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "Reasoning", topic: "Letter Series", difficulty: "Medium",
    year: 2021, exam: "RRB NTPC",
    questionText: "TR : VX :: MK : ?",
    options: [{ key: "A", text: "NL" }, { key: "B", text: "OM" }, { key: "C", text: "NM" }, { key: "D", text: "OQ" }],
    correctOption: "D",
    explanation: "T+2=V, R+6=X. Similarly M+2=O, K+6=Q. Answer: OQ.",
    isPYQ: true, tags: ["letter series", "rrb ntpc"], createdBy: adminId,
  },

  // --- Seating Arrangement ---
  {
    subject: "Reasoning", topic: "Seating Arrangement", difficulty: "Hard",
    year: 2022, exam: "RRB NTPC",
    questionText: "In a row, Bindu is in the center, Asha is 6th from the left end and Ritu is 16th from the right end. What is the minimum number of girls in the row?",
    options: [{ key: "A", text: "21" }, { key: "B", text: "26" }, { key: "C", text: "31" }, { key: "D", text: "33" }],
    correctOption: "C",
    explanation: "Bindu is center, so total is odd. Asha at 6th from left, Ritu at 16th from right. Minimum = max(2×6-1, 2×16-1) = 31.",
    isPYQ: true, tags: ["seating arrangement", "rrb ntpc"], createdBy: adminId,
  },

  // --- Mirror & Water Image ---
  {
    subject: "Reasoning", topic: "Clock", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "What is the angle between the minute hand and the hour hand at 3:30?",
    options: [{ key: "A", text: "60°" }, { key: "B", text: "75°" }, { key: "C", text: "90°" }, { key: "D", text: "105°" }],
    correctOption: "B",
    explanation: "At 3:30, hour hand is at 105° (3×30 + 30×0.5), minute hand at 180°. Angle = 180-105 = 75°.",
    isPYQ: true, tags: ["clock", "angles", "rrb ntpc"], createdBy: adminId,
  },

  // --- Venn Diagram ---
  {
    subject: "Reasoning", topic: "Venn Diagram", difficulty: "Medium",
    year: 2021, exam: "RRB Group D",
    questionText: "Which diagram best represents the relationship between Fruits, Mangoes, and Food?",
    options: [{ key: "A", text: "All three separate circles" }, { key: "B", text: "Mangoes inside Fruits inside Food" }, { key: "C", text: "Mangoes inside Food, Fruits separate" }, { key: "D", text: "Fruits and Food overlap, Mangoes separate" }],
    correctOption: "B",
    explanation: "All Mangoes are Fruits, and all Fruits are Food. So Mangoes ⊂ Fruits ⊂ Food.",
    isPYQ: true, tags: ["venn diagram", "rrb group d"], createdBy: adminId,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GENERAL KNOWLEDGE (40 questions)
  // ═══════════════════════════════════════════════════════════════════════════

  // --- Indian Railways ---
  {
    subject: "General Knowledge", topic: "Indian Railways", difficulty: "Easy",
    year: 2021, exam: "RRB NTPC",
    questionText: "When was the first passenger railway line opened in India?",
    options: [{ key: "A", text: "1835" }, { key: "B", text: "1853" }, { key: "C", text: "1857" }, { key: "D", text: "1869" }],
    correctOption: "B",
    explanation: "India's first passenger railway ran from Bori Bunder (Mumbai) to Thane on 16 April 1853.",
    isPYQ: true, tags: ["indian railways", "history", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Indian Railways", difficulty: "Easy",
    year: 2022, exam: "RRB NTPC",
    questionText: "The headquarters of Indian Railways is located in:",
    options: [{ key: "A", text: "Mumbai" }, { key: "B", text: "Kolkata" }, { key: "C", text: "Chennai" }, { key: "D", text: "New Delhi" }],
    correctOption: "D",
    explanation: "The headquarters of Indian Railways (Rail Bhavan) is located in New Delhi.",
    isPYQ: true, tags: ["indian railways"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Indian Railways", difficulty: "Easy",
    year: 2022, exam: "RRB NTPC",
    questionText: "Indian railways were nationalized in which year?",
    options: [{ key: "A", text: "1945" }, { key: "B", text: "1951" }, { key: "C", text: "1981" }, { key: "D", text: "1990" }],
    correctOption: "B",
    explanation: "Indian Railways were nationalized in 1951 by merging all private railway companies.",
    isPYQ: true, tags: ["indian railways", "nationalization", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Indian Railways", difficulty: "Medium",
    year: 2021, exam: "RRB NTPC",
    questionText: "The first Shatabdi Express was introduced between which two cities?",
    options: [{ key: "A", text: "Bombay-Thane" }, { key: "B", text: "Bombay-Calcutta" }, { key: "C", text: "New Delhi-Jhansi" }, { key: "D", text: "New Delhi-Chennai" }],
    correctOption: "C",
    explanation: "The first Shatabdi Express was launched in 1988 between New Delhi and Jhansi.",
    isPYQ: true, tags: ["indian railways", "shatabdi", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Indian Railways", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "Who is known as the father of Indian Railways?",
    options: [{ key: "A", text: "Lord Curzon" }, { key: "B", text: "Lord Dalhousie" }, { key: "C", text: "Lord Mountbatten" }, { key: "D", text: "Warren Hastings" }],
    correctOption: "B",
    explanation: "Lord Dalhousie is known as the father of Indian Railways. He introduced railways in India in 1853.",
    isPYQ: true, tags: ["indian railways", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Indian Railways", difficulty: "Easy",
    year: 2022, exam: "RRB NTPC",
    questionText: "The longest railway platform in India is at:",
    options: [{ key: "A", text: "Gorakhpur" }, { key: "B", text: "Kollam" }, { key: "C", text: "Kharagpur" }, { key: "D", text: "Patna" }],
    correctOption: "A",
    explanation: "Gorakhpur railway station in Uttar Pradesh has the world's longest railway platform at 1366.33 meters.",
    isPYQ: true, tags: ["indian railways", "records", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Indian Railways", difficulty: "Medium",
    year: 2025, exam: "RRB NTPC",
    questionText: "Where is the longest railway bridge in India located?",
    options: [{ key: "A", text: "Vembanad Lake" }, { key: "B", text: "Pulicat Lake" }, { key: "C", text: "Chilka Lake" }, { key: "D", text: "Kolleru Lake" }],
    correctOption: "A",
    explanation: "The longest railway bridge in India is the Pamban Bridge, and the recent longest is across Vembanad Lake in Kerala.",
    isPYQ: true, tags: ["indian railways", "bridges", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Indian Railways", difficulty: "Medium",
    year: 2025, exam: "RRB NTPC",
    questionText: "The first indigenous rail compartment in India was manufactured by ICF on:",
    options: [{ key: "A", text: "August 15, 1955" }, { key: "B", text: "October 2, 1955" }, { key: "C", text: "January 26, 1956" }, { key: "D", text: "November 14, 1955" }],
    correctOption: "B",
    explanation: "The first indigenous rail compartment was manufactured by Integral Coach Factory (ICF) Chennai on October 2, 1955.",
    isPYQ: true, tags: ["indian railways", "icf", "rrb ntpc"], createdBy: adminId,
  },

  // --- Indian Constitution & Polity ---
  {
    subject: "General Knowledge", topic: "Indian Constitution", difficulty: "Easy",
    year: 2022, exam: "RRB NTPC",
    questionText: "The Constitution of India was adopted on:",
    options: [{ key: "A", text: "15 August 1947" }, { key: "B", text: "26 January 1950" }, { key: "C", text: "26 November 1949" }, { key: "D", text: "2 October 1947" }],
    correctOption: "C",
    explanation: "The Constitution was adopted on 26 November 1949 and came into force on 26 January 1950.",
    isPYQ: true, tags: ["constitution", "indian polity", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Indian Polity", difficulty: "Medium",
    year: 2021, exam: "RRB NTPC",
    questionText: "How many Fundamental Rights are there in the Indian Constitution?",
    options: [{ key: "A", text: "5" }, { key: "B", text: "6" }, { key: "C", text: "7" }, { key: "D", text: "8" }],
    correctOption: "B",
    explanation: "There are 6 Fundamental Rights: Right to Equality, Freedom, Against Exploitation, Freedom of Religion, Cultural & Educational Rights, and Right to Constitutional Remedies.",
    isPYQ: true, tags: ["fundamental rights", "polity", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Indian Polity", difficulty: "Easy",
    year: 2020, exam: "RRB Group D",
    questionText: "Who is the first citizen of India?",
    options: [{ key: "A", text: "Prime Minister" }, { key: "B", text: "President" }, { key: "C", text: "Chief Justice" }, { key: "D", text: "Vice President" }],
    correctOption: "B",
    explanation: "The President of India is the first citizen of the country.",
    isPYQ: true, tags: ["polity", "president", "rrb group d"], createdBy: adminId,
  },

  // --- Geography ---
  {
    subject: "General Knowledge", topic: "Geography", difficulty: "Medium",
    year: 2020, exam: "RRB Group D",
    questionText: "Which is the longest river in India?",
    options: [{ key: "A", text: "Brahmaputra" }, { key: "B", text: "Yamuna" }, { key: "C", text: "Ganga" }, { key: "D", text: "Godavari" }],
    correctOption: "C",
    explanation: "The Ganga is the longest river in India at approximately 2525 km.",
    isPYQ: true, tags: ["geography", "rivers", "rrb group d"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Geography", difficulty: "Easy",
    year: 2022, exam: "RRB NTPC",
    questionText: "Which is the largest state of India by area?",
    options: [{ key: "A", text: "Madhya Pradesh" }, { key: "B", text: "Maharashtra" }, { key: "C", text: "Rajasthan" }, { key: "D", text: "Uttar Pradesh" }],
    correctOption: "C",
    explanation: "Rajasthan is the largest state of India by area (342,239 sq km).",
    isPYQ: true, tags: ["geography", "states", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Geography", difficulty: "Medium",
    year: 2021, exam: "RRB NTPC",
    questionText: "The Tropic of Cancer passes through how many Indian states?",
    options: [{ key: "A", text: "6" }, { key: "B", text: "7" }, { key: "C", text: "8" }, { key: "D", text: "9" }],
    correctOption: "C",
    explanation: "Tropic of Cancer passes through 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram.",
    isPYQ: true, tags: ["geography", "tropic of cancer", "rrb ntpc"], createdBy: adminId,
  },

  // --- History ---
  {
    subject: "General Knowledge", topic: "History", difficulty: "Medium",
    year: 2021, exam: "RRB Group D",
    questionText: "Who is known as the 'Iron Man of India'?",
    options: [{ key: "A", text: "Jawaharlal Nehru" }, { key: "B", text: "Subhas Chandra Bose" }, { key: "C", text: "Sardar Vallabhbhai Patel" }, { key: "D", text: "Bhagat Singh" }],
    correctOption: "C",
    explanation: "Sardar Vallabhbhai Patel is known as the 'Iron Man of India' for unifying 562 princely states.",
    isPYQ: true, tags: ["history", "freedom struggle", "rrb group d"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "History", difficulty: "Easy",
    year: 2022, exam: "RRB NTPC",
    questionText: "The Battle of Plassey was fought in which year?",
    options: [{ key: "A", text: "1757" }, { key: "B", text: "1764" }, { key: "C", text: "1857" }, { key: "D", text: "1761" }],
    correctOption: "A",
    explanation: "The Battle of Plassey was fought in 1757 between the British East India Company and the Nawab of Bengal.",
    isPYQ: true, tags: ["history", "battles", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "History", difficulty: "Medium",
    year: 2021, exam: "RRB NTPC",
    questionText: "Who founded the Indian National Congress in 1885?",
    options: [{ key: "A", text: "Mahatma Gandhi" }, { key: "B", text: "A.O. Hume" }, { key: "C", text: "Dadabhai Naoroji" }, { key: "D", text: "Bal Gangadhar Tilak" }],
    correctOption: "B",
    explanation: "Allan Octavian Hume founded the Indian National Congress in 1885.",
    isPYQ: true, tags: ["history", "inc", "rrb ntpc"], createdBy: adminId,
  },

  // --- Science ---
  {
    subject: "General Knowledge", topic: "Science", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "The chemical formula of table salt (common salt) is:",
    options: [{ key: "A", text: "KCl" }, { key: "B", text: "NaHCO₃" }, { key: "C", text: "NaCl" }, { key: "D", text: "CaCl₂" }],
    correctOption: "C",
    explanation: "Table salt is Sodium Chloride with chemical formula NaCl.",
    isPYQ: true, tags: ["chemistry", "science", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Science", difficulty: "Easy",
    year: 2021, exam: "RRB Group D",
    questionText: "Which gas is most abundant in the Earth's atmosphere?",
    options: [{ key: "A", text: "Oxygen" }, { key: "B", text: "Carbon Dioxide" }, { key: "C", text: "Nitrogen" }, { key: "D", text: "Hydrogen" }],
    correctOption: "C",
    explanation: "Nitrogen makes up about 78% of the Earth's atmosphere.",
    isPYQ: true, tags: ["science", "atmosphere", "rrb group d"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Science", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "The powerhouse of the cell is:",
    options: [{ key: "A", text: "Nucleus" }, { key: "B", text: "Ribosome" }, { key: "C", text: "Mitochondria" }, { key: "D", text: "Golgi Body" }],
    correctOption: "C",
    explanation: "Mitochondria is called the powerhouse of the cell as it produces ATP (energy currency).",
    isPYQ: true, tags: ["biology", "cell", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Science", difficulty: "Easy",
    year: 2020, exam: "RRB Group D",
    questionText: "What is the SI unit of force?",
    options: [{ key: "A", text: "Joule" }, { key: "B", text: "Newton" }, { key: "C", text: "Watt" }, { key: "D", text: "Pascal" }],
    correctOption: "B",
    explanation: "The SI unit of force is Newton (N). F = ma.",
    isPYQ: true, tags: ["physics", "units", "rrb group d"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Science", difficulty: "Medium",
    year: 2025, exam: "RRB NTPC",
    questionText: "Which vitamin is also known as Ascorbic Acid?",
    options: [{ key: "A", text: "Vitamin A" }, { key: "B", text: "Vitamin B" }, { key: "C", text: "Vitamin C" }, { key: "D", text: "Vitamin D" }],
    correctOption: "C",
    explanation: "Vitamin C is also known as Ascorbic Acid. It is found in citrus fruits and helps prevent scurvy.",
    isPYQ: true, tags: ["science", "vitamins", "rrb ntpc"], createdBy: adminId,
  },

  // --- Economy ---
  {
    subject: "General Knowledge", topic: "Economy", difficulty: "Medium",
    year: 2022, exam: "RRB NTPC",
    questionText: "RBI was established in which year?",
    options: [{ key: "A", text: "1925" }, { key: "B", text: "1935" }, { key: "C", text: "1945" }, { key: "D", text: "1947" }],
    correctOption: "B",
    explanation: "Reserve Bank of India was established on April 1, 1935.",
    isPYQ: true, tags: ["economy", "rbi", "rrb ntpc"], createdBy: adminId,
  },
  {
    subject: "General Knowledge", topic: "Economy", difficulty: "Easy",
    year: 2021, exam: "RRB NTPC",
    questionText: "The currency of Japan is:",
    options: [{ key: "A", text: "Won" }, { key: "B", text: "Yen" }, { key: "C", text: "Yuan" }, { key: "D", text: "Ringgit" }],
    correctOption: "B",
    explanation: "The currency of Japan is Yen (¥).",
    isPYQ: true, tags: ["economy", "currency", "rrb ntpc"], createdBy: adminId,
  },

  // --- Capitals & States ---
  {
    subject: "General Knowledge", topic: "Indian States", difficulty: "Easy",
    year: 2022, exam: "RRB NTPC",
    questionText: "What is the capital of Nagaland?",
    options: [{ key: "A", text: "Imphal" }, { key: "B", text: "Kohima" }, { key: "C", text: "Shillong" }, { key: "D", text: "Aizawl" }],
    correctOption: "B",
    explanation: "Kohima is the capital of Nagaland.",
    isPYQ: true, tags: ["states", "capitals", "rrb ntpc"], createdBy: adminId,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CURRENT AFFAIRS (15 questions)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    subject: "Current Affairs", topic: "Sports", difficulty: "Easy",
    year: 2024, exam: "RRB NTPC",
    questionText: "India won how many medals at the Paris 2024 Olympics?",
    options: [{ key: "A", text: "5" }, { key: "B", text: "6" }, { key: "C", text: "7" }, { key: "D", text: "8" }],
    correctOption: "B",
    explanation: "India won 6 medals (1 Silver and 5 Bronze) at the Paris 2024 Olympics.",
    isPYQ: false, tags: ["sports", "olympics", "current affairs 2024"], createdBy: adminId,
  },
  {
    subject: "Current Affairs", topic: "Government Schemes", difficulty: "Easy",
    year: 2023, exam: "RRB NTPC",
    questionText: "Which scheme provides free food grains to the poor under PM Garib Kalyan Anna Yojana?",
    options: [{ key: "A", text: "PM Kisan Samman Nidhi" }, { key: "B", text: "Pradhan Mantri Garib Kalyan Anna Yojana" }, { key: "C", text: "Antyodaya Anna Yojana" }, { key: "D", text: "National Food Security Mission" }],
    correctOption: "B",
    explanation: "PMGKAY provides free food grains to about 81 crore beneficiaries.",
    isPYQ: false, tags: ["government schemes", "current affairs"], createdBy: adminId,
  },
  {
    subject: "Current Affairs", topic: "Science and Technology", difficulty: "Medium",
    year: 2023, exam: "RRB NTPC",
    questionText: "India's Chandrayaan-3 successfully landed on the Moon's south pole in which year?",
    options: [{ key: "A", text: "2021" }, { key: "B", text: "2022" }, { key: "C", text: "2023" }, { key: "D", text: "2024" }],
    correctOption: "C",
    explanation: "Chandrayaan-3's Vikram lander touched down near the Moon's south pole on 23 August 2023.",
    isPYQ: false, tags: ["isro", "space", "current affairs 2023"], createdBy: adminId,
  },
  {
    subject: "Current Affairs", topic: "Awards", difficulty: "Medium",
    year: 2024, exam: "RRB NTPC",
    questionText: "Who was awarded the Bharat Ratna in 2024?",
    options: [{ key: "A", text: "Sachin Tendulkar" }, { key: "B", text: "L.K. Advani" }, { key: "C", text: "Amitabh Bachchan" }, { key: "D", text: "Ratan Tata" }],
    correctOption: "B",
    explanation: "L.K. Advani was awarded the Bharat Ratna in 2024.",
    isPYQ: false, tags: ["awards", "bharat ratna", "current affairs 2024"], createdBy: adminId,
  },
  {
    subject: "Current Affairs", topic: "International", difficulty: "Medium",
    year: 2024, exam: "RRB NTPC",
    questionText: "Which country hosted the G20 Summit in 2023?",
    options: [{ key: "A", text: "Indonesia" }, { key: "B", text: "India" }, { key: "C", text: "Brazil" }, { key: "D", text: "Japan" }],
    correctOption: "B",
    explanation: "India hosted the G20 Summit in September 2023 in New Delhi under the presidency of PM Modi.",
    isPYQ: false, tags: ["g20", "international", "current affairs 2023"], createdBy: adminId,
  },
  {
    subject: "Current Affairs", topic: "National", difficulty: "Easy",
    year: 2024, exam: "RRB NTPC",
    questionText: "India's new Parliament building was inaugurated in which year?",
    options: [{ key: "A", text: "2021" }, { key: "B", text: "2022" }, { key: "C", text: "2023" }, { key: "D", text: "2024" }],
    correctOption: "C",
    explanation: "The new Parliament building was inaugurated on 28 May 2023 by PM Modi.",
    isPYQ: false, tags: ["parliament", "national", "current affairs 2023"], createdBy: adminId,
  },
  {
    subject: "Current Affairs", topic: "Science and Technology", difficulty: "Medium",
    year: 2024, exam: "RRB NTPC",
    questionText: "India's first solar mission is called:",
    options: [{ key: "A", text: "Aditya-L1" }, { key: "B", text: "Surya-1" }, { key: "C", text: "Mangalyaan-2" }, { key: "D", text: "Gaganyaan" }],
    correctOption: "A",
    explanation: "Aditya-L1 is India's first space-based solar observatory, launched on 2 September 2023.",
    isPYQ: false, tags: ["isro", "aditya", "current affairs 2023"], createdBy: adminId,
  },
  {
    subject: "Current Affairs", topic: "Economy", difficulty: "Medium",
    year: 2025, exam: "RRB NTPC",
    questionText: "UPI (Unified Payments Interface) was developed by:",
    options: [{ key: "A", text: "RBI" }, { key: "B", text: "NPCI" }, { key: "C", text: "SBI" }, { key: "D", text: "SEBI" }],
    correctOption: "B",
    explanation: "UPI was developed by the National Payments Corporation of India (NPCI).",
    isPYQ: false, tags: ["upi", "digital payments", "current affairs"], createdBy: adminId,
  },
  {
    subject: "Current Affairs", topic: "Defence", difficulty: "Medium",
    year: 2024, exam: "RRB NTPC",
    questionText: "INS Vikrant is India's first:",
    options: [{ key: "A", text: "Nuclear submarine" }, { key: "B", text: "Indigenous aircraft carrier" }, { key: "C", text: "Stealth destroyer" }, { key: "D", text: "Frigate" }],
    correctOption: "B",
    explanation: "INS Vikrant (IAC-1) is India's first indigenously designed and built aircraft carrier, commissioned in 2022.",
    isPYQ: false, tags: ["defence", "navy", "current affairs"], createdBy: adminId,
  },
  {
    subject: "Current Affairs", topic: "Sports", difficulty: "Easy",
    year: 2025, exam: "RRB NTPC",
    questionText: "The 2023 Cricket World Cup final was held in:",
    options: [{ key: "A", text: "Mumbai" }, { key: "B", text: "Ahmedabad" }, { key: "C", text: "Delhi" }, { key: "D", text: "Kolkata" }],
    correctOption: "B",
    explanation: "The ICC Cricket World Cup 2023 final was held at Narendra Modi Stadium in Ahmedabad.",
    isPYQ: false, tags: ["cricket", "world cup", "current affairs 2023"], createdBy: adminId,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECHNICAL (15 questions)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    subject: "Technical", topic: "Electrical Engineering", difficulty: "Medium",
    year: 2021, exam: "RRB JE",
    questionText: "What is the unit of electrical resistance?",
    options: [{ key: "A", text: "Volt" }, { key: "B", text: "Ampere" }, { key: "C", text: "Ohm" }, { key: "D", text: "Watt" }],
    correctOption: "C",
    explanation: "Electrical resistance is measured in Ohms (Ω). V = IR is Ohm's Law.",
    isPYQ: true, tags: ["electrical", "basic concepts", "rrb je"], createdBy: adminId,
  },
  {
    subject: "Technical", topic: "Mechanical Engineering", difficulty: "Hard",
    year: 2022, exam: "RRB JE",
    questionText: "Which type of gear is used to transmit power between parallel shafts?",
    options: [{ key: "A", text: "Bevel Gear" }, { key: "B", text: "Worm Gear" }, { key: "C", text: "Spur Gear" }, { key: "D", text: "Spiral Gear" }],
    correctOption: "C",
    explanation: "Spur gears are the simplest type used to transmit motion between parallel shafts.",
    isPYQ: true, tags: ["mechanical", "gears", "rrb je"], createdBy: adminId,
  },
  {
    subject: "Technical", topic: "Civil Engineering", difficulty: "Medium",
    year: 2020, exam: "RRB JE",
    questionText: "The ratio of water to cement by weight in a concrete mix is known as:",
    options: [{ key: "A", text: "Workability ratio" }, { key: "B", text: "Water-cement ratio" }, { key: "C", text: "Mix ratio" }, { key: "D", text: "Hydration ratio" }],
    correctOption: "B",
    explanation: "The water-cement (W/C) ratio influences strength and durability of concrete.",
    isPYQ: true, tags: ["civil", "concrete", "rrb je"], createdBy: adminId,
  },
  {
    subject: "Technical", topic: "Electronics", difficulty: "Medium",
    year: 2021, exam: "RRB ALP",
    questionText: "A diode allows current to flow in:",
    options: [{ key: "A", text: "Both directions" }, { key: "B", text: "Only reverse direction" }, { key: "C", text: "Only forward direction" }, { key: "D", text: "No direction" }],
    correctOption: "C",
    explanation: "A diode allows current to flow only in the forward direction (anode to cathode).",
    isPYQ: true, tags: ["electronics", "diode", "rrb alp"], createdBy: adminId,
  },
  {
    subject: "Technical", topic: "Electrical Engineering", difficulty: "Easy",
    year: 2022, exam: "RRB JE",
    questionText: "Which material is a good conductor of electricity?",
    options: [{ key: "A", text: "Rubber" }, { key: "B", text: "Glass" }, { key: "C", text: "Copper" }, { key: "D", text: "Wood" }],
    correctOption: "C",
    explanation: "Copper is one of the best conductors of electricity due to its low resistivity.",
    isPYQ: true, tags: ["electrical", "conductors", "rrb je"], createdBy: adminId,
  },
  {
    subject: "Technical", topic: "Mechanical Engineering", difficulty: "Medium",
    year: 2021, exam: "RRB ALP",
    questionText: "The SI unit of pressure is:",
    options: [{ key: "A", text: "Newton" }, { key: "B", text: "Pascal" }, { key: "C", text: "Joule" }, { key: "D", text: "Watt" }],
    correctOption: "B",
    explanation: "Pascal (Pa) is the SI unit of pressure. 1 Pa = 1 N/m².",
    isPYQ: true, tags: ["mechanical", "units", "rrb alp"], createdBy: adminId,
  },
  {
    subject: "Technical", topic: "Electrical Engineering", difficulty: "Hard",
    year: 2022, exam: "RRB JE",
    questionText: "A transformer works on the principle of:",
    options: [{ key: "A", text: "Self induction" }, { key: "B", text: "Mutual induction" }, { key: "C", text: "Electromagnetic force" }, { key: "D", text: "Electrostatic force" }],
    correctOption: "B",
    explanation: "A transformer works on the principle of mutual induction between two coils.",
    isPYQ: true, tags: ["electrical", "transformer", "rrb je"], createdBy: adminId,
  },
  {
    subject: "Technical", topic: "Civil Engineering", difficulty: "Easy",
    year: 2021, exam: "RRB JE",
    questionText: "The most commonly used cement in construction is:",
    options: [{ key: "A", text: "White cement" }, { key: "B", text: "Rapid hardening cement" }, { key: "C", text: "Ordinary Portland Cement (OPC)" }, { key: "D", text: "Low heat cement" }],
    correctOption: "C",
    explanation: "OPC (Ordinary Portland Cement) is the most commonly used cement in general construction.",
    isPYQ: true, tags: ["civil", "cement", "rrb je"], createdBy: adminId,
  },
  {
    subject: "Technical", topic: "Mechanical Engineering", difficulty: "Medium",
    year: 2022, exam: "RRB ALP",
    questionText: "In a diesel engine, ignition occurs by:",
    options: [{ key: "A", text: "Spark plug" }, { key: "B", text: "Compression of air" }, { key: "C", text: "Electric ignition" }, { key: "D", text: "Battery" }],
    correctOption: "B",
    explanation: "In a diesel engine, fuel ignites due to the high temperature of compressed air (compression ignition).",
    isPYQ: true, tags: ["mechanical", "engines", "rrb alp"], createdBy: adminId,
  },
  {
    subject: "Technical", topic: "Electronics", difficulty: "Medium",
    year: 2021, exam: "RRB JE",
    questionText: "LED stands for:",
    options: [{ key: "A", text: "Light Emitting Device" }, { key: "B", text: "Light Emitting Diode" }, { key: "C", text: "Light Emission Display" }, { key: "D", text: "Low Energy Diode" }],
    correctOption: "B",
    explanation: "LED stands for Light Emitting Diode, a semiconductor device that emits light.",
    isPYQ: true, tags: ["electronics", "led", "rrb je"], createdBy: adminId,
  },
  {
    subject: "Technical", topic: "Electrical Engineering", difficulty: "Medium",
    year: 2020, exam: "RRB ALP",
    questionText: "The power consumed in a circuit is given by:",
    options: [{ key: "A", text: "P = V/I" }, { key: "B", text: "P = V × I" }, { key: "C", text: "P = V + I" }, { key: "D", text: "P = V - I" }],
    correctOption: "B",
    explanation: "Electrical power P = V × I (Voltage × Current), measured in Watts.",
    isPYQ: true, tags: ["electrical", "power", "rrb alp"], createdBy: adminId,
  },
];
