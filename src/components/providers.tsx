"use client"

/**
 * Providers wrapper
 * 
 * O NextAuth precisa de um SessionProvider no lado do client
 * para que os componentes possam aceder à sessão (useSession).
 * 
 * Este componente é "use client" porque o SessionProvider
 * é um Client Component que usa React Context.
 */

import { SessionProvider } from "next-auth/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
