import React, { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react"

export type ModalType = "contact" | "experience" | "privacy" | "terms" | "aiCompliance" | null

interface ModalsProps {
  activeModal: ModalType
  onClose: () => void
  onSwitchModal: (m: ModalType) => void
  logoSrc: string
}

export const LegalAndContactModals: React.FC<ModalsProps> = ({
  activeModal,
  onClose,
  onSwitchModal,
  logoSrc,
}) => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 1800)
  }

  return (
    <Dialog.Root open={activeModal !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-md transition-opacity animate-in fade-in duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-[640px] max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.22)] flex flex-col overflow-hidden focus:outline-none">
          {/* Header */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 bg-slate-50/60">
            <Dialog.Title className="text-[17px] font-semibold text-slate-900">
              {activeModal === "contact" && "商务咨询与合作对接"}
              {activeModal === "experience" && "「漫生成」工作台接入"}
              {activeModal === "privacy" && "安徽步点智能科技有限公司 · 隐私政策"}
              {activeModal === "terms" && "安徽步点智能科技有限公司 · 用户服务协议"}
              {activeModal === "aiCompliance" && "生成式人工智能内容标识声明"}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                aria-label="关闭"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="p-7 overflow-y-auto text-sm text-slate-600 leading-relaxed space-y-4">
            {activeModal === "contact" && (
              submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto" />
                  <div className="text-base font-semibold text-slate-900">提交成功</div>
                  <p className="text-xs text-slate-500">商务团队将在 24 小时内与您取得联系</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-xs text-slate-500">
                    填写合作诉求，或直接发送邮件至 <strong className="text-slate-800">simon@bdzn123.com</strong>（电话：<strong className="text-slate-800">156-6544-3730</strong>）
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">您的姓名 *</label>
                      <input
                        required
                        type="text"
                        placeholder="如：王经理"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">联系电话 / 微信 *</label>
                      <input
                        required
                        type="tel"
                        placeholder="138 0000 0000"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">合作方向</label>
                    <select className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 outline-none">
                      <option>「漫生成」AI 漫剧平台 — 企业接入 / 算力采购</option>
                      <option>步点流量投放平台 — 广告主开户 / 流量增长</option>
                      <option>短剧漫剧内容采买 / 联合出品发行</option>
                      <option>联通 / 电信基地权益与游戏联运合作</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">补充说明（选填）</label>
                    <textarea
                      rows={3}
                      placeholder="简述团队产能需求或预期目标..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium text-sm transition-colors cursor-pointer"
                  >
                    提交申请
                  </button>
                </form>
              )
            )}

            {activeModal === "experience" && (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mx-auto shadow-xs">
                  <img src={logoSrc} alt="Logo" className="w-9 h-9 object-contain" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-semibold text-slate-900">「漫生成」企业与创作者工作台</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    覆盖 AI 剧本、角色锁定、分镜视频、多角色配音与爆款复刻全工序。当前开放工作室及企业客户测试配额申请。
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => onSwitchModal("contact")}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium transition-colors cursor-pointer"
                  >
                    申请试用配额 <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors cursor-pointer"
                  >
                    稍后了解
                  </button>
                </div>
              </div>
            )}

            {activeModal === "privacy" && (
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="text-slate-400">生效日期：2026年11月4日 | 运营主体：安徽步点智能科技有限公司</div>
                <p>安徽步点智能科技有限公司（地址：安徽省合肥市高新区创新大道2800号合肥创新产业园二期E区2幢702-3室）深知个人信息对您的重要性，严格按照法律法规保护您的信息安全。</p>
                <h5 className="font-semibold text-slate-900 text-sm pt-1">一、信息收集与使用</h5>
                <p>1. 账号登录：微信一键登录收集 OpenID/UnionID、昵称与头像；手机号登录收集手机号及短信验证码用于安全核验。</p>
                <p>2. AI 内容生成：处理您主动输入的剧本文本、提示词及上传的参考图片、音频、视频文件，保存创作历史与生成作品。</p>
                <p>3. 充值与订单：记录订单号、金额、支付状态及算力积分明细。</p>
                <h5 className="font-semibold text-slate-900 text-sm pt-1">二、生成式 AI 合规与未成年人保护</h5>
                <p>本服务严格遵循《生成式人工智能服务管理暂行办法》及《人工智能生成合成内容标识办法》，对生成合成内容添加显式或隐式数字标识。未成年人须在监护人陪同与同意下使用。</p>
                <h5 className="font-semibold text-slate-900 text-sm pt-1">三、联系我们</h5>
                <p>邮箱：simon@bdzn123.com | 电话：15665443730</p>
              </div>
            )}

            {activeModal === "terms" && (
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="text-slate-400">生效日期：2026年11月4日</div>
                <h5 className="font-semibold text-slate-900 text-sm">一、服务范围</h5>
                <p>本协议适用于您使用安徽步点智能科技有限公司旗下「漫生成」AI 漫剧创作平台及「步点流量投放平台」相关服务。</p>
                <h5 className="font-semibold text-slate-900 text-sm pt-1">二、内容安全准则</h5>
                <p>严禁利用本平台制作、生成或传播违反国家法律法规、侵害他人肖像权、名誉权及著作权的内容。上传参考素材需确保具备合法完整授权。</p>
                <h5 className="font-semibold text-slate-900 text-sm pt-1">三、知识产权与商业发行</h5>
                <p>用户原创剧本与自有素材权利归原权利人所有。通过「漫生成」合法导出的漫剧成片，可依据对应套餐授权进行商业发行与分成变现。</p>
              </div>
            )}

            {activeModal === "aiCompliance" && (
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  符合《人工智能生成合成内容标识办法》双轨标识规范
                </div>
                <p>1. 平台生成的图像、视频分镜及合成配音均自动嵌入显式提示与文件元数据隐式数字水印。</p>
                <p>2. 任何机构或个人在传播、发行时不得恶意裁剪、涂抹或擦除生成合成标识。</p>
                <p>3. 平台内置多模态内容安全过滤与人工复审机制，保障合规运营。</p>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
