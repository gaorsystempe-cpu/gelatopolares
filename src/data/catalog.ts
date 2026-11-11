import { Product, GelatoFlavor, DeliveryZone, StoreConfig, PromotionSlide } from '../types';

// Real asset paths from image generation
import imgBubbleWaffle from '../assets/images/bubble_waffle_gelato_1791312438173.jpg';
import imgGelato1L from '../assets/images/gelato_tub_1liter_1791312448427.jpg';
import imgGelato500ml from '../assets/images/gelato_tub_medium_1791312456968.jpg';
import imgGelato250ml from '../assets/images/gelato_cup_personal_1791312466672.jpg';
import imgMilkshake from '../assets/images/gelato_milkshake_1791312476756.jpg';

export const STORE_DEFAULT_CONFIG: StoreConfig = {
  name: "Lúcuma - Postres, Helados & Jugos",
  tagline: "El Auténtico Sabor del Oro de los Incas | Postres, Helados y Jugos Artesanales",
  phone: "51944774086",
  whatsappFormatted: "+51 944 774 086",
  address: "Av. Principal 640 - Perú",
  openHoursWeekday: "10:00 a. m. - 10:00 p. m.",
  openHoursSunday: "11:00 a. m. - 6:30 p. m.",
  isOpenNow: true,
  yapeNumber: "944 774 086",
  yapeHolder: "Lúcuma Postres & Helados S.A.C.",
  bcpAccount: "193-9823415-0-82",
  bcpCci: "002-193-009823415082-14",
  bcpHolder: "Lúcuma Postres & Helados S.A.C.",
  plinNumber: "944 774 086",
  plinHolder: "Lúcuma Postres & Helados S.A.C.",
};

export const GELATO_FLAVORS: GelatoFlavor[] = [
  {
    id: "lucuma-seda",
    name: "Lúcuma de Seda Pura (Especialidad)",
    description: "100% pulpa natural de lúcuma seleccionada, textura densa y cremosa.",
    isPopular: true,
    colorHex: "#f59e0b"
  },
  {
    id: "lucuma-manjar",
    name: "Lúcuma con Vetas de Manjar Blanco",
    description: "Mantecado de lúcuma con vetas abundantes de manjar artesanal de olla.",
    isPopular: true,
    colorHex: "#d97706"
  },
  {
    id: "lucuma-chocolate",
    name: "Lúcuma Choco-Chip Bitter 70%",
    description: "Fusión irresistible de lúcuma andina con escamas de chocolate cusqueño.",
    isPopular: true,
    colorHex: "#78350f"
  },
  {
    id: "pistacchio",
    name: "Pistacchio Puro Tostado",
    description: "Pistacho tostado artesanalmente, sabor fino y delicado.",
    isPopular: true,
    colorHex: "#a7c957"
  },
  {
    id: "vainilla-bourbon",
    name: "Vainilla Bourbon Francesa",
    description: "Infusión aromática de vainas naturales con crema fresca.",
    colorHex: "#fbf3d5"
  },
  {
    id: "frutti-di-bosco",
    name: "Frutos del Bosque Andino",
    description: "Arándanos, frambuesas y moras silvestres refrescantes.",
    isVegan: true,
    colorHex: "#7b1e4a"
  },
  {
    id: "fresas-crema",
    name: "Fresas Frescas a la Crema",
    description: "Fresas seleccionadas de valle con suave crema batida.",
    colorHex: "#fb7185"
  },
  {
    id: "maracuya-sorbet",
    name: "Maracuyá Tropical Intenso",
    description: "100% fruta fresca pura, refrescante y sin lácteos.",
    isVegan: true,
    colorHex: "#facc15"
  },
  {
    id: "algarrobina-pisco",
    name: "Algarrobina con Toque de Pisco",
    description: "Clásica receta peruana con jarabe de algarrobo norteño.",
    isPopular: true,
    colorHex: "#92400e"
  },
  {
    id: "chocolate-belga",
    name: "Chocolate Fondente 70%",
    description: "Cacao puro intenso, textura sedosa y aterciopelada.",
    colorHex: "#3e2723"
  }
];

