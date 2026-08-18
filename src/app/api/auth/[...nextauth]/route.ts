/**
 * Route Handler do NextAuth
 * 
 * Este ficheiro processa todos os pedidos de autenticação:
 * - GET /api/auth/* (sessões, callbacks do OAuth, etc.)
 * - POST /api/auth/* (login, logout, etc.)
 */

import { GET, POST } from "@/lib/auth"

export { GET, POST }
