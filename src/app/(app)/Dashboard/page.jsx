// Session-199: the reference's CAPITALIZED dashboard route — its sidebar's
// Dashboard link points at /Dashboard (byte-extracted from its live DOM)
// while the canonical source is (app)/dashboard/page.tsx. A .jsx re-export
// (NOT .tsx): TypeScript's TS1149 fires when one program includes two
// real files whose paths differ only in casing; the extension keeps the
// alias out of that collision (the session-24 lesson).
import DashboardPage from "../dashboard/page";

export default function DashboardCapitalRoute() {
  return <DashboardPage />;
}
