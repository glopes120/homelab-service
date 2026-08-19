"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useState, useCallback } from "react"
import { usePathname } from "next/navigation"

export function Header() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const isLanding = pathname === "/"

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-base/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-ink tracking-tight"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-ink font-mono text-[10px] font-bold text-base leading-none">
            HL
          </div>
          Homelab
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#servicos"
            className="text-sm text-ink/70 hover:text-ink transition-colors"
          >
            Serviços
          </Link>
          {isLanding && (
            <Link
              href="/#como-funciona"
              className="text-sm text-ink/70 hover:text-ink transition-colors"
            >
              Como Funciona
            </Link>
          )}
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-ink/70 hover:text-ink transition-colors"
              >
                Dashboard
              </Link>
              {session.user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="text-sm text-ink/70 hover:text-ink transition-colors"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg bg-ink/5 px-3 py-1.5 text-sm font-medium text-ink/70 hover:bg-ink/10 hover:text-ink transition-colors"
              >
                Sair
              </button>
            </>
          ) : status !== "loading" && (
            <>
              <Link
                href="/auth/login"
                className="text-sm text-ink/70 hover:text-ink transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/auth/register"
                className="rounded-lg bg-ink px-3 py-1.5 text-sm font-semibold text-base hover:bg-ink/90 transition-colors"
              >
                Criar Conta
              </Link>
            </>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-md text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-ink/10 bg-base/95 backdrop-blur-md">
          <nav className="flex flex-col px-4 py-4 gap-1">
            <Link
              href="/#servicos"
              onClick={closeMobile}
              className="rounded-lg px-3 py-2.5 text-sm text-ink/70 hover:bg-ink/5 hover:text-ink transition-colors"
            >
              Serviços
            </Link>
            {isLanding && (
              <Link
                href="/#como-funciona"
                onClick={closeMobile}
                className="rounded-lg px-3 py-2.5 text-sm text-ink/70 hover:bg-ink/5 hover:text-ink transition-colors"
              >
                Como Funciona
              </Link>
            )}
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={closeMobile}
                  className="rounded-lg px-3 py-2.5 text-sm text-ink/70 hover:bg-ink/5 hover:text-ink transition-colors"
                >
                  Dashboard
                </Link>
                {session.user?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    onClick={closeMobile}
                    className="rounded-lg px-3 py-2.5 text-sm text-ink/70 hover:bg-ink/5 hover:text-ink transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => { closeMobile(); signOut({ callbackUrl: "/" }) }}
                  className="rounded-lg px-3 py-2.5 text-sm text-left text-ink/70 hover:bg-ink/5 hover:text-ink transition-colors"
                >
                  Sair
                </button>
              </>
            ) : status !== "loading" && (
              <>
                <Link
                  href="/auth/login"
                  onClick={closeMobile}
                  className="rounded-lg px-3 py-2.5 text-sm text-ink/70 hover:bg-ink/5 hover:text-ink transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/auth/register"
                  onClick={closeMobile}
                  className="rounded-lg bg-ink px-3 py-2.5 text-sm font-semibold text-base text-center hover:bg-ink/90 transition-colors mt-1"
                >
                  Criar Conta
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
