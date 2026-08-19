/**
 * Proxy do Next.js 16
 * 
 * Antigo "middleware.ts" — o Next.js 16 renomeou para "proxy.ts".
 * Corre em Node.js runtime por defeito (ao contrário do middleware que era Edge).
 * Isto permite usar Prisma diretamente sem problemas de módulos Node.js.
 * 
 * Adiciona rate limiting na camada de proxy para proteção extra.
 */

import { auth } from "@/lib/auth"
import { NextResponse, type NextRequest } from "next/server"
import { checkRateLimit } from "@/lib/rate-limit"
import { logger } from "@/lib/logger"

export default async function proxy(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

  const authPages = ["/auth/login", "/auth/register"]
  if (authPages.some((p) => pathname.startsWith(p))) {
    const rlKey = `auth:${ip}`
    const { allowed } = checkRateLimit(rlKey, {
      windowMs: 15 * 60 * 1000,
      max: 20,
    })
    if (!allowed) {
      logger.rateLimited(rlKey, ip)
      return new NextResponse("Too Many Requests", { status: 429 })
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!session?.user) {
      logger.unauthorizedAccess(pathname, ip)
      const loginUrl = new URL("/auth/login", request.url)
      loginUrl.searchParams.set("callbackUrl", request.url)
      return NextResponse.redirect(loginUrl)
    }

    if ((session.user as { role?: string })?.role !== "ADMIN") {
      logger.unauthorizedAccess(pathname, ip)
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

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
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/:path*"],
}
