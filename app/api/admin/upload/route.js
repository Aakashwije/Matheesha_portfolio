import fs from "node:fs/promises";
import path from "node:path";
import { deletePublicAsset, getAssetDirectory } from "@/lib/content";

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

  const { absolute, publicPath } = getAssetDirectory(group);
  await fs.mkdir(absolute, { recursive: true });

  const fileName = cleanFileName(file.name);
  const destination = path.join(absolute, fileName);
  const bytes = Buffer.from(await file.arrayBuffer());
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
  const { group, name } = await request.json();

  if (!group || !name) {
    return Response.json(
      { error: "Upload group and file name are required." },
      { status: 400 },
    );
  }

  deletePublicAsset(group, name);
  return Response.json({ ok: true });
}
