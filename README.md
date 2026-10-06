# Polares Auténtico Gelato Italiano - Web App Delivery & Catálogo

Web App móvil de catálogo interactivo y pedidos delivery directos por WhatsApp, estilo aplicación nativa (Rappi / PedidosYa), desarrollada con **React 19**, **TypeScript**, **Tailwind CSS v4** y **Vite**, optimizada para **Huancayo, Junín - Perú**.

---

## 🚀 Cómo subir este proyecto a GitHub

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
# 1. Inicializar git (si aún no está iniciado)
git init

# 2. Agregar todos los archivos
git add .

# 3. Crear el primer commit
git commit -m "feat: Polares Gelato Italiano Web App Delivery WhatsApp"

# 4. Renombrar la rama principal a main
git branch -M main

# 5. Conectar con tu repositorio en GitHub (reemplaza TU_USUARIO y TU_REPOSITORIO)
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# 6. Subir a GitHub
git push -u origin main
```

---

## ⚡ Cómo publicar en Vercel (Paso a Paso)

### Opción A: Desde la Web de Vercel (Recomendada y más fácil)

1. Ingresa a [https://vercel.com](https://vercel.com) e inicia sesión con tu cuenta de **GitHub**.
2. Haz clic en el botón **"Add New..."** → **"Project"**.
3. En la lista de repositorios, selecciona el repositorio de **Polares** que acabas de subir a GitHub y haz clic en **"Import"**.
4. En la pantalla de configuración:
   - **Framework Preset:** Selecciona `Vite` (Vercel lo detecta automáticamente).
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Haz clic en **"Deploy"**.
6. ¡Listo! En menos de 1 minuto tendrás tu enlace público de producción (ej. `https://polares-gelato.vercel.app`).

### Opción B: Usando Vercel CLI desde tu terminal

```bash
# 1. Instalar Vercel CLI globalmente
npm i -g vercel

# 2. Iniciar sesión y publicar
vercel

# 3. Para publicar directamente a producción
vercel --prod
```

---

## 🍦 Características de la Aplicación

- **📱 Experiencia Mobile-First:** Simulación de app nativa con contenedor optimizado para teléfonos inteligentes, tablets y escritorio.
- **✨ Portada / Splash Screen:** Logotipo en alta resolución con animación flotante (`animate-float-gentle`), halo luminoso, propuestas de valor y horario en vivo.
- **🌓 Modo Claro y Oscuro Nativo:** Selector persistente con guardado automático en `localStorage`.
- **🍨 Catálogo Interactivo con Sabores Italianos:**
  - Bubble Waffles recién horneados con helado y frutas frescas.
  - Potes térmicos anti-deshielo de 1 Litro, 1/2 Litro y 250ml.
  - Milkshakes espesos de 12oz.
  - Selector de sabores artesanales (*Pistacchio Puro di Bronte, Cioccolato Fondente 70%, Stracciatella, Dulce de Leche, etc.*) y toppings.
- **🛒 Carrito & Checkout:**
  - Drawer deslizante con cálculo de subtotales.
  - Cobertura de delivery y tarifas por distrito en **Huancayo** (*Huancayo Centro, El Tambo, Chilca, Pilcomayo, etc.*) y opción de Recojo en Tienda.
  - Propina voluntaria para el repartidor.
  - Validación de cupones de descuento (`POLARES10`, `ENVIOGRATIS`).
- **💳 Métodos de Pago Locales:**
  - Pestañas interactivas para **Yape**, **BCP** (Cta. Corriente y CCI) y **Plin**, con botones de copiado rápido al portapapeles.
- **📲 Envío Directo a WhatsApp:**
  - Generación de mensaje estructurado con código `#POL-XXXX`, desglose completo y apertura directa del chat oficial (+51 944 774 086).
- **📦 Historial de Pedidos:**
  - Pestaña de seguimiento de pedidos en tiempo real con opción de reenviar el pedido a WhatsApp y ver datos de pago.
- **🛡️ Panel de Gestión en Vivo (Admin):**
  - Control de stock y disponibilidad de productos al instante, edición de precios y actualización del número de WhatsApp.

---

## 🛠️ Tecnologías Utilizadas

- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Vite 8**
- **Lucide React** (Iconografía)
- **Express / Node.js** (Backend en tiempo real)
