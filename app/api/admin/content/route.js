import {
  getAllPublicAssets,
  getAssetGroupMeta,
  getEditableContent,
  saveEditableContent,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    content: await getEditableContent(),
    assetGroups: getAssetGroupMeta(),
    assets: await getAllPublicAssets(),
  });
}

export async function PUT(request) {
  const content = await request.json();
  await saveEditableContent(content);

  return Response.json({ ok: true, content });
}
