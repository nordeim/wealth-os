// Session-199: the reference's CAPITALIZED route alias — its sidebar links
// point at /Import (byte-extracted from its live DOM) while the canonical
// folder is lowercase. A .jsx re-export (NOT .tsx): TypeScript's TS1149
// fires when one program includes two real files whose paths differ only
// in casing; the extension keeps the alias out of that collision (the
// session-24 lesson, reused for every WealthOS section).
import ImportPage from "../import/page";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ page: "Import", route: "/Import" });

export default function ImportCapitalRoute() {
  return <ImportPage />;
}
