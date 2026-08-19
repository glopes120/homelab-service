"use server"

/**
 * Server Actions para o Admin
 * 
 * Inclui:
 * - Verificação de ownership (order existence check)
 * - Validação de inputs com Zod
 * - Logging de ações admin
 * - Rate limiting implícito via sessão
 */

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import {
  orderStatusSchema,
  orderNotesSchema,
  orderIdSchema,
} from "@/lib/validation"
import { logger } from "@/lib/logger"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    logger.unauthorizedAccess("/admin")
    throw new Error("Não autorizado")
  }
  return session
}

export async function updateOrderStatus(formData: FormData) {
  const session = await requireAdmin()

  const orderId = formData.get("orderId") as string
  const status = formData.get("status") as string

  const idResult = orderIdSchema.safeParse(orderId)
  if (!idResult.success) {
    throw new Error("Dados em falta")
  }

  const statusResult = orderStatusSchema.safeParse(status)
  if (!statusResult.success) {
    throw new Error("Estado inválido")
  }

  const order = await db.order.findUnique({
    where: { id: idResult.data },
    select: { id: true },
  })

  if (!order) {
    throw new Error("Pedido não encontrado")
  }

  await db.order.update({
    where: { id: idResult.data },
    data: { status: statusResult.data },
  })

  logger.adminAction("UPDATE_ORDER_STATUS", session.user.id, idResult.data)

  revalidatePath("/admin/pedidos")
}

export async function updateOrderNotes(formData: FormData) {
  const session = await requireAdmin()

  const orderId = formData.get("orderId") as string
  const adminNotes = formData.get("adminNotes") as string

  const idResult = orderIdSchema.safeParse(orderId)
  if (!idResult.success) {
    throw new Error("ID do pedido em falta")
  }

  const notesResult = orderNotesSchema.safeParse(adminNotes)
  if (!notesResult.success) {
    throw new Error("Notas inválidas")
  }

  const order = await db.order.findUnique({
    where: { id: idResult.data },
    select: { id: true },
  })

  if (!order) {
    throw new Error("Pedido não encontrado")
  }

  await db.order.update({
    where: { id: idResult.data },
    data: { adminNotes: notesResult.data ?? null },
  })

  logger.adminAction("UPDATE_ORDER_NOTES", session.user.id, idResult.data)

  revalidatePath("/admin/pedidos")
}
