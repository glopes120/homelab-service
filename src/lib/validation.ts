/**
 * Validação de inputs com Zod
 * 
 * Centraliza todas as validações de dados do utilizador.
 * Previne XSS armazenado e garante integridade dos dados.
 */

import { z } from "zod"

export const passwordSchema = z
  .string()
  .min(8, "A password deve ter pelo menos 8 caracteres")
  .max(128, "A password é demasiado longa")
  .regex(/[A-Z]/, "A password deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "A password deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "A password deve conter pelo menos um número")
  .regex(/[^A-Za-z0-9]/, "A password deve conter pelo menos um caractere especial")

export const nameSchema = z
  .string()
  .min(2, "O nome deve ter pelo menos 2 caracteres")
  .max(100, "O nome é demasiado longo")
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "O nome contém caracteres inválidos")

export const emailSchema = z
  .string()
  .email("Introduza um email válido")
  .max(254, "O email é demasiado longo")
  .toLowerCase()

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
})

export const orderNotesSchema = z
  .string()
  .max(5000, "As notas são demasiado longas")
  .optional()
  .nullable()

export const orderStatusSchema = z.enum([
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
])

export const orderIdSchema = z
  .string()
  .min(1, "ID do pedido em falta")
  .max(30, "ID do pedido inválido")
  .regex(/^c[a-z0-9]+$/, "ID do pedido com formato inválido")
