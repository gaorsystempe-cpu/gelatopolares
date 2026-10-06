export type CategoryId = 'todos' | 'potes' | 'waffles' | 'bebidas' | 'cafeteria';

export interface GelatoFlavor {
  id: string;
  name: string;
  description: string;
  isPopular?: boolean;
  isVegan?: boolean;
  colorHex: string;
}

export interface ProductOption {
  id: string;
  name: string;
  priceDelta: number;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  maxFlavors?: number;
  includesCones?: number;
  ingredients?: string[];
  prepTimeMinutes?: number;
  isAvailable: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedFlavors: string[];
  selectedTopping?: string;
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export interface DeliveryZone {
  id: string;
  name: string;
  price: number;
  estMinutes: string;
}

export type OrderStatus = 'recibido' | 'preparando' | 'en_camino' | 'entregado';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  timestamp: number;
  items: CartItem[];
  customer: {
    fullName: string;
    phone: string;
    address: string;
    district: string;
    reference: string;
    deliveryType: 'delivery' | 'pickup';
  };
  subtotal: number;
  discount: number;
  deliveryCost: number;
  tip: number;
  total: number;
  couponCode?: string;
  paymentMethod: 'yape' | 'bcp' | 'plin' | 'efectivo';
  status: OrderStatus;
  whatsappMessage: string;
}

export interface PromotionSlide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  buttonText: string;
  actionCategoryId?: CategoryId;
  actionProductId?: string;
  bgGradient: string;
  image: string;
}

export interface StoreConfig {
  name: string;
  tagline: string;
  phone: string;
  whatsappFormatted: string;
  address: string;
  openHoursWeekday: string;
  openHoursSunday: string;
  isOpenNow: boolean;
  yapeNumber: string;
  yapeHolder: string;
  bcpAccount: string;
  bcpCci: string;
  bcpHolder: string;
  plinNumber: string;
  plinHolder: string;
}