export const TOPPINGS_LIST = [
  "Barquillos crocantes de cortesía",
  "Fudge artesanal tibio de chocolate",
  "Manjar blanco de olla",
  "Algarrobina pura de Piura",
  "Praliné crujiente de nueces y almendras",
  "Chispas de chocolate peruano",
  "Sin toppings adicionales"
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "pote-1-litro",
    name: "Helado de Lúcuma - Pote 1 Litro",
    category: "helados",
    categoryName: "Helados Artesanales",
    price: 43.00,
    originalPrice: 48.00,
    description: "Pote térmico hermético de 1000ml (rinde 6 a 8 porciones). Preparado con pulpa natural de lúcuma de seda y crema fresca. Incluye hasta 2 sabores a tu elección + 6 barquillos crocantes de regalo.",
    image: imgGelato1L,
    rating: 5.0,
    reviewCount: 340,
    badge: "Especialidad",
    maxFlavors: 2,
    includesCones: 6,
    prepTimeMinutes: 5,
    ingredients: ["Pulpa 100% natural de lúcuma", "Crema de leche pasteurizada", "Hasta 2 sabores", "6 conos artesanales"],
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "cheesecake-lucuma",
    name: "Cheesecake Artesanal de Lúcuma",
    category: "postres",
    categoryName: "Postres de la Casa",
    price: 14.50,
    originalPrice: 16.00,
    description: "El postre estrella: suave y aterciopelado mousse de lúcuma natural sobre base crujiente de galleta dorada con mantequilla, decorado con hilos de manjar blanco y virutas de chocolate.",
    image: imgGelato500ml,
    rating: 4.9,
    reviewCount: 185,
    badge: "Más Pedido",
    maxFlavors: 0,
    prepTimeMinutes: 5,
    ingredients: ["Queso crema especial", "Pulpa fresca de lúcuma", "Galleta artesanal", "Manjar blanco de olla"],
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "bubble-waffle",
    name: "Bubble Waffle con Helado de Lúcuma",
    category: "waffles",
    categoryName: "Waffles y Especialidades",
    price: 15.90,
    originalPrice: 18.00,
    description: "Crujiente waffle burbuja recién horneado al instante, servido con 1 generosa bola de helado artesanal de lúcuma, fruta fresca seleccionada (fresas, mango, arándanos) y dulce de manjar blanco.",
    image: imgBubbleWaffle,
    rating: 4.9,
    reviewCount: 220,
    badge: "Favorito",
    maxFlavors: 1,
    prepTimeMinutes: 10,
    ingredients: ["Masa artesanal de waffle al huevo", "1 bola de Helado de Lúcuma", "Fresas frescas", "Mango dulce", "Fudge o manjar"],
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "jugo-especial-lucuma",
    name: "Jugo Especial de Lúcuma & Algarrobina",
    category: "jugos",
    categoryName: "Jugos & Milkshakes",
    price: 11.00,
    originalPrice: 13.00,
    description: "Batido tradicional andino espeso, energético y nutritivo. Licuado con pulpa de lúcuma pura, leche fresca entera, algarrobina norteña de Piura, esencia de vainilla y toque de canela.",
    image: imgMilkshake,
    rating: 4.9,
    reviewCount: 160,
    badge: "Nutritivo",
    maxFlavors: 0,
    prepTimeMinutes: 6,
    ingredients: ["Pulpa fresca de lúcuma", "Leche entera", "Algarrobina pura", "Huevo pasteurizado opcional", "Canela molida"],
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "pote-medio-litro",
    name: "Pote Mediano de 1/2 Litro",
    category: "helados",
    categoryName: "Helados Artesanales",
    price: 24.00,
    description: "Pote térmico de 500ml ideal para 3 a 4 porciones. Disfruta de la cremosidad de nuestra lúcuma y combina hasta 2 sabores a tu elección + 4 barquillos crocantes de obsequio.",
    image: imgGelato500ml,
    rating: 4.9,
    reviewCount: 215,
    badge: "Para Compartir",
    maxFlavors: 2,
    includesCones: 4,
    prepTimeMinutes: 5,
    ingredients: ["500ml de helado artesanal", "Hasta 2 sabores", "4 conos barquillos"],
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "milkshake-lucuma",
    name: "Milkshake Espeso de Lúcuma (12oz)",
    category: "jugos",
    categoryName: "Jugos & Milkshakes",
    price: 12.90,
    description: "Cremoso batido espeso elaborado con 2 generosas bolas de helado de lúcuma artesanal, leche fresca entera, generosa corona de crema chantilly batida y canela espolvoreada.",
    image: imgMilkshake,
    rating: 4.9,
    reviewCount: 198,
    badge: "Clásico",
    maxFlavors: 1,
    prepTimeMinutes: 6,
    ingredients: ["2 bolas de helado de lúcuma", "Leche fresca pasteurizada", "Crema chantilly ligera", "Sirope de caramelo o chocolate"],
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "torta-helada-lucuma",
    name: "Torta Helada de Lúcuma y Chocolate",
    category: "postres",
    categoryName: "Postres de la Casa",
    price: 13.50,
    description: "Porción individual de torta helada con capas de suave bizcocho húmedo de cacao al 70% relleno de helado artesanal de lúcuma y cobertura de ganache de chocolate bitter.",
    image: imgGelato250ml,
    rating: 4.8,
    reviewCount: 110,
    badge: "Delicioso",
    maxFlavors: 0,
    prepTimeMinutes: 5,
    ingredients: ["Bizcocho de chocolate bitter", "Helado de lúcuma", "Ganache de cacao 70%"],
    isAvailable: true,
    isFeatured: false
  },
  {
    id: "pote-personal-250",
    name: "Pote Personal de 250 ml",
    category: "helados",
    categoryName: "Helados Artesanales",
    price: 13.00,
    description: "La porción personal perfecta para deleitarte con el sabor inconfundible de la lúcuma donde quieras. Elige hasta 2 sabores servidos en copa térmica anti-deshielo.",
    image: imgGelato250ml,
    rating: 4.8,
    reviewCount: 175,
    badge: "Individual",
    maxFlavors: 2,
    prepTimeMinutes: 5,
    ingredients: ["250ml de Helado artesanal", "Hasta 2 sabores a elección"],
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "jugo-mixto-lucuma",
    name: "Jugo Mixto: Lúcuma, Fresa & Plátano",
    category: "jugos",
    categoryName: "Jugos & Milkshakes",
    price: 9.50,
    description: "Jugo natural 100% de pura fruta fresca andina. La dulzura de la lúcuma combinada con fresas de valle y plátano de seda. Refrescante, espeso y sin conservantes.",
    image: imgBubbleWaffle,
    rating: 4.8,
    reviewCount: 92,
    badge: "100% Fruta",
    maxFlavors: 0,
    prepTimeMinutes: 5,
    ingredients: ["Pulpa fresca de lúcuma", "Fresas de valle", "Plátano de seda", "Agua purificada o leche"],
    isAvailable: true,
    isFeatured: false
  }
];

