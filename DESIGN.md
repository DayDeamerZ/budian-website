# Design System: 安徽步点智能科技有限公司 (Architectural Editorial Light System)

## 1. Visual Direction & Anti-Slop Philosophy
- **Aesthetic Persona**: Swiss International Grid × Architectural Editorial Monograph (inspired by `cal/DESIGN.md`, `apple/DESIGN.md`, `elevenlabs/DESIGN.md`, and Tencent's corporate editorial clarity).
- **Strict Anti-Slop Rules**:
  - **Zero Candy Gradients**: No gradient text, no neon glowing pill buttons, no rainbow background blurs.
  - **Zero Toy Icons / Emojis**: Complete elimination of generic rounded-box SVG icons and emojis (`🎵`, `📚`, `⚡`). Replaced by tabular monospace indices (`01`–`06`, `SYS-01`, `CRED-01`) and structured engineering tables.
  - **Zero Plastic Floating Cards**: No `border-radius: 22px` drop-shadow cards or bouncy hover translations. Layout is governed by exposed `1px solid #E4E4E7` architectural hairlines.

## 2. Color Palette (98% Achromatic + 2% Editorial Signal)
- **Canvas (`--canvas`)**: `#FFFFFF` (Pure Gallery White)
- **Warm Stone (`--stone`)**: `#F6F5F2` (Warm Architectural Alabaster for secondary structural zones)
- **Deep Carbon Ink (`--ink`)**: `#0B0B0C` (Primary headlines, solid primary buttons, and dark footer closure)
- **Secondary Prose (`--ink-secondary`)**: `#3F3F46`
- **Muted Metadata (`--ink-muted`)**: `#71717A`
- **Structural Hairline (`--rule`)**: `#E4E4E7` (`1px solid` exposed grid borders)
- **Editorial Signal (`--signal`)**: `#C83E2B` (Used strictly for `6px` status squares and active stage numerals)

## 3. Typography Hierarchy
- **Editorial Display (`--font-serif`)**: `"Noto Serif SC"`, `"Source Han Serif SC"`, `"Songti SC"`, Georgia, serif — authoritative Chinese editorial voice for headlines and key metrics.
- **UI & Prose (`--font-sans`)**: `"Inter"`, `-apple-system`, `"PingFang SC"`, sans-serif — clean, neutral body copy.
- **Technical Specification (`--font-mono`)**: `"JetBrains Mono"`, `"SF Mono"`, monospace — section indices (`§ 01`), system codes, and registration coordinates.
