/**
 * Extensões de tipos para o NextAuth v5
 * 
 * O NextAuth por default só tem name, email e image no session.user.
 * Precisamos de adicionar id e role para o nosso projeto.
 */

import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
  }
}
