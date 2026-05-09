// web/src/app/certificate/page.tsx
"use client"
import { AppNav } from "../../components/layout/AppNav"
import { CertificateView } from "../../components/academy/CertificateView"

export default function CertificatePage() {
  return (
    <div className="min-h-screen bg-canvas">
      <AppNav />
      <div className="pt-20">
        <CertificateView />
      </div>
    </div>
  )
}
