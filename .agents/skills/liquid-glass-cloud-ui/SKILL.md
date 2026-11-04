---
name: liquid-glass-cloud-ui
description: Mainland China Tier-1 Cloud Portal (Qiniu Cloud / Volcengine style) + Light-Mode 3D Optical Liquid Glass & Multi-Curve Pearl Silk WebGL design system. Use when building or refining enterprise B2B SaaS, AI platform, cloud infrastructure, or corporate official websites that require a bright pearl-silver light-mode canvas, golden-midpoint optical liquid glass refraction, multi-curve silk WebGL shaders, weak-interaction breeze physics (zero jitter, zero circular cursor droplets), and domestic commercial compliance (MIIT ICP footer, clean architectural cards, Radix UI tabs).
---

# Liquid Glass Cloud Portal UI (`liquid-glass-cloud-ui`)

This skill codifies the production-verified **Light-Mode Optical Liquid Glass + Mainland Tier-1 Cloud Portal (Qiniu Cloud / Volcengine / Apple VisionOS Light)** design system, distilled through 6 iterative visual tuning releases (`v2.0` → `v2.5`).

Use this skill whenever the user asks to build, replicate, or restyle an **AI platform, cloud portal, B2B SaaS product, or enterprise official website** with this signature "Light-Mode Liquid Glass + Multi-Curve Pearl Silk" aesthetic.

---

## 1. Core Design Philosophy & Anti-Slop Guardrails

### 1.1 Bright Light-Mode First (Strictly No Heavy Dark Mode)
- **Never default to dark-mode `#0F172A` / `#000000` backgrounds** or heavy 3D metaball blobs.
- **Primary Canvas**: Pure `#FFFFFF` body sections paired with a `#F5F8FC` pearl-ice Hero and alternating `#F8FAFC` structural sections.
- **Seamless Bottom Fade**: Any WebGL Hero canvas must blend seamlessly into `#FFFFFF` at its bottom edge (`smoothstep(-0.5, -0.34, uv.y)`) so there is no harsh horizontal cut line.

### 1.2 The "Golden-Midpoint" Optical Contrast Law (`v2.5`)
- **Why White Glass Fails on Pure White**: Translucent white glass (`rgba(255,255,255,0.6)`) placed over a 98% white background disappears completely ("太浅了，看不出效果"). Conversely, cranking normal relief above `0.25` creates harsh, metallic dark creases ("太夸张了，晃眼").
- **The Golden Midpoint (`v2.5` Verified Values)**:
  1. **Canvas vs. Valley Contrast**: Base `canvasLight = vec3(0.972, 0.980, 0.995)` paired with `liquidValley = vec3(0.892, 0.922, 0.974)` so the 6 silk curves have visible pearl-silver depth.
  2. **Surface Normal Relief**: `0.18` with `eps = 0.008` and quintic $C^2$ continuous noise (`u * u * u * (u * (u * 6.0 - 15.0) + 10.0)`).
  3. **Chromatic Flow Blend**: `flowZone * clamp(hC * 0.36, 0.04, 0.42)`, Fresnel rim `0.42`, and satin specular highlight `0.54` (`pow(..., 30.0)`).
  4. **Anchored Card Under-Aura**: Always place an anchored, multi-stop radial color aura (`-inset-4 rounded-[32px] opacity-70 blur-2xl`) **directly behind** the primary 3D Liquid Glass card so its `backdrop-filter: blur(28px) saturate(190%)` has rich chromatic pigment to refract.

### 1.3 Zero-Jitter, Weak-Interaction "Breeze" Physics
- **Rule 1 — Never call React `setState` inside `onMouseMove` for 3D tilt or shaders**: Calling `setState` on every pixel movement causes React re-renders to fight CSS/Framer transitions and creates visible twitching ("抽搐"). Always store coordinates in `useRef` and update DOM transforms (`ref.current.style.transform`) inside the `requestAnimationFrame` loop.
- **Rule 2 — Never draw a circular `length(uv - mouse)` droplet at the cursor**: Radial distance rings or spotlights centered on the cursor look like an artificial water-drop sticker pasted on top of the canvas ("只是一个重叠的水滴波澜，突兀融入").
- **Rule 3 — Global Flow-Field Breeze (`breeze = u_mouse * 0.16`)**: Filter mouse coordinates through a **2-stage low-pass filter (`0.03` × `0.025`)** and feed `u_mouse` into the phase and domain-warp of the 6 silk curves. Moving the cursor acts like a gentle breeze across the entire silk sheet, while tilting the 3D glass slab by at most `±2.2° / ±2.6°`.

### 1.4 Anti-AI-Slop Content Restraint
- **No self-referential tech gimmicks**: Never write copy like `"移动鼠标体验 3D 液态折射"` or `"Interactive WebGL Demo"`.
- **No decorative glowing status dots or fake telemetry**: Avoid blinking neon dots, fake `99.98%` progress bars, or toy emojis inside hero consoles.
- **Calm Architectural Console**: The right-side Hero glass slab should look like an executive architecture specification sheet:
  - Top bar: Clean title (`14px font-semibold text-slate-900`) + right-aligned monospace version/engine code (`11px font-mono text-slate-500`, e.g., `PIPELINE v3.2`).
  - Body: 3 nested translucent glass rows indexed `01`, `02`, `03` in monospace, each with a concise title, single-line technical spec, and a quiet white-glass status pill.
  - Footer: Grounded compliance/capability metadata bar separated by `border-t border-white/70`.

