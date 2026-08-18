"use server"

/**
 * Server Actions para o Admin
 * 
 * Funções que o admin pode executar:
 * - Atualizar estado de um pedido
 * - Adicionar notas internas a um pedido
 */

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

/**
 * Verificar se o utilizador é admin
 * Todas as actions admin devem chamar isto primeiro
 */
async function requireAdmin() {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Não autorizado")
  }
  return session
}

/**
 * Atualizar o estado de um pedido
 * Exemplo: PENDING → IN_PROGRESS → COMPLETED
 */
export async function updateOrderStatus(formData: FormData) {
  await requireAdmin()

  const orderId = formData.get("orderId") as string
  const status = formData.get("status") as string

  if (!orderId || !status) {
    throw new Error("Dados em falta")
  }

  // Validar que o status é válido
  const validStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
  if (!validStatuses.includes(status)) {
    throw new Error("Estado inválido")
  }

  // Atualizar na BD
  await db.order.update({
    where: { id: orderId },
    data: { status: status as "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" },
  })

  // Revalidar a página para mostrar os dados atualizados
  revalidatePath("/admin/pedidos")
}

/**
 * Adicionar/Atualizar notas internas do admin
 * Estas notas são privadas - só o admin vê
 */
export async function updateOrderNotes(formData: FormData) {
  await requireAdmin()

  const orderId = formData.get("orderId") as string
  const adminNotes = formData.get("adminNotes") as string

  if (!orderId) {
    throw new Error("ID do pedido em falta")
  }

  // Atualizar na BD
  await db.order.update({
    where: { id: orderId },
    data: { adminNotes },
  })

  // Revalidar a página
  revalidatePath("/admin/pedidos")
}
