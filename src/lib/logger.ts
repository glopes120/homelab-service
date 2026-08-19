/**
 * Logger de segurança
 * 
 * Regista eventos de segurança para forense e monitorização.
 * Em produção, integrar com serviço externo (Sentry, Datadog, etc.)
 */

type LogLevel = "info" | "warn" | "error" | "security"

interface LogEntry {
  timestamp: string
  level: LogLevel
  event: string
  details?: Record<string, unknown>
  ip?: string
}

function formatEntry(entry: LogEntry): string {
  const base = `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.event}`
  if (entry.ip) return `${base} | ip=${entry.ip}`
  return base
}

function log(level: LogLevel, event: string, details?: Record<string, unknown>, ip?: string) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    event,
    details,
    ip,
  }

  const formatted = formatEntry(entry)

  switch (level) {
    case "error":
    case "security":
      console.error(formatted)
      break
    case "warn":
      console.warn(formatted)
      break
    default:
      console.log(formatted)
  }
}

export const logger = {
  loginFailed(email: string, ip?: string) {
    log("warn", "LOGIN_FAILED", { email }, ip)
  },

  loginSuccess(userId: string, ip?: string) {
    log("info", "LOGIN_SUCCESS", { userId }, ip)
  },

  registerAttempt(email: string, ip?: string) {
    log("info", "REGISTER_ATTEMPT", { email }, ip)
  },

  registerSuccess(userId: string, ip?: string) {
    log("info", "REGISTER_SUCCESS", { userId }, ip)
  },

  rateLimited(key: string, ip?: string) {
    log("security", "RATE_LIMITED", { key }, ip)
  },

  unauthorizedAccess(path: string, ip?: string) {
    log("security", "UNAUTHORIZED_ACCESS", { path }, ip)
  },

  adminAction(action: string, adminId: string, targetId?: string) {
    log("info", "ADMIN_ACTION", { action, adminId, targetId })
  },

  validationError(field: string, ip?: string) {
    log("warn", "VALIDATION_ERROR", { field }, ip)
  },
}
