import React, { useState } from 'react';
import { CartItem, DeliveryZone, Order, StoreConfig } from '../types';
import { X, Copy, Check, MapPin, Phone, User, Send, Smartphone, Building, Sparkles, CheckCircle2 } from 'lucide-react';
import { DELIVERY_ZONES } from '../data/catalog';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  selectedZone: DeliveryZone;
  onSelectZone: (zone: DeliveryZone) => void;
  tip: number;
  couponCode: string;
  discountAmount: number;
  subtotal: number;
  total: number;
  storeConfig: StoreConfig;
  onOrderCreated: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  selectedZone,
  onSelectZone,
  tip,
  couponCode,
  discountAmount,
  subtotal,
  total,
  storeConfig,
  onOrderCreated,
}) => {
  if (!isOpen) return null;

  // Form states
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>(
    selectedZone.id === 'pickup' ? 'pickup' : 'delivery'
  );
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [reference, setReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'bcp' | 'plin' | 'efectivo'>('yape');
  const [cashAmount, setCashAmount] = useState('');

  // UI helpers
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2200);
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Por favor ingresa tu nombre y apellido';
    if (!phone.trim() || phone.trim().length < 8) errs.phone = 'Ingresa un número de teléfono o WhatsApp válido';
    if (deliveryType === 'delivery') {
      if (!address.trim()) errs.address = 'Ingresa tu dirección de entrega exacta';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate random 4 digit code
    const orderNum = `POL-${Math.floor(1000 + Math.random() * 9000)}`;
    const effectiveDeliveryCost = deliveryType === 'pickup' ? 0 : selectedZone.price;
    const finalTotal = subtotal - discountAmount + effectiveDeliveryCost + tip;

    // Build structured WhatsApp message
    let message = `🍨 *NUEVO PEDIDO POLARES GELATO* #${orderNum}\n`;
    message += `───────────────────────\n`;
    message += `👤 *Cliente:* ${fullName.trim()}\n`;
    message += `📱 *Teléfono:* ${phone.trim()}\n`;
    message += `📍 *Modalidad:* ${deliveryType === 'delivery' ? `Delivery a ${selectedZone.name}` : 'Recojo en Tienda'}\n`;

    if (deliveryType === 'delivery') {
      message += `🏠 *Dirección:* ${address.trim()}\n`;
      if (reference.trim()) message += `🔍 *Referencia:* ${reference.trim()}\n`;
    } else {
      message += `🏪 *Punto de Recojo:* ${storeConfig.address}\n`;
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
    message += `• Delivery: S/ ${effectiveDeliveryCost.toFixed(2)}\n`;
    if (tip > 0) {
      message += `• Propina repartidor: S/ ${tip.toFixed(2)}\n`;
    }
    message += `• *TOTAL A PAGAR: S/ ${finalTotal.toFixed(2)}*\n\n`;

    const methodNames: Record<string, string> = {
      yape: 'Yape',
      bcp: 'Transferencia BCP',
      plin: 'Plin',
      efectivo: `Efectivo contra entrega ${cashAmount ? `(Paga con S/ ${cashAmount})` : ''}`,
    };
    message += `💰 *Método elegido:* ${methodNames[paymentMethod] || paymentMethod}\n`;
    message += `───────────────────────\n`;
    message += `📸 _Adjunto captura de pago (o preparo el efectivo). ¡Muchas gracias!_`;

    const now = new Date();
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: orderNum,
      date: now.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      items: [...items],
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: deliveryType === 'delivery' ? address.trim() : storeConfig.address,
        district: deliveryType === 'delivery' ? selectedZone.name : 'Miraflores (Tienda)',
        reference: reference.trim(),
        deliveryType,
      },
      subtotal,
      discount: discountAmount,
      deliveryCost: effectiveDeliveryCost,
      tip,
      total: finalTotal,
      couponCode: couponCode || undefined,
      paymentMethod,
      status: 'recibido',
      whatsappMessage: message,
    };

    onOrderCreated(newOrder);
    setCreatedOrder(newOrder);

    // Open WhatsApp directly
    const whatsappUrl = `https://wa.me/${storeConfig.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleOpenWhatsAppAgain = (order: Order) => {
    const whatsappUrl = `https://wa.me/${storeConfig.phone}?text=${encodeURIComponent(order.whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs transition-opacity animate-fade-in overflow-y-auto">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Card */}
      <div className="relative w-full max-w-lg max-h-[92vh] bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 border border-neutral-200 dark:border-neutral-800 animate-slide-up my-auto">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-neutral-50 dark:bg-neutral-850">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white leading-tight">
                {createdOrder ? '¡Pedido Generado con Éxito!' : 'Datos de Envío & Pago'}
              </h3>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {createdOrder ? `Orden #${createdOrder.orderNumber}` : 'Polares Gelato Delivery WhatsApp'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-8 h-8 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 no-scrollbar">
          {createdOrder ? (
            /* Success confirmation screen */
            <div className="space-y-5 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="font-display font-extrabold text-xl text-neutral-900 dark:text-white mb-1">
                  ¡Pedido Registrado con Éxito!
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto">
                  Tu pedido <strong className="text-amber-500 font-mono font-bold">#{createdOrder.orderNumber}</strong> fue guardado en tu historial y el chat de WhatsApp fue iniciado.
                </p>
              </div>

              {/* Order quick snapshot card */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-neutral-500">Monto total:</span>
                  <span className="font-extrabold font-mono text-base text-amber-600 dark:text-amber-400">
                    S/ {createdOrder.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Destinatario:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {createdOrder.customer.fullName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Entrega:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {createdOrder.customer.district}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Método de pago:</span>
                  <span className="uppercase font-mono font-bold text-neutral-900 dark:text-white">
                    {createdOrder.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => handleOpenWhatsAppAgain(createdOrder)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all cursor-pointer font-display"
                >
                  <Send className="w-4 h-4" />
                  <span>Reabrir Chat en WhatsApp</span>
                </button>

                <button
                  onClick={() => copyToClipboard(createdOrder.whatsappMessage, 'msg_copy')}
                  className="w-full py-2.5 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-neutral-200 dark:border-neutral-700"
                >
                  {copiedKey === 'msg_copy' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-700 dark:text-emerald-300 font-bold">¡Mensaje copiado al portapapeles!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar texto del pedido (por si no abrió WhatsApp)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="text-xs text-neutral-500 dark:text-neutral-400 hover:underline pt-2 inline-block cursor-pointer"
                >
                  Volver al Catálogo
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              {/* Delivery type tab selector */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    deliveryType === 'delivery'
                      ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>Delivery a Domicilio</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    deliveryType === 'pickup'
                      ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Building className="w-3.5 h-3.5 text-amber-500" />
                  <span>Recojo en Tienda</span>
                </button>
              </div>

              {/* Personal details fields */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider block">
                  1. Tus Datos de Contacto
                </span>

                <div>
                  <label className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Nombre y Apellidos *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Juan Pérez"
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-[10px] text-rose-500 mt-0.5 block">{errors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. 987 654 321"
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-[10px] text-rose-500 mt-0.5 block">{errors.phone}</span>
                  )}
                </div>
              </div>

              {/* Shipping address fields */}
              {deliveryType === 'delivery' ? (
                <div className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider block">
                    2. Dirección de Envío (Huancayo)
                  </span>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Distrito de Huancayo *
                    </label>
                    <select
                      value={selectedZone.id}
                      onChange={(e) => {
                        const zone = DELIVERY_ZONES.find((z) => z.id === e.target.value);
                        if (zone) onSelectZone(zone);
                      }}
                      className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                    >
                      {DELIVERY_ZONES.filter((z) => z.id !== 'pickup').map((zone) => (
                        <option key={zone.id} value={zone.id}>
                          {zone.name} — Envío S/ {zone.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Dirección exacta (Calle / Av. / N°) *
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ej. Calle Los Pinos 240, Dpto 402"
                        className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    {errors.address && (
                      <span className="text-[10px] text-rose-500 mt-0.5 block">{errors.address}</span>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Referencia de entrega (opcional)
                    </label>
                    <input
                      type="text"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder="Ej. Frente al parque, rejas negras, tocar timbre 4"
                      className="w-full text-xs px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs space-y-1">
                  <span className="font-bold text-amber-900 dark:text-amber-200 block">
                    Punto de Recojo en Tienda:
                  </span>
                  <p className="text-amber-800 dark:text-amber-300">
                    {storeConfig.address}
                  </p>
                  <p className="text-[10px] text-amber-700 dark:text-amber-400">
                    Tu pedido estará listo en ~15 minutos después de confirmar en WhatsApp. Costo de envío: <strong>S/ 0.00</strong>
                  </p>
                </div>
              )}

              {/* Payment methods section with interactive tabs */}
              <div className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider block">
                  3. Métodos de Pago Locales
                </span>

                {/* Tabs */}
                <div className="grid grid-cols-4 gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('yape')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'yape'
                        ? 'bg-[#732282] text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    Yape
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bcp')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'bcp'
                        ? 'bg-[#002a8f] text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    BCP
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('plin')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'plin'
                        ? 'bg-[#00a896] text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    Plin
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('efectivo')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'efectivo'
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    Efectivo
                  </button>
                </div>

                {/* Tab content panel */}
                {paymentMethod === 'yape' && (
                  <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 text-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-[#732282]" />
                        <span className="font-bold text-[#732282] dark:text-purple-300">
                          Yapear al Número Oficial
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500">
                        {storeConfig.yapeHolder}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 bg-white dark:bg-neutral-800 rounded-xl border border-purple-200 dark:border-purple-800">
                      <div>
                        <span className="text-[10px] text-neutral-500 block">Número Yape:</span>
                        <span className="font-mono font-extrabold text-sm text-neutral-900 dark:text-white">
                          {storeConfig.yapeNumber}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(storeConfig.yapeNumber, 'yape')}
                        className="px-3 py-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/60 dark:hover:bg-purple-800 text-[#732282] dark:text-purple-200 font-bold text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                      >
                        {copiedKey === 'yape' ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[10px] text-purple-900 dark:text-purple-300 leading-relaxed">
                      💡 <strong>Paso final:</strong> Al hacer click en &quot;Confirmar Pedido&quot;, se abrirá el chat de WhatsApp corporativo donde podrás enviar tu comprobante de Yape.
                    </p>
                  </div>
                )}

                {paymentMethod === 'bcp' && (
                  <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 text-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Building className="w-4 h-4 text-[#002a8f] dark:text-blue-400" />
                        <span className="font-bold text-[#002a8f] dark:text-blue-300">
                          Transferencia Bancaria BCP
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {storeConfig.bcpHolder}
                      </span>
                    </div>

                    {/* Cuenta Corriente */}
                    <div className="flex items-center justify-between p-2 bg-white dark:bg-neutral-800 rounded-xl border border-blue-200 dark:border-blue-800">
                      <div>
                        <span className="text-[10px] text-neutral-500 block">Cta Corriente Soles:</span>
                        <span className="font-mono font-bold text-xs text-neutral-900 dark:text-white">
                          {storeConfig.bcpAccount}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(storeConfig.bcpAccount, 'bcp_cta')}
                        className="px-2.5 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/60 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-semibold flex items-center gap-1 active:scale-95 cursor-pointer"
                      >
                        {copiedKey === 'bcp_cta' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'bcp_cta' ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>

                    {/* CCI */}
                    <div className="flex items-center justify-between p-2 bg-white dark:bg-neutral-800 rounded-xl border border-blue-200 dark:border-blue-800">
                      <div>
                        <span className="text-[10px] text-neutral-500 block">CCI Interbancario:</span>
                        <span className="font-mono font-bold text-[11px] text-neutral-900 dark:text-white">
                          {storeConfig.bcpCci}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(storeConfig.bcpCci, 'bcp_cci')}
                        className="px-2.5 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/60 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-semibold flex items-center gap-1 active:scale-95 cursor-pointer"
                      >
                        {copiedKey === 'bcp_cci' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'bcp_cci' ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {paymentMethod === 'plin' && (
                  <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 text-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-800 dark:text-teal-300">
                        Plin (Interbank / BBVA / Scotiabank)
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {storeConfig.plinHolder}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 bg-white dark:bg-neutral-800 rounded-xl border border-teal-200 dark:border-teal-800">
                      <div>
                        <span className="text-[10px] text-neutral-500 block">Número Plin:</span>
                        <span className="font-mono font-extrabold text-sm text-neutral-900 dark:text-white">
                          {storeConfig.plinNumber}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(storeConfig.plinNumber, 'plin')}
                        className="px-3 py-1.5 rounded-lg bg-teal-100 hover:bg-teal-200 dark:bg-teal-900/60 dark:hover:bg-teal-800 text-teal-800 dark:text-teal-200 font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'plin' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'plin' ? '¡Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {paymentMethod === 'efectivo' && (
                  <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs space-y-2">
                    <label className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block">
                      ¿Con cuánto vas a pagar? (Para llevarte vuelto exacto):
                    </label>
                    <input
                      type="text"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                      placeholder="Ej. S/ 50.00 o S/ 100.00 (o Monto exacto)"
                      className="w-full text-xs px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}
              </div>

              {/* Price summary review */}
              <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-850 flex items-center justify-between font-bold text-xs">
                <span className="text-neutral-700 dark:text-neutral-300">Total a Pagar en Soles:</span>
                <span className="text-base font-extrabold font-mono text-amber-600 dark:text-amber-400">
                  S/ {(subtotal - discountAmount + (deliveryType === 'pickup' ? 0 : selectedZone.price) + tip).toFixed(2)}
                </span>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:brightness-105 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer font-display"
              >
                <Send className="w-4 h-4 stroke-[2.2]" />
                <span>Confirmar y Enviar Pedido a WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
