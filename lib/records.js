import "server-only";

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createSupabaseAdmin, hasSupabaseConfig } from "./supabaseAdmin";

/*
 * Row-based data that outgrew the site_content JSON blob. Each table lives in
 * Supabase (see supabase/migrations/20261101000000_tracker_enquiries_impact.sql).
 * Without Supabase — or before the migration has run — reads fall back to
 * data/<table>.json and then to the seed rows below, so the site never breaks.
 */

const dataDir = path.join(process.cwd(), "data");

export const recordTables = {
  ranking_history: {
    label: "Ranking History",
    orderBy: { column: "recorded_on", ascending: true },
    publicRead: true,
    fields: {
      recorded_on: { type: "date", label: "Date", required: true },
      category: { type: "text", label: "Category (e.g. Asian U19)", required: true },
      rank: { type: "int", label: "Rank", required: true },
      source: { type: "text", label: "Source / ranking body" },
    },
    seed: [
      { recorded_on: "2023-12-01", category: "Asian Junior", rank: 35, source: "Asian Squash Federation" },
      { recorded_on: "2025-12-01", category: "Men’s Open (Sri Lanka)", rank: 8, source: "Sri Lanka Squash" },
      { recorded_on: "2026-02-01", category: "Asian Junior", rank: 7, source: "Asian Squash Federation" },
      { recorded_on: "2026-02-01", category: "National U19", rank: 1, source: "Sri Lanka Squash" },
    ],
  },
  tournaments: {
    label: "Tournaments",
    orderBy: { column: "start_date", ascending: false },
    publicRead: true,
    fields: {
      name: { type: "text", label: "Tournament", required: true },
      location: { type: "text", label: "Location" },
      start_date: { type: "date", label: "Start date", required: true },
      end_date: { type: "date", label: "End date" },
      category: { type: "text", label: "Category (e.g. BU19)" },
      level: { type: "enum", label: "Level", options: ["local", "international"], default: "local" },
      status: { type: "enum", label: "Status", options: ["upcoming", "completed"], default: "upcoming" },
      result: { type: "text", label: "Result" },
      link: { type: "text", label: "Link" },
    },
    seed: [
      {
        name: "23rd Asian Junior Team Squash Championship",
        location: "Pattaya, Thailand",
        start_date: "2027-01-20",
        end_date: "2027-01-24",
        category: "Sri Lanka Junior Team",
        level: "international",
        status: "upcoming",
        result: "",
        link: "",
      },
      {
        name: "U.S. Junior Open Squash Championship",
        location: "Philadelphia, USA",
        start_date: "2026-12-19",
        end_date: "2026-12-23",
        category: "BU19",
        level: "international",
        status: "upcoming",
        result: "",
        link: "",
      },
      {
        name: "ONCOCARE Singapore Junior Open Squash Championship",
        location: "Singapore",
        start_date: "2026-12-08",
        end_date: "2026-12-13",
        category: "BU19",
        level: "international",
        status: "upcoming",
        result: "",
        link: "",
      },
      {
        name: "Korea Junior Open Squash Championship 2026 (AJSS Gold)",
        location: "South Korea",
        start_date: "2026-11-01",
        end_date: "",
        category: "BU19",
        level: "international",
        status: "completed",
        result: "5th Place",
        link: "",
      },
      {
        name: "18th Air Force Open Squash Championship 2026",
        location: "Ratmalana Air Force Squash Complex",
        start_date: "2026-10-02",
        end_date: "2026-10-10",
        category: "Men’s Open",
        level: "local",
        status: "completed",
        result: "Men’s Open 4th Place",
        link: "",
      },
      {
        name: "SLS 45th Anniversary Open Squash Championship 2026",
        location: "Ratmalana Air Force Squash Complex",
        start_date: "2026-05-03",
        end_date: "2026-05-10",
        category: "BU19 / Men’s Open",
        level: "local",
        status: "completed",
        result: "U19 Champion · Men’s Open 6th",
        link: "",
      },
      {
        name: "Sri Lanka Junior Open 2026 (AJSS Silver)",
        location: "Colombo, Sri Lanka",
        start_date: "2026-02-03",
        end_date: "2026-02-15",
        category: "BU19",
        level: "international",
        status: "completed",
        result: "2nd Place",
        link: "",
      },
      {
        name: "World Junior Squash Championship 2025",
        location: "Cairo, Egypt",
        start_date: "2025-07-01",
        end_date: "",
        category: "BU19",
        level: "international",
        status: "completed",
        result: "Plate Semi Finalist",
        link: "",
      },
    ],
  },
  sponsor_exposure: {
    label: "Sponsor Exposure",
    orderBy: { column: "event_date", ascending: false },
    publicRead: true,
    fields: {
      event_name: { type: "text", label: "Event", required: true },
      event_date: { type: "date", label: "Date", required: true },
      sponsor: { type: "text", label: "Sponsor", default: "Würth Lanka" },
      location: { type: "text", label: "Location" },
      audience_reach: { type: "int", label: "Audience reach" },
      social_impressions: { type: "int", label: "Social impressions" },
      media_mentions: { type: "int", label: "Media mentions" },
      logo_minutes: { type: "int", label: "Logo on-camera minutes" },
      notes: { type: "text", label: "Notes" },
    },
    seed: [],
  },
  sponsor_enquiries: {
    label: "Sponsor Enquiries",
    orderBy: { column: "created_at", ascending: false },
    publicRead: false,
    fields: {
      name: { type: "text", label: "Name", required: true },
      company: { type: "text", label: "Company" },
      email: { type: "text", label: "Email", required: true },
      phone: { type: "text", label: "Phone" },
      package: { type: "text", label: "Package" },
      budget: { type: "text", label: "Budget" },
      message: { type: "longtext", label: "Message", required: true },
      language: { type: "text", label: "Language" },
      status: { type: "enum", label: "Status", options: ["new", "contacted", "closed"], default: "new" },
    },
    seed: [],
  },
};

