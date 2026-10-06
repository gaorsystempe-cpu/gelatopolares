import React, { useState, useEffect, useMemo } from 'react';
import {
  Product,
  CartItem,
  Order,
  DeliveryZone,
  CategoryId,
  StoreConfig,
  PromotionSlide,
  OrderStatus,
} from './types';
import {
  STORE_DEFAULT_CONFIG,
  INITIAL_PRODUCTS,
  PROMOTIONS,
  DELIVERY_ZONES,
} from './data/catalog';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { PromoSlider } from './components/PromoSlider';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { FloatingCartBar } from './components/FloatingCartBar';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrdersView } from './components/OrdersView';
import { FavoritesView } from './components/FavoritesView';
import { AdminModal } from './components/AdminModal';
import {
  Search,
  SlidersHorizontal,
  Flame,
  IceCream,
  GlassWater,
  Coffee,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Percent,
} from 'lucide-react';

export const App: React.FC = () => {
  // Splash Screen view state
  const [showSplash, setShowSplash] = useState(true);

  // Theme state (Dark mode native)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('polares_dark_mode');
    return saved !== null ? saved === 'true' : true;
  });

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<NavTab>('inicio');

  // Business and Catalog State (Synchronized in real-time)
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(() => {
    const saved = localStorage.getItem('polares_store_config');
    return saved ? JSON.parse(saved) : STORE_DEFAULT_CONFIG;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('polares_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('polares_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Favorites state
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('polares_favorites');
    return saved ? JSON.parse(saved) : ['bubble-waffle', 'pote-1-litro'];
  });

  // Orders history state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('polares_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // District / Shipping Zone state
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(DELIVERY_ZONES[0]);
  const [tip, setTip] = useState<number>(2);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Search & Filtering state for Explorar tab
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('todos');
  const [sortBy, setSortBy] = useState<'populares' | 'precio_menor' | 'precio_mayor' | 'rating'>('populares');

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('polares_dark_mode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('polares_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('polares_favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    localStorage.setItem('polares_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('polares_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('polares_storeConfig', JSON.stringify(storeConfig));
  }, [storeConfig]);

  // Derived financial totals
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cartItems]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const deliveryCost = useMemo(() => {
    return selectedZone.id === 'pickup' ? 0 : selectedZone.price;
  }, [selectedZone]);

  const calculatedDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon === 'POLARES10') return subtotal * 0.10;
    if (appliedCoupon === 'GELATOLOVE') return subtotal * 0.15;
    if (appliedCoupon === 'VERANO') return Math.min(5, subtotal);
    if (appliedCoupon === 'ENVIOGRATIS') return deliveryCost;
    return 0;
  }, [appliedCoupon, subtotal, deliveryCost]);

  const grandTotal = useMemo(() => {
    const val = subtotal - calculatedDiscount + deliveryCost + tip;
    return Math.max(0, val);
  }, [subtotal, calculatedDiscount, deliveryCost, tip]);

  // Cart item quantities map for quick +/- display
  const cartQuantities = useMemo(() => {
    const map: { [productId: string]: number } = {};
    cartItems.forEach((item) => {
      map[item.productId] = (map[item.productId] || 0) + item.quantity;
    });
    return map;
  }, [cartItems]);

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    quantity: number,
    selectedFlavors: string[],
    selectedTopping?: string,
    specialInstructions?: string
  ) => {
    const cartItemId = `${product.id}_${selectedFlavors.sort().join('_')}_${selectedTopping || ''}`;
    const existingIndex = cartItems.findIndex((item) => item.cartItemId === cartItemId);

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      updated[existingIndex].totalPrice = updated[existingIndex].quantity * updated[existingIndex].unitPrice;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartItemId,
        productId: product.id,
        product,
        quantity,
        selectedFlavors,
        selectedTopping,
        specialInstructions,
        unitPrice: product.price,
        totalPrice: product.price * quantity,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleQuickAdd = (product: Product) => {
    // If product has options or maxFlavors > 1, open modal for proper taste selection
    if (product.maxFlavors && product.maxFlavors > 1) {
      setSelectedProductForModal(product);
      return;
    }
    // Otherwise 1-click quick add
    handleAddToCart(product, 1, ['Pistacchio Puro di Bronte']);
  };

  const handleQuickDecrease = (product: Product) => {
    const itemIndex = cartItems.findIndex((item) => item.productId === product.id);
    if (itemIndex > -1) {
      const item = cartItems[itemIndex];
      if (item.quantity > 1) {
        handleUpdateQuantity(item.cartItemId, item.quantity - 1);
      } else {
        handleRemoveItem(item.cartItemId);
      }
    }
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPrice,
            }
          : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems(cartItems.filter((item) => item.cartItemId !== cartItemId));
  };

  // Coupon handler
  const handleApplyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'POLARES10') {
      setAppliedCoupon('POLARES10');
      setCouponDiscount(subtotal * 0.10);
      return { success: true, message: '¡Cupón POLARES10 aplicado! Tienes 10% de descuento.' };
    }
    if (normalized === 'GELATOLOVE') {
      setAppliedCoupon('GELATOLOVE');
      setCouponDiscount(subtotal * 0.15);
      return { success: true, message: '¡Cupón GELATOLOVE aplicado! Tienes 15% de descuento.' };
    }
    if (normalized === 'VERANO') {
      setAppliedCoupon('VERANO');
      setCouponDiscount(5);
      return { success: true, message: '¡Cupón VERANO aplicado! S/ 5.00 de descuento directo.' };
    }
    if (normalized === 'ENVIOGRATIS') {
      setAppliedCoupon('ENVIOGRATIS');
      setCouponDiscount(deliveryCost);
      return { success: true, message: '¡Cupón ENVIOGRATIS aplicado! Tu envío ahora es gratis.' };
    }
    return { success: false, message: 'Cupón no válido o expirado. Prueba POLARES10.' };
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    setCouponDiscount(0);
  };

  // Favorite toggle
  const handleToggleFavorite = (productId: string) => {
    if (favoriteIds.includes(productId)) {
      setFavoriteIds(favoriteIds.filter((id) => id !== productId));
    } else {
      setFavoriteIds([...favoriteIds, productId]);
    }
  };

  // Order created callback
  const handleOrderCreated = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    setCartItems([]);
    setAppliedCoupon('');
    setCouponDiscount(0);

    // Sync to backend API in background
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    }).catch((err) => console.log('Offline mode / local cache preserved', err));
  };

  // Real-time admin management handlers
  const handleToggleProductAvailability = (productId: string) => {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p
      )
    );
  };

  const handleUpdateProductPrice = (productId: string, newPrice: number) => {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, price: newPrice } : p
      )
    );
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status } : o))
    );

    // Sync to backend API
    fetch(`/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch((err) => console.log('Offline mode status', err));
  };

  // Filtered and sorted products for catalog
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'todos' || p.category === selectedCategory;
      const matchesQuery =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.ingredients &&
          p.ingredients.some((ing) =>
            ing.toLowerCase().includes(searchQuery.toLowerCase())
          ));
      return matchesCategory && matchesQuery;
    }).sort((a, b) => {
      if (sortBy === 'precio_menor') return a.price - b.price;
      if (sortBy === 'precio_mayor') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const favoriteProductsList = useMemo(() => {
    return products.filter((p) => favoriteIds.includes(p.id));
  }, [products, favoriteIds]);

  const featuredProductsList = useMemo(() => {
    return products.filter((p) => p.isFeatured && p.isAvailable);
  }, [products]);

  // Categories list
  const categoriesConfig = [
    { id: 'todos' as CategoryId, label: 'Todos', icon: Sparkles },
    { id: 'potes' as CategoryId, label: 'Potes Para Llevar', icon: IceCream },
    { id: 'waffles' as CategoryId, label: 'Bubble Waffles', icon: Flame },
    { id: 'bebidas' as CategoryId, label: 'Milkshakes', icon: GlassWater },
    { id: 'cafeteria' as CategoryId, label: 'Affogato & Café', icon: Coffee },
  ];

  // If on Splash screen, render splash screen directly
  if (showSplash) {
    return (
      <SplashScreen
        storeConfig={storeConfig}
        onEnterCatalog={(categoryId) => {
          if (categoryId) setSelectedCategory(categoryId);
          setShowSplash(false);
          setActiveTab('inicio');
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen w-full transition-colors ${darkMode ? 'dark bg-neutral-950 text-neutral-100' : 'bg-neutral-100 text-neutral-900'}`}>
      {/* Desktop App Shell Wrapper (simulating mobile device on wide screens) */}
      <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-neutral-900 shadow-2xl relative flex flex-col border-x border-neutral-200 dark:border-neutral-800">
        
        {/* Top Header */}
        <Header
          storeConfig={storeConfig}
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
          onGoToSplash={() => setShowSplash(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          cartItemCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Main Content Area based on Tab */}
        <main className="flex-1 p-3.5 sm:p-4 space-y-4">
          
          {/* TAB 1: INICIO */}
          {activeTab === 'inicio' && (
            <div className="space-y-4 pb-24">
              {/* Promotion Carousel */}
              <PromoSlider
                promotions={PROMOTIONS}
                onSelectPromo={(promo) => {
                  if (promo.actionProductId) {
                    const prod = products.find((p) => p.id === promo.actionProductId);
                    if (prod) setSelectedProductForModal(prod);
                  } else if (promo.actionCategoryId) {
                    setSelectedCategory(promo.actionCategoryId);
                    setActiveTab('explorar');
                  }
                }}
              />

              {/* Delivery info & Value bar */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 dark:text-white block leading-tight text-[11px]">
                      Delivery en {selectedZone.name}
                    </span>
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                      Empaque térmico anti-deshielo incluido
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-[10px] font-bold text-amber-600 dark:text-amber-400 cursor-pointer shadow-xs"
                >
                  Cambiar
                </button>
              </div>

              {/* Quick Category Chips */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                    Categorías
                  </span>
                  <button
                    onClick={() => setActiveTab('explorar')}
                    className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    Ver todas &gt;
                  </button>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  {categoriesConfig.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setActiveTab('explorar');
                        }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 cursor-pointer border ${
                          isSelected
                            ? 'bg-amber-500 border-amber-500 text-neutral-950 shadow-sm'
                            : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Coupon Banner */}
              <div className="p-3 rounded-2xl bg-neutral-900 text-white flex items-center justify-between border border-neutral-800 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-bold">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block leading-tight">
                      10% OFF en tu pedido
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono">
                      Usa el cupón: POLARES10
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleApplyCoupon('POLARES10');
                    setIsCartOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold active:scale-95 transition-all cursor-pointer"
                >
                  Aplicar
                </button>
              </div>

              {/* Featured Best Sellers Grid */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <h3 className="font-display font-bold text-sm text-neutral-900 dark:text-white uppercase tracking-wider">
                      Los Más Pedidos
                    </h3>
                  </div>
                  <span className="text-[11px] text-neutral-600 dark:text-neutral-300">
                    Mantecado fresco hoy
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {featuredProductsList.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantityInCart={cartQuantities[product.id] || 0}
                      isFavorite={favoriteIds.includes(product.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onQuickAdd={handleQuickAdd}
                      onQuickDecrease={handleQuickDecrease}
                      onOpenDetails={(p) => setSelectedProductForModal(p)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXPLORAR */}
          {activeTab === 'explorar' && (
            <div className="space-y-4 pb-24">
              {/* Search Bar Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar gelato, waffle, pistacho, chocolate..."
                  className="w-full text-xs pl-10 pr-3 py-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-amber-500 shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              {/* Category Segmented Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {categoriesConfig.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Sorting and Results Counter */}
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 px-0.5">
                <span>
                  Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
                </span>

                <div className="flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3" />
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="bg-transparent text-neutral-700 dark:text-neutral-300 font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="populares">Más Populares</option>
                    <option value="precio_menor">Menor Precio</option>
                    <option value="precio_mayor">Mayor Precio</option>
                    <option value="rating">Mejor Calificados</option>
                  </select>
                </div>
              </div>

              {/* Products List Grid */}
              {filteredProducts.length === 0 ? (
                <div className="p-8 text-center bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-500">
                  <p className="mb-2 font-semibold">No encontramos productos con ese filtro.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('todos');
                    }}
                    className="text-amber-500 hover:underline font-bold"
                  >
                    Restablecer búsqueda
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantityInCart={cartQuantities[product.id] || 0}
                      isFavorite={favoriteIds.includes(product.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onQuickAdd={handleQuickAdd}
                      onQuickDecrease={handleQuickDecrease}
                      onOpenDetails={(p) => setSelectedProductForModal(p)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PEDIDOS */}
          {activeTab === 'pedidos' && (
            <OrdersView
              orders={orders}
              storeConfig={storeConfig}
              onGoToCatalog={() => {
                setActiveTab('inicio');
                setSelectedCategory('todos');
              }}
            />
          )}

          {/* TAB 4: FAVORITOS */}
          {activeTab === 'favoritos' && (
            <FavoritesView
              favoriteProducts={favoriteProductsList}
              cartQuantities={cartQuantities}
              onToggleFavorite={handleToggleFavorite}
              onQuickAdd={handleQuickAdd}
              onQuickDecrease={handleQuickDecrease}
              onOpenDetails={(p) => setSelectedProductForModal(p)}
              onGoToCatalog={() => {
                setActiveTab('inicio');
                setSelectedCategory('todos');
              }}
            />
          )}
        </main>

        {/* Floating Bottom Cart Bar */}
        <FloatingCartBar
          totalItems={totalCartCount}
          totalAmount={grandTotal}
          onOpenCart={() => setIsCartOpen(true)}
          isVisible={totalCartCount > 0 && !isCartOpen && !isCheckoutOpen}
        />

        {/* Fixed Mobile Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          favoritesCount={favoriteIds.length}
          ordersCount={orders.length}
        />

        {/* Customization Modal */}
        <ProductModal
          product={selectedProductForModal}
          isOpen={selectedProductForModal !== null}
          onClose={() => setSelectedProductForModal(null)}
          onAddToCart={handleAddToCart}
          isFavorite={selectedProductForModal ? favoriteIds.includes(selectedProductForModal.id) : false}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Sliding Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
          tip={tip}
          onSelectTip={setTip}
          couponCode={appliedCoupon}
          discountAmount={calculatedDiscount}
          onApplyCoupon={handleApplyCoupon}
          onRemoveCoupon={handleRemoveCoupon}
          subtotal={subtotal}
          total={grandTotal}
          onProceedToCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
          onExplore={() => {
            setActiveTab('explorar');
          }}
        />

        {/* Checkout & Local Payment Modal with WhatsApp Redirect */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
          tip={tip}
          couponCode={appliedCoupon}
          discountAmount={calculatedDiscount}
          subtotal={subtotal}
          total={grandTotal}
          storeConfig={storeConfig}
          onOrderCreated={handleOrderCreated}
        />

        {/* Real-time Business & Stock Management Modal */}
        <AdminModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          products={products}
          onToggleProductAvailability={handleToggleProductAvailability}
          onUpdateProductPrice={handleUpdateProductPrice}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          storeConfig={storeConfig}
          onUpdateStoreConfig={setStoreConfig}
        />
      </div>
    </div>
  );
};

export default App;
