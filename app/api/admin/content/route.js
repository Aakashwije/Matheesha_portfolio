import {
  getAllPublicAssets,
  getAssetGroupMeta,
  getEditableContent,
  saveEditableContent,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    content: getEditableContent(),
    assetGroups: getAssetGroupMeta(),
    assets: getAllPublicAssets(),
  });
}

export async function PUT(request) {
  const content = await request.json();
  saveEditableContent(content);

  return Response.json({ ok: true, content });
}