export const PROMOTIONS: PromotionSlide[] = [
  {
    id: "promo-helado-1l",
    title: "Helado de Lúcuma 1 Litro",
    subtitle: "Rinde 6 a 8 porciones + 6 barquillos crujientes",
    tag: "PACK FAMILIAR",
    buttonText: "Pedir Pote 1L (S/ 43.00)",
    actionProductId: "pote-1-litro",
    bgGradient: "from-amber-600 via-amber-700 to-amber-950",
    image: imgGelato1L
  },
  {
    id: "promo-cheesecake",
    title: "Cheesecake de Lúcuma",
    subtitle: "El postre bandera: suave mousse con manjar y galleta",
    tag: "POSTRE ESTRELLA",
    buttonText: "Probar Cheesecake (S/ 14.50)",
    actionProductId: "cheesecake-lucuma",
    bgGradient: "from-yellow-700 via-amber-800 to-neutral-950",
    image: imgGelato500ml
  },
  {
    id: "promo-jugo-especial",
    title: "Jugo Especial con Algarrobina",
    subtitle: "Espeso, nutritivo y batido con lúcuma fresca",
    tag: "ENERGÍA PURA",
    buttonText: "Pedir Jugo Especial (S/ 11.00)",
    actionProductId: "jugo-especial-lucuma",
    bgGradient: "from-orange-700 via-amber-800 to-stone-950",
    image: imgMilkshake
  }
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  { id: "zona-centro", name: "Zona Centro / Cercado", price: 4.00, estMinutes: "15-25 min" },
  { id: "zona-norte", name: "Zona Norte / Residencial", price: 5.00, estMinutes: "20-30 min" },
  { id: "zona-sur", name: "Zona Sur", price: 5.00, estMinutes: "20-30 min" },
  { id: "zona-este", name: "Zona Este", price: 6.00, estMinutes: "25-35 min" },
  { id: "zona-oeste", name: "Zona Oeste", price: 6.00, estMinutes: "25-35 min" },
  { id: "zona-periferica", name: "Zonas Periféricas", price: 7.00, estMinutes: "30-40 min" },
  { id: "pickup", name: "Recojo en Tienda", price: 0.00, estMinutes: "10 min" }
];
