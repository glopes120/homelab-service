/**
 * Proxy do Next.js 16
 * 
 * Antigo "middleware.ts" — o Next.js 16 renomeou para "proxy.ts".
 * Corre em Node.js runtime por defeito (ao contrário do middleware que era Edge).
 * Isto permite usar Prisma diretamente sem problemas de módulos Node.js.
 */

import { auth } from "@/lib/auth"
import { NextResponse, type NextRequest } from "next/server"

export default async function proxy(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  // Rota /admin: precisa de auth + role ADMIN
  if (pathname.startsWith("/admin")) {
    if (!session?.user) {
      const loginUrl = new URL("/auth/login", request.url)
      loginUrl.searchParams.set("callbackUrl", request.url)
      return NextResponse.redirect(loginUrl)
    }

    if ((session.user as { role?: string })?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // Rota /dashboard: precisa de auth
  if (pathname.startsWith("/dashboard")) {
    if (!session?.user) {
      const loginUrl = new URL("/auth/login", request.url)
      loginUrl.searchParams.set("callbackUrl", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
