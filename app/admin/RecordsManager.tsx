"use client";

import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type Field = {
  type: "text" | "longtext" | "int" | "date" | "enum";
  label: string;
  required?: boolean;
  options?: string[];
  default?: string;
};

type Row = Record<string, string | number | null> & { id?: string; created_at?: string };

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-yellow-400";

/**
 * Generic editor for a lib/records.js table. Each row saves on its own, so a
 * typo in one row never blocks the others. `editable` limits which fields can
 * be changed (e.g. enquiries only expose their status).
 */
export default function RecordsManager({
  table,
  title,
  description,
  editable,
  allowCreate = true,
}: {
  table: string;
  title: string;
  description?: string;
  editable?: string[];
  allowCreate?: boolean;
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [fields, setFields] = useState<Record<string, Field>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/admin/records/${table}`, { cache: "no-store" })
      .then(async (response) => ({ ok: response.ok, data: await response.json() }))
      .then(({ ok, data }) => {
        if (cancelled) return;
        if (ok) {
          setRows(data.rows);
          setFields(data.schema.fields);
        } else {
          setMessage(data.error ?? "Could not load records.");
        }
      })
      .catch(() => !cancelled && setMessage("Could not load records."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [table]);

  const keyOf = (row: Row, index: number) => row.id ?? `new-${index}`;

  function update(index: number, key: string, value: string) {
    setRows((current) => current.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  }

  function addRow() {
    const blank: Row = Object.fromEntries(
      Object.entries(fields).map(([key, field]) => [key, field.default ?? ""]),
    );
    setRows((current) => [blank, ...current]);
  }

  async function save(index: number) {
    const row = rows[index];
    const key = keyOf(row, index);
    setBusy((current) => ({ ...current, [key]: true }));
    setMessage("");
    try {
      const response = await fetch(`/api/admin/records/${table}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setRows((current) => current.map((item, i) => (i === index ? data.row : item)));
      setMessage("Saved.");
    } catch (error) {
      setMessage(error instanceof Error && error.message ? error.message : "Could not save.");
    } finally {
      setBusy((current) => ({ ...current, [key]: false }));
    }
  }

  async function remove(index: number) {
    const row = rows[index];
    if (!row.id) {
      setRows((current) => current.filter((_, i) => i !== index));
      return;
    }
    if (!window.confirm("Delete this entry? This cannot be undone.")) return;

    const response = await fetch(`/api/admin/records/${table}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: row.id }),
    });
    if (response.ok) {
      setRows((current) => current.filter((_, i) => i !== index));
      setMessage("Deleted.");
    } else {
      setMessage("Could not delete.");
    }
  }

  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          {description ? <p className="mt-1 text-sm text-white/60">{description}</p> : null}
        </div>
        {allowCreate ? (
          <button
            type="button"
            onClick={addRow}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:border-yellow-400"
          >
            <Plus size={16} />
            Add
          </button>
        ) : null}
      </div>

      {message ? <p className="mb-4 text-sm text-yellow-100">{message}</p> : null}

      {loading ? (
        <Loader2 className="animate-spin text-yellow-400" />
      ) : rows.length === 0 ? (
        <p className="text-sm text-white/50">No entries yet.</p>
      ) : (
        <div className="space-y-4">
          {rows.map((row, index) => {
            const key = keyOf(row, index);
            return (
              <div key={key} className="grid gap-3 rounded-lg border border-white/10 bg-black/20 p-4 md:grid-cols-3">
                {row.created_at ? (
                  <p className="text-xs text-white/40 md:col-span-3">
                    Received {new Date(row.created_at).toLocaleString()}
                  </p>
                ) : null}
                {Object.entries(fields).map(([name, field]) => {
                  const value = row[name] ?? "";
                  const readOnly = editable ? !editable.includes(name) : false;
                  const wide = field.type === "longtext";

                  return (
                    <label key={name} className={`grid gap-1 text-xs text-white/60 ${wide ? "md:col-span-3" : ""}`}>
                      {field.label}
                      {field.required ? " *" : ""}
                      {readOnly ? (
                        <span className="whitespace-pre-wrap rounded-lg bg-white/5 px-3 py-2 text-sm text-white">
                          {String(value) || "—"}
                        </span>
                      ) : field.type === "enum" ? (
                        <select
                          value={String(value)}
                          onChange={(event) => update(index, name, event.target.value)}
                          className={inputClass}
                        >
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "longtext" ? (
                        <textarea
                          value={String(value)}
                          rows={4}
                          onChange={(event) => update(index, name, event.target.value)}
                          className={inputClass}
                        />
                      ) : (
                        <input
                          type={field.type === "date" ? "date" : field.type === "int" ? "number" : "text"}
                          value={String(value).slice(0, field.type === "date" ? 10 : undefined)}
                          onChange={(event) => update(index, name, event.target.value)}
                          className={inputClass}
                        />
                      )}
                    </label>
                  );
                })}
                <div className="flex gap-2 md:col-span-3">
                  <button
                    type="button"
                    onClick={() => save(index)}
                    disabled={busy[key]}
                    className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-3 py-2 text-sm font-semibold text-black hover:bg-yellow-300 disabled:opacity-60"
                  >
                    {busy[key] ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-400/30 px-3 py-2 text-sm font-semibold text-red-200 hover:border-red-300"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
