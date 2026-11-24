import { NextResponse, type NextRequest } from "next/server";

// Two sites from one app:
// - theankitgupta.com: the English site for India (app/page.tsx and friends).
// - deu.theankitgupta.com: the German site (app/de/*). Every path on that host is served
//   from /de, so deu.theankitgupta.com/resume shows app/de/resume.
// On the main host /de does not exist (404), so nothing German shows up there.
// Locally (localhost) /de stays reachable for previewing the German site.
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

const isDePath = (path: string) => path === "/de" || path.startsWith("/de/");

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase().replace(/:\d+$/, "");
  const path = request.nextUrl.pathname;

  if (host.startsWith("deu.")) {
    // Already-prefixed paths (e.g. the generated /de/opengraph-image URL) pass through.
    if (isDePath(path)) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = path === "/" ? "/de" : `/de${path}`;
    return NextResponse.rewrite(url);
  }

  if (isDePath(path) && !LOCAL_HOSTS.has(host)) {
    // No such page on the India site: render the normal 404.
    const url = request.nextUrl.clone();
    url.pathname = "/_not-found-de";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Everything except build assets and the favicon, which both sites share.
  matcher: ["/((?!_next/static|_next/image|icon.svg|favicon.ico).*)"],
};
