"use client"

/**
 * Página de Login
 * 
 * Formulário que usa signIn do NextAuth para autenticar.
 * "use client" porque precisa de interatividade (formulário + estado).
 */

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // signIn do NextAuth retorna ok: true/false
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Não redirecionar automaticamente
    })

    setLoading(false)

    if (result?.error) {
      setError("Email ou password incorretos.")
    } else {
      // Login bem-sucedido: redirecionar para o dashboard
      router.push("/dashboard")
      router.refresh() // Forçar refresh para atualizar a sessão
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Entrar</h1>
          <p className="mt-2 text-sm text-gray-600">
            Ainda não tem conta?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Criar conta grátis
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mensagem de erro */}
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="seu@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "A entrar..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  )
}
