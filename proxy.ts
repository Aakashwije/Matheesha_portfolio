import { NextResponse, type NextRequest } from "next/server";
import { stripLocale } from "@/lib/i18n/config";

// English is served from the root ("/sponsors") by rewriting to the [lang]
// segment; Sinhala and Tamil keep their prefix ("/si/sponsors").
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1];

  if (segment === "si" || segment === "ta") {
    return NextResponse.next();
  }

  if (segment === "en") {
    const url = request.nextUrl.clone();
    url.pathname = stripLocale(pathname);
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!api|admin|_next|icon|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
