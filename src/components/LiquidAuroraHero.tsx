import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Sparkles,
  Layers,
  Film,
  Mic2,
  TrendingUp,
  ShieldCheck,
  Radio,
  Award,
  CheckCircle2,
} from "lucide-react"

interface HeroSlide {
  id: string
  tag: string
  productName: string
  titleAccent: string
  subtitle: string
  features: {
    title: string
    desc: string
  }[]
  ctaText: string
  ctaAction: () => void
  secondaryText: string
  secondaryAction: () => void
  silkColorA: [number, number, number]
  silkColorB: [number, number, number]
}

interface LiquidAuroraHeroProps {
  onOpenExperience: () => void
  onOpenContact: () => void
  onScrollToSection: (id: string) => void
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

// Slow, Meditative Multi-Curve Liquid Glass & Pearl Silk Shader
const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec3 u_colorA;
  uniform vec3 u_colorB;

  // Smooth value noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0); // Quintic C2 smooth interpolation
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // Multi-layered flowing S-curves + liquid glass elevation field
  float fluidHeight(vec2 uv) {
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);
    vec2 m = u_mouse * vec2(aspect * 0.5, 0.5);

    // Gentle, wide Gaussian cursor deflection (smoothly bends curves without twitching)
    vec2 diff = uv - m;
    float distSq = dot(diff, diff);
    float mouseBend = exp(-distSq * 2.2) * 0.14;

    // Slow time variable for calm, luxurious motion
    float t = u_time * 0.24;

    // 6 Intertwined Flowing Silk S-Curves (Multiple harmonic curves across the canvas)
    float curves = 0.0;
    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      float freq = 1.6 + fi * 0.42;
      float phase = t * (0.65 + fi * 0.12) + fi * 1.15;
      float slant = uv.x * (0.45 + fi * 0.08) - uv.y * (0.85 - fi * 0.06);

      // Primary S-curve trajectory with harmonic secondary bend
      float waveY = sin(uv.x * freq + phase) * 0.24
                  + cos(uv.x * (freq * 0.6) - phase * 0.8) * 0.12
                  + mouseBend * sin(fi + 1.0);

