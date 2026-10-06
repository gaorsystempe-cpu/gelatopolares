import React, { useState } from 'react';
import { Order, StoreConfig } from '../types';
import { ReceiptText, Send, Clock, ChevronDown, ChevronUp, Copy, Check, ShoppingBag, CreditCard, Sparkles } from 'lucide-react';

interface OrdersViewProps {
  orders: Order[];
  storeConfig: StoreConfig;
  onGoToCatalog: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  storeConfig,
  onGoToCatalog,
}) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [showPaymentInfoForOrder, setShowPaymentInfoForOrder] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleResendToWhatsApp = (order: Order) => {
    const whatsappUrl = `https://wa.me/${storeConfig.phone}?text=${encodeURIComponent(order.whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const statusMap: Record<string, { label: string; bg: string; text: string; dot: string }> = {
    recibido: {
      label: 'Recibido',
      bg: 'bg-amber-500/10 dark:bg-amber-950/40 border-amber-500/30',
      text: 'text-amber-800 dark:text-amber-300',
      dot: 'bg-amber-500',
    },
    preparando: {
      label: 'En Preparación',
      bg: 'bg-blue-500/10 dark:bg-blue-950/40 border-blue-500/30',
      text: 'text-blue-800 dark:text-blue-300',
      dot: 'bg-blue-500 animate-pulse',
    },
    en_camino: {
      label: 'En Camino',
      bg: 'bg-purple-500/10 dark:bg-purple-950/40 border-purple-500/30',
      text: 'text-purple-800 dark:text-purple-300',
      dot: 'bg-purple-500 animate-bounce',
    },
    entregado: {
      label: 'Entregado',
      bg: 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500/30',
      text: 'text-emerald-800 dark:text-emerald-300',
      dot: 'bg-emerald-500',
    },
  };

  return (
    <div className="space-y-4 pb-24">
      {/* View Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold font-display text-neutral-900 dark:text-white">
            Historial de Mis Pedidos
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Revisa el estado de tus órdenes y reenvía el comprobante a WhatsApp
          </p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
          <ReceiptText className="w-4 h-4" />
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-neutral-800/80 rounded-3xl border border-neutral-200 dark:border-neutral-700 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white mb-1">
            No tienes pedidos recientes
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto mb-5 leading-relaxed">
            Cuando realices un pedido de tus gelatos y waffles favoritos, podrás hacer seguimiento en tiempo real desde aquí.
          </p>
          <button
            onClick={onGoToCatalog}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer font-display"
          >
            Hacer Mi Primer Pedido
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;
            const statusConfig = statusMap[order.status] || statusMap['recibido'];
            const isShowingPayment = showPaymentInfoForOrder === order.id;

            return (
              <div
                key={order.id}
                className="bg-white dark:bg-neutral-800/90 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-xs overflow-hidden transition-all"
              >
                {/* Order Top Bar */}
                <div className="p-3.5 sm:p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-sm text-neutral-900 dark:text-white">
                          #{order.orderNumber}
                        </span>
                        <div
                          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusConfig.bg} ${statusConfig.text}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                          <span>{statusConfig.label}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{order.date}</span>
                        <span>·</span>
                        <span className="capitalize">{order.customer.district}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-extrabold text-amber-600 dark:text-amber-400">
                        S/ {order.total.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-neutral-400 block uppercase font-mono">
                        {order.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1 pt-2 border-t border-neutral-100 dark:border-neutral-700/60">
                    {order.items.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[11px]">
                        <span className="truncate pr-2">
                          {item.quantity}x {item.product.name}
                        </span>
                        <span className="font-mono text-neutral-400 shrink-0">
                          S/ {item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <span className="text-[10px] text-neutral-400 italic block">
                        +{order.items.length - 2} productos más...
                      </span>
                    )}
                  </div>

                  {/* Actions buttons row */}
                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-700/60">
                    <button
                      onClick={() => handleResendToWhatsApp(order)}
                      className="flex-1 min-w-[130px] py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-emerald-500/20"
                    >
                      <Send className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                      <span>Reenviar a WhatsApp</span>
                    </button>

                    <button
                      onClick={() =>
                        setShowPaymentInfoForOrder(isShowingPayment ? null : order.id)
                      }
                      className="py-2 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Datos de Pago</span>
                    </button>

                    <button
                      onClick={() => toggleExpand(order.id)}
                      className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
                      title={isExpanded ? 'Ver menos' : 'Ver detalle'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Payment Details Panel */}
                {isShowingPayment && (
                  <div className="p-3.5 bg-amber-50/60 dark:bg-amber-950/20 border-t border-amber-200/60 dark:border-amber-900/40 text-xs space-y-2 animate-fade-in">
                    <span className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[10px] block">
                      Cuentas Oficiales para Pagar S/ {order.total.toFixed(2)}
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* Yape */}
                      <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-purple-600 font-bold block">YAPE / PLIN</span>
                          <span className="font-mono font-bold text-xs text-neutral-900 dark:text-white">
                            {storeConfig.yapeNumber}
                          </span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(storeConfig.yapeNumber, `yape_${order.id}`)}
                          className="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-[10px] font-bold flex items-center gap-1"
                        >
                          {copiedKey === `yape_${order.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === `yape_${order.id}` ? 'Listo' : 'Copiar'}</span>
                        </button>
                      </div>

                      {/* BCP */}
                      <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-blue-600 font-bold block">BCP CORRIENTE</span>
                          <span className="font-mono font-bold text-xs text-neutral-900 dark:text-white">
                            {storeConfig.bcpAccount}
                          </span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(storeConfig.bcpAccount, `bcp_${order.id}`)}
                          className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[10px] font-bold flex items-center gap-1"
                        >
                          {copiedKey === `bcp_${order.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === `bcp_${order.id}` ? 'Listo' : 'Copiar'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Collapsible Full Items & Financial Breakdown */}
                {isExpanded && (
                  <div className="p-3.5 bg-neutral-50 dark:bg-neutral-850 border-t border-neutral-200 dark:border-neutral-700 text-xs space-y-3 animate-fade-in">
                    <span className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[10px] block">
                      Detalle Completo del Pedido
                    </span>

                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                        >
                          <div className="flex justify-between font-semibold text-neutral-900 dark:text-white">
                            <span>
                              {item.quantity}x {item.product.name}
                            </span>
                            <span className="font-mono">S/ {item.totalPrice.toFixed(2)}</span>
                          </div>
                          {item.selectedFlavors.length > 0 && (
                            <span className="text-[10px] text-amber-600 dark:text-amber-400 block">
                              Sabores: {item.selectedFlavors.join(', ')}
                            </span>
                          )}
                          {item.selectedTopping && (
                            <span className="text-[10px] text-neutral-400 block">
                              Topping: {item.selectedTopping}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 space-y-1 text-neutral-600 dark:text-neutral-400">
                      <div className="flex justify-between">
                        <span>Dirección:</span>
                        <span className="font-medium text-neutral-900 dark:text-white">
                          {order.customer.address}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Envío:</span>
                        <span className="font-mono">
                          {order.deliveryCost === 0 ? 'Gratis' : `S/ ${order.deliveryCost.toFixed(2)}`}
                        </span>
                      </div>
                      {order.discount > 0 && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Descuento:</span>
                          <span className="font-mono">- S/ {order.discount.toFixed(2)}</span>
                        </div>
                      )}
                      {order.tip > 0 && (
                        <div className="flex justify-between">
                          <span>Propina:</span>
                          <span className="font-mono">S/ {order.tip.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