export function getRecordTable(table) {
  const config = recordTables[table];
  if (!config) {
    throw new Error(`Unknown table: ${table}`);
  }
  return config;
}

export function getRecordSchemas() {
  return Object.fromEntries(
    Object.entries(recordTables).map(([key, { label, fields }]) => [key, { label, fields }]),
  );
}

function localPath(table) {
  return path.join(dataDir, `${table}.json`);
}

function withIds(rows, table) {
  return rows.map((row, index) => ({ id: row.id ?? `seed-${table}-${index}`, ...row }));
}

function sortRows(rows, { column, ascending }) {
  return [...rows].sort((a, b) => {
    const left = String(a[column] ?? "");
    const right = String(b[column] ?? "");
    return ascending ? left.localeCompare(right) : right.localeCompare(left);
  });
}

function readLocal(table) {
  const config = getRecordTable(table);
  try {
    if (fs.existsSync(localPath(table))) {
      return sortRows(JSON.parse(fs.readFileSync(localPath(table), "utf8")), config.orderBy);
    }
  } catch (error) {
    console.error(`Failed to read local ${table}`, error);
  }
  return sortRows(withIds(config.seed, table), config.orderBy);
}

function writeLocal(table, rows) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(localPath(table), `${JSON.stringify(rows, null, 2)}\n`);
}

/** Coerces input to the table's declared fields, dropping anything else. */
export function sanitizeRecord(table, input, { partial = false } = {}) {
  const { fields } = getRecordTable(table);
  const record = {};
  const missing = [];

  for (const [key, field] of Object.entries(fields)) {
    let value = input?.[key];

    if (value === undefined || value === null || value === "") {
      if (partial) continue;
      if (field.required) missing.push(field.label);
      record[key] = field.default ?? (field.type === "int" || field.type === "date" ? null : "");
      continue;
    }

    if (field.type === "int") {
      const parsed = Number.parseInt(String(value).replace(/[,\s]/g, ""), 10);
      value = Number.isFinite(parsed) ? parsed : null;
    } else if (field.type === "date") {
      value = String(value).slice(0, 10);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        missing.push(field.label);
        continue;
      }
    } else if (field.type === "enum") {
      value = field.options.includes(value) ? value : field.default;
    } else {
      value = String(value).trim().slice(0, field.type === "longtext" ? 5000 : 300);
    }

    record[key] = value;
  }

  return { record, missing };
}

function isMissingTable(error) {
  return error && (error.code === "42P01" || error.code === "PGRST205");
}

export async function listRecords(table) {
  const config = getRecordTable(table);

  if (!hasSupabaseConfig()) {
    return readLocal(table);
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(config.orderBy.column, { ascending: config.orderBy.ascending })
      .limit(500);

    if (error) {
      if (!isMissingTable(error)) {
        console.error(`Failed to read ${table}`, error.message);
      }
      return readLocal(table);
    }

    return data;
  } catch (error) {
    console.error(`Failed to read ${table}`, error);
    return readLocal(table);
  }
}

export async function saveRecord(table, input) {
  const { record, missing } = sanitizeRecord(table, input);
  if (missing.length) {
    throw Object.assign(new Error(`Missing or invalid: ${missing.join(", ")}`), { status: 400 });
  }

  const id = typeof input?.id === "string" && !input.id.startsWith("seed-") ? input.id : undefined;

  if (hasSupabaseConfig()) {
    const supabase = createSupabaseAdmin();
    const query = id
      ? supabase.from(table).update(record).eq("id", id).select().single()
      : supabase.from(table).insert(record).select().single();
    const { data, error } = await query;
    if (error) {
      throw new Error(
        isMissingTable(error)
          ? `Table "${table}" does not exist yet — run the Supabase migration.`
          : error.message,
      );
    }
    return data;
  }

  // Editing a built-in seed row replaces it with a real, persisted row.
  const rows = readLocal(table).filter((row) => id || row.id !== input?.id);
  const saved = {
    ...record,
    id: id ?? crypto.randomUUID(),
    created_at: rows.find((row) => row.id === id)?.created_at ?? new Date().toISOString(),
  };
  const next = id && rows.some((row) => row.id === id)
    ? rows.map((row) => (row.id === id ? saved : row))
    : [...rows, saved];
  writeLocal(table, next);
  return saved;
}

export async function deleteRecord(table, id) {
  getRecordTable(table);

  if (hasSupabaseConfig()) {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }

  writeLocal(table, readLocal(table).filter((row) => row.id !== id));
}

/** Tournaments split for the tracker: next upcoming + latest completed. */
export async function getTrackerData() {
  const [rankings, tournaments] = await Promise.all([
    listRecords("ranking_history"),
    listRecords("tournaments"),
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = tournaments
    .filter((t) => t.status === "upcoming" && (t.end_date || t.start_date) >= today)
    .sort((a, b) => a.start_date.localeCompare(b.start_date));
  const completed = tournaments
    .filter((t) => t.status === "completed")
    .sort((a, b) => b.start_date.localeCompare(a.start_date));

  return { rankings, upcoming, completed };
}
