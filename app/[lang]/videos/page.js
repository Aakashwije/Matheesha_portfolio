import { redirect } from "next/navigation";
import { localizedHref, resolveLocale } from "@/lib/i18n/config";

export default async function Videos({ params }) {
  redirect(localizedHref(resolveLocale((await params).lang), "/"));
}
