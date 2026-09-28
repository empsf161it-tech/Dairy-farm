# 🥛 Dairy Farm — Agriculture & Milk Production Template

> A modern, fresh, organic-refined website and complete farm management dashboard template engineered for dairy farms, organic milk producers, and agro-businesses.

---

## 📋 Project Specifications

| Attribute | Specification |
|---|---|
| **Website Name** | Dairy Farm |
| **Industry / Niche** | Dairy Farming & Milk Production |
| **Template Type** | Agriculture / Farm Business / E-commerce |
| **Dashboard** | **Yes** — Farm operations, milk production tracking, livestock RFID, feed stock, deliveries |
| **RTL Support** | **Yes** (`dir="rtl"`, `.rtl`, logical CSS properties, left-sliding drawer, ⇆ icon) |
| **Dark Mode** | **Yes** (Automatic system detection + manual persist toggle via `localStorage`) |
| **Aesthetic Direction** | Organic-Refined Agro-Artisan (Pasture Green, Pure Ivory Cream, Golden Butter) |

---

## 🎨 Design System & Tokens

### 1. Color Palette (Strictly 3 Cores)
- **Primary Color**: `#1B4332` (Deep Meadow Pasture Green)
- **Secondary Color**: `#FBF9F4` (Pure Ivory Milk Cream) / Surface `#FFFFFF` / Soft `#F4EFE6`
- **Accent Color**: `#D4A373` (Golden Honey Butter & Ghee)
- **Dark Theme Equivalent**: Background `#0C1410`, Surface `#131E18`, Accent `#E2B07D`

### 2. Typography Hierarchy (Max Weight 580 for H1–H3)
- **Headings Font**: `Fraunces` (Google Fonts Variable Serif)
- **Body & UI Font**: `Plus Jakarta Sans` (Google Fonts Sans-Serif)
- **Weights**:
  - `H1`: 580 (Never exceeds 580)
  - `H2`: 540
  - `H3`: 520
  - `Body`: 420
  - `Buttons`: 510

### 3. Global Alignment & Geometry
- **Headings & Subtitles**: All section headings and section subtext are strictly `text-align: center`.
- **Card Rule**: Equal height (`100%`), equal padding (`var(--space-5)`), internal flex layout: `flex-direction: column; align-items: center;`.
- **Global Border Radius**: Single unified radius `--radius-global: 14px;` across all cards, buttons, badges, modals, and inputs.
- **Global Shadow**: Consistently applied `--shadow-global: 0 14px 34px -8px rgba(27, 67, 50, 0.09);`.

---

## 📱 Responsive Breakpoints & Navigation

```css
/* Large Desktop */
@media (min-width: 1440px) { ... }
/* Desktop — Full Horizontal Navbar */
@media (min-width: 1025px) and (max-width: 1439px) { ... }
/* Tablet + Mobile — Hamburger Starts Here */
@media (max-width: 1024px) { ... }
/* Mobile */
@media (max-width: 768px) { ... }
/* Small Mobile */
@media (max-width: 360px) { ... }
```

- **> 1024px**: Full horizontal navbar with links and header actions (RTL toggle, Theme toggle, Login button).
- **≤ 1024px**: Header switches to hamburger icon; navigation links and theme toggle are moved inside the smooth slide drawer.
- **≤ 360px**: Full-width slide drawer, buttons stack cleanly, cards single column with zero horizontal overflow.

---

## 📁 File Structure

```
Dairy Farm/
├── index.html            # Home 1: Hero animation, products showcase, livestock, story, testimonials
├── home2.html            # Home 2: Centered hero, live milking telemetry, interactive subscription calculator
├── services.html         # Dairy services, 3-tier subscription pricing, wholesale & farm tour programs
├── about.html            # 40-year heritage story, 1982-2026 milestones timeline, agronomist & vet team
├── blog.html             # Dairy journal with categories, reading times, research articles
├── blog-single.html      # Deep dive A1 vs A2 milk article with validated comment system
├── contact.html          # Contact form with strict client validation, map placeholder, visiting hours
├── login.html            # Strict auth layout: centered, no scroll, no theme toggle, official SSO icons
├── register.html         # Centered auth layout, confirm password check, terms checkbox validation
├── dashboard.html        # Farm Management Dashboard (KPIs, yield logs, cattle RFID, feed stock, orders)
├── 404.html              # Custom themed 404 illustration & return to home pasture
├── coming-soon.html      # Live countdown timer & early tasting newsletter capture
├── assets/
│   ├── css/
│   │   ├── style.css     # Master CSS tokens, typography, components, animations, dark mode
│   │   └── rtl.css       # Dedicated Right-to-Left language layout overrides
│   └── js/
│       ├── main.js       # Mobile drawer, theme switcher, RTL toggle, form validation, slider, FAQ
│       └── dashboard.js  # Farm operations tabs, modals for milk batches and livestock, realtime search
└── README.md             # Documentation
```

---

## 🌾 Dairy Farm Product Categories Included
1. **Fresh Milk**: Raw whole pasture milk with thick cream line.
2. **Organic Milk**: Certified A2 Vedic Gir herd milk.
3. **Curd / Yogurt**: Traditional clay-pot slow-fermented Greek curd.
4. **Butter**: Cultured grass-fed golden butter (84% butterfat).
5. **Ghee**: Traditional wood-fired Bilona cow ghee.
6. **Cheese**: 12-month aged farmstead cave cheddar.
7. **Paneer**: Luscious malai cottage paneer coagulated with lemon.
8. **Milkshakes & Beverages**: Bourbon vanilla & farm-berry pasture shakes.

---

## 📊 Farm Management Dashboard Modules
- **Overview & Statistics**: Daily milk yield (Liters), active lactating herd, doorstep delivery dispatch status, cold-chain bulk chiller temperature telemetry.
- **Weekly Yield Chart**: Visual morning vs evening milk volume distribution.
- **Milk Production Logging**: Interactive modal to record morning/evening yield, butterfat %, and silo tank assignment.
- **Livestock RFID Records**: Cattle Tag ID, breed (Gir A2, Jersey, Holstein), lactation stage, daily yield averages, health index, and vaccination flags.
- **Feed & Silage Management**: Alfalfa hay, fermented corn silage, mineral block stock levels and days remaining.
- **Delivery Route Dispatch**: Morning refrigerated van route progress, home delivery count, bottle crate counts.
- **Customer Directory**: Active subscriber plans, daily quotas, balances, and pause options.
- **Dual Perspectives**: Toggle instantly between **Admin / Farm Manager** and **Customer / Subscriber** views.

---

## 🚀 How to Run Locally

You can serve this project with any local HTTP server:

```powershell
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```

Open `http://localhost:8000` in your web browser.
