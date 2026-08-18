"use client"

/**
 * Página de Registo
 * 
 * Formulário que usa Server Action para criar novo utilizador.
 * Usa useActionState do React para gerir o estado do formulário.
 */

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useActionState } from "react"
import { register, type RegisterFormState } from "@/app/actions/auth"

export default function RegisterPage() {
  const router = useRouter()

  // useActionState: gerencia o estado do Server Action
  // register é a Server Action, null é o estado inicial
  const [state, formAction, pending] = useActionState<RegisterFormState, FormData>(
    register,
    null
  )

  // Se o registo foi bem-sucedido, redirecionar para o login
  if (state?.success) {
    router.push("/auth/login")
  }

  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Criar Conta</h1>
          <p className="mt-2 text-sm text-gray-600">
            Já tem conta?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Entrar
            </Link>
          </p>
        </div>

        {/* formAction conecta o formulário ao Server Action */}
        <form action={formAction} className="space-y-4">
          {/* Mensagem de sucesso */}
          {state?.success && state.message && (
            <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
              {state.message}
            </div>
          )}

          {/* Nome */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="O seu nome"
            />
            {/* Erros de validação vindos do Server Action */}
            {state?.errors?.name && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.name[0]}
              </p>
            )}
          </div>

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
            {state?.errors?.email && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.email[0]}
              </p>
            )}
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
              minLength={8}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Mínimo 8 caracteres"
            />
            {state?.errors?.password && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.password[0]}
              </p>
            )}
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {pending ? "A criar conta..." : "Criar Conta"}
          </button>
        </form>
      </div>
    </main>
  )
}
