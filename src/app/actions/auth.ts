"use server"

/**
 * Server Action para registo de novos utilizadores
 * 
 * Inclui:
 * - Rate limiting por IP
 * - Validação robusta com Zod (anti-XSS)
 * - Mensagens genéricas (anti-enumeração)
 * - Logging de segurança
 */

import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { registerSchema } from "@/lib/validation"
import { checkRateLimit, REGISTER_RATE_LIMIT } from "@/lib/rate-limit"
import { logger } from "@/lib/logger"

export type RegisterFormState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string
  success?: boolean
} | null

export async function register(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const rateLimitKey = `register:${email}`
  const { allowed, retryAfterMs } = checkRateLimit(rateLimitKey, REGISTER_RATE_LIMIT)

  if (!allowed) {
    logger.rateLimited(rateLimitKey)
    return {
      message: `Demasiadas tentativas. Tente novamente em ${Math.ceil(retryAfterMs / 60000)} minutos.`,
    }
  }

  const result = registerSchema.safeParse({ name, email, password })

  if (!result.success) {
    const errors: Record<string, string[]> = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string
      if (!errors[field]) errors[field] = []
      errors[field].push(issue.message)
    }
    return { errors }
  }

  const { name: cleanName, email: cleanEmail, password: cleanPassword } = result.data

  logger.registerAttempt(cleanEmail)

  const existingUser = await db.user.findUnique({
    where: { email: cleanEmail },
  })

  if (existingUser) {
    return {
      message: "Se este email não tiver conta, receberá um convite em breve.",
      success: true,
    }
  }

  const passwordHash = await bcrypt.hash(cleanPassword, 12)

  const user = await db.user.create({
    data: {
      name: cleanName,
      email: cleanEmail,
      passwordHash,
    },
  })

  logger.registerSuccess(user.id)

  return {
    message: "Conta criada com sucesso! Pode fazer login.",
    success: true,
  }
}
