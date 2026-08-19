import { db } from "@/lib/db"
import { updateOrderStatus, updateOrderNotes } from "@/app/actions/admin"

export default async function AdminPedidosPage() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, email: true } },
      service: { select: { name: true, price: true, type: true } },
    },
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-ink">Gestão de Pedidos</h1>
        <p className="text-ink/70">{orders.length} pedido(s) no total</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-ink/10 bg-white p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-ink/20" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-ink">Sem pedidos</h3>
          <p className="mt-2 text-ink/70">Ainda não existem pedidos de clientes.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-ink/10 bg-white overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 bg-ink/[0.02] border-b border-ink/5">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-ink">{order.service.name}</p>
                    <p className="text-sm text-ink/70">
                      {order.user.name || order.user.email} •{" "}
                      {new Date(order.createdAt).toLocaleDateString("pt-PT")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-ink/70">
                    €{order.service.price.toString()}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      order.status === "PENDING"
                        ? "bg-copper/10 text-copper"
                        : order.status === "IN_PROGRESS"
                        ? "bg-trust/10 text-trust"
                        : order.status === "COMPLETED"
                        ? "bg-signal/10 text-signal"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                {order.notes && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-ink/70 mb-1">Notas do Cliente:</p>
                    <p className="text-sm text-ink/70 bg-ink/[0.02] rounded-lg p-3">
                      {order.notes}
                    </p>
                  </div>
                )}

                <form className="flex flex-col gap-3">
                  <input type="hidden" name="orderId" value={order.id} />

                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-ink/70">Estado:</label>
                    <select
                      name="status"
                      defaultValue={order.status}
                      className="rounded-lg border border-ink/20 bg-white px-3 py-1.5 text-sm text-ink focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal transition-colors"
                    >
                      <option value="PENDING">Pendente</option>
                      <option value="IN_PROGRESS">Em Curso</option>
                      <option value="COMPLETED">Concluído</option>
                      <option value="CANCELLED">Cancelado</option>
                    </select>
                    <button
                      formAction={updateOrderStatus}
                      className="rounded-lg bg-signal px-3 py-1.5 text-sm font-medium text-white hover:bg-signal/90 transition-colors"
                    >
                      Guardar
                    </button>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-ink/70 mb-1 block">
                      Notas Internas (só tu vês):
                    </label>
                    <textarea
                      name="adminNotes"
                      defaultValue={order.adminNotes || ""}
                      rows={2}
                      className="w-full rounded-lg border border-ink/20 bg-white px-3 py-2 text-sm text-ink focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal transition-colors"
                      placeholder="Ex: Cliente quer Nextcloud + Jellyfin, hardware: Raspberry Pi 4..."
                    />
                    <button
                      formAction={updateOrderNotes}
                      className="mt-2 rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-base hover:bg-ink/90 transition-colors"
                    >
                      Guardar Notas
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
