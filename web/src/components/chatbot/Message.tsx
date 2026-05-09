// web/src/components/chatbot/Message.tsx
import ReactMarkdown from "react-markdown"

export interface ChatMessage {
  role: "user" | "bot"
  text: string
  loading?: boolean
}

export function Message({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user"
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[90%] rounded-xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
          isUser
            ? "bg-indigo-500/30 text-white rounded-br-sm ring-1 ring-indigo-500/20"
            : "bg-white/8 text-white/90 rounded-bl-sm ring-1 ring-white/5"
        }`}
      >
        {msg.loading ? (
          <span className="flex gap-1 items-center py-1">
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:300ms]" />
          </span>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none 
            prose-p:my-1 prose-p:leading-relaxed
            prose-ul:my-2 prose-li:my-0.5
            prose-strong:text-indigo-300 prose-strong:font-bold
            prose-code:bg-black/40 prose-code:px-1 prose-code:rounded prose-code:text-xs
          ">
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}