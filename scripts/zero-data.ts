// Session-91 genus, session-199 domain, session-205 (R-4.2) scope note:
// put the dev database into the ZERO-DATA state for the sweep's
// screenshot diffs. In the CRM era this mirrored the NEO-CRM reference's
// own empty demo workspace (apples-to-apples). The WealthOS reference
// carries a demo corpus instead — the R-4.2 derivation kept the
// zero-data state anyway, as the STABILITY call: our empty states are
// deterministic (nothing rolls), while a seeded our-side would drift
// its own baseline with the calendar; the residual data-vs-empty genus
// (our empty-state rows vs the reference's data rows) is measured and
// baked into the STANDING_BASELINES class tables. Keeps users + the
// Setting singleton (auth + the settings surface must stay functional);
// clears the six domain tables. Restore with `bun run db:seed`
// (idempotent wipe+recreate).
//
// Run: env -u DATABASE_URL bun scripts/zero-data.ts

import { db } from "../src/lib/db";
import { runtimeDatabaseUrl } from "../src/lib/db-path";

async function main() {
  console.log("database:", runtimeDatabaseUrl());
  const r1 = await db.transaction.deleteMany();
  const r2 = await db.incomeSource.deleteMany();
  const r3 = await db.bankAccount.deleteMany();
  const r4 = await db.investment.deleteMany();
  const r5 = await db.goal.deleteMany();
  const r6 = await db.budget.deleteMany();
  console.log(
    `cleared: transaction=${r1.count} incomeSource=${r2.count} bankAccount=${r3.count} ` +
      `investment=${r4.count} goal=${r5.count} budget=${r6.count}`,
  );
  const users = await db.user.count();
  const settings = await db.setting.count();
  console.log(`kept: users=${users} setting=${settings}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void db.$disconnect();
  });
