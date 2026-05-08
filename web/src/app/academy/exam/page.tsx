import { ExamEngine } from "@/components/academy/ExamEngine"

export const metadata = {
  title: "Final Exam — FinSim Academy",
  description: "Test your knowledge across all 8 levels of financial education",
}

export default function ExamPage() {
  return (
    <div className="min-h-screen bg-background py-xl px-lg">
      <ExamEngine />
    </div>
  )
}
