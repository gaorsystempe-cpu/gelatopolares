import React, { useState } from 'react';
import { Product, Order, StoreConfig, OrderStatus } from '../types';
import { X, Shield, Package, DollarSign, Phone, Check, RefreshCw, AlertCircle, ShoppingBag, Truck } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onToggleProductAvailability: (productId: string) => void;
  onUpdateProductPrice: (productId: string, newPrice: number) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  storeConfig: StoreConfig;
  onUpdateStoreConfig: (config: StoreConfig) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  products,
  onToggleProductAvailability,
  onUpdateProductPrice,
  orders,
  onUpdateOrderStatus,
  storeConfig,
  onUpdateStoreConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'settings'>('inventory');
  const [phoneInput, setPhoneInput] = useState(storeConfig.phone);
  const [isOpenNow, setIsOpenNow] = useState(storeConfig.isOpenNow);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStoreConfig({
      ...storeConfig,
      phone: phoneInput.trim().replace(/\D/g, ''),
      isOpenNow,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const totalSales = orders.reduce((sum, ord) => sum + ord.total, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 border border-neutral-200 dark:border-neutral-800 animate-slide-up">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-neutral-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base leading-tight">
                Panel de Gestión en Vivo - Polares
              </h3>
              <span className="text-[11px] text-amber-400 font-medium">
                Control de Stock, Pedidos y WhatsApp
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar panel admin"
            className="w-8 h-8 rounded-xl bg-neutral-800 text-neutral-300 flex items-center justify-center hover:bg-neutral-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850 px-4 pt-2 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'inventory'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Inventario & Stock ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'orders'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Pedidos en Vivo ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'settings'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Configuración WhatsApp</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {activeTab === 'inventory' && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-between text-xs">
                <span className="text-amber-900 dark:text-amber-200">
                  Los cambios de stock y precio se reflejan <strong>en tiempo real</strong> para los clientes.
                </span>
                <span className="font-mono text-neutral-500 text-[11px]">Sincronización activa</span>
              </div>

              <div className="space-y-2">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 rounded-xl object-cover border border-neutral-200 dark:border-neutral-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                          {prod.name}
                        </h4>
                        <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                          {prod.categoryName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* Price editor */}
                      <div className="flex items-center gap-1 bg-white dark:bg-neutral-700 px-2 py-1 rounded-xl border border-neutral-200 dark:border-neutral-600">
                        <span className="text-[10px] font-mono text-neutral-500">S/</span>
                        <input
                          type="number"
                          step="0.5"
                          value={prod.price}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            if (!isNaN(val) && val >= 0) {
                              onUpdateProductPrice(prod.id, val);
                            }
                          }}
                          className="w-14 text-xs font-mono font-bold text-neutral-900 dark:text-white bg-transparent focus:outline-none"
                        />
                      </div>

                      {/* Stock toggle */}
                      <button
                        onClick={() => onToggleProductAvailability(prod.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          prod.isAvailable
                            ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {prod.isAvailable ? 'En Stock' : 'Agotado'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block">Total Órdenes</span>
                  <span className="text-xl font-bold font-mono text-neutral-900 dark:text-white">{orders.length}</span>
                </div>
                <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block">Ventas Registradas</span>
                  <span className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">S/ {totalSales.toFixed(2)}</span>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-500">
                  No hay pedidos registrados en esta sesión aún.
                </div>
              ) : (
                <div className="space-y-2">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-mono font-bold text-neutral-900 dark:text-white">
                            #{ord.orderNumber}
                          </span>
                          <span className="text-neutral-500 text-[10px] ml-2">
                            {ord.customer.fullName} ({ord.customer.phone})
                          </span>
                        </div>
                        <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                          S/ {ord.total.toFixed(2)}
                        </span>
                      </div>

                      {/* Status changer buttons */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[10px] font-semibold text-neutral-500">Estado:</span>
                        {(['recibido', 'preparando', 'en_camino', 'entregado'] as OrderStatus[]).map((st) => (
                          <button
                            key={st}
                            onClick={() => onUpdateOrderStatus(ord.id, st)}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold capitalize transition-all cursor-pointer ${
                              ord.status === st
                                ? 'bg-amber-500 text-neutral-950 shadow-xs'
                                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300'
                            }`}
                          >
                            {st.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 space-y-3">
                <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider block">
                  Número de WhatsApp Receptor de Pedidos
                </span>
                <p className="text-[11px] text-neutral-500">
                  Ingresa el número internacional con código de país 51 (Perú).
                </p>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="Ej. 51944774086 o 51970380415"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                    Estado de Atención en Vivo
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Muestra si la heladería está abierta o cerrada
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpenNow(!isOpenNow)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isOpenNow
                      ? 'bg-emerald-500 text-white'
                      : 'bg-rose-500 text-white'
                  }`}
                >
                  {isOpenNow ? 'Abierto' : 'Cerrado'}
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer font-display"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Cambios Guardados con Éxito!</span>
                    </>
                  ) : (
                    <span>Guardar Configuración</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
