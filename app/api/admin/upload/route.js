import fs from "node:fs/promises";
import path from "node:path";
import {
  assetGroups,
  deletePublicAsset,
  ensureStorageBucket,
  getAssetDirectory,
} from "@/lib/content";
import {
  createSupabaseAdmin,
  hasSupabaseConfig,
  SUPABASE_BUCKET,
} from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

function cleanFileName(fileName) {
  const extension = path.extname(fileName);
  const name = path
    .basename(fileName, extension)
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  return `${name || "upload"}-${Date.now()}${extension.toLowerCase()}`;
}

export async function POST(request) {
  const formData = await request.formData();
  const group = formData.get("group");
  const file = formData.get("file");

  if (!group || typeof group !== "string") {
    return Response.json({ error: "Upload group is required." }, { status: 400 });
  }

  if (!file || typeof file === "string") {
    return Response.json({ error: "File is required." }, { status: 400 });
  }

  const fileName = cleanFileName(file.name);
  const bytes = Buffer.from(await file.arrayBuffer());

  if (hasSupabaseConfig()) {
    const config = assetGroups[group];
    if (!config) {
      return Response.json({ error: "Unknown upload group." }, { status: 400 });
    }

    await ensureStorageBucket();

    const objectPath = `${config.storagePath}/${fileName}`;
    const supabase = createSupabaseAdmin();
    const { error } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .upload(objectPath, bytes, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabase.storage
      .from(SUPABASE_BUCKET)
      .getPublicUrl(objectPath);

    return Response.json({
      ok: true,
      file: {
        name: fileName,
        path: objectPath,
        src: data.publicUrl,
        size: file.size,
        type: file.type,
      },
    });
  }

  const { absolute, publicPath } = getAssetDirectory(group);
  await fs.mkdir(absolute, { recursive: true });

  const destination = path.join(absolute, fileName);
  await fs.writeFile(destination, bytes);

  return Response.json({
    ok: true,
    file: {
      name: fileName,
      src: `${publicPath}/${encodeURIComponent(fileName)}`,
      size: file.size,
      type: file.type,
    },
  });
}

export async function DELETE(request) {
  const { group, name, source } = await request.json();

  if (!group || !name) {
    return Response.json(
      { error: "Upload group and file name are required." },
      { status: 400 },
    );
  }

  await deletePublicAsset(group, name, source);
  return Response.json({ ok: true });
}