---

## 2. Color Tokens & Typography Hierarchy

### 2.1 Color Palette
| Token Role | Value | Usage |
| :--- | :--- | :--- |
| **Page Background (Primary)** | `#FFFFFF` | Main body sections, navigation bar, cards |
| **Hero / Alternating Canvas** | `#F5F8FC` / `#F8FAFC` | Hero backdrop, alternating structural bands |
| **Brand Electric Blue (Primary)** | `#1664FF` (Hover `#0E52D8`) | Primary CTA buttons, active tab underlines, carousel indicators |
| **Slide 1 Silk Palette (AI Studio)** | `A:[0.32,0.58,0.98]` `B:[0.58,0.44,0.96]` `C:[0.22,0.78,0.95]` | Electric Blue → Indigo Violet → Ice Cyan |
| **Slide 2 Silk Palette (RTB Engine)** | `A:[0.22,0.68,0.95]` `B:[0.32,0.48,0.96]` `C:[0.24,0.84,0.80]` | Sky Cyan → Royal Blue → Aqua Mint |
| **Slide 3 Silk Palette (Carrier/Trust)** | `A:[0.95,0.54,0.36]` `B:[0.88,0.40,0.72]` `C:[0.62,0.42,0.94]` | Warm Coral Amber → Rose Magenta → Soft Violet |
| **Heading Ink** | `#0F172A` (`text-slate-900`) | Primary titles, card headers |
| **Body Copy** | `#334155` / `#475569` (`text-slate-700` / `600`) | Subtitles, descriptions |
| **Muted Metadata** | `#64748B` / `#94A3B8` (`text-slate-500` / `400`) | Captions, monospace indices, ICP filing text |

### 2.2 Typography Stack & Proportions
- **Font Family**:
  ```css
  --font-sans: "PingFang SC", "HarmonyOS Sans SC", -apple-system, BlinkMacSystemFont, "Microsoft YaHei", "Inter", sans-serif;
  ```
- **Hero Left Column Hierarchy (7 of 12 cols)**:
  1. **Liquid Glass Pill Tag**: `text-xs font-medium text-slate-700 px-4 py-1.5 rounded-full`
  2. **Product Display Title**: `text-4xl md:text-[54px] font-bold tracking-tight leading-[1.12] bg-gradient-to-r ... bg-clip-text text-transparent`
  3. **One-Line Value Subtitle**: `text-lg md:text-[23px] text-slate-700 font-normal tracking-wide mb-10`
  4. **3-Column Key Selling Points (Qiniu Cloud style)**:
     - Feature Title: `text-[18px] md:text-[19px] font-semibold text-slate-900` (4–6 Chinese chars)
     - Feature Subtitle: `text-xs md:text-[13px] text-slate-500` (8–12 Chinese chars, never a paragraph)
  5. **Dual Action Buttons**: Solid `#1664FF` primary CTA (`px-8 py-3 rounded-xl`) + translucent liquid-glass secondary button (`px-7 py-3 rounded-xl`).

---

## 3. Optical Liquid Glass CSS System

