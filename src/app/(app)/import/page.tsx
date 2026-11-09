"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2, FileSpreadsheet, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-parts";
import { useWealthOs } from "@/stores/wealthos-store";
import { EXPENSE_CATEGORIES } from "@/lib/constants";
import { CARD, PAGE_ROOT, STOCK_CARD } from "@/lib/page-layout";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
// Session-215 (R-12, F-215a — the live-seam convergence): the page’s
// inline parser copy (pre-214 bare-quote defect, no BOM strip) is
// RETIRED — the shared, unit-tested seam owns the machine (the BOM
// strip + the RFC 4180 §2.7 bare-quote rule go live on this surface).
import { parseCsv } from "@/lib/csv";


interface ParsedRow {
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  budgetCategory: string;
  date: string;
}

const HEADER_HINTS = {
  description: ["description", "name", "memo", "payee", "details", "narrative"],
  amount: ["amount", "value", "total", "price"],
  date: ["date", "posted", "transaction date", "time"],
  category: ["category", "type", "bucket"],
};

function findColumn(headers: string[], hints: string[]): number {
  return headers.findIndex((h) => hints.includes(h.trim().toLowerCase()));
}

function inferBudgetCategory(category: string): string {
  const match = EXPENSE_CATEGORIES.find(
    (c) => c.label.toLowerCase() === category.trim().toLowerCase(),
  );
  return match?.budgetCategory ?? "wants";
}

const MAX_FILE_BYTES = 10 * 1024 * 1024; // the reference's 10MB cap

