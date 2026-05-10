"use client"
import { AppLayout } from "../../components/layout/AppLayout"
import { CertificateView } from "../../components/academy/CertificateView"

export default function CertificatePage() {
  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <CertificateView />
      </div>
    </AppLayout>
  )
}