      float d = (uv.y - waveY) + sin(slant * 2.2 + t) * 0.08;
      // Smooth bell-shaped liquid glass ridge per curve
      float ridge = 1.0 / (1.0 + d * d * (26.0 + fi * 6.0));
      curves += ridge * (0.28 - fi * 0.025);
    }

    // Soft underlying domain-warped silk undulation
    vec2 warp = vec2(
      sin(uv.x * 1.8 + t * 0.7 + uv.y * 1.2),
      cos(uv.y * 1.6 - t * 0.6 + uv.x * 1.1)
    );
    float silk = noise(uv * 1.8 + warp * 0.45 + mouseBend);

    return curves * 0.75 + silk * 0.35 + mouseBend * 0.5;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);

    // Compute ultra-smooth surface normals for liquid glass refraction & specular sheen
    float eps = 0.01;
    float hC = fluidHeight(uv);
    float hX = fluidHeight(uv + vec2(eps, 0.0));
    float hY = fluidHeight(uv + vec2(0.0, eps));
    vec3 normal = normalize(vec3((hC - hX) / eps * 0.14, (hC - hY) / eps * 0.14, 1.0));

    // Smooth light vector gently tracking the damped mouse
    vec2 m = u_mouse * vec2(aspect * 0.5, 0.5);
    vec3 lightDir = normalize(vec3((m.x - uv.x) * 0.6 + 0.25, (m.y - uv.y) * 0.6 + 0.35, 0.9));
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfVec = normalize(lightDir + viewDir);

    // Specular & Fresnel reflections
    float spec = pow(max(dot(normal, halfVec), 0.0), 36.0);
    float rim = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.0);

    // Crisp Pearl-White & Liquid Silver palette
    vec3 baseWhite = vec3(0.978, 0.984, 0.996);
    vec3 coolSilk = vec3(0.922, 0.942, 0.976);

    // Iridescent curve ribbons concentrated more on the right & sweeping diagonally
    float rightFlow = smoothstep(-0.55, 0.65, uv.x + uv.y * 0.25);
    vec3 ribbonTint = mix(u_colorA, u_colorB, clamp(sin(hC * 3.14159 + uv.x) * 0.5 + 0.5, 0.0, 1.0));

    vec3 col = mix(baseWhite, coolSilk, clamp(hC * 0.55, 0.0, 1.0));
    col = mix(col, ribbonTint, rightFlow * clamp(hC * 0.26, 0.0, 0.32));
    col += ribbonTint * rim * 0.42;
    col += vec3(1.0, 1.0, 1.0) * spec * 0.72;

    // Seamless fade to pure white at the bottom border
    float bottomFade = smoothstep(-0.5, -0.30, uv.y);
    col = mix(vec3(1.0), col, bottomFade);

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`

export const LiquidAuroraHero: React.FC<LiquidAuroraHeroProps> = ({
  onOpenExperience,
  onOpenContact,
  onScrollToSection,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const glassSlabRef = useRef<HTMLDivElement | null>(null)
  const glareRef = useRef<HTMLDivElement | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  // Two-stage low-pass damped refs (Zero React re-renders on mousemove -> Zero twitching!)
  const mouseTarget = useRef({ x: 0.3, y: 0.0 })
  const mouseMid = useRef({ x: 0.3, y: 0.0 })
  const mouseCurrent = useRef({ x: 0.3, y: 0.0 })

  const slides: HeroSlide[] = [
    {
      id: "manshengcheng",
      tag: "旗舰产品 · 一站式 AI 漫剧工业化管线",
      productName: "漫生成 Studio",
      titleAccent: "from-[#1664FF] via-[#4F46E5] to-[#9333EA]",
      subtitle: "为短剧与动态漫而生的一站式 AI 生产运行时",
      features: [
        { title: "跨镜角色锁死", desc: "多视角面容与服装零漂移" },
        { title: "六阶节点可控", desc: "单镜独立重绘，告别抽卡" },
        { title: "爆款拉片复刻", desc: "分钟级拆解黄金前 3 秒" },
      ],
      ctaText: "立即免费体验",
      ctaAction: onOpenExperience,
      secondaryText: "查看六阶流水线",
      secondaryAction: () => onScrollToSection("pipeline"),
      silkColorA: [0.42, 0.66, 0.99],
      silkColorB: [0.66, 0.50, 0.98],
    },
    {
      id: "traffic",
      tag: "自研引擎 · 全域智能程序化投放平台",
      productName: "步点流量引擎",
      titleAccent: "from-[#0284C7] via-[#2563EB] to-[#4F46E5]",
      subtitle: "面向应用开发者与短剧矩阵的高 ROI 增长运行时",
      features: [
        { title: "头部媒体聚合", desc: "头条 / 快手 / 腾讯一站覆盖" },
        { title: "oCPC 智能出价", desc: "实时 CTR/CVR 预估调价" },
        { title: "前置反作弊沙箱", desc: "毫秒级拦截无效机刷消耗" },
      ],
      ctaText: "开启流量投放",
      ctaAction: onOpenContact,
      secondaryText: "了解平台能力",
      secondaryAction: () => onScrollToSection("core-products"),
      silkColorA: [0.30, 0.76, 0.96],
      silkColorB: [0.36, 0.52, 0.98],
    },
    {
      id: "carrier",
      tag: "权威资质 · 三大运营商基地官方渠道",
      productName: "运营商数字生态",
      titleAccent: "from-[#EA580C] via-[#E11D48] to-[#7C3AED]",
      subtitle: "中国联通与中国电信四大官方基地核心合作伙伴",
      features: [
        { title: "联通音乐/阅读", desc: "中央基地官方授权渠道" },
        { title: "电信天翼生态", desc: "线上渠道与翼支付伙伴" },
        { title: "发行变现闭环", desc: "成片采买与保底分成联运" },
      ],
      ctaText: "商务合作接洽",
      ctaAction: () => onScrollToSection("credentials"),
      secondaryText: "查看官方资质",
      secondaryAction: () => onScrollToSection("credentials"),
      silkColorA: [0.98, 0.60, 0.44],
      silkColorB: [0.92, 0.46, 0.76],
    },
  ]

  // Calm 10.5s carousel interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % slides.length)
    }, 10500)
    return () => clearInterval(timer)
  }, [slides.length])

  // Single unified 60fps/120fps WebGL + 3D Glass DOM Transform Loop (Zero React state updates!)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", { antialias: true, alpha: false })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)
      if (!s) return null
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
    }

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return

    const prog = gl.createProgram()
    if (!prog) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const pos = gl.getAttribLocation(prog, "a_position")
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, "u_resolution")
    const uTime = gl.getUniformLocation(prog, "u_time")
    const uMouse = gl.getUniformLocation(prog, "u_mouse")
    const uColA = gl.getUniformLocation(prog, "u_colorA")
    const uColB = gl.getUniformLocation(prog, "u_colorB")

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(canvas.offsetWidth * dpr)
      canvas.height = Math.floor(canvas.offsetHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener("resize", resize)

    let animId: number
    const t0 = performance.now()
    const colA = [...slides[activeIdx].silkColorA]
    const colB = [...slides[activeIdx].silkColorB]

    const render = (now: number) => {
      const elapsed = (now - t0) * 0.001

      // 2-Stage C2 Critically Damped Low-Pass Filter (Eliminates all mouse jitter/twitching!)
      mouseMid.current.x += (mouseTarget.current.x - mouseMid.current.x) * 0.06
      mouseMid.current.y += (mouseTarget.current.y - mouseMid.current.y) * 0.06

      mouseCurrent.current.x += (mouseMid.current.x - mouseCurrent.current.x) * 0.045
      mouseCurrent.current.y += (mouseMid.current.y - mouseCurrent.current.y) * 0.045

      // Update 3D Liquid Glass Slab transform directly on DOM (No React re-render!)
      if (glassSlabRef.current) {
        const rx = mouseCurrent.current.y * 6.5 // Gentle ±6.5 deg max tilt
        const ry = mouseCurrent.current.x * 7.5 // Gentle ±7.5 deg max tilt
        glassSlabRef.current.style.transform = `rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`
      }

      if (glareRef.current) {
        const gx = (mouseCurrent.current.x * 0.5 + 0.5) * 100
        const gy = (-mouseCurrent.current.y * 0.5 + 0.5) * 100
        glareRef.current.style.background = `radial-gradient(360px circle at ${gx.toFixed(1)}% ${gy.toFixed(1)}%, rgba(255,255,255,0.88), transparent 65%)`
      }

      const targetA = slides[activeIdx].silkColorA
      const targetB = slides[activeIdx].silkColorB
      for (let i = 0; i < 3; i++) {
        colA[i] += (targetA[i] - colA[i]) * 0.03
        colB[i] += (targetB[i] - colB[i]) * 0.03
      }

      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, elapsed)
      gl.uniform2f(uMouse, mouseCurrent.current.x, mouseCurrent.current.y)
      gl.uniform3f(uColA, colA[0], colA[1], colA[2])
      gl.uniform3f(uColB, colB[0], colB[1], colB[2])

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [activeIdx])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width // 0..1
    const py = (e.clientY - rect.top) / rect.height // 0..1

    // Only update ref — zero React state updates!
    mouseTarget.current = {
      x: px * 2 - 1,
      y: -(py * 2 - 1),
    }
  }

  const handleMouseLeave = () => {
    mouseTarget.current = { x: 0.3, y: 0.0 }
  }

  const activeSlide = slides[activeIdx]

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[580px] lg:h-[620px] bg-[#F8FAFC] overflow-hidden select-none border-b border-slate-200/60"
    >
      {/* 1. Interactive Multi-Curve Liquid Pearl & Chrome Silk WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 2. Subtle Flowing Vector Bézier Curves Overlay (Enhances layered curve geometry) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-65"
        viewBox="0 0 1440 620"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="curveGrad1" x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="45%" stopColor="#3B82F6" stopOpacity="0.22" />
            <stop offset="75%" stopColor="#8B5CF6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="curveGrad2" x1="10%" y1="80%" x2="95%" y2="15%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="85%" stopColor="#60A5FA" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-100,480 C320,560 580,120 980,240 C1220,310 1360,140 1560,90"
          stroke="url(#curveGrad1)"
          strokeWidth="2"
        />
        <path
          d="M-60,360 C380,440 640,60 1040,190 C1260,260 1390,180 1540,150"
          stroke="url(#curveGrad2)"
          strokeWidth="2.5"
        />
        <path
          d="M120,580 C520,460 760,340 1120,410 C1310,445 1420,290 1560,240"
          stroke="url(#curveGrad1)"
          strokeWidth="1.5"
        />
      </svg>

      {/* 3. Hero Foreground Grid: Left Concise Typography + Right 3D Interactive Liquid Glass Stage */}
      <div className="relative z-10 max-w-[1280px] mx-auto h-full px-6 md:px-12 py-14 lg:py-0 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left 7 Columns: Clean Qiniu-style Concise Copy */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Frosted Liquid Glass Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-xl border border-white shadow-[0_2px_12px_rgba(15,23,42,0.05),inset_0_1px_0_#FFF] text-xs font-medium text-slate-700 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{activeSlide.tag}</span>
              </div>

              {/* Big Product Headline */}
              <h1
                className={`text-4xl md:text-[54px] font-bold tracking-tight leading-[1.12] bg-gradient-to-r ${activeSlide.titleAccent} bg-clip-text text-transparent mb-4`}
              >
                {activeSlide.productName}
              </h1>

              {/* Single-line Clean Subtitle */}
              <p className="text-lg md:text-[23px] text-slate-700 font-normal tracking-wide mb-10">
                {activeSlide.subtitle}
              </p>

              {/* 3 Horizontal Key Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-10 pt-2">
                {activeSlide.features.map((feat, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="text-[18px] md:text-[19px] font-semibold text-slate-900 tracking-tight">
                      {feat.title}
                    </div>
                    <div className="text-xs md:text-[13px] text-slate-500">
                      {feat.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={activeSlide.ctaAction}
                  className="px-8 py-3 rounded-xl bg-[#1664FF] hover:bg-[#0E52D8] text-white text-[15px] font-medium shadow-[0_10px_25px_-5px_rgba(22,100,255,0.4)] hover:shadow-[0_14px_30px_-5px_rgba(22,100,255,0.55)] transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{activeSlide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={activeSlide.secondaryAction}
                  className="px-7 py-3 rounded-xl bg-white/65 hover:bg-white/90 backdrop-blur-xl border border-white/90 shadow-[0_8px_24px_rgba(15,23,42,0.06),inset_0_1px_1px_#FFF] text-slate-800 text-[14.5px] font-medium transition-all cursor-pointer"
                >
                  {activeSlide.secondaryText}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right 5 Columns: Butter-Smooth 3D Liquid Glass Prism Stage */}
        <div
          className="lg:col-span-5 flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <div
            ref={glassSlabRef}
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            className="relative w-full max-w-[440px]"
          >
            {/* Ambient Iridescent Liquid Aura behind the Glass Slab */}
            <div
              className="absolute -inset-4 rounded-[32px] opacity-65 blur-2xl pointer-events-none transition-all duration-700"
              style={{
                background:
                  activeIdx === 0
                    ? "linear-gradient(135deg, rgba(56,189,248,0.32), rgba(139,92,246,0.32), rgba(244,114,182,0.22))"
                    : activeIdx === 1
                    ? "linear-gradient(135deg, rgba(37,99,235,0.32), rgba(14,165,233,0.32), rgba(99,102,241,0.22))"
                    : "linear-gradient(135deg, rgba(251,146,60,0.32), rgba(236,72,153,0.30), rgba(168,85,247,0.22))",
              }}
            />

            {/* Main 3D Liquid Glass Slab */}
            <div
              className="relative rounded-[26px] p-6 md:p-7 overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.74) 0%, rgba(255,255,255,0.42) 100%)",
                backdropFilter: "blur(28px) saturate(190%)",
                WebkitBackdropFilter: "blur(28px) saturate(190%)",
                border: "1.5px solid rgba(255, 255, 255, 0.94)",
                boxShadow:
                  "0 28px 60px -15px rgba(15, 23, 42, 0.11), 0 4px 16px rgba(15, 23, 42, 0.04), inset 0 2px 2px rgba(255, 255, 255, 1), inset 0 -1px 2px rgba(255, 255, 255, 0.65)",
              }}
            >
              {/* Dynamic Specular Glare Reflection (Updated directly via ref for 0-jitter) */}
              <div
                ref={glareRef}
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(360px circle at 65% 50%, rgba(255,255,255,0.88), transparent 65%)",
                  mixBlendMode: "overlay",
                }}
              />

              {/* Top Chrome Header inside Glass Slab */}
              <div className="relative z-10 flex items-center justify-between pb-4 mb-5 border-b border-slate-200/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                  <span className="text-xs font-semibold text-slate-800 tracking-wide">
                    {activeIdx === 0 && "漫生成 AI 实时生产管线"}
                    {activeIdx === 1 && "步点程序化竞价引擎"}
                    {activeIdx === 2 && "运营商四大基地权益矩阵"}
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/80 text-blue-600 font-medium border border-white">
                  LIQUID GLASS
                </span>
              </div>

              {/* Slide-Specific Concise Visual Content inside Liquid Glass */}
              {activeIdx === 0 && (
                <div className="relative z-10 space-y-3.5">
                  <div className="p-3.5 rounded-2xl bg-white/75 border border-white shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">主角面容与服饰资产锁定</div>
                        <div className="text-[11px] text-slate-500">跨 60 集连续分镜零漂移</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-600">99.4%</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/75 border border-white shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center">
                        <Film className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">连续动态分镜视频合成</div>
                        <div className="text-[11px] text-slate-500">首尾帧锚定 · 4K 丝滑运镜</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-600">24 fps</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/75 border border-white shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-600/10 text-purple-600 flex items-center justify-center">
                        <Mic2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">多角色情感配音与字幕对齐</div>
                        <div className="text-[11px] text-slate-500">拟真 TTS 声线 · 毫秒级同步</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-600">SYNC</span>
                  </div>
                </div>
              )}

              {activeIdx === 1 && (
                <div className="relative z-10 space-y-3.5">
                  <div className="p-4 rounded-2xl bg-white/80 border border-white shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-500">实时智能竞价转化率 (CVR)</span>
                      <span className="text-xs font-semibold text-emerald-600 inline-flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> +42.8%
                      </span>
                    </div>
                    <div className="flex items-end gap-1.5 h-16 pt-2">
                      {[38, 52, 46, 68, 62, 84, 78, 96].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600/80 to-sky-400/90"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-white/75 border border-white">
                      <div className="text-[11px] text-slate-500">反作弊拦截率</div>
                      <div className="text-lg font-bold text-slate-900 mt-0.5">99.9%</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/75 border border-white">
                      <div className="text-[11px] text-slate-500">全端接入协议</div>
                      <div className="text-lg font-bold text-slate-900 mt-0.5">H5 / SDK</div>
                    </div>
                  </div>
                </div>
              )}

              {activeIdx === 2 && (
                <div className="relative z-10 grid grid-cols-2 gap-3">
                  {[
                    { name: "联通音乐基地", role: "官方合作渠道", icon: Radio },
                    { name: "联通阅读基地", role: "数字内容生态", icon: Sparkles },
                    { name: "电信线上渠道", role: "优秀合作伙伴", icon: Award },
                    { name: "天翼翼支付", role: "核心权益伙伴", icon: ShieldCheck },
                  ].map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white/80 border border-white shadow-xs space-y-1.5"
                      >
                        <Icon className="w-4 h-4 text-blue-600" />
                        <div className="text-xs font-semibold text-slate-900">{item.name}</div>
                        <div className="text-[11px] text-slate-500">{item.role}</div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Bottom Status Bar inside Glass Card */}
              <div className="relative z-10 mt-5 pt-3.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  生成式 AI 双轨水印合规
                </span>
                <span>丝滑阻尼 · 3D 液态玻璃折射</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Carousel Dash Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((s, idx) => {
          const isActive = idx === activeIdx
          return (
            <button
              key={s.id}
              onClick={() => setActiveIdx(idx)}
              aria-label={`切换到 ${s.productName}`}
              className={`h-[4px] rounded-full transition-all duration-500 cursor-pointer ${
                isActive
                  ? "w-8 bg-[#1664FF]"
                  : "w-4 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          )
        })}
      </div>
    </section>
  )
}
