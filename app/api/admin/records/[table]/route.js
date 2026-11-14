import { getAdminEmailFromRequest } from "@/lib/adminAuth";
import { deleteRecord, getRecordSchemas, listRecords, recordTables, saveRecord } from "@/lib/records";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

function unauthorized() {
  return Response.json({ error: "Unauthorized." }, { status: 401 });
}

async function resolveTable(params) {
  const { table } = await params;
  return recordTables[table] ? table : null;
}

export async function GET(request, { params }) {
  if (!getAdminEmailFromRequest(request)) return unauthorized();
  const table = await resolveTable(params);
  if (!table) return Response.json({ error: "Unknown table." }, { status: 404 });

  return Response.json({
    rows: await listRecords(table),
    schema: getRecordSchemas()[table],
  });
}

export async function POST(request, { params }) {
  if (!getAdminEmailFromRequest(request)) return unauthorized();
  const table = await resolveTable(params);
  if (!table) return Response.json({ error: "Unknown table." }, { status: 404 });

  try {
    const row = await saveRecord(table, await request.json());
    revalidatePath("/", "layout");
    return Response.json({ ok: true, row });
  } catch (error) {
    return Response.json({ error: error.message }, { status: error.status ?? 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!getAdminEmailFromRequest(request)) return unauthorized();
  const table = await resolveTable(params);
  if (!table) return Response.json({ error: "Unknown table." }, { status: 404 });

  const { id } = await request.json();
  if (!id) return Response.json({ error: "id is required." }, { status: 400 });

  try {
    await deleteRecord(table, id);
    revalidatePath("/", "layout");
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
