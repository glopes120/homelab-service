"use client"

/**
 * Header/Navbar da aplicação
 * 
 * Componente client porque precisa de interatividade
 * (menu mobile, links de navegação).
 * 
 * Mostra link de Admin se o utilizador for ADMIN.
 */

import Link from "next/link"
import { useSession } from "next-auth/react"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Nome */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
              HL
            </div>
            <span className="text-xl font-bold text-gray-900">
              Homelab Service
            </span>
          </Link>

          {/* Navegação */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#servicos"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Serviços
            </Link>
            <Link
              href="/#como-funciona"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Como Funciona
            </Link>
            <Link
              href="/#precos"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Preços
            </Link>
          </nav>

          {/* Botões de Auth */}
          <div className="flex items-center gap-4">
            {session ? (
              <>
                {/* Link Admin (só aparece se for ADMIN) */}
                {session.user?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="text-sm text-purple-600 hover:text-purple-500 font-medium transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Criar Conta
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
