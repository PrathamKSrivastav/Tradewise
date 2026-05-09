// web/src/components/academy/CertificateView.tsx
"use client"
import { useEffect, useState } from "react"
import { fetchCertificate } from "../../lib/api"
import { useUserStore } from "../../store/userStore"
import { AppNav } from "../layout/AppNav"
import clsx from "clsx"

export function CertificateView() {
  const { token, user_id: userId, username } = useUserStore()

  const [cert, setCert] = useState<{ certificateUrl: string; score: number; issuedAt: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      if (!token || !user_id) return
      try {
        const data = await fetchCertificate(token, user_id)
        setCert(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [token, user_id])


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

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-[32px] font-black text-ink mb-2 tracking-tight">Your Achievement</h1>
          <p className="text-ink3 text-[15px]">
            Congratulations, <span className="text-ink font-bold">{username}</span>! You've officially mastered the Tradewise curriculum.
          </p>
        </div>
        
        <div className="flex gap-3">
          <a 
            href={cert.certificateUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="h-11 px-6 rounded-btn bg-white/5 hover:bg-white/10 text-ink font-bold transition flex items-center gap-2 ring-1 ring-white/10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Full View
          </a>
          <a 
            href={cert.certificateUrl} 
            download={`tradewise-certificate-${userId}.pdf`}
            className="h-11 px-6 rounded-btn bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Download PDF
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Certificate Frame */}
        <div className="lg:col-span-3 aspect-[1.414/1] w-full bg-[#15151e] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5 relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
          <iframe 
            src={`${cert.certificateUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full border-0 pointer-events-none"
            title="Tradewise Certificate"
          />
          <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors pointer-events-none" />
        </div>

        {/* Details Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl bg-white/4 ring-1 ring-white/5">
            <h3 className="text-[11px] font-bold text-ink3 uppercase tracking-[0.2em] mb-4">Exam Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] text-ink3 uppercase font-medium mb-1">Final Score</div>
                <div className="text-[28px] font-black text-emerald-400 leading-none">{cert.score}%</div>
              </div>
              <div>
                <div className="text-[10px] text-ink3 uppercase font-medium mb-1">Issued On</div>
                <div className="text-[15px] font-bold text-ink leading-none">
                  {new Date(cert.issuedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
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
              <button className="flex-1 h-9 rounded-btn bg-[#0077b5] hover:bg-[#0077b5]/90 text-white font-bold text-[11px] transition">LinkedIn</button>
              <button className="flex-1 h-9 rounded-btn bg-[#1da1f2] hover:bg-[#1da1f2]/90 text-white font-bold text-[11px] transition">Twitter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
