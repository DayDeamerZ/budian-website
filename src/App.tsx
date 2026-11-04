import React, { useState, useEffect } from "react"
import * as Tabs from "@radix-ui/react-tabs"
import { motion } from "framer-motion"
import {
  Sparkles,
  Film,
  Layers,
  Mic2,
  RefreshCw,
  Share2,
  BarChart3,
  ShieldAlert,
  Cpu,
  Globe2,
  Headphones,
  PhoneCall,
  ArrowUpRight,
  Check,
  Building2,
  Award,
  Radio,
  BookOpen,
  CreditCard,
} from "lucide-react"
import { LiquidAuroraHero } from "./components/LiquidAuroraHero"
import { SpotlightCard } from "./components/ui/SpotlightCard"
import { LegalAndContactModals, type ModalType } from "./components/LegalAndContactModals"
import { LOGO_DATA_URI } from "./lib/logoData"

const LOGO_PATH = LOGO_DATA_URI

const PIPELINE_STEPS = [
  {
    code: "01",
    name: "AI 剧本创作",
    title: "一句话生成标准分集剧本",
    desc: "支持网文、梗概一键扩写，自动拆解场次、台词与情绪指令。",
    metrics: ["黄金前 3 秒钩子设计", "多题材叙事节拍器", "直接映射分镜指令表"],
    badge: "SCRIPT ENGINE",
    icon: Sparkles,
  },
  {
    code: "02",
    name: "角色资产锁定",
    title: "跨镜头面容与服饰零漂移",
    desc: "锁定主角三视图与场景设定，整部漫剧数十集保持高度一致。",
    metrics: ["专属角色面容 ID 绑定", "景别与双人站位控制", "全局国漫/厚涂画风统一"],
    badge: "ASSET LOCK",
    icon: Layers,
  },
  {
    code: "03",
    name: "连续动态视频",
    title: "首尾帧锚定生成丝滑运镜",
    desc: "基于高精分镜图驱动推拉摇移与微表情演绎，消除闪烁畸变。",
    metrics: ["参数化镜头运动控制", "单镜头独立预览渲染", "云端分布式队列并发"],
    badge: "MOTION VIDEO",
    icon: Film,
  },
  {
    code: "04",
    name: "拟真多轨配音",
    title: "多角色情感 TTS 与声画同步",
    desc: "绑定角色专属声线，自动对齐口型节奏、字幕时间轴与背景配乐。",
    metrics: ["戏剧化情绪张力调节", "毫秒级字幕卡点对齐", "BGM 与转场音效合成"],
    badge: "AUDIO SYNTH",
    icon: Mic2,
  },
  {
    code: "05",
    name: "爆款拉片复刻",
    title: "分钟级解构市场验证爆款",
    desc: "导入参考短剧自动提取镜头切换频率与留存钩子，支持单镜返工。",
    metrics: ["自动拉片拆解叙事脉络", "任意单节点局部重绘", "多人云端版本协同审片"],
    badge: "VIRAL CLONE",
    icon: RefreshCw,
  },
  {
    code: "06",
    name: "矩阵发行变现",
    title: "合规标识加注与投流放大",
    desc: "内置显隐式合成水印，打通抖音、快手、视频号采买分成与投流加热。",
    metrics: ["国家标准双轨合规标识", "成片采买与保底分成", "直连步点流量引擎放量"],
    badge: "DISTRIBUTION",
    icon: Share2,
  },
]

