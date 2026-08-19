import { db } from "@/lib/db"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const [totalUsers, totalOrders, pendingOrders, completedOrders] =
    await Promise.all([
      db.user.count(),
      db.order.count(),
      db.order.count({ where: { status: "PENDING" } }),
      db.order.count({ where: { status: "COMPLETED" } }),
    ])

  const recentUsers = await db.user.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  })

  const recentOrders = await db.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      service: { select: { name: true } },
    },
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-ink">Dashboard Admin</h1>
        <p className="text-ink/70">Visão geral da plataforma</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-xl border border-ink/10 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-signal/10 text-signal">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-ink/70">Utilizadores</p>
              <p className="text-2xl font-semibold text-ink">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-trust/10 text-trust">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-ink/70">Pedidos Totais</p>
              <p className="text-2xl font-semibold text-ink">{totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-copper/10 text-copper">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-ink/70">Pendentes</p>
              <p className="text-2xl font-semibold text-ink">{pendingOrders}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-signal/10 text-signal">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-ink/70">Concluídos</p>
              <p className="text-2xl font-semibold text-ink">{completedOrders}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-ink/10 bg-white">
          <div className="flex items-center justify-between p-6 border-b border-ink/5">
            <h2 className="text-lg font-semibold text-ink">Últimos Utilizadores</h2>
            <Link href="/admin/Utilizadores" className="text-sm text-signal hover:text-signal/80 transition-colors">
              Ver todos →
            </Link>
          </div>
          <div className="p-6">
            {recentUsers.length === 0 ? (
              <p className="text-ink/40 text-center py-4">Sem utilizadores ainda.</p>
            ) : (
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-ink">{user.name || "Sem nome"}</p>
                      <p className="text-sm text-ink/70">{user.email}</p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-copper/10 text-copper"
                          : "bg-ink/5 text-ink/70"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-white">
          <div className="flex items-center justify-between p-6 border-b border-ink/5">
            <h2 className="text-lg font-semibold text-ink">Últimos Pedidos</h2>
            <Link href="/admin/pedidos" className="text-sm text-signal hover:text-signal/80 transition-colors">
              Ver todos →
            </Link>
          </div>
          <div className="p-6">
            {recentOrders.length === 0 ? (
              <p className="text-ink/40 text-center py-4">Sem pedidos ainda.</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-ink">{order.service.name}</p>
                      <p className="text-sm text-ink/70">
                        {order.user.name || order.user.email}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === "PENDING"
                          ? "bg-copper/10 text-copper"
                          : order.status === "COMPLETED"
                          ? "bg-signal/10 text-signal"
                          : order.status === "IN_PROGRESS"
                          ? "bg-trust/10 text-trust"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
