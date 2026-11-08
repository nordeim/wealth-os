// DB census: prints the resolved database path + per-model counts, and
// compares them against the seed contract.
//
// Why this exists (session-53, S53-P2 — the N-53b lesson):
//   • a raw `new PrismaClient()` run from the repo root opens
//     <sandbox-root>/db/custom.db — NOT <repo>/db/custom.db — under BOTH
//     node and bun. Censuses go through the app's own client (src/lib/db,
//     re-anchored by runtimeDatabaseUrl) and PRINT the resolved URL, so
//     every count is bound to a named file. A count without its path is
//     not evidence.
// The expected counts are the prisma/seed.ts row counts; a mismatch is
// probe residue unless you deliberately added data (reseed with
// `bun run db:seed` to restore the contract).
//
// Run: bun run db:census   (or: bun scripts/census.ts)

import { db } from "../src/lib/db";
import { runtimeDatabaseUrl } from "../src/lib/db-path";

// The seed contract — prisma/seed.ts's row counts (transactions /
// incomeSources / bankAccounts / investments / goals / budgets + users).
// Keep in sync with the seed.
const EXPECTED = {
  transactions: 151,
  incomeSources: 4,
  bankAccounts: 3,
  investments: 6,
  goals: 5,
  budgets: 7,
  users: 1,
} as const;

type Counts = Record<keyof typeof EXPECTED, number>;

async function main(): Promise<void> {
  const url = runtimeDatabaseUrl();
  const [
    transactions,
    incomeSources,
    bankAccounts,
    investments,
    goals,
    budgets,
    users,
  ] = await Promise.all([
    db.transaction.count(),
    db.incomeSource.count(),
    db.bankAccount.count(),
    db.investment.count(),
    db.goal.count(),
    db.budget.count(),
    db.user.count(),
  ]);
  const counts: Counts = {
    transactions,
    incomeSources,
    bankAccounts,
    investments,
    goals,
    budgets,
    users,
  };

  console.log(`database: ${url}`);
  console.log(
    `counts: transactions=${transactions} incomeSources=${incomeSources} ` +
      `bankAccounts=${bankAccounts} investments=${investments} goals=${goals} ` +
      `budgets=${budgets} users=${users}`,
  );

  let mismatch = false;
  for (const [model, expected] of Object.entries(EXPECTED) as Array<
    [keyof typeof EXPECTED, number]
  >) {
    const actual = counts[model];
    if (actual !== expected) {
      console.error(`MISMATCH: ${model} expected ${expected}, found ${actual}`);
      mismatch = true;
    }
  }
  if (mismatch) {
    console.error(
      "Seed contract broken — reseed with `bun run db:seed` (idempotent) or update EXPECTED.",
    );
    process.exit(1);
  }
  console.log("census: MATCH");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void db.$disconnect();
  });
