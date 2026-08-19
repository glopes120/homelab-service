"use client"

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

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError("Email ou password incorretos.")
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 bg-base">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-ink">Entrar</h1>
          <p className="mt-2 text-sm text-ink/70">
            Ainda não tem conta?{" "}
            <Link
              href="/auth/register"
              className="text-signal hover:text-signal/80 font-medium transition-colors"
            >
              Criar conta grátis
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-lg border border-ink/20 bg-white px-3 py-2.5 text-sm text-ink placeholder-ink/30 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal transition-colors"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-lg border border-ink/20 bg-white px-3 py-2.5 text-sm text-ink placeholder-ink/30 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-base hover:bg-ink/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "A entrar..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  )
}