Copy these exact classes into `src/index.css` (also available in [liquid-glass.css](file:///C:/Users/朱雨涵/.gemini/config/skills/liquid-glass-cloud-ui/references/liquid-glass.css)):

```css
/* 1. Light-Mode Optical Liquid Glass Card (4-layer inner specular & blue refractive bevel) */
.liquid-glass-card {
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.84) 0%, rgba(241, 245, 249, 0.62) 100%);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.92);
  box-shadow:
    0 14px 36px -10px rgba(30, 58, 138, 0.07),
    0 2px 6px rgba(15, 23, 42, 0.03),
    inset 0 2px 1.5px rgba(255, 255, 255, 1),
    inset 0 -1.5px 3px rgba(59, 130, 246, 0.12);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.liquid-glass-card:hover {
  border-color: rgba(147, 197, 253, 0.75);
  box-shadow:
    0 22px 44px -12px rgba(37, 99, 235, 0.13),
    0 4px 12px rgba(15, 23, 42, 0.04),
    inset 0 2px 2px rgba(255, 255, 255, 1),
    inset 0 -2px 4px rgba(59, 130, 246, 0.22);
  transform: translateY(-2px);
}

/* 2. Thick 3D Hero Liquid Glass Slab (Used on Right Column of Hero) */
.liquid-glass-hero-slab {
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.58) 0%, rgba(255, 255, 255, 0.30) 60%, rgba(240, 249, 255, 0.42) 100%);
  backdrop-filter: blur(28px) saturate(190%);
  -webkit-backdrop-filter: blur(28px) saturate(190%);
  border: 1.2px solid rgba(255, 255, 255, 0.90);
  box-shadow:
    0 24px 52px -12px rgba(30, 58, 138, 0.13),
    0 6px 18px -4px rgba(15, 23, 42, 0.05),
    inset 0 2px 1.5px rgba(255, 255, 255, 1),
    inset 1.5px 0 2px rgba(255, 255, 255, 0.65),
    inset 0 -2px 4px rgba(59, 130, 246, 0.18);
}

/* 3. Pill Navigation Container */
.liquid-pill-nav {
  background: rgba(241, 245, 249, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.8);
}
```

---

## 4. WebGL Multi-Curve Pearl Silk Shader & Breeze Physics (`v2.5`)

When building the Hero section, combine **3 visual layers**:
1. **Layer 1 (Background)**: Full-bleed WebGL fragment shader rendering 6 harmonic S-curves (`for (int i = 0; i < 6; i++)`) over a domain-warped pearl-silver coordinate field.
2. **Layer 2 (Midground)**: Crisp SVG `<path>` Bézier curves (`opacity-65`, `strokeWidth="1.8"` to `"2.4"`) with multi-stop linear gradients (`#FFFFFF` → `#3B82F6` → `#7C3AED` → `#FFFFFF`) to add razor-sharp vector precision over the soft WebGL refraction.
3. **Layer 3 (Foreground)**: `max-w-[1280px]` 12-column grid (Left 7 cols typography + Right 5 cols 3D Liquid Glass Console).

### Reference Implementation
Always read and copy from the complete, production-tested template in:
- [LiquidAuroraHero.template.tsx](file:///C:/Users/朱雨涵/.gemini/config/skills/liquid-glass-cloud-ui/references/LiquidAuroraHero.template.tsx)
- [SpotlightCard.template.tsx](file:///C:/Users/朱雨涵/.gemini/config/skills/liquid-glass-cloud-ui/references/SpotlightCard.template.tsx)

---

## 5. Page Architecture Blueprint (Mainland Cloud Portal Standard)

Structure full-page enterprise websites in this exact 6-band sequence:

1. **Sticky White Top Header (`h-[62px] bg-white/95 backdrop-blur-md border-b border-slate-200/80`)**:
   - Left: Brand logo + horizontal links (`text-[14px] font-medium text-slate-700 hover:text-[#1664FF]`), with a subtle `HOT` badge (`bg-red-50 text-red-600 border-red-200/80 text-[10px]`) on the flagship product.
   - Right: Secondary outline button (`立即体验`) + primary `#1664FF` pill button (`获取专属方案`).
2. **Multi-Slide WebGL Liquid Glass Hero (`min-h-[580px] lg:h-[620px]`)**:
   - 3 auto-rotating product slides (11s interval) with decoupled WebGL lifecycle (`useEffect(..., [])` never unmounts, never re-compiles shaders, `t0` continuous timeflow).
   - **Form Continues, Color Morphs**: Waves never jump or stutter across slide changes; RGB uniform target is interpolated via per-frame exponential damping (`col += (target - col) * 0.028`), while wave shape continues rolling seamlessly.
   - Right glass console contents smoothly cross-fade via Framer Motion `AnimatePresence mode="wait"`, matching the 1.2s ambient aura morph.
   - Bottom dash indicators (`w-8 bg-[#1664FF]` when active, `w-4 bg-slate-300` when inactive).
3. **Category-Switched Product Matrix (`@radix-ui/react-tabs`)**:
   - Centered section header (`AI 加速数字内容商业化`) + pill tab switcher + 12-column asymmetrical bento grid (5-col flagship architectural card on left + 7-col 2×2 capability sub-cards on right using `SpotlightCard`).
4. **Interactive Step-by-Step Pipeline (`#F8FAFC` background)**:
   - 6-stage horizontal node selector buttons at top + unified split-pane preview console below (left spec details + right clean visual workflow diagram).
5. **Official Credentials & Concise Corporate Profile (`#FFFFFF` background)**:
   - 4-column official partner/qualification badge grid + compact 2-column corporate summary (no bloated timelines or filler paragraphs).
6. **Dark Slate Compliance Footer (`bg-[#0B1120]`) + Right Floating Service Dock**:
   - Footer includes navigation columns, privacy/terms modal triggers (`@radix-ui/react-dialog`), copyright, and mandatory MIIT ICP filing link (`https://beian.miit.gov.cn/`, e.g. `皖ICP备xxxxxxxx号-1`).
   - Fixed right-side floating dock (`fixed right-5 bottom-24 z-40`) with quick consultation triggers.

---

## 6. Asset & Deployment Pitfalls Checklist

1. **Base64 Image Prefix Deduplication**:
   - When embedding logos or icons from `.txt` Base64 files into TypeScript modules or HTML build scripts, **always check if `data:image/...;base64,` is already present** before prepending it. Duplicate prefixes (`data:image/png;base64,data:image/png;base64,...`) silently break `<img>` rendering.
2. **Zero Runtime Backend Dependencies**:
   - Compile the frontend into a static `dist/` bundle via `tsc -b && vite build` so it can be served directly by Nginx (`try_files $uri $uri/ /index.html;`) on a 1C1G/2C2G Linux server or CDN OSS bucket.