export default function ImportPage() {
  const store = useWealthOs();
  const [file, setFile] = React.useState<File | null>(null);
  const [rows, setRows] = React.useState<ParsedRow[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const pickFile = (f: File | null) => {
    setError(null);
    setRows(null);
    setFile(f);
    void extract(f);
  };

  const extract = async (f: File | null) => {
    if (!f) return;
    if (f.size > MAX_FILE_BYTES) {
      setError("File exceeds the 10MB limit.");
      return;
    }
    // Session-215 (R-12, F-215f — the honest non-CSV branch): the accept
    // list + hint stay byte-identical to the reference (parity surfaces —
    // its bundle ships no spreadsheet library either; the advertising is
    // its own). But a binary .xls/.xlsx pick no longer decodes to garbage
    // and dies in column detection — it gets the honest guidance now.
    if (/\.xlsx?$/i.test(f.name) && f.type !== "text/csv") {
      setError("XLS/XLSX isn’t supported yet — export your spreadsheet as CSV and re-upload.");
      return;
    }
    try {
      const text = await f.text();
      const table = parseCsv(text);
      if (table.length < 2) {
        setError("The file has no data rows.");
        return;
      }
      const headers = table[0];
      const descCol = findColumn(headers, HEADER_HINTS.description);
      const amountCol = findColumn(headers, HEADER_HINTS.amount);
      const dateCol = findColumn(headers, HEADER_HINTS.date);
      const catCol = findColumn(headers, HEADER_HINTS.category);
      if (descCol === -1 || amountCol === -1 || dateCol === -1) {
        setError(
          "Could not detect the required columns — the file needs Description, Amount and Date columns.",
        );
        return;
      }
      const parsed: ParsedRow[] = [];
      for (const line of table.slice(1, 5001)) {
        const description = (line[descCol] ?? "").trim();
        const rawAmount = Number((line[amountCol] ?? "").replace(/[$,]/g, ""));
        const rawDate = (line[dateCol] ?? "").trim();
        const parsedDate = new Date(rawDate);
        if (!description || !Number.isFinite(rawAmount) || rawAmount === 0) continue;
        if (Number.isNaN(parsedDate.getTime())) continue;
        const type = rawAmount < 0 ? "expense" : "income";
        const category =
          catCol >= 0 && (line[catCol] ?? "").trim()
            ? (line[catCol] ?? "").trim()
            : "Other";
        parsed.push({
          description: description.slice(0, 200),
          amount: Math.abs(rawAmount),
          type,
          category: category.slice(0, 80),
          budgetCategory: inferBudgetCategory(category),
          date: parsedDate.toISOString(),
        });
      }
      if (parsed.length === 0) {
        setError("No valid transaction rows found.");
        return;
      }
      setRows(parsed);
    } catch {
      setError("Could not read the file — is it valid CSV?");
    }
  };

  const commit = async () => {
    if (!rows || busy) return;
    setBusy(true);
    const res = await store.importTransactions(rows);
    setBusy(false);
    if (res.ok) {
      toast.success(`Imported ${res.data.imported} transactions`);
      setFile(null);
      setRows(null);
      if (inputRef.current) inputRef.current.value = "";
    } else {
      toast.error("Import failed", res.error);
    }
  };

  return (
    <div className={PAGE_ROOT.navy}>
      <div className={PAGE_ROOT.containerMid}>
        <PageHeader
        tone="navy"
          title="Import Transactions"
          subtitle="Upload a CSV from your bank to quickly add expenses."
        />

        {/* Step 1: upload */}
        <section className={cn(STOCK_CARD, CARD.padding)} aria-label="Step 1: Upload File">
          <h2 className={cn(CARD.title, "mb-1")}>Step 1: Upload File</h2>
          {/* A LABEL (not role=button): the click forwards to the input
              natively and no interactive element nests inside another. */}
          <label
            className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50/50 px-6 py-12 text-center transition-colors hover:border-amber-400 hover:bg-amber-50/30 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/40 dark:border-stone-700 dark:bg-stone-800/30 dark:hover:border-amber-500/50"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-500/10">
              <Upload className="h-7 w-7 text-amber-500" />
            </span>
            <div>
              <p className="font-medium text-stone-900 dark:text-stone-100">
                {file ? file.name : "Upload a file"}
              </p>
              <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-500">
                CSV, XLS, XLSX up to 10MB
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept=".csv,.xls,.xlsx"
              className="sr-only"
              aria-label="Upload a CSV file"
              onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
            />
          </label>
          {error ? (
            <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
              {error}
            </p>
          ) : null}
          <div className="mt-4 flex justify-end">
            <Button onClick={() => void extract(file)} disabled={!file || busy}>
              <FileSpreadsheet className="h-4 w-4" />
              Upload and Extract
            </Button>
          </div>
        </section>

        {/* Step 2: preview */}
        {rows ? (
          <section className={cn(STOCK_CARD, CARD.padding)} aria-label="Step 2: Review">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className={CARD.title}>Step 2: Review & Import</h2>
                <p className={CARD.subtitle}>
                  {rows.length} transaction{rows.length === 1 ? "" : "s"} detected — sign and
                  categories inferred.
                </p>
              </div>
              <Button
                variant="ghost"
                className="text-xs text-stone-500"
                onClick={() => {
                  setRows(null);
                  setFile(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
              >
                <X className="h-3.5 w-3.5" />
                Discard
              </Button>
            </div>
            <div className="max-h-80 overflow-auto rounded-lg border border-stone-200 scrollbar-thin dark:border-stone-800">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="sticky top-0 bg-stone-50 dark:bg-stone-800">
                  <tr className="text-left text-xs uppercase tracking-wide text-stone-500 dark:text-stone-500">
                    <th className="p-2.5 font-semibold">Date</th>
                    <th className="p-2.5 font-semibold">Description</th>
                    <th className="p-2.5 font-semibold">Category</th>
                    <th className="p-2.5 text-right font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200/70 bg-white dark:divide-stone-800 dark:bg-stone-900">
                  {rows.slice(0, 50).map((row, i) => (
                    <tr key={i}>
                      <td className="p-2.5 text-stone-600 dark:text-stone-500">
                        {new Date(row.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "2-digit",
                        })}
                      </td>
                      <td className="p-2.5 font-medium text-stone-900 dark:text-stone-100">
                        {row.description}
                      </td>
                      <td className="p-2.5 text-stone-600 dark:text-stone-500">{row.category}</td>
                      <td
                        className={cn(
                          "p-2.5 text-right font-semibold",
                          row.type === "income" ? "text-emerald-600" : "text-stone-900 dark:text-stone-100",
                        )}
                      >
                        {row.type === "income" ? "+" : "−"}$
                        {row.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {rows.length > 50 ? (
              <p className="mt-2 text-xs text-stone-500">
                Showing the first 50 of {rows.length} rows — all will be imported.
              </p>
            ) : null}
            <div className="mt-4 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                Importing adds to your existing records — nothing is overwritten.
              </p>
              <Button onClick={() => void commit()} disabled={busy}>
                Import {rows.length} Transactions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
