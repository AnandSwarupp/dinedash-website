"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Search, ChevronDown, CheckCircle2, Circle, Download, Mail, X, Loader2, Store, ListFilter } from "lucide-react";
import QRCode from "qrcode";
import JSZip from "jszip";
import { FilterDropdown } from "@/components/admin/FilterDropdown";

interface SupplyTable {
  tableId: string;
  tableNumber: number;
  capacity: number;
  qrValue: string;
}

interface SupplyOrder {
  id: string;
  status: string;
  itemName: string;
  quantity: number;
  unitPricePence: number;
  totalPence: number;
  currencyCode: string;
  tables: SupplyTable[];
  createdAt: string;
  paidAt: string | null;
  deliveredAt: string | null;
  restaurant: {
    id: string;
    name: string;
    address: string;
    phone: string;
    country: string;
    email: string | null;
  } | null;
}

const STATUS_OPTIONS = ["pending", "paid", "cancelled"];
const statusColors: Record<string, string> = {
  pending: "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  paid: "bg-[var(--brand-light)] text-[var(--brand)]",
  cancelled: "bg-[var(--border)] text-[var(--text-muted)]",
};

function formatMoney(pence: number, currency: string) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(pence / 100);
}

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Renders a printable "table tent" card: QR code + brand accent + table number/seats. */
async function buildQrCard(qrValue: string, tableNumber: number, capacity: number): Promise<string> {
  const qrDataUrl = await QRCode.toDataURL(qrValue, { width: 480, margin: 1 });
  const qrImg = await loadImage(qrDataUrl);

  const W = 320;
  const H = 440;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.save();
  ctx.shadowColor = "rgba(15,22,35,0.14)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 6;
  roundRect(ctx, 8, 8, W - 16, H - 16, 24);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.restore();

  roundRect(ctx, 8, 8, W - 16, H - 16, 24);
  ctx.strokeStyle = "#E7E5E4";
  ctx.lineWidth = 1;
  ctx.stroke();

  const qrSize = 232;
  const qrX = (W - qrSize) / 2;
  const qrY = 36;
  ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

  const barW = 44;
  const barH = 4;
  const barY = qrY + qrSize + 22;
  roundRect(ctx, (W - barW) / 2, barY, barW, barH, 2);
  ctx.fillStyle = "#16A34A";
  ctx.fill();

  ctx.textAlign = "center";
  ctx.fillStyle = "#A8A29E";
  ctx.font = "600 11px system-ui, sans-serif";
  ctx.fillText("T A B L E", W / 2, barY + barH + 26);

  ctx.fillStyle = "#1C1917";
  ctx.font = "700 40px system-ui, sans-serif";
  ctx.fillText(String(tableNumber), W / 2, barY + barH + 26 + 48);

  ctx.fillStyle = "#78716C";
  ctx.font = "500 13px system-ui, sans-serif";
  ctx.fillText(`${capacity} seat${capacity !== 1 ? "s" : ""}`, W / 2, barY + barH + 26 + 48 + 24);

  return canvas.toDataURL("image/png");
}

