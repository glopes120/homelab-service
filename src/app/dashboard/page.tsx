import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

/**
 * Dashboard do Cliente
 * 
 * Página protegida: só utilizadores autenticados podem aceder.
 * Em Server Components, usamos auth() para verificar a sessão.
 */

export default async function DashboardPage() {
  // auth() verifica se existe uma sessão ativa
  const session = await auth()

  // Se não houver sessão, redirecionar para login
  if (!session?.user) {
    redirect("/auth/login")
  }

  return (
    <main className="flex-1 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Cabeçalho do Dashboard */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Bem-vindo, {session.user.name || "Utilizador"}!
          </h1>
          <p className="mt-1 text-gray-600">
            Aqui podes gerir os teus serviços e pedidos.
          </p>
        </div>

        {/* Cards de Info */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Card: Pedidos Ativos */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pedidos Ativos</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          {/* Card: Subscrições */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subscrições</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          {/* Card: Novo Pedido */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Novo Pedido</p>
                <Link
                  href="/dashboard/novo-pedido"
                  className="text-2xl font-bold text-blue-600 hover:text-blue-500"
                >
                  +
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Secção: Pedidos Recentes */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Pedidos Recentes
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-gray-500 text-center py-8">
              Ainda não tem pedidos.{" "}
              <Link
                href="/dashboard/novo-pedido"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Criar o primeiro pedido
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
