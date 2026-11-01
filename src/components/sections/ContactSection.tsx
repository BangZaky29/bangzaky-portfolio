import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Copy,
  Send,
  MessageCircle,
  Github,
  Linkedin,
  Instagram,
  FileText,
  Terminal,
  Check
} from 'lucide-react';
import { LightingMode } from '../../types';
import { ScrambleText, RevealTitle, FadeUp } from '../motion/RevealText';
import { InteractiveCard } from '../motion/InteractiveCard';

interface ContactSectionProps {
  lightingMode: LightingMode;
  onShowToast: (msg: string) => void;
}

export function ContactSection({ lightingMode, onShowToast }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');

  const isUV = lightingMode === 'uv';
  const emailAddr = 'bangzaky0029@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddr);
    setCopied(true);
    onShowToast('✓ Email address copied to clipboard: ' + emailAddr);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      `Halo Zaky, saya ${formName} (${formEmail}). Pesan: ${formMsg}`
    );
    window.open(`https://wa.me/6281995770190?text=${encoded}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="w-full max-w-7xl xl:max-w-[1480px] 2xl:max-w-[1640px] mx-auto px-4 sm:px-8 space-y-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1E293B]/60">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#64748B] mb-2">
              <span className={isUV ? 'text-purple-400 font-bold' : 'text-cyan-400 font-bold'}>05</span>
              <span>/</span>
              <ScrambleText
                text="GET IN TOUCH & INITIATE SYSTEM"
                triggerOnHover
                className={isUV ? 'text-purple-300' : 'text-[#94A3B8]'}
              />
            </div>

            <RevealTitle
              text="LET'S BUILD SOMETHING EXTRAORDINARY"
              highlightWords={['SOMETHING', 'EXTRAORDINARY']}
              highlightClassName={isUV ? 'text-purple-400' : 'text-cyan-400'}
              className="text-3xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
            />
          </div>

          <FadeUp delay={0.2}>
            <p className="text-sm font-mono text-[#94A3B8] max-w-md">
              Punya ide sistem, dashboard bisnis, bot automasi, atau aplikasi web skala penuh? Saya siap berkolaborasi dari konsep arsitektur hingga deployment produksi.
            </p>
          </FadeUp>
        </div>

        {/* Main Contact Grid with Angled Vector Entrances */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column: 1-Click Copy & Direct Social Links (Slide from Left) */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 90, damping: 18 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* 1-Click Email Action Card */}
            <InteractiveCard
              lightingMode={lightingMode}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0F1422] to-[#0A0D15] border border-[#1E293B] space-y-4"
            >
              <div className="flex items-center justify-between font-mono text-xs text-[#64748B]">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>DIRECT INBOX</span>
                </span>
                <span className="text-emerald-400">STATUS: FAST RESPONSE</span>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-[#94A3B8]">Click to copy email address:</div>
                <button
                  onClick={handleCopyEmail}
                  className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all text-left group cursor-pointer touch-manipulation ${copied
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                      : isUV
                        ? 'bg-[#151026] border-purple-500/40 text-white hover:border-purple-400'
                        : 'bg-[#121826] border-[#1E293B] text-white hover:border-cyan-400/60'
                    }`}
                >
                  <span className="font-mono text-xs sm:text-base font-bold truncate pr-2">
                    {emailAddr}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0 px-2 sm:px-2.5 py-1 rounded bg-[#1E293B] group-hover:bg-cyan-500 group-hover:text-black transition-colors font-mono text-[11px] sm:text-xs">
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400 group-hover:text-black" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </div>
                </button>
              </div>

              {/* WhatsApp Quick Action */}
              <a
                href="https://wa.me/6281995770190"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer touch-manipulation active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WHATSAPP</span>
              </a>
            </InteractiveCard>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <a
                href="https://github.com/BangZaky29"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-3.5 rounded-lg bg-[#0D121D] border border-[#1E293B] text-[#94A3B8] hover:text-white hover:border-cyan-500/50 transition-all touch-manipulation"
              >
                <Github className="w-4 h-4 text-white" />
                <span className="truncate">GitHub /BangZaky29</span>
              </a>

              <a
                href="https://www.linkedin.com/in/zaky-aulia-qolbi-90647a395/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-3.5 rounded-lg bg-[#0D121D] border border-[#1E293B] text-[#94A3B8] hover:text-white hover:border-cyan-500/50 transition-all touch-manipulation"
              >
                <Linkedin className="w-4 h-4 text-cyan-400" />
                <span className="truncate">LinkedIn /Zaky</span>
              </a>

              <a
                href="https://www.instagram.com/zaky_aulia_qolbi29"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-3.5 rounded-lg bg-[#0D121D] border border-[#1E293B] text-[#94A3B8] hover:text-white hover:border-cyan-500/50 transition-all touch-manipulation"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span className="truncate">Instagram @zaky</span>
              </a>

              <a
                href="/myCV/My-CV.pdf"
                download="Zaky Aulia Qolbi - Creative Developer & AI Systems Engineer.pdf"
                className="flex items-center gap-2 p-3.5 rounded-lg bg-[#0D121D] border border-[#1E293B] text-[#94A3B8] hover:text-white hover:border-cyan-500/50 transition-all touch-manipulation"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span className="truncate">Download Resume</span>
              </a>
            </div>

          </motion.div>

          {/* Right Column: Sleek Terminal Form (Slide from Right) */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <InteractiveCard
              lightingMode={lightingMode}
              className="p-6 sm:p-8 rounded-2xl bg-[#0D121D] border border-[#1E293B]"
            >
              <form onSubmit={handleSubmitForm} className="space-y-5">
                <div className="flex items-center gap-2 font-mono text-xs text-[#64748B] border-b border-[#1E293B] pb-3">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <ScrambleText text="INITIATE_PROJECT_TRANSMISSION // TERMINAL" triggerOnHover />
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-[#94A3B8]">01 // YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Alexander Vance"
                    className="w-full px-4 py-3 rounded-lg bg-[#080B12] border border-[#1E293B] text-white text-base sm:text-xs placeholder-[#475569] focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-[#94A3B8]">02 // EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="e.g. alexander@enterprise.com"
                    className="w-full px-4 py-3 rounded-lg bg-[#080B12] border border-[#1E293B] text-white text-base sm:text-xs placeholder-[#475569] focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-[#94A3B8]">03 // PROJECT SCOPE & GOALS</label>
                  <textarea
                    required
                    rows={4}
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    placeholder="Describe your system, timeline, or architecture requirements..."
                    className="w-full px-4 py-3 rounded-lg bg-[#080B12] border border-[#1E293B] text-white text-base sm:text-xs placeholder-[#475569] focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer touch-manipulation active:scale-95 ${isUV
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.35)]'
                    }`}
                >
                  <Send className="w-4 h-4" />
                  <span>SEND DIRECT BRIEF VIA WHATSAPP</span>
                </button>
              </form>
            </InteractiveCard>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
