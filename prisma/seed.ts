// Seed: WealthOS demo workspace.
// Idempotent: clears domain tables, then inserts the canonical demo data.
// Run: bun prisma/seed.ts  (or: bun run db:seed)
//
// Demo login (mirrors the reference app): sepnetflix2023@outlook.com / $Abcd1234

import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";
import { runtimeDatabaseUrl } from "../src/lib/db-path";
// The PURE crypto seam — node:crypto-only, shared with src/lib/auth.ts.
import { hashPassword } from "../src/lib/password";

// R-9 (session 213): the prisma 7 constructor — the driver adapter carries
// the URL (the v6 datasource-URL option is gone). PrismaLibSql because
// bun hard-blocks better-sqlite3 (oven-sh/bun#4290) and this seed runs
// under bun. The URL itself still comes from the shared resolver, which
// pins every consumer to <repo>/db/<name> (see src/lib/db-path.ts) —
// never let the adapter (or bun's .env absolutization) pick the database
// location.
const db = new PrismaClient({
  adapter: new PrismaLibSql({ url: runtimeDatabaseUrl() }),
});

function dayOffset(offsetDays: number): Date {
  const x = new Date();
  x.setDate(x.getDate() + offsetDays);
  x.setHours(12, 0, 0, 0);
  return x;
}

