import { isLocale } from "./config/locales";
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  // The path is authoritative. Never trust a client-supplied language header.
  const locale = request.nextUrl.pathname.split("/")[1];
  requestHeaders.set("x-site-locale", isLocale(locale) ? locale : "en");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
