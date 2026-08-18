"use server"

/**
 * Server Action para registo de novos utilizadores
 * 
 * Server Actions são funções que executam no servidor,
 * chamadas diretamente a partir de formulários React.
 * Não precisamos de criar rotas API manuais para cada operação.
 */

import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

// Estado retornado pelo Server Action para o formulário
export type RegisterFormState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string
  success?: boolean
} | null

/**
 * Server Action para registar um novo utilizador
 * Validamos os dados no servidor (nunca confiar no client)
 */
export async function register(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  // Extrair dados do formulário
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validações básicas
  const errors: Record<string, string[]> = {}

  if (!name || name.length < 2) {
    errors.name = ["O nome deve ter pelo menos 2 caracteres."]
  }

  if (!email || !email.includes("@")) {
    errors.email = ["Introduza um email válido."]
  }

  if (!password || password.length < 8) {
    errors.password = ["A password deve ter pelo menos 8 caracteres."]
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  // Verificar se o email já existe
  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return {
      errors: { email: ["Este email já está registado."] },
    }
  }

  // Criar hash da password com bcrypt
  // bcrypt.generateHash cria um hash seguro com salt automático
  const passwordHash = await bcrypt.hash(password, 12)

  // Criar o utilizador na BD
  await db.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  })

  return {
    message: "Conta criada com sucesso! Pode fazer login.",
    success: true,
  }
}