async function main() {
  // Idempotency: wipe domain data, keep schema. Users land through
  // UPSERT-BY-EMAIL (stable ids — the session-cookie's provenance; see
  // the session-162 contract in git history).
  await db.transaction.deleteMany();
  await db.incomeSource.deleteMany();
  await db.bankAccount.deleteMany();
  await db.investment.deleteMany();
  await db.goal.deleteMany();
  await db.budget.deleteMany();
  await db.setting.deleteMany();

  const demo = await db.user.upsert({
    where: { email: "sepnetflix2023@outlook.com" },
    update: {
      name: "sepnetflix2023",
      passwordHash: hashPassword("$Abcd1234"),
      avatarColor: "#fbbf24", // amber — the WealthOS brand avatar
      role: "user",
      photoUrl: null,
      verificationCodeHash: null,
      verificationAttempts: 0,
      verificationExpiresAt: null,
      resetToken: null,
      resetTokenExpiresAt: null,
    },
    create: {
      email: "sepnetflix2023@outlook.com",
      name: "sepnetflix2023",
      passwordHash: hashPassword("$Abcd1234"),
      avatarColor: "#fbbf24",
      role: "user",
    },
  });

  // ---- settings singleton ---------------------------------------------------
  await db.setting.create({
    data: {
      id: "singleton",
      defaultCurrency: "USD",
      dateFormat: "MM/dd/yyyy",
      pushNotifications: false,
      emailAlerts: false,
      budgetWarnings: true,
      monthlyReports: false,
      theme: "light",
    },
  });

  // ---- bank accounts ----------------------------------------------------------
  const checking = await db.bankAccount.create({
    data: {
      name: "Everyday Checking",
      type: "checking",
      institution: "Chase Bank",
      balance: 4820.55,
      currency: "USD",
      color: "#3b82f6",
      ownerId: demo.id,
    },
  });
  await db.bankAccount.create({
    data: {
      name: "High-Yield Savings",
      type: "savings",
      institution: "Ally Bank",
      balance: 15600.0,
      currency: "USD",
      color: "#10b981",
      ownerId: demo.id,
    },
  });
  await db.bankAccount.create({
    data: {
      name: "Sapphire Credit Card",
      type: "credit",
      institution: "Chase Bank",
      balance: -1284.32,
      currency: "USD",
      color: "#f43f5e",
      ownerId: demo.id,
    },
  });

  // ---- income sources ---------------------------------------------------------
  await db.incomeSource.createMany({
    data: [
      {
        name: "Software Engineering Salary",
        type: "salary",
        amount: 7800,
        frequency: "monthly",
        active: true,
        nextPaymentDate: dayOffset(6),
        ownerId: demo.id,
      },
      {
        name: "Freelance Web Design",
        type: "freelance",
        amount: 1200,
        frequency: "monthly",
        active: true,
        nextPaymentDate: dayOffset(12),
        ownerId: demo.id,
      },
      {
        name: "Dividend Portfolio",
        type: "investment",
        amount: 180,
        frequency: "quarterly",
        active: true,
        nextPaymentDate: dayOffset(21),
        ownerId: demo.id,
      },
      {
        name: "Rental Unit 4B",
        type: "rental",
        amount: 1450,
        frequency: "monthly",
        active: false,
        notes: "Paused — unit under renovation",
        ownerId: demo.id,
      },
    ],
  });

  // ---- transactions (6 months of realistic activity) --------------------------
  // The generator keeps every amount deterministic (no Math.random — the
  // suite must be able to assert against the seeded sums).
  const expensePlan: Array<{
    description: string;
    category: string;
    budgetCategory: "needs" | "wants" | "savings";
    amount: number;
    dayOfMonth: number;
    recurring: boolean;
  }> = [
    { description: "Apartment Rent", category: "Rent/Mortgage", budgetCategory: "needs", amount: 2150, dayOfMonth: 1, recurring: true },
    { description: "Whole Foods Run", category: "Groceries", budgetCategory: "needs", amount: 142.67, dayOfMonth: 4, recurring: false },
    { description: "Trader Joe's", category: "Groceries", budgetCategory: "needs", amount: 88.14, dayOfMonth: 12, recurring: false },
    { description: "Con Edison Bill", category: "Utilities", budgetCategory: "needs", amount: 96.4, dayOfMonth: 8, recurring: true },
    { description: "Verizon Fios", category: "Utilities", budgetCategory: "needs", amount: 64.99, dayOfMonth: 9, recurring: true },
    { description: "Metro Card", category: "Transportation", budgetCategory: "needs", amount: 127, dayOfMonth: 3, recurring: true },
    { description: "Gas Fill-up", category: "Transportation", budgetCategory: "needs", amount: 52.3, dayOfMonth: 17, recurring: false },
    { description: "Pharmacy", category: "Healthcare", budgetCategory: "needs", amount: 34.56, dayOfMonth: 14, recurring: false },
    { description: "Dental Checkup", category: "Healthcare", budgetCategory: "needs", amount: 120, dayOfMonth: 20, recurring: false },
    { description: "Netflix + Spotify", category: "Entertainment", budgetCategory: "wants", amount: 32.97, dayOfMonth: 5, recurring: true },
    { description: "Dinner at Lucia", category: "Dining Out", budgetCategory: "wants", amount: 76.5, dayOfMonth: 15, recurring: false },
    { description: "Coffee — Blue Bottle", category: "Dining Out", budgetCategory: "wants", amount: 18.75, dayOfMonth: 6, recurring: false },
    { description: "Cinema Tickets", category: "Entertainment", budgetCategory: "wants", amount: 42, dayOfMonth: 22, recurring: false },
    { description: "Gym Membership", category: "Healthcare", budgetCategory: "wants", amount: 49, dayOfMonth: 2, recurring: true },
    { description: "Weekend Trip", category: "Travel", budgetCategory: "wants", amount: 320, dayOfMonth: 26, recurring: false },
    { description: "Clothing — Uniqlo", category: "Shopping", budgetCategory: "wants", amount: 95.4, dayOfMonth: 19, recurring: false },
  ];

  const incomePlan: Array<{
    description: string;
    category: string;
    amount: number;
    dayOfMonth: number;
  }> = [
    { description: "Salary Deposit", category: "Salary", amount: 7800, dayOfMonth: 1 },
    { description: "Freelance Invoice #1042", category: "Freelance", amount: 850, dayOfMonth: 18 },
  ];

  const txs: Array<{
    description: string;
    amount: number;
    type: string;
    category: string;
    budgetCategory: string;
    date: Date;
    recurring: boolean;
    nextDate?: Date;
    accountId?: string;
    ownerId: string;
  }> = [];

  const now = new Date();
  for (let monthsAgo = 5; monthsAgo >= 0; monthsAgo--) {
    const base = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
    const daysInMonth = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
    for (const e of expensePlan) {
      // skip occasional rows in some months (deterministic by month parity)
      const occasional = ["Dinner at Lucia", "Weekend Trip", "Dental Checkup", "Clothing — Uniqlo", "Cinema Tickets", "Gas Fill-up"];
      if (occasional.includes(e.description) && (monthsAgo + e.dayOfMonth) % 3 !== 0) continue;
      const day = Math.min(e.dayOfMonth, daysInMonth);
      const date = new Date(base.getFullYear(), base.getMonth(), day, 12, 0, 0, 0);
      if (date > now) continue; // never seed the future
      // gentle month-over-month drift, deterministic
      const drift = 1 + ((monthsAgo * 7 + e.dayOfMonth) % 9 - 4) / 100;
      txs.push({
        description: e.description,
        amount: Math.round(e.amount * drift * 100) / 100,
        type: "expense",
        category: e.category,
        budgetCategory: e.budgetCategory,
        date,
        recurring: e.recurring,
        nextDate: e.recurring ? new Date(base.getFullYear(), base.getMonth() + 1, Math.min(e.dayOfMonth, 28), 12, 0, 0, 0) : undefined,
        accountId: checking.id,
        ownerId: demo.id,
      });
    }
    for (const inc of incomePlan) {
      if (inc.description.startsWith("Freelance") && monthsAgo % 2 === 1) continue;
      const day = Math.min(inc.dayOfMonth, daysInMonth);
      const date = new Date(base.getFullYear(), base.getMonth(), day, 12, 0, 0, 0);
      if (date > now) continue;
      txs.push({
        description: inc.description,
        amount: inc.amount,
        type: "income",
        category: inc.category,
        budgetCategory: "savings",
        date,
        recurring: inc.description.startsWith("Salary"),
        accountId: checking.id,
        ownerId: demo.id,
      });
    }
  }
  await db.transaction.createMany({ data: txs });

  // ---- budgets (the reference's Budget vs Actual categories) ------------------
  await db.budget.createMany({
    data: [
      { category: "Groceries", amount: 550, period: "monthly" },
      { category: "Utilities", amount: 180, period: "monthly" },
      { category: "Transportation", amount: 220, period: "monthly" },
      { category: "Dining Out", amount: 250, period: "monthly" },
      { category: "Entertainment", amount: 150, period: "monthly" },
      { category: "Healthcare", amount: 200, period: "monthly" },
      { category: "Shopping", amount: 180, period: "monthly" },
    ],
  });

  // ---- investments ------------------------------------------------------------
  await db.investment.createMany({
    data: [
      { symbol: "VTI", name: "Vanguard Total Stock Market ETF", type: "etf", shares: 42, avgCost: 232.1, currentValue: 251.84, purchaseDate: dayOffset(-540), ownerId: demo.id },
      { symbol: "AAPL", name: "Apple Inc.", type: "stock", shares: 18, avgCost: 172.35, currentValue: 228.16, purchaseDate: dayOffset(-420), ownerId: demo.id },
      { symbol: "MSFT", name: "Microsoft Corporation", type: "stock", shares: 10, avgCost: 374.5, currentValue: 415.2, purchaseDate: dayOffset(-380), ownerId: demo.id },
      { symbol: "BND", name: "Vanguard Total Bond Market ETF", type: "bond", shares: 30, avgCost: 72.4, currentValue: 71.13, purchaseDate: dayOffset(-300), ownerId: demo.id },
      { symbol: "BTC", name: "Bitcoin", type: "crypto", shares: 0.35, avgCost: 41200, currentValue: 67850, purchaseDate: dayOffset(-720), notes: "Cold wallet", ownerId: demo.id },
      { symbol: "O", name: "Realty Income Corp", type: "realestate", shares: 25, avgCost: 55.2, currentValue: 57.89, purchaseDate: dayOffset(-260), ownerId: demo.id },
    ],
  });

  // ---- goals --------------------------------------------------------------------
  await db.goal.createMany({
    data: [
      { name: "Emergency Fund", targetAmount: 20000, currentAmount: 15600, targetDate: dayOffset(150), category: "emergency", status: "active", icon: "shield", ownerId: demo.id },
      { name: "Japan Trip 2027", targetAmount: 8000, currentAmount: 2350, targetDate: dayOffset(300), category: "vacation", status: "active", icon: "plane", ownerId: demo.id },
      { name: "New MacBook Pro", targetAmount: 3200, currentAmount: 2800, targetDate: dayOffset(45), category: "other", status: "active", icon: "laptop", ownerId: demo.id },
      { name: "House Down Payment", targetAmount: 90000, currentAmount: 31000, targetDate: dayOffset(900), category: "house", status: "active", icon: "home", ownerId: demo.id },
      { name: "Retirement Bridge", targetAmount: 50000, currentAmount: 50000, targetDate: dayOffset(-10), category: "retirement", status: "completed", icon: "palm", ownerId: demo.id },
    ],
  });

  const counts = {
    transactions: txs.length,
    incomeSources: 4,
    bankAccounts: 3,
    investments: 6,
    goals: 5,
    budgets: 7,
  };
  console.log("Seeded WealthOS demo workspace:", counts);
  console.log("Demo login: sepnetflix2023@outlook.com / $Abcd1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
