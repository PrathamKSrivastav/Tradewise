"use client"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { LessonObject } from "@/types/lesson"
import { Button } from "@/components/ui/Button"
import { SIPCalculator } from "./SIPCalculator"
import { ChatWidget } from "../chatbot/ChatWidget"

interface Props {
  lesson: LessonObject
  totalLessons: number
  completedIds: string[]
}

export function LessonReader({ lesson, totalLessons, completedIds }: Props) {
  const router = useRouter()
  const alreadyCompleted = completedIds.includes(lesson.id)
  const lessonIndex = lesson.order

  const handleComplete = () => {
    router.push(`/academy/quiz/${lesson.id}`)
  }

  return (
    <div className="flex h-screen bg-canvas text-ink overflow-hidden">
      {/* Left column: Header + Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex-none bg-canvas/95 backdrop-blur-sm border-b border-stroke1">
          <div className="flex items-center justify-between px-6 h-14">
            <button
              onClick={() => router.back()}
              className="w-8 h-8 rounded-btn bg-white/5 hover:bg-white/8 ring-1 ring-stroke1 grid place-items-center text-ink2 hover:text-ink transition"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            <div className="text-center">
              <div className="text-[11px] text-ink3 font-semibold tracking-[0.14em] uppercase">Level {lesson.level}</div>
              <div className="text-[14px] font-semibold line-clamp-1">{lesson.title}</div>
            </div>

            <div className="flex items-center gap-1.5 px-3 h-8 rounded-pill bg-indigo-500/10 ring-1 ring-indigo-500/25 text-[12px] font-semibold text-indigo-400">
              +{lesson.xpReward} XP
            </div>
          </div>

          {/* Segmented progress */}
          <div className="flex gap-1 px-6 pb-2.5">
            {Array.from({ length: totalLessons }, (_, i) => (
              <div key={i} className={`h-0.5 flex-1 rounded-full transition-colors ${
                i + 1 < lessonIndex ? "bg-indigo-500" : i + 1 === lessonIndex ? "bg-indigo-500/50" : "bg-white/8"
              }`} />
            ))}
          </div>
        </header>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto scrollbar-none">
          <div className="max-w-4xl mx-auto w-full px-6 py-10 flex gap-8">
            {/* Article */}
            <article className="flex-1 min-w-0 space-y-8">
              {/* Meta chips */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 h-7 rounded-pill bg-white/5 ring-1 ring-stroke1 text-[11.5px] text-ink2">
                  <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" /></svg>
                  ~{lesson.estimatedReadTime ?? 5} min
                </span>
                <span className="inline-flex items-center px-3 h-7 rounded-pill bg-white/5 ring-1 ring-stroke1 text-[11.5px] text-ink2">
                  Lesson {lessonIndex} of {totalLessons}
                </span>
              </div>

              {/* Body */}
              <div className="prose max-w-none
                prose-headings:text-ink prose-headings:font-semibold prose-headings:tracking-tight
                prose-p:text-ink2 prose-p:leading-relaxed
                prose-strong:text-ink
                prose-li:text-ink2
                prose-blockquote:border-l-indigo-500/50 prose-blockquote:text-ink2 prose-blockquote:bg-white/3 prose-blockquote:rounded-r-btn prose-blockquote:py-2 prose-blockquote:px-4
                prose-code:bg-white/8 prose-code:text-indigo-300 prose-code:px-1.5 prose-code:rounded prose-code:text-[0.9em]
                prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
                prose-th:text-ink prose-td:text-ink2
              ">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.body}</ReactMarkdown>
              </div>

              {lesson.id === '05-compound-interest-and-sip' && <SIPCalculator />}

              {lesson.source && (
                <p className="text-[11px] text-ink3">{lesson.source}</p>
              )}

              {/* CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-stroke1">
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-1.5 text-[13px] text-ink2 hover:text-ink transition"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Back
                </button>
                <Button onClick={handleComplete} size="lg" variant="primary" iconRight={
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                }>
                  {alreadyCompleted ? "Retake Quiz" : "Complete & Take Quiz"}
                </Button>
              </div>
            </article>

            {/* Glossary sidebar (Key Terms) */}
            {lesson.keyTerms.length > 0 && (
              <aside className="hidden xl:block w-52 flex-shrink-0">
                <div className="sticky top-0 rounded-card bg-elev1 ring-1 ring-stroke1 p-4 space-y-3">
                  <div className="text-[10.5px] text-ink3 font-semibold tracking-[0.14em] uppercase">Key Terms</div>
                  <div className="space-y-3 max-h-[65vh] overflow-y-auto scrollbar-none pr-1">
                    {lesson.keyTerms.map(kt => (
                      <div key={kt.term} className="border-l-2 border-indigo-500/30 pl-3">
                        <div className="text-[12.5px] font-semibold text-indigo-400">{kt.term}</div>
                        <div className="text-[11.5px] text-ink2 mt-0.5 leading-snug">{kt.definition}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </main>
      </div>

      {/* Right column: Full-height Chat Tutor */}
      <aside className="w-[480px] flex-shrink-0 border-l border-stroke1 bg-[#0d1120] flex flex-col h-screen">
        <ChatWidget mode="lesson" lesson={lesson} inline />
      </aside>
    </div>
  )
}
