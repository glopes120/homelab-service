/**
 * Configuração do NextAuth v5 (Auth.js)
 * 
 * Este ficheiro define:1. Provedores de autenticação (Credentials = email/password)
 * 2. Adaptador do Prisma (para guardar users/sessions na BD)
 * 3. Callbacks de JWT e Session (para controlar o que vai no token)
 * 4. Páginas personalizadas (login, register)
 */

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // Adaptador Prisma: guarda utilizadores, sessões e contas na BD
  adapter: PrismaAdapter(db),

  // Provedores de autenticação
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // Função chamada ao fazer login
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Procurar o utilizador na BD
        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.passwordHash) {
          return null
        }

        // Verificar a password com bcrypt
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        )

        if (!passwordMatch) {
          return null
        }

        // Devolver o utilizador (o NextAuth cria a sessão)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],

  // Callbacks: controlam o comportamento do JWT e da sessão
  callbacks: {
    // Este callback é chamado sempre que se cria ou atualiza um JWT
    async jwt({ token, user }) {
      // Na primeira vez (login), adicionamos o role ao token
      if (user) {
        token.role = (user as { role: string }).role
      }
      return token
    },

    // Este callback é chamado sempre que se acede à sessão
    async session({ session, token }) {
      // Adicionamos o role e o id ao objeto session.user
      if (session.user) {
        session.user.id = token.sub as string
        session.user.role = token.role as string
      }
      return session
    },
  },

  // Páginas personalizadas (em vez das default do NextAuth)
  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/logout",
    // error: "/auth/error",
  },

  // Configuração da sessão
  session: {
    strategy: "jwt", // JWT em vez de database sessions (mais simples para Vercel)
  },
})