export function App() {
  const [scrolled, setScrolled] = useState(false)
  const [activeStage, setActiveStage] = useState(0)
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: "smooth" })
  }

  const currentStage = PIPELINE_STEPS[activeStage]
  const StageIcon = currentStage.icon

  return (
    <div className="min-h-screen bg-white text-slate-900 relative selection:bg-blue-600 selection:text-white">
      {/* ================= 1. 顶部导航栏 (1:1 七牛云白底极简导航栏) ================= */}
      <header
        className={`sticky top-0 z-40 h-[62px] transition-all duration-200 ${
          scrolled
            ? "bg-white/88 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_2px_20px_rgba(15,23,42,0.04)]"
            : "bg-white border-b border-slate-100"
        }`}
      >
        <div className="max-w-[1360px] mx-auto h-full px-6 flex items-center justify-between">
          {/* Left: Logo + Nav Links */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2.5 group">
              <img
                src={LOGO_PATH}
                alt="步点智能"
                className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="text-[16px] font-bold tracking-tight text-slate-900 leading-none">
                  步点智能
                </span>
                <span className="text-[9px] font-medium tracking-widest text-slate-400 uppercase mt-1">
                  BUDIAN CLOUD &amp; AI
                </span>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-7 text-[14px] text-slate-700 font-normal">
              <button
                onClick={() => scrollToSection("core-products")}
                className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#FF4D4F] text-white rounded-xs leading-none">
                  HOT
                </span>
                <span className="text-[#FF4D4F] font-medium">漫生成 AI</span>
              </button>
              <button
                onClick={() => scrollToSection("pipeline")}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                AI 漫剧管线
              </button>
              <button
                onClick={() => scrollToSection("core-products")}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                流量投放平台
              </button>
              <button
                onClick={() => scrollToSection("credentials")}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                生态合作
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                了解步点
              </button>
            </nav>
          </div>

          {/* Right: Console / Login / Solid Blue CTA (Exact Qiniu Header Right) */}
          <div className="flex items-center gap-6 text-[14px]">
            <button
              onClick={() => setActiveModal("experience")}
              className="hidden sm:inline-block text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              控制台
            </button>
            <button
              onClick={() => setActiveModal("contact")}
              className="hidden sm:inline-block text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              商务咨询
            </button>
            <button
              onClick={() => setActiveModal("experience")}
              className="px-5 py-2 rounded-md bg-[#1664FF] hover:bg-[#0E52D8] text-white text-[13.5px] font-medium transition-colors shadow-xs cursor-pointer"
            >
              免费体验
            </button>
          </div>
        </div>
      </header>

      {/* ================= 2. HERO BANNER (七牛云同款流光液态玻璃轮播首屏) ================= */}
      <LiquidAuroraHero
        onOpenExperience={() => setActiveModal("experience")}
        onOpenContact={() => setActiveModal("contact")}
        onScrollToSection={scrollToSection}
      />

      {/* ================= 3. 核心双引擎：AI 加速数字内容商业化 (白底 + 液态玻璃卡片) ================= */}
      <section id="core-products" className="py-24 px-6 bg-white relative">
        <div className="max-w-[1240px] mx-auto">
          {/* Section Title (1:1 Qiniu "AI 加速企业数智化" clean spacing) */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-[38px] font-semibold text-slate-900 tracking-tight mb-3">
              AI 加速数字内容商业化
            </h2>
            <p className="text-sm md:text-base text-slate-500">
              两大自研核心平台，打通“AIGC 内容工业化生产”与“全域精准流量分发”闭环
            </p>
          </div>

          {/* Radix UI Tabs with Liquid Glass Pill Switcher */}
          <Tabs.Root defaultValue="manshengcheng" className="w-full">
            <div className="flex justify-center mb-12">
              <Tabs.List className="liquid-pill-nav p-1.5 rounded-xl inline-flex items-center gap-1">
                <Tabs.Trigger
                  value="manshengcheng"
                  className="px-7 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-xs text-slate-600 hover:text-slate-900"
                >
                  「漫生成」AI 漫剧平台
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="traffic"
                  className="px-7 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-xs text-slate-600 hover:text-slate-900"
                >
                  「步点流量投放平台」
                </Tabs.Trigger>
              </Tabs.List>
            </div>

            {/* Tab 1: 漫生成 AI 漫剧平台 (Concise Bento Grid, Minimal Words) */}
            <Tabs.Content value="manshengcheng" className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SpotlightCard className="p-8 md:col-span-2 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium mb-5">
                      <Sparkles className="w-3.5 h-3.5" />
                      旗舰级 AIGC 生产力平台
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                      一站式全流程 AI 漫剧工作台
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-xl mb-8">
                      告别多工具零散拼凑，在一个工作台内完成从剧本生成、主角锁定、动态视频到多角色配音的全工序交付。
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                    <div>
                      <div className="text-2xl font-bold text-slate-900">24h</div>
                      <div className="text-xs text-slate-500 mt-0.5">单部漫剧最快交付</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">99%</div>
                      <div className="text-xs text-slate-500 mt-0.5">跨镜头角色一致性</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">6 阶</div>
                      <div className="text-xs text-slate-500 mt-0.5">节点可控独立返工</div>
                    </div>
                  </div>
                </SpotlightCard>

                <SpotlightCard className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2.5">
                      爆款视频智能复刻
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      上传参考短剧，自动拆解黄金前 3 秒钩子、景别切换与台词脉络，快速完成原创升级。
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-blue-600">
                    <span>分钟级拉片解构</span>
                    <button
                      onClick={() => setActiveModal("experience")}
                      className="inline-flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      立即试用 <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </SpotlightCard>

                <SpotlightCard className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-semibold text-slate-900">跨镜角色资产锁死</span>
                    <Layers className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    固定主角三视图与服装纹理，彻底解决单图抽卡变脸问题。
                  </p>
                </SpotlightCard>

                <SpotlightCard className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-semibold text-slate-900">多角色拟真 TTS 配音</span>
                    <Mic2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    多情感声线库匹配，自动完成口型节奏与毫秒级字幕对齐。
                  </p>
                </SpotlightCard>

                <SpotlightCard className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-semibold text-slate-900">全网发行与投流协同</span>
                    <Share2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    内置合规数字水印，涵盖成片采买、保底分成与矩阵代运营。
                  </p>
                </SpotlightCard>
              </div>
            </Tabs.Content>

            {/* Tab 2: 步点流量投放平台 */}
            <Tabs.Content value="traffic" className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SpotlightCard className="p-8 md:col-span-2 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium mb-5">
                      <BarChart3 className="w-3.5 h-3.5" />
                      程序化广告分发引擎
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                      全域头部流量聚合与智能竞价
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-xl mb-8">
                      深度覆盖头条、快手、腾讯系信息流与搜索渠道，以实时 CTR/CVR 预估模型驱动高 ROI 增长。
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                    <div>
                      <div className="text-2xl font-bold text-slate-900">Top 级</div>
                      <div className="text-xs text-slate-500 mt-0.5">主流媒体流量池覆盖</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">oCPC</div>
                      <div className="text-xs text-slate-500 mt-0.5">实时转化率动态调价</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">4 类</div>
                      <div className="text-xs text-slate-500 mt-0.5">轻量化 SDK 柔性接入</div>
                    </div>
                  </div>
                </SpotlightCard>

                <SpotlightCard className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2.5">
                      前置反作弊安全沙箱
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      基于设备指纹与点击熵值实时拦截机刷与群控流量，确保预算真实转化。
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-indigo-600">
                    <span>毫秒级流量质检</span>
                    <button
                      onClick={() => setActiveModal("contact")}
                      className="inline-flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      洽谈开户 <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </SpotlightCard>

                <SpotlightCard className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-semibold text-slate-900">多维颗粒度定向</span>
                    <Globe2 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    支持省市、运营商、机型、系统版本与兴趣包名交叉定向。
                  </p>
                </SpotlightCard>

                <SpotlightCard className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-semibold text-slate-900">全形态 SDK 接入</span>
                    <Cpu className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    支持 H5 / JS-SDK、微信快手小程序及原生客户端深度集成。
                  </p>
                </SpotlightCard>

                <SpotlightCard className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-semibold text-slate-900">S2S 实时归因回传</span>
                    <BarChart3 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    全链路激活、留存与付费数据回传，精准度量每笔投放产出。
                  </p>
                </SpotlightCard>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </section>

      {/* ================= 4. 交互式六阶管线：只留重点，极简直观 ================= */}
      <section id="pipeline" className="py-24 px-6 bg-[#F8FAFC] border-y border-slate-200/70">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-[36px] font-semibold text-slate-900 tracking-tight mb-3">
              六阶标准流水线，全链路可视可控
            </h2>
            <p className="text-sm md:text-base text-slate-500">
              点击任一工序节点，了解「漫生成」如何实现工业级确定性交付
            </p>
          </div>

          {/* 6 Step Horizontal Liquid Glass Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {PIPELINE_STEPS.map((step, idx) => {
              const Icon = step.icon
              const isActive = idx === activeStage
              return (
                <button
                  key={step.code}
                  onClick={() => setActiveStage(idx)}
                  className={`p-4 rounded-xl text-left transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? "bg-white border-blue-600 shadow-[0_8px_24px_-6px_rgba(37,99,235,0.16)]"
                      : "bg-white/70 border-slate-200/80 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-semibold ${
                        isActive ? "text-blue-600" : "text-slate-400"
                      }`}
                    >
                      STEP {step.code}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-blue-600" : "text-slate-400"
                      }`}
                    />
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {step.name}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Stage Liquid Glass Showcase Panel */}
          <motion.div
            key={currentStage.code}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="liquid-glass-card rounded-2xl p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-mono">
                STAGE {currentStage.code} // {currentStage.badge}
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">
                {currentStage.title}
              </h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl">
                {currentStage.desc}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveModal("experience")}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1664FF] hover:bg-[#0E52D8] text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  体验该工序能力 <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50/90 border border-slate-200/80 rounded-xl p-6 space-y-3.5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200/70">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <StageIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">CORE CAPABILITIES</div>
                  <div className="text-sm font-semibold text-slate-800">{currentStage.name}核心特性</div>
                </div>
              </div>
              {currentStage.metrics.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-slate-200/60 text-sm font-medium text-slate-700"
                >
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 5. 官方合作资质与四大业务生态 ================= */}
      <section id="credentials" className="py-24 px-6 bg-white">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-[36px] font-semibold text-slate-900 tracking-tight mb-3">
              运营商官方基地资质与生态合作
            </h2>
            <p className="text-sm md:text-base text-slate-500">
              深耕中国联通、中国电信增值业务体系，具备扎实的官方授权渠道资质
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SpotlightCard className="p-7">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <Radio className="w-5 h-5" />
              </div>
              <div className="text-xs font-medium text-blue-600 mb-1">官方合作渠道</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                联通在线中央音乐基地
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                数字音乐、视频彩铃与会员权益联合运营合作伙伴。
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-7">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-xs font-medium text-blue-600 mb-1">官方合作渠道</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                中国联通阅读基地
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                数字阅读、网文 IP 孵化与漫剧内容衍生核心渠道。
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-7">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-xs font-medium text-blue-600 mb-1">优秀合作伙伴</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                中国电信线上渠道
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                电信线上触点数字化营销与增值业务深度协同伙伴。
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-7">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="text-xs font-medium text-blue-600 mb-1">权益生态伙伴</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                中国电信天翼翼支付
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                金融支付场景会员权益分发与联合数字营销伙伴。
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ================= 6. 了解步点智能 (精炼大气，无冗余长文) ================= */}
      <section id="about" className="py-24 px-6 bg-[#F8FAFC] border-t border-slate-200/70">
        <div className="max-w-[1240px] mx-auto">
          <div className="liquid-glass-card rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                ABOUT BUDIAN INTELLIGENCE
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                安徽步点智能科技有限公司
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                创立于 2020 年，总部位于合肥高新区创新产业园二期。公司聚焦<strong>「漫生成」AI 漫剧创作与发行</strong>、<strong>数字营销与流量投放</strong>、<strong>游戏研发运营</strong>及<strong>运营商增值权益合作</strong>四大板块，致力于以生成式 AI 与智能算法赋能数字内容产业。
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveModal("contact")}
                  className="px-6 py-2.5 rounded-lg bg-[#1664FF] hover:bg-[#0E52D8] text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  联系商务合作
                </button>
                <button
                  onClick={() => setActiveModal("aiCompliance")}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors cursor-pointer"
                >
                  AIGC 合规声明
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/70">
                <div className="text-3xl font-bold text-slate-900">2020<span className="text-sm font-normal text-slate-500 ml-1">年</span></div>
                <div className="text-xs text-slate-500 mt-1">成立于安徽合肥高新区</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/70">
                <div className="text-3xl font-bold text-slate-900">500<span className="text-sm font-normal text-slate-500 ml-1">万</span></div>
                <div className="text-xs text-slate-500 mt-1">注册资本（人民币）</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/70">
                <div className="text-3xl font-bold text-slate-900">2<span className="text-sm font-normal text-slate-500 ml-1">大平台</span></div>
                <div className="text-xs text-slate-500 mt-1">漫生成 AI + 步点流量投放</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/70">
                <div className="text-3xl font-bold text-slate-900">4<span className="text-sm font-normal text-slate-500 ml-1">大基地</span></div>
                <div className="text-xs text-slate-500 mt-1">联通与电信官方合作资质</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. 页脚 FOOTER ================= */}
      <footer className="bg-white border-t border-slate-200/80 pt-16 pb-10 px-6 text-slate-500 text-sm">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-100">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <img src={LOGO_PATH} alt="Logo" className="w-7 h-7 object-contain" />
                <span className="text-base font-bold text-slate-900">
                  安徽步点智能科技有限公司
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                一站式 AI 漫剧工业化生产平台与全域智能流量分发服务商。
              </p>
              <div className="text-xs text-slate-400 pt-1">
                地址：安徽省合肥市高新区创新大道2800号合肥创新产业园二期E区2幢702-3室
              </div>
            </div>

            <div className="md:col-span-2 space-y-2.5 text-xs">
              <div className="font-semibold text-slate-900 text-sm mb-3">核心产品</div>
              <div><button onClick={() => scrollToSection("core-products")} className="hover:text-blue-600 cursor-pointer">漫生成 AI 平台</button></div>
              <div><button onClick={() => scrollToSection("core-products")} className="hover:text-blue-600 cursor-pointer">步点流量投放平台</button></div>
              <div><button onClick={() => scrollToSection("pipeline")} className="hover:text-blue-600 cursor-pointer">AI 漫剧六阶管线</button></div>
              <div><button onClick={() => scrollToSection("credentials")} className="hover:text-blue-600 cursor-pointer">运营商生态合作</button></div>
            </div>

            <div className="md:col-span-2 space-y-2.5 text-xs">
              <div className="font-semibold text-slate-900 text-sm mb-3">合规与协议</div>
              <div><button onClick={() => setActiveModal("privacy")} className="hover:text-blue-600 cursor-pointer">隐私政策</button></div>
              <div><button onClick={() => setActiveModal("terms")} className="hover:text-blue-600 cursor-pointer">用户服务协议</button></div>
              <div><button onClick={() => setActiveModal("aiCompliance")} className="hover:text-blue-600 cursor-pointer">AI 内容标识声明</button></div>
            </div>

            <div className="md:col-span-3 space-y-2.5 text-xs">
              <div className="font-semibold text-slate-900 text-sm mb-3">商务联系</div>
              <div>邮箱：<a href="mailto:simon@bdzn123.com" className="text-slate-800 font-medium hover:text-blue-600">simon@bdzn123.com</a></div>
              <div>电话：<a href="tel:15665443730" className="text-slate-800 font-medium hover:text-blue-600">156-6544-3730</a></div>
              <div className="pt-1">
                <button
                  onClick={() => setActiveModal("contact")}
                  className="px-4 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium transition-colors cursor-pointer"
                >
                  在线提交咨询
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>Copyright © 2020-2026 安徽步点智能科技有限公司 (bdzn123.com) 版权所有</span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                ICP备案/许可证号：皖ICP备2025082412号-1（皖ICP备2025082412号）
              </a>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => setActiveModal("privacy")} className="hover:text-slate-800 cursor-pointer">隐私政策</button>
              <button onClick={() => setActiveModal("terms")} className="hover:text-slate-800 cursor-pointer">用户协议</button>
              <button onClick={() => setActiveModal("aiCompliance")} className="hover:text-slate-800 cursor-pointer">算法与标识合规</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= 8. 七牛云同款右侧悬浮服务坞 (Floating Service Dock) ================= */}
      <div className="fixed right-4 bottom-8 z-30 hidden sm:flex flex-col items-center gap-3">
        {/* Top Blue Pill: 智能/商务助手 */}
        <button
          onClick={() => setActiveModal("experience")}
          className="w-11 py-3.5 rounded-full bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_28px_rgba(37,99,235,0.5)] transition-all flex flex-col items-center gap-2 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-[12px] font-medium tracking-widest [writing-mode:vertical-rl]">
            漫生成体验
          </span>
        </button>

        {/* Bottom White Liquid Glass Capsule: 人工客服 & 电话 */}
        <div className="w-11 py-3 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.08)] flex flex-col items-center gap-3">
          <button
            onClick={() => setActiveModal("contact")}
            className="flex flex-col items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <Headphones className="w-4 h-4" />
            <span className="text-[10px] leading-tight text-center">商务<br />客服</span>
          </button>
          <div className="w-6 h-px bg-slate-200/80" />
          <a
            href="tel:15665443730"
            title="156-6544-3730"
            className="flex flex-col items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span className="text-[10px] leading-tight">电话</span>
          </a>
        </div>
      </div>

      {/* ================= 9. RADIX UI 模态弹窗系统 ================= */}
      <LegalAndContactModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onSwitchModal={(m) => setActiveModal(m)}
        logoSrc={LOGO_PATH}
      />
    </div>
  )
}