function EmailModal({ order, onClose }: { order: SupplyOrder; onClose: () => void }) {
  const [to, setTo] = useState(order.restaurant?.email || "");
  const [subject, setSubject] = useState(`Your DineDash supply order: ${order.itemName}`);
  const [message, setMessage] = useState(
    `Hi ${order.restaurant?.name || "there"},\n\nHere are the QR codes for your "${order.itemName}" order. Please find them attached.\n\nThanks,\nDineDash Team`
  );
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const send = async () => {
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      setError("Enter a valid recipient email.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`/api/admin/supplies/orders/${order.id}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send.");
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl w-full max-w-md p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">Email vendor</h3>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {sent ? (
          <div className="py-6 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[var(--brand)] mx-auto" />
            <div className="text-sm text-[var(--text-primary)]">Email sent to {to}.</div>
            <button
              onClick={onClose}
              className="mt-2 text-xs px-4 py-2 rounded-lg bg-[var(--brand)] text-[#0F1623] font-medium"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <label className="text-xs text-[var(--text-muted)]">To</label>
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="vendor@example.com"
                className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--page-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-[var(--text-muted)]">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--page-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-[var(--text-muted)]">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--page-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] resize-none"
              />
            </div>
            {order.tables.length > 0 && (
              <div className="text-xs text-[var(--text-muted)]">
                {order.tables.length} QR code{order.tables.length !== 1 ? "s" : ""} will be attached.
              </div>
            )}
            {error && <div className="text-xs text-red-500">{error}</div>}
            <button
              disabled={sending}
              onClick={send}
              className="w-full flex items-center justify-center gap-2 text-sm px-4 py-2.5 rounded-lg bg-[var(--brand)] text-[#0F1623] font-medium hover:opacity-90 disabled:opacity-50"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
              {sending ? "Sending..." : "Send email"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function OrderTables({ tables }: { tables: SupplyTable[] }) {
  const [qrDataUrls, setQrDataUrls] = useState<Record<string, string>>({});
  const [zipping, setZipping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(
        tables.map(async (t) => [t.tableId, await buildQrCard(t.qrValue, t.tableNumber, t.capacity)] as const)
      );
      if (!cancelled) setQrDataUrls(Object.fromEntries(entries));
    })();
    return () => {
      cancelled = true;
    };
  }, [tables]);

  const downloadAll = async () => {
    setZipping(true);
    try {
      const zip = new JSZip();
      for (const t of tables) {
        const dataUrl = qrDataUrls[t.tableId];
        if (!dataUrl) continue;
        const base64 = dataUrl.split(",")[1];
        zip.file(`table-${t.tableNumber}-qr.png`, base64, { base64: true });
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      downloadDataUrl(url, "table-qr-codes.zip");
      URL.revokeObjectURL(url);
    } finally {
      setZipping(false);
    }
  };

  if (tables.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-[var(--text-muted)]">Tables ({tables.length})</div>
        {tables.length > 1 && (
          <button
            onClick={downloadAll}
            disabled={zipping}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] disabled:opacity-50"
          >
            {zipping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            Download all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {tables.map((t) => (
          <div key={t.tableId} className="flex flex-col items-center gap-2">
            {qrDataUrls[t.tableId] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrDataUrls[t.tableId]} alt={`QR code for table ${t.tableNumber}`} className="w-28" />
            ) : (
              <div className="w-28 aspect-[320/440] flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] rounded-2xl">
                <Loader2 className="w-5 h-5 animate-spin text-[var(--text-muted)]" />
              </div>
            )}
            <button
              onClick={() => qrDataUrls[t.tableId] && downloadDataUrl(qrDataUrls[t.tableId], `table-${t.tableNumber}-qr.png`)}
              disabled={!qrDataUrls[t.tableId]}
              className="flex items-center gap-1 text-xs text-[var(--brand)] hover:underline disabled:opacity-50"
            >
              <Download className="w-3 h-3" /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SuppliesPage() {
  const [orders, setOrders] = useState<SupplyOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [emailOrder, setEmailOrder] = useState<SupplyOrder | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filterStatus) params.set("status", filterStatus);
    const res = await fetch(`/api/admin/supplies/orders?${params}`);
    const data = await res.json();
    setOrders(data.items || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [search, filterStatus]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  const groupedOrders = useMemo(() => {
    const groups: { key: string; name: string; orders: SupplyOrder[] }[] = [];
    const indexByKey = new Map<string, number>();
    for (const order of orders) {
      const key = order.restaurant?.id || "unknown";
      const name = order.restaurant?.name || "Unknown restaurant";
      let idx = indexByKey.get(key);
      if (idx === undefined) {
        idx = groups.length;
        indexByKey.set(key, idx);
        groups.push({ key, name, orders: [] });
      }
      groups[idx].orders.push(order);
    }
    return groups;
  }, [orders]);

  const toggleDelivered = async (id: string, delivered: boolean) => {
    setUpdating(id);
    await fetch(`/api/admin/supplies/orders/${id}/deliver`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ delivered }),
    });
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, deliveredAt: delivered ? new Date().toISOString() : null } : o))
    );
    setUpdating(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search restaurant name or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[var(--border)] rounded-xl bg-[var(--surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
          />
        </div>
        <FilterDropdown
          icon={ListFilter}
          value={filterStatus}
          onChange={setFilterStatus}
          capitalizeLabels
          options={[{ value: "", label: "All statuses" }, ...STATUS_OPTIONS.map((s) => ({ value: s, label: s }))]}
        />
      </div>

      <div className="text-sm font-medium text-[var(--text-secondary)] px-1">
        {loading ? "Loading..." : `${total} order${total !== 1 ? "s" : ""}`}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="py-16 text-center text-[var(--text-muted)] text-sm bg-[var(--surface)] border border-[var(--border)] rounded-2xl">
          No supply orders found.
        </div>
      ) : (
        <div className="space-y-6">
          {groupedOrders.map((group) => (
            <div key={group.key}>
              <div className="flex items-center gap-2 mb-2.5 px-1">
                <Store className="w-4 h-4 text-[var(--brand)] flex-shrink-0" />
                <span className="text-sm font-semibold text-[var(--text-primary)] truncate">{group.name}</span>
                <span className="text-xs text-[var(--text-muted)] flex-shrink-0">
                  {group.orders.length} order{group.orders.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="space-y-3">
                {group.orders.map((order) => (
            <div key={order.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
              <div
                className="px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-[var(--surface-alt)] transition-colors"
                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-[var(--text-primary)] truncate">
                    {order.itemName} × {order.quantity}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] truncate">
                    Ordered {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[order.status] || statusColors.pending}`}>
                    {order.status}
                  </span>
                  {order.deliveredAt ? (
                    <span className="flex items-center gap-1 text-xs text-[var(--brand)]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <Circle className="w-3.5 h-3.5" /> Not delivered
                    </span>
                  )}
                </div>
                <div className="text-xs text-[var(--text-muted)] flex-shrink-0 hidden md:block">
                  {formatMoney(order.totalPence, order.currencyCode)}
                </div>
                <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] flex-shrink-0 transition-transform ${expandedId === order.id ? "rotate-180" : ""}`} />
              </div>

              {expandedId === order.id && (
                <div className="px-5 pb-5 bg-[var(--surface-alt)] border-t border-[var(--border)] space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    <div>
                      <div className="text-xs text-[var(--text-muted)] mb-1">Unit price</div>
                      <div className="text-sm text-[var(--text-primary)]">{formatMoney(order.unitPricePence, order.currencyCode)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] mb-1">Total</div>
                      <div className="text-sm text-[var(--text-primary)]">{formatMoney(order.totalPence, order.currencyCode)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] mb-1">Ordered</div>
                      <div className="text-sm text-[var(--text-primary)]">{new Date(order.createdAt).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] mb-1">Paid</div>
                      <div className="text-sm text-[var(--text-primary)]">{order.paidAt ? new Date(order.paidAt).toLocaleString() : "—"}</div>
                    </div>
                  </div>

                  {order.restaurant && (
                    <div>
                      <div className="text-xs text-[var(--text-muted)] mb-1">Restaurant</div>
                      <div className="text-sm text-[var(--text-primary)] bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 space-y-0.5">
                        <div className="font-medium">{order.restaurant.name}</div>
                        <div className="text-xs text-[var(--text-muted)]">{order.restaurant.address}</div>
                        <div className="text-xs text-[var(--text-muted)]">{order.restaurant.phone} · {order.restaurant.email || "no email"}</div>
                      </div>
                    </div>
                  )}

                  <OrderTables tables={order.tables} />

                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      disabled={updating === order.id}
                      onClick={() => toggleDelivered(order.id, !order.deliveredAt)}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                        order.deliveredAt
                          ? "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-red-300 hover:text-red-500"
                          : "bg-[var(--brand)] text-[#0F1623] hover:opacity-90"
                      }`}
                    >
                      {order.deliveredAt ? <Circle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      {order.deliveredAt ? "Mark as not delivered" : "Mark as delivered"}
                    </button>
                    <button
                      onClick={() => setEmailOrder(order)}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" /> Email vendor
                    </button>
                  </div>
                </div>
              )}
            </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {emailOrder && <EmailModal order={emailOrder} onClose={() => setEmailOrder(null)} />}
    </div>
  );
}
