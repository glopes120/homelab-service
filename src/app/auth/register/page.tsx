"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useActionState } from "react"
import { register, type RegisterFormState } from "@/app/actions/auth"

export default function RegisterPage() {
  const router = useRouter()

  const [state, formAction, pending] = useActionState<RegisterFormState, FormData>(
    register,
    null
  )

  if (state?.success) {
    router.push("/auth/login")
  }

  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 bg-base">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-ink">Criar Conta</h1>
          <p className="mt-2 text-sm text-ink/70">
            Já tem conta?{" "}
            <Link
              href="/auth/login"
              className="text-signal hover:text-signal/80 font-medium transition-colors"
            >
              Entrar
            </Link>
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.success && state.message && (
            <div className="rounded-lg bg-signal/10 border border-signal/30 p-4 text-sm text-signal">
              {state.message}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink">
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-ink/20 bg-white px-3 py-2.5 text-sm text-ink placeholder-ink/30 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal transition-colors"
              placeholder="O seu nome"
            />
            {state?.errors?.name && (
              <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
            )}
          </div>

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
            {state?.errors?.email && (
              <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
            )}
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
              minLength={8}
              className="mt-1 block w-full rounded-lg border border-ink/20 bg-white px-3 py-2.5 text-sm text-ink placeholder-ink/30 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal transition-colors"
              placeholder="Mínimo 8 caracteres"
            />
            {state?.errors?.password && (
              <p className="mt-1 text-sm text-red-600">{state.errors.password[0]}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-base hover:bg-ink/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {pending ? "A criar conta..." : "Criar Conta"}
          </button>
        </form>
      </div>
    </main>
  )
}
