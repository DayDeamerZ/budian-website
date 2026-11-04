import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

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
  silkColorC: [number, number, number]
  panelTitle: string
  panelCode: string
  panelRows: {
    idx: string
    name: string
    spec: string
    status: string
  }[]
  panelFooterLeft: string
  panelFooterRight: string
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

// Ethereal Pearl Silk Ribbon Shader with Gentle Breeze Physics (Scheme A)
// - NO local mouse drops or circular ripples! Pure global breeze field.
// - 5 Wide, flowing harmonic silk ribbon bands (soft, supple, clearly visible form).
// - Satin anisotropic sheen & translucent depth contrast (dreamy, graceful, non-glaring).
// - Form flows perpetually; colors morph smoothly and independently.
const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse; // Smooth 2-stage low-pass breeze vector (-1..1)
  uniform vec3 u_colorA;
  uniform vec3 u_colorB;
  uniform vec3 u_colorC;

  // Domain warping for fluid silk drape
  vec2 silkWarp(vec2 p, float t, vec2 breeze) {
    float wx = sin(p.y * 1.35 + t * 0.42 + breeze.x * 0.8) * 0.16
             + cos(p.x * 0.85 - t * 0.35) * 0.10;
    float wy = cos(p.x * 1.20 - t * 0.38 + breeze.y * 0.8) * 0.14
             + sin(p.y * 0.95 + t * 0.28) * 0.08;
    return vec2(wx, wy);
  }

  // 5 Flowing Harmonic Silk Ribbon Bands (Soft, clearly visible, supple draping)
  float silkField(vec2 uv) {
    float t = u_time * 0.26;
    vec2 breeze = u_mouse * 0.14; // Scheme A: Gentle breeze influence only

    // Slanted diagonal coordinates following natural textile drape
    vec2 p = uv;
    p.y += p.x * 0.26; // Gentle diagonal tilt from bottom-left to top-right
    p += silkWarp(p, t, breeze);

    float totalHeight = 0.0;

    // Ribbon 1: Main sweeping silk mantle (broad, gentle base wave)
    float y1 = sin(p.x * 1.32 + t * 0.55 + breeze.x * 0.4) * 0.30
             + cos(p.x * 0.62 - t * 0.32) * 0.18;
    float d1 = p.y - y1 + 0.15;
    float band1 = exp(-d1 * d1 * 9.5);
    totalHeight += band1 * 0.46;

    // Ribbon 2: Upper translucent silk veil (harmonious offset)
    float y2 = sin(p.x * 1.85 + t * 0.72 + 1.2 + breeze.x * 0.5) * 0.26
             + cos(p.x * 0.95 + t * 0.45) * 0.14;
    float d2 = p.y - y2 - 0.22;
    float band2 = exp(-d2 * d2 * 14.0);
    totalHeight += band2 * 0.38;

    // Ribbon 3: Center dynamic twist fold (fine silk crease, gives supple definition)
    float y3 = sin(p.x * 2.45 - t * 0.68 + 2.8 + breeze.y * 0.4) * 0.22
             + sin(p.x * 1.25 + t * 0.85) * 0.12;
    float d3 = p.y - y3 + 0.02;
    float band3 = exp(-d3 * d3 * 22.0);
    totalHeight += band3 * 0.32;

    // Ribbon 4: Lower rolling fold (adds depth and valley shadowing)
    float y4 = cos(p.x * 1.48 + t * 0.48 + 4.1 + breeze.x * 0.3) * 0.28
             + sin(p.x * 0.72 - t * 0.38) * 0.16;
    float d4 = p.y - y4 + 0.42;
    float band4 = exp(-d4 * d4 * 11.0);
    totalHeight += band4 * 0.35;

    // Ribbon 5: Delicate floating sheer ribbon (subtle high-frequency sheen)
    float y5 = sin(p.x * 3.10 + t * 0.92 + 0.7) * 0.16;
    float d5 = p.y - y5 - 0.08;
    float band5 = exp(-d5 * d5 * 32.0);
    totalHeight += band5 * 0.22;

    return totalHeight;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

    // Precise finite difference for surface normal & ribbon curvature
    float eps = 0.006;
    float hC = silkField(uv);
    float hX = silkField(uv + vec2(eps, 0.0));
    float hY = silkField(uv + vec2(0.0, eps));

    // Clearer, supple normal relief (0.26 gives crisp, graceful ribbon edges without harshness)
    vec3 normal = normalize(vec3((hC - hX) / eps * 0.26, (hC - hY) / eps * 0.26, 1.0));
    vec3 viewDir = vec3(0.0, 0.0, 1.0);

    // Studio lighting with gentle breeze tilt (Scheme A: no spotlight hotspot)
    vec3 lightDir = normalize(vec3(0.34 + u_mouse.x * 0.10, 0.46 + u_mouse.y * 0.10, 0.85));
    vec3 halfVec = normalize(lightDir + viewDir);

    // Satin anisotropic sheen along the silk ribbon drape
    vec3 tangent = normalize(vec3(normal.y, -normal.x, 0.0));
    float anisoDot = abs(dot(tangent, halfVec));
    float satinSheen = pow(sqrt(max(1.0 - anisoDot * anisoDot, 0.0)), 16.0);

    // Velvety Fresnel rim along folded ribbon boundaries
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.2);

    // Base porcelain light & translucent valley shadow
    vec3 canvasLight = vec3(0.978, 0.984, 0.996);      // Crisp bright pearl canvas
    vec3 silkValley  = vec3(0.875, 0.912, 0.968);      // Translucent glacial shadow in folds

    // Graceful chromatic infusion on the ribbon ridges
    vec3 chroma = mix(u_colorA, u_colorB, clamp(hC * 0.85 + uv.x * 0.35, 0.0, 1.0));
    chroma = mix(chroma, u_colorC, clamp(fresnel * 1.25, 0.0, 0.55));

    // Composite: Valley depth + Satin surface + Translucent Chroma
    vec3 col = mix(canvasLight, silkValley, clamp(hC * 0.55, 0.0, 0.85));
    
    // Infuse silk color on the rising flanks and ridges
    float colorSpread = smoothstep(-0.65, 0.65, uv.x + uv.y * 0.28 + u_mouse.x * 0.05);
    col = mix(col, chroma, colorSpread * clamp(hC * 0.58, 0.06, 0.62));

    // Velvety rim highlight & satin silk specular sheen
    col += chroma * fresnel * 0.48;
    col += vec3(1.0, 1.0, 1.0) * satinSheen * (0.42 + hC * 0.28);

    // Seamless fade into white at the bottom boundary
    float bottomFade = smoothstep(-0.52, -0.32, uv.y);
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
  const auraOrbRef = useRef<HTMLDivElement | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const activeIdxRef = useRef(activeIdx)

  useEffect(() => {
    activeIdxRef.current = activeIdx
  }, [activeIdx])

  // Ultra-gentle weak-interaction breeze refs
  const mouseTarget = useRef({ x: 0.2, y: 0.0 })
  const mouseMid = useRef({ x: 0.2, y: 0.0 })
  const mouseCurrent = useRef({ x: 0.2, y: 0.0 })

  const slides: HeroSlide[] = [
    {
      id: "manshengcheng",
      tag: "旗舰产品 · 一站式 AI 漫剧工业化管线",
      productName: "漫生成 Studio",
      titleAccent: "from-[#1664FF] via-[#3B82F6] to-[#6366F1]",
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
      silkColorA: [0.32, 0.58, 0.98],
      silkColorB: [0.58, 0.44, 0.96],
      silkColorC: [0.22, 0.78, 0.95],
      panelTitle: "漫生成 · 工业化制片架构",
      panelCode: "PIPELINE v3.2",
      panelRows: [
        {
          idx: "01",
          name: "角色与场景视觉资产锁定",
          spec: "主角三视图与服装纹理跨集恒定",
          status: "资产已锁定",
        },
        {
          idx: "02",
          name: "首尾帧锚定连续视频生成",
          spec: "参数化镜头推拉与时序防闪烁合成",
          status: "4K 母带渲染",
        },
        {
          idx: "03",
          name: "多角色情感配音与声画对齐",
          spec: "角色专属声线绑定与毫秒级字幕同步",
          status: "多轨已同步",
        },
      ],
      panelFooterLeft: "符合国家生成式 AI 双轨标识规范",
      panelFooterRight: "支持单镜节点独立返工",
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
      silkColorA: [0.22, 0.68, 0.95],
      silkColorB: [0.32, 0.48, 0.96],
      silkColorC: [0.24, 0.84, 0.80],
      panelTitle: "步点流量 · 智能分发与归因矩阵",
      panelCode: "RTB ENGINE",
      panelRows: [
        {
          idx: "01",
          name: "全网头部媒体流量池聚合",
          spec: "巨量引擎 / 快手磁力 / 腾讯广告直连",
          status: "全域覆盖",
        },
        {
          idx: "02",
          name: "oCPC / oCPM 实时转化率预估",
          spec: "基于深度转化回传数据动态调价",
          status: "智能出价",
        },
        {
          idx: "03",
          name: "前置设备指纹反作弊沙箱",
          spec: "点击行为熵值分析，实时过滤机刷流量",
          status: "实时清洗",
        },
      ],
      panelFooterLeft: "支持 H5 / 小程序 / Native SDK 接入",
      panelFooterRight: "S2S 全链路归因回传",
    },
    {
      id: "carrier",
      tag: "权威资质 · 三大运营商基地官方渠道",
      productName: "运营商数字生态",
      titleAccent: "from-[#0F172A] via-[#1E40AF] to-[#2563EB]",
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
      silkColorA: [0.42, 0.58, 0.85],
      silkColorB: [0.65, 0.74, 0.88],
      silkColorC: [0.36, 0.50, 0.76],
      panelTitle: "运营商基地 · 官方授权合作体系",
      panelCode: "OFFICIAL PARTNER",
      panelRows: [
        {
          idx: "01",
          name: "联通在线中央音乐基地",
          spec: "数字音乐产品与会员联合运营通道",
          status: "官方合作渠道",
        },
        {
          idx: "02",
          name: "中国联通阅读基地",
          spec: "网文 IP 孵化与漫剧衍生内容合作",
          status: "官方合作渠道",
        },
        {
          idx: "03",
          name: "中国电信线上渠道 & 天翼翼支付",
          spec: "线上触点推广与金融数字权益分发",
          status: "核心生态伙伴",
        },
      ],
      panelFooterLeft: "四大运营商基地资质齐备",
      panelFooterRight: "内容采买与联运分成",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % slides.length)
    }, 11000)
    return () => clearInterval(timer)
  }, [slides.length])

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
    const uColC = gl.getUniformLocation(prog, "u_colorC")

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
    const colA = [...slides[0].silkColorA]
    const colB = [...slides[0].silkColorB]
    const colC = [...slides[0].silkColorC]

    const render = (now: number) => {
      const elapsed = (now - t0) * 0.001

      // Ultra-soft 2-stage low-pass damping (0.03 * 0.025) for weak, ambient breeze response
      mouseMid.current.x += (mouseTarget.current.x - mouseMid.current.x) * 0.03
      mouseMid.current.y += (mouseTarget.current.y - mouseMid.current.y) * 0.03

      mouseCurrent.current.x += (mouseMid.current.x - mouseCurrent.current.x) * 0.025
      mouseCurrent.current.y += (mouseMid.current.y - mouseCurrent.current.y) * 0.025

      // Subtle, weak-interaction 3D tilt (Scheme A: max ±2.0 deg, extremely calm)
      if (glassSlabRef.current) {
        const rx = mouseCurrent.current.y * 1.8
        const ry = mouseCurrent.current.x * 2.0
        glassSlabRef.current.style.transform = `rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`
      }

      // Subtle pure specular sheen shift across the translucent glass surface (Zero color glare)
      if (glareRef.current) {
        const pullX = 38 + mouseCurrent.current.x * 8
        const pullY = 34 - mouseCurrent.current.y * 8
        glareRef.current.style.background = `radial-gradient(320px circle at ${pullX.toFixed(1)}% ${pullY.toFixed(1)}%, rgba(255,255,255,0.25), transparent 70%)`
      }

      // Continuous wave shape flow with butter-smooth color blending across slide transitions
      const targetSlide = slides[activeIdxRef.current] || slides[0]
      const targetA = targetSlide.silkColorA
      const targetB = targetSlide.silkColorB
      const targetC = targetSlide.silkColorC
      const colorLerp = 0.028
      for (let i = 0; i < 3; i++) {
        colA[i] += (targetA[i] - colA[i]) * colorLerp
        colB[i] += (targetB[i] - colB[i]) * colorLerp
        colC[i] += (targetC[i] - colC[i]) * colorLerp
      }

      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, elapsed)
      gl.uniform2f(uMouse, mouseCurrent.current.x, mouseCurrent.current.y)
      gl.uniform3f(uColA, colA[0], colA[1], colA[2])
      gl.uniform3f(uColB, colB[0], colB[1], colB[2])
      gl.uniform3f(uColC, colC[0], colC[1], colC[2])

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    mouseTarget.current = {
      x: px * 2 - 1,
      y: -(py * 2 - 1),
    }
  }

  const handleMouseLeave = () => {
    mouseTarget.current = { x: 0.2, y: 0.0 }
  }

  const activeSlide = slides[activeIdx]

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[580px] lg:h-[620px] bg-[#F5F8FC] overflow-hidden select-none border-b border-slate-200/60"
    >
      {/* 1. Ethereal Pearl Silk Ribbon WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 2. Hero Foreground Grid (Vector curves removed for a completely clean, pure silk canvas) */}
      <div className="relative z-10 max-w-[1280px] mx-auto h-full px-6 md:px-12 py-14 lg:py-0 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left 7 Columns */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-slate-700 mb-6"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0.38) 100%)",
                  backdropFilter: "blur(20px) saturate(170%)",
                  WebkitBackdropFilter: "blur(20px) saturate(170%)",
                  border: "1px solid rgba(255,255,255,0.92)",
                  boxShadow: "0 6px 20px -4px rgba(37,99,235,0.08), inset 0 1.5px 1px rgba(255,255,255,1), inset 0 -1px 2px rgba(59,130,246,0.12)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{activeSlide.tag}</span>
              </div>

              <h1
                className={`text-4xl md:text-[54px] font-bold tracking-tight leading-[1.12] bg-gradient-to-r ${activeSlide.titleAccent} bg-clip-text text-transparent mb-4`}
              >
                {activeSlide.productName}
              </h1>

              <p className="text-lg md:text-[23px] text-slate-700 font-normal tracking-wide mb-10">
                {activeSlide.subtitle}
              </p>

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

              <div className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={activeSlide.ctaAction}
                  className="px-8 py-3 rounded-xl bg-[#1664FF] hover:bg-[#0E52D8] text-white text-[15px] font-medium shadow-[0_10px_24px_-6px_rgba(22,100,255,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)] hover:shadow-[0_14px_28px_-6px_rgba(22,100,255,0.52)] transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{activeSlide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={activeSlide.secondaryAction}
                  className="px-7 py-3 rounded-xl text-slate-800 text-[14.5px] font-medium transition-all cursor-pointer hover:bg-white/75"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.64) 0%, rgba(255,255,255,0.32) 100%)",
                    backdropFilter: "blur(20px) saturate(170%)",
                    WebkitBackdropFilter: "blur(20px) saturate(170%)",
                    border: "1px solid rgba(255,255,255,0.92)",
                    boxShadow: "0 8px 20px -6px rgba(15,23,42,0.06), inset 0 1.5px 1px rgba(255,255,255,1), inset 0 -1px 2px rgba(59,130,246,0.12)",
                  }}
                >
                  {activeSlide.secondaryText}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right 5 Columns: Truly High-Translucency Pure Liquid Frosted Glass Console */}
        <div
          className="lg:col-span-5 flex items-center justify-center"
          style={{ perspective: "1400px" }}
        >
          <div
            ref={glassSlabRef}
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            className="relative w-full max-w-[440px]"
          >
            {/* Pure Optical Frosted Glass Slab: High-translucency, zero surrounding halos/shadows, revealing background silk */}
            <div
              className="relative rounded-[24px] p-6 md:p-7 overflow-hidden transition-all duration-500 ease-out"
              style={{
                background: "rgba(255, 255, 255, 0.14)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.60)",
                boxShadow: "inset 0 1.5px 1px rgba(255, 255, 255, 0.85), inset 0 -1px 1px rgba(255, 255, 255, 0.40)",
              }}
            >
              {/* Pure Soft Specular Sheen (Zero color glare, subtle white light only) */}
              <div
                ref={glareRef}
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(320px circle at 38% 34%, rgba(255,255,255,0.30), transparent 70%)",
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Calm Architectural Header */}
                  <div className="relative z-10 flex items-baseline justify-between pb-4 mb-4 border-b border-white/60">
                    <span className="text-[14px] font-semibold text-slate-900 tracking-tight">
                      {activeSlide.panelTitle}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 tracking-wider">
                      {activeSlide.panelCode}
                    </span>
                  </div>

                  {/* Translucent Nested Glass Rows (High transparency, showing background silk clearly) */}
                  <div className="relative z-10 space-y-2.5">
                    {activeSlide.panelRows.map((row) => (
                      <div
                        key={row.idx}
                        className="px-4 py-3 rounded-xl flex items-center justify-between gap-3 transition-colors duration-500"
                        style={{
                          background: "rgba(255, 255, 255, 0.20)",
                          border: "1px solid rgba(255, 255, 255, 0.50)",
                          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.60)",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-[11px] font-mono font-medium text-slate-400 pt-0.5 select-none">
                            {row.idx}
                          </span>
                          <div>
                            <div className="text-[13px] font-semibold text-slate-800 leading-snug">
                              {row.name}
                            </div>
                            <div className="text-[11.5px] text-slate-500 mt-0.5">
                              {row.spec}
                            </div>
                          </div>
                        </div>
                        <span
                          className="shrink-0 text-[11px] font-medium text-slate-700 px-2.5 py-1 rounded-md"
                          style={{
                            background: "rgba(255, 255, 255, 0.45)",
                            border: "1px solid rgba(255, 255, 255, 0.65)",
                          }}
                        >
                          {row.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Grounded Bottom Metadata Bar */}
                  <div className="relative z-10 mt-4 pt-3.5 border-t border-white/60 flex items-center justify-between text-[11.5px] text-slate-600">
                    <span>{activeSlide.panelFooterLeft}</span>
                    <span className="text-slate-800 font-medium">{activeSlide.panelFooterRight}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
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
