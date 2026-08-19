import { db } from "@/lib/db"

export default async function AdminUtilizadoresPage() {
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { orders: true },
      },
    },
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-ink">Utilizadores</h1>
        <p className="text-ink/70">{users.length} utilizador(es) registado(s)</p>
      </div>

      <div className="rounded-xl border border-ink/10 bg-white overflow-hidden">
        <table className="min-w-full divide-y divide-ink/10">
          <thead className="bg-ink/[0.02]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-ink/70 uppercase tracking-wider">
                Utilizador
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-ink/70 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-ink/70 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-ink/70 uppercase tracking-wider">
                Pedidos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-ink/70 uppercase tracking-wider">
                Registado em
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-ink/[0.02] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-signal/10 text-signal font-medium text-sm">
                      {user.name
                        ? user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                        : "?"}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-ink">{user.name || "Sem nome"}</div>
                      <div className="text-sm text-ink/70">ID: {user.id.slice(0, 8)}...</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-ink/70">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.role === "ADMIN"
                        ? "bg-copper/10 text-copper"
                        : "bg-ink/5 text-ink/70"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-ink/70">
                  {user._count.orders}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-ink/70">
                  {new Date(user.createdAt).toLocaleDateString("pt-PT")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
