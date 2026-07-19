import {
  getAllPublicAssets,
  getAssetGroupMeta,
  getEditableContent,
  saveEditableContent,
} from "@/lib/content";
import { getAdminEmailFromRequest } from "@/lib/adminAuth";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

function unauthorized() {
  return Response.json({ error: "Unauthorized." }, { status: 401 });
}

export async function GET(request) {
  if (!getAdminEmailFromRequest(request)) {
    return unauthorized();
  }

  return Response.json({
    content: await getEditableContent(),
    assetGroups: getAssetGroupMeta(),
    assets: await getAllPublicAssets(),
  });
}

export async function PUT(request) {
  if (!getAdminEmailFromRequest(request)) {
    return unauthorized();
  }

  const content = await request.json();
  await saveEditableContent(content);
  revalidatePath("/", "layout");

  return Response.json({ ok: true, content });
}
