// web/src/components/chatbot/Message.tsx
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
        className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
          isUser
            ? "bg-indigo-500/30 text-white rounded-br-sm"
            : "bg-white/8 text-white/80 rounded-bl-sm"
        }`}
      >
        {msg.loading ? (
          <span className="flex gap-1 items-center py-0.5">
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:300ms]" />
          </span>
        ) : (
          msg.text
        )}
      </div>
    </div>
  )
}