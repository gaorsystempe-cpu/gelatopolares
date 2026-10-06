import { Product, GelatoFlavor, DeliveryZone, StoreConfig, PromotionSlide } from '../types';

// Real asset paths from image generation
import imgBubbleWaffle from '../assets/images/bubble_waffle_gelato_1791312438173.jpg';
import imgGelato1L from '../assets/images/gelato_tub_1liter_1791312448427.jpg';
import imgGelato500ml from '../assets/images/gelato_tub_medium_1791312456968.jpg';
import imgGelato250ml from '../assets/images/gelato_cup_personal_1791312466672.jpg';
import imgMilkshake from '../assets/images/gelato_milkshake_1791312476756.jpg';

export const STORE_DEFAULT_CONFIG: StoreConfig = {
  name: "Polares Auténtico Gelato Italiano",
  tagline: "Gelato Artesanal Italiano | 100% Artesanal y de calidad superior",
  phone: "51944774086",
  whatsappFormatted: "+51 944 774 086",
  address: "Calle Real 640, Centro de Huancayo - Junín, Perú",
  openHoursWeekday: "10:00 a. m. - 10:00 p. m.",
  openHoursSunday: "11:00 a. m. - 6:30 p. m.",
  isOpenNow: true,
  yapeNumber: "944 774 086",
  yapeHolder: "Polares Gelato Italiano S.A.C.",
  bcpAccount: "193-9823415-0-82",
  bcpCci: "002-193-009823415082-14",
  bcpHolder: "Polares Gelato Italiano S.A.C.",
  plinNumber: "944 774 086",
  plinHolder: "Polares Gelato Italiano S.A.C.",
};

export const GELATO_FLAVORS: GelatoFlavor[] = [
  {
    id: "pistacchio",
    name: "Pistacchio Puro di Bronte",
    description: "100% pistacho italiano tostado artesanalmente de Sicilia.",
    isPopular: true,
    colorHex: "#a7c957"
  },
  {
    id: "cioccolato",
    name: "Cioccolato Fondente 70%",
    description: "Cacao belga intenso al 70%, textura densa y sedosa.",
    isPopular: true,
    colorHex: "#3e2723"
  },
  {
    id: "stracciatella",
    name: "Stracciatella Tradizionale",
    description: "Fior di latte con crujientes escamas finas de chocolate.",
    isPopular: true,
    colorHex: "#f5f5dc"
  },
  {
    id: "dulce-de-leche",
    name: "Dulce de Leche Artesanal con Vetas",
    description: "Receta casera cremosa con vetas de manjar de olla.",
    isPopular: true,
    colorHex: "#c67d3b"
  },
  {
    id: "mango-maracuya",
    name: "Mango & Maracuyá Sorbetto",
    description: "100% fruta fresca tropical, refrescante y sin lactosa.",
    isVegan: true,
    colorHex: "#f4a261"
  },
  {
    id: "frutti-di-bosco",
    name: "Frutti di Bosco (Frutos Rojos)",
    description: "Moras silvestres, arándanos y frambuesas infusionadas.",
    isVegan: true,
    colorHex: "#7b1e4a"
  },
  {
    id: "vainilla-madagascar",
    name: "Vainilla Bourbon de Madagascar",
    description: "Infusión prolongada de vainas de vainilla natural aromática.",
    colorHex: "#fbf3d5"
  },
  {
    id: "fior-di-latte",
    name: "Fior di Latte Italiano",
    description: "La pureza láctea por excelencia con crema de leche fresca.",
    colorHex: "#f8f9fa"
  },
  {
    id: "ferrero-nocciola",
    name: "Ferrero Rocher & Avellana",
    description: "Crema de gianduja con avellanas troceadas y barquillo.",
    isPopular: true,
    colorHex: "#5c4033"
  },
  {
    id: "lucuma-cremosa",
    name: "Lúcuma de Seda Cremosa",
    description: "Auténtica pulpa de lúcuma peruana con técnica de mantecado italiana.",
    isPopular: true,
    colorHex: "#d4a373"
  }
];

export const TOPPINGS_LIST = [
  "Barquillos crocantes de cortesía",
  "Fudge artesanal tibio",
  "Salsa de frutos rojos",
  "Chispas de chocolate belga",
  "Praliné de almendras y avellanas",
  "Grageas multicolor",
  "Sin toppings adicionales"
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "bubble-waffle",
    name: "Bubble Waffle con Helado",
    category: "waffles",
    categoryName: "Waffles y Especialidades",
    price: 15.90,
    originalPrice: 18.00,
    description: "Crujiente waffle burbuja recién dorado al momento, servido con 1 generosa bola de auténtico gelato italiano artesanal, fruta fresca seleccionada (fresas, mango, arándanos) y fudge de chocolate.",
    image: imgBubbleWaffle,
    rating: 4.9,
    reviewCount: 142,
    badge: "Más Pedido",
    maxFlavors: 1,
    prepTimeMinutes: 10,
    ingredients: ["Masa artesanal de waffle al huevo", "1 bola de Gelato a elección", "Fresas de valle", "Mango dulce", "Fudge artesanal"],
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "pote-1-litro",
    name: "Pote Grande de 1 Litro",
    category: "potes",
    categoryName: "Potes Para Llevar",
    price: 43.00,
    originalPrice: 48.00,
    description: "Pote térmico hermético de 1000ml que rinde de 6 a 8 porciones. Incluye hasta 2 sabores a tu elección preparados con técnica tradicional italiana + 6 conos de barquillo crujiente de cortesía.",
    image: imgGelato1L,
    rating: 5.0,
    reviewCount: 310,
    badge: "Familiar",
    maxFlavors: 2,
    includesCones: 6,
    prepTimeMinutes: 5,
    ingredients: ["1000ml de Gelato artesanal fresco", "Hasta 2 sabores", "6 conos artesanales empacados individualmente"],
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "pote-medio-litro",
    name: "Pote Mediano de 1/2 Litro",
    category: "potes",
    categoryName: "Potes Para Llevar",
    price: 24.00,
    description: "Pote térmico de 500ml ideal para 3 a 4 porciones. Mantente fresco y disfruta de hasta 2 sabores a tu elección + 4 barquillos crocantes de obsequio.",
    image: imgGelato500ml,
    rating: 4.9,
    reviewCount: 228,
    badge: "Recomendado",
    maxFlavors: 2,
    includesCones: 4,
    prepTimeMinutes: 5,
    ingredients: ["500ml de Gelato mantecado", "Hasta 2 sabores", "4 conos barquillos"],
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "pote-personal-250",
    name: "Pote Personal de 250 ml",
    category: "potes",
    categoryName: "Potes Para Llevar",
    price: 13.00,
    description: "La porción personal perfecta para deleitarte donde quieras. Incluye hasta 2 sabores a tu elección servidos en copa térmica especial anti-deshielo.",
    image: imgGelato250ml,
    rating: 4.8,
    reviewCount: 164,
    badge: "Individual",
    maxFlavors: 2,
    prepTimeMinutes: 5,
    ingredients: ["250ml de Gelato artesanal", "Hasta 2 sabores a elección"],
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "milkshake-12oz",
    name: "Milkshake Artesanal Polares",
    category: "bebidas",
    categoryName: "Bebidas y Milkshakes",
    price: 12.90,
    description: "Cremoso batido espeso de 12oz elaborado con 2 generosas bolas de gelato artesanal italiano a tu elección, leche fresca entera, copo de chantilly y jarabe veteado.",
    image: imgMilkshake,
    rating: 4.9,
    reviewCount: 189,
    badge: "Refrescante",
    maxFlavors: 2,
    prepTimeMinutes: 6,
    ingredients: ["2 bolas de gelato", "Leche fresca pasteurizada", "Crema chantilly ligera", "Sirope de chocolate o caramelo"],
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "affogato-espresso",
    name: "Affogato al Caffè Espresso",
    category: "cafeteria",
    categoryName: "Cafetería & Gelato",
    price: 11.50,
    description: "Clásico ritual italiano: 1 bola de Fior di Latte o Vainilla de Madagascar ahogada en un shot doble de espresso 100% arábica de especialidad recién extraído.",
    image: imgGelato250ml,
    rating: 4.8,
    reviewCount: 88,
    maxFlavors: 1,
    prepTimeMinutes: 5,
    ingredients: ["Bola de gelato artesanal", "Espresso doble de especialidad"],
    isAvailable: true,
    isFeatured: false
  },
  {
    id: "brownie-con-gelato",
    name: "Brownie Tibio con Gelato Artesanal",
    category: "waffles",
    categoryName: "Waffles y Especialidades",
    price: 16.50,
    description: "Brownie húmedo horneado con chocolate bitter peruano al 70%, servido tibio con 1 bola de gelato a tu elección y praliné crujiente de frutos secos.",
    image: imgBubbleWaffle,
    rating: 4.9,
    reviewCount: 95,
    badge: "Favorito Dulce",
    maxFlavors: 1,
    prepTimeMinutes: 8,
    ingredients: ["Brownie horneado de cacao 70%", "1 bola de gelato artesanal", "Praliné de nueces"],
    isAvailable: true,
    isFeatured: true
  }
];

export const PROMOTIONS: PromotionSlide[] = [
  {
    id: "promo-bubble",
    title: "Bubble Waffle & Gelato",
    subtitle: "Crocante, caliente y con tu gelato favorito",
    tag: "PROMO DEL DÍA",
    buttonText: "Pedir Bubble Waffle (S/ 15.90)",
    actionProductId: "bubble-waffle",
    bgGradient: "from-amber-600 via-amber-700 to-amber-950",
    image: imgBubbleWaffle
  },
  {
    id: "promo-familiar",
    title: "Pote de 1 Litro + 6 Conos",
    subtitle: "El favorito para el fin de semana en familia",
    tag: "PACK FAMILIAR",
    buttonText: "Elegir Sabores (S/ 43.00)",
    actionProductId: "pote-1-litro",
    bgGradient: "from-stone-800 via-neutral-900 to-amber-950",
    image: imgGelato1L
  },
  {
    id: "promo-milkshake",
    title: "Milkshake 12oz Cremoso",
    subtitle: "Combina 2 sabores de gelato + crema chantilly",
    tag: "100% ARTESANAL",
    buttonText: "Ver Bebidas (S/ 12.90)",
    actionProductId: "milkshake-12oz",
    bgGradient: "from-amber-700 via-yellow-800 to-neutral-950",
    image: imgMilkshake
  }
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  { id: "huancayo-centro", name: "Huancayo Centro", price: 4.00, estMinutes: "15-25 min" },
  { id: "el-tambo", name: "El Tambo", price: 5.00, estMinutes: "20-30 min" },
  { id: "chilca", name: "Chilca", price: 5.00, estMinutes: "20-30 min" },
  { id: "pilcomayo", name: "Pilcomayo", price: 6.00, estMinutes: "20-30 min" },
  { id: "san-jeronimo", name: "San Jerónimo de Tunán", price: 7.00, estMinutes: "25-35 min" },
  { id: "huancan", name: "Huancán", price: 6.00, estMinutes: "20-30 min" },
  { id: "sapallanga", name: "Sapallanga", price: 7.00, estMinutes: "25-35 min" },
  { id: "sicaya", name: "Sicaya", price: 8.00, estMinutes: "30-40 min" },
  { id: "san-agustin", name: "San Agustín de Cajas", price: 8.00, estMinutes: "30-40 min" },
  { id: "pickup", name: "Recojo en Tienda (Calle Real 640)", price: 0.00, estMinutes: "10 min" }
];
