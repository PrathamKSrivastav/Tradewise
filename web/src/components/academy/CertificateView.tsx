// web/src/components/academy/CertificateView.tsx
"use client"
import { useEffect, useRef, useState } from "react"
import { fetchCertificate } from "../../lib/api"
import { useUserStore } from "../../store/userStore"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export function CertificateView() {
  const { token, user_id: userId, username } = useUserStore()
  const certRef = useRef<HTMLDivElement>(null)

  const [cert, setCert] = useState<{ certificateUrl: string; score: number; issuedAt: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      if (!token || !userId) return
      try {
        const data = await fetchCertificate(token, userId)
        setCert(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [token, userId])

  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    if (!certRef.current) return
    setDownloading(true)
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      })
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width / 3, canvas.height / 3] })
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 3, canvas.height / 3)
      pdf.save(`tradewise-certificate-${username}.pdf`)
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-ink3 font-medium animate-pulse">Retrieving your certificate...</p>
      </div>
    )
  }

  if (error || !cert) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-6 px-6 text-center">
        <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="max-w-md">
          <h2 className="text-[20px] font-bold text-ink mb-2">No Certificate Found</h2>
          <p className="text-ink3 text-[14px] mb-8 leading-relaxed">
            You haven't earned a certificate yet. Complete the final Academy exam with a score of 70% or higher to unlock it.
          </p>
          <a href="/academy" className="h-11 px-8 rounded-btn bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition flex items-center justify-center mx-auto w-fit">
            Go to Academy
          </a>
        </div>
      </div>
    )
  }

  const issuedDate = new Date(cert.issuedAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  })

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Page header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[32px] font-black text-ink mb-2 tracking-tight">Your Achievement</h1>
          <p className="text-ink3 text-[15px]">
            Congratulations, <span className="text-ink font-bold">{username}</span>! You've officially mastered the Tradewise curriculum.
          </p>
        </div>
        <div className="flex gap-3 print:hidden">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="h-11 px-6 rounded-btn bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-bold transition flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            {downloading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            )}
            {downloading ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Certificate render */}
        <div
          ref={certRef}
          data-certificate
          className="lg:col-span-3 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
          style={{ background: "linear-gradient(135deg, #0d0f1e 0%, #111827 50%, #0d0f1e 100%)" }}
        >
          {/* Top border accent */}
          <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)" }} />

          <div className="px-12 py-8 flex flex-col items-center text-center gap-5">
            {/* Logo + issuer */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center font-black text-white text-[16px]">T</div>
              <div className="text-left">
                <div className="text-[13px] font-black text-white tracking-wide">Tradewise</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">Finsim Academy</div>
              </div>
            </div>

            {/* Decorative line */}
            <div className="flex items-center gap-4 w-full max-w-md">
              <div className="flex-1 h-px bg-white/10" />
              <svg className="w-5 h-5 text-indigo-400 flex-none" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Certificate title */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-indigo-400 mb-3">Certificate of Completion</div>
              <div className="text-[13px] text-white/50 mb-4">This is to certify that</div>
              <div className="text-[42px] font-black text-white tracking-tight leading-none" style={{ fontFamily: "serif" }}>
                {username}
              </div>
            </div>

            <p className="text-[14px] text-white/60 max-w-sm leading-relaxed">
              has successfully completed the <span className="text-white font-semibold">Tradewise Financial Markets</span> curriculum, demonstrating proficiency in stock market fundamentals, technical &amp; fundamental analysis, and risk management.
            </p>

            {/* Score badge */}
            <div className="flex items-center gap-3 px-6 py-3 rounded-full ring-1 ring-emerald-500/30 bg-emerald-500/10">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
              <span className="text-[13px] font-bold text-emerald-400">Final Score: {cert.score}%</span>
            </div>

            {/* Decorative line */}
            <div className="flex items-center gap-4 w-full max-w-md">
              <div className="flex-1 h-px bg-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Date + signature row */}
            <div className="flex items-end justify-between w-full max-w-sm">
              <div className="text-center">
                <div className="text-[11px] text-white/40 uppercase tracking-widest mb-1">Issued On</div>
                <div className="text-[13px] font-semibold text-white">{issuedDate}</div>
              </div>
              <div className="text-center">
                <div className="text-[22px] font-black text-indigo-400 leading-none mb-1" style={{ fontFamily: "cursive" }}>Tradewise</div>
                <div className="h-px w-24 bg-white/20 mx-auto mb-1" />
                <div className="text-[11px] text-white/40 uppercase tracking-widest">Authorised Signature</div>
              </div>
            </div>
          </div>

          {/* Bottom border accent */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #6366f1)" }} />
        </div>

        {/* Details sidebar */}
        <div className="lg:col-span-1 space-y-6 print:hidden">
          <div className="p-6 rounded-2xl bg-white/4 ring-1 ring-white/5">
            <h3 className="text-[11px] font-bold text-ink3 uppercase tracking-[0.2em] mb-4">Exam Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] text-ink3 uppercase font-medium mb-1">Final Score</div>
                <div className="text-[28px] font-black text-emerald-400 leading-none">{cert.score}%</div>
              </div>
              <div>
                <div className="text-[10px] text-ink3 uppercase font-medium mb-1">Issued On</div>
                <div className="text-[15px] font-bold text-ink leading-none">{issuedDate}</div>
              </div>
              <div>
                <div className="text-[10px] text-ink3 uppercase font-medium mb-1">Status</div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-[13px]">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Verified
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-dashed border-white/10 bg-white/2">
            <h3 className="text-[13px] font-bold text-ink mb-2">Share your success</h3>
            <p className="text-[11px] text-ink3 mb-4 leading-relaxed">
              Let the world know you've mastered the Indian stock market basics.
            </p>
            <div className="flex gap-2">
              <button className="flex-1 h-9 rounded-btn bg-[#0077b5] hover:bg-[#006097] text-white font-bold text-[11px] transition">LinkedIn</button>
              <button className="flex-1 h-9 rounded-btn bg-[#1da1f2] hover:bg-[#1991db] text-white font-bold text-[11px] transition">Twitter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
