import React, { useState } from 'react';
import { CartItem, StoreConfig } from '../types';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Tag,
  Check,
  ShoppingBag,
  Sparkles,
  Send,
  Copy,
  CheckCircle2,
  Phone,
  User,
  MapPin,
  FileText,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  couponCode: string;
  discountAmount: number;
  onApplyCoupon: (code: string) => { success: boolean; message: string };
  onRemoveCoupon: () => void;
  subtotal: number;
  total: number;
  storeConfig: StoreConfig;
  onOrderCompleted: (orderData: any) => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  couponCode,
  discountAmount,
  onApplyCoupon,
  onRemoveCoupon,
  subtotal,
  total,
  storeConfig,
  onOrderCompleted,
  onExplore,
}) => {
  // Customer info form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [reference, setReference] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [copiedYape, setCopiedYape] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = onApplyCoupon(couponInput.trim());
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedYape(true);
    setTimeout(() => setCopiedYape(false), 2000);
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Por favor escribe tu nombre y apellido';
    if (!phone.trim() || phone.trim().length < 8) errs.phone = 'Ingresa un número de celular válido';
    if (!address.trim()) errs.address = 'Escribe tu dirección de entrega exacta';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;

    // Generate random 4 digit code
    const orderNum = `LUC-${Math.floor(1000 + Math.random() * 9000)}`;

    // Build structured WhatsApp message
    let message = `🍨 *NUEVO PEDIDO LÚCUMA - POSTRES, HELADOS & JUGOS* #${orderNum}\n`;
    message += `───────────────────────\n`;
    message += `👤 *Cliente:* ${fullName.trim()}\n`;
    message += `📱 *Teléfono:* ${phone.trim()}\n`;
    message += `🏠 *Dirección de Entrega:* ${address.trim()}\n`;
    if (reference.trim()) {
      message += `🔍 *Referencia:* ${reference.trim()}\n`;
    }

    message += `\n🛍️ *PRODUCTOS:* \n`;
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}* (x${item.quantity}) - S/ ${item.totalPrice.toFixed(2)}\n`;
      if (item.selectedFlavors.length > 0) {
        message += `   🍨 Sabores: ${item.selectedFlavors.join(' + ')}\n`;
      }
      if (item.selectedTopping) {
        message += `   ✨ Topping: ${item.selectedTopping}\n`;
      }
      if (item.specialInstructions) {
        message += `   📝 Nota: "${item.specialInstructions}"\n`;
      }
    });

    message += `\n💳 *DETALLE DE PAGO:* \n`;
    message += `• Subtotal: S/ ${subtotal.toFixed(2)}\n`;
    if (discountAmount > 0) {
      message += `• Descuento (${couponCode}): - S/ ${discountAmount.toFixed(2)}\n`;
    }
    message += `• *TOTAL A PAGAR: S/ ${total.toFixed(2)}*\n\n`;
    message += `🟣 *Método de Pago:* Yape (${storeConfig.yapeNumber})\n`;
    message += `📸 _(Adjunto la captura del comprobante Yape a continuación)_`;

    // Construct WhatsApp direct link
    const cleanPhone = storeConfig.phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`;

    // Create order record
    const newOrder = {
      id: `order_${Date.now()}`,
      orderNumber: orderNum,
      date: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      items: [...items],
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        reference: reference.trim(),
        deliveryType: 'delivery',
      },
      subtotal,
      discount: discountAmount,
      deliveryCost: 0,
      tip: 0,
      total,
      couponCode: couponCode || undefined,
      paymentMethod: 'yape',
      status: 'recibido',
      whatsappMessage: message,
    };

    onOrderCompleted(newOrder);
    setOrderSuccess(true);

    // Redirect to WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank') || (window.location.href = whatsappUrl);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-neutral-900 shadow-2xl flex flex-col z-10 border-l border-neutral-200 dark:border-neutral-800 animate-slide-left">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-neutral-50 dark:bg-neutral-850">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white leading-tight">
                Tu Pedido Lúcuma
              </h3>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {items.length} {items.length === 1 ? 'producto agregado' : 'productos agregados'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar pedido"
            className="w-8 h-8 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        {items.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center animate-bounce">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-neutral-900 dark:text-white mb-1">
                Tu pedido está vacío
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
                Explora nuestros helados de lúcuma, postres y jugos para armar tu pedido.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onExplore();
              }}
              className="px-6 py-3 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer font-display"
            >
              Ver Catálogo
            </button>
          </div>
        ) : orderSuccess ? (
          /* Success confirmation */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="font-display font-extrabold text-xl text-neutral-900 dark:text-white mb-1">
                ¡Pedido Realizado con Éxito!
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-xs mx-auto">
                Tu pedido se ha generado correctamente y se está conectando con el negocio.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-800 text-white font-bold text-xs cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        ) : (
          /* Order Form & Items */
          <div className="flex-1 overflow-y-auto p-4 space-y-5 no-scrollbar">
            {/* 1. Selected Products List */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider block">
                1. Productos Seleccionados
              </span>

              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 flex gap-3 items-center shadow-xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-neutral-200 dark:border-neutral-700"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-xs text-neutral-900 dark:text-white truncate">
                        {item.product.name}
                      </h4>
                      {item.selectedFlavors.length > 0 && (
                        <p className="text-[10px] text-amber-600 dark:text-amber-400 truncate">
                          {item.selectedFlavors.join(' + ')}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-mono font-bold text-xs text-neutral-900 dark:text-white">
                          S/ {item.totalPrice.toFixed(2)}
                        </span>

                        <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-700 rounded-lg p-0.5 border border-neutral-200 dark:border-neutral-600">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-5 h-5 rounded-md flex items-center justify-center text-neutral-600 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-5 h-5 rounded-md flex items-center justify-center text-neutral-600 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="text-neutral-400 hover:text-rose-500 p-1 cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-500" />
                  Cupón de Descuento
                </span>
                {couponCode && (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    -{discountAmount > 0 ? `S/ ${discountAmount.toFixed(2)}` : 'Aplicado'}
                  </span>
                )}
              </div>

              {couponCode ? (
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                      {couponCode}
                    </span>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-[11px] text-rose-500 hover:underline font-semibold cursor-pointer"
                  >
                    Quitar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Ej. LUCUMA10"
                    className="flex-1 text-xs px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white uppercase font-mono focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-700 text-white text-xs font-bold transition-all active:scale-95 cursor-pointer"
                  >
                    Aplicar
                  </button>
                </form>
              )}

              {couponFeedback && (
                <p className={`text-[11px] font-medium ${couponFeedback.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {couponFeedback.message}
                </p>
              )}
            </div>

            {/* 2. Customer Delivery Data Form */}
            <div className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider block">
                2. Datos de Entrega
              </span>

              {/* Name */}
              <div>
                <label className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Tu Nombre y Apellido *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. María Ramos"
                    className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 ${
                      errors.fullName ? 'border-rose-500' : 'border-neutral-200 dark:border-neutral-700'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-[10px] text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Número de Teléfono / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. 987 654 321"
                    className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 ${
                      errors.phone ? 'border-rose-500' : 'border-neutral-200 dark:border-neutral-700'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>}
              </div>

              {/* Delivery Address */}
              <div>
                <label className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Dirección de Entrega *
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ej. Av. Los Robles 450, Dpto 302"
                    className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 ${
                      errors.address ? 'border-rose-500' : 'border-neutral-200 dark:border-neutral-700'
                    }`}
                  />
                </div>
                {errors.address && <p className="text-[10px] text-rose-500 mt-1">{errors.address}</p>}
              </div>

              {/* Reference (optional) */}
              <div>
                <label className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Referencia de entrega (opcional)
                </label>
                <div className="relative">
                  <FileText className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="Ej. Frente al parque, rejas negras"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* 3. Yape Payment Details Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    Y
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral-900 dark:text-white leading-tight">
                      Datos de Pago Yape
                    </h4>
                    <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                      Pago al instante
                    </span>
                  </div>
                </div>

                <span className="text-xs font-mono font-extrabold text-neutral-900 dark:text-white">
                  S/ {total.toFixed(2)}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400 text-[11px]">Número Yape:</span>
                  <div className="flex items-center gap-1.5">
                    <strong className="font-mono font-bold text-purple-700 dark:text-purple-300">
                      {storeConfig.yapeNumber}
                    </strong>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(storeConfig.yapeNumber)}
                      className="p-1 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 cursor-pointer text-[10px]"
                      title="Copiar número"
                    >
                      {copiedYape ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400 text-[11px]">Titular:</span>
                  <strong className="text-neutral-800 dark:text-neutral-200 text-[11px] text-right">
                    {storeConfig.yapeHolder}
                  </strong>
                </div>
              </div>

              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 text-center">
                Al enviar el pedido, adjunta tu captura de Yape en el chat de WhatsApp.
              </p>
            </div>
          </div>
        )}

        {/* Footer with Total and Submit Order Button */}
        {items.length > 0 && !orderSuccess && (
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850 shrink-0 space-y-3 pb-safe">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block">Total a Pagar</span>
                {discountAmount > 0 && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                    Ahorraste S/ {discountAmount.toFixed(2)}
                  </span>
                )}
              </div>
              <span className="font-mono font-extrabold text-xl text-neutral-900 dark:text-white">
                S/ {total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleSubmitOrder}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-[0.98] transition-all cursor-pointer font-display"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>Hacer el Pedido</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
