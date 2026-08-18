/**
 * Prisma Client Singleton
 * 
 * Em desenvolvimento, o Next.js recompila o servidor frequentemente.
 * Sem esta proteção, criaríamos múltiplas instâncias do Prisma Client,
 * esgotando as conexões da base de dados.
 * 
 * Em produção, criamos uma única instância e guardamo-la no globalThis.
 */

import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // Criar o driver adapter para PostgreSQL
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  })
  
  return new PrismaClient({
    adapter,
  })
}

// Em produção: usa a instância existente ou cria uma nova
// Em desenvolvimento: evita criar múltiplas instâncias
export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
