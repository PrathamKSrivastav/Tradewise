// web/src/hooks/useAuth.ts
"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "../store/userStore"
import { loginUser, registerUser } from "../lib/api"
export function useAuth() {
  const { token, username, user_id, setAuth, logout } = useUserStore()
  const router = useRouter()
  // rehydrate token from localStorage on first mount
  useEffect(() => {
    if (!token && typeof window !== "undefined") {
      const saved = localStorage.getItem("tw_token")
      if (saved) {
        // decode username/id from JWT payload without verification (display only)
        try {
          const payload = JSON.parse(atob(saved.split(".")[1]))
          setAuth(Number(payload.sub), payload.username, saved)
        } catch {
          localStorage.removeItem("tw_token")
        }
      }
    }
  }, [])
  const login = async (email: string, password: string) => {
    const res = await loginUser(email, password)
    setAuth(res.user_id, res.username, res.access_token)
    router.push("/")
  }
  const register = async (username: string, email: string, password: string) => {
    const res = await registerUser(username, email, password)
    setAuth(res.user_id, res.username, res.access_token)
    router.push("/")
  }
  const signOut = () => {
    logout()
    router.push("/login")
  }
  return { token, username, user_id, isAuthed: !!token, login, register, signOut }
}