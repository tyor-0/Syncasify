// src/hooks/use-auth.js
import { jwtDecode } from "jwt-decode"

export function useAuth() {
  const token = localStorage.getItem("token")

  if (!token) return { user: null }

  try {
    const decoded = jwtDecode(token)

    // Check if token is expired
    const isExpired = decoded.exp && decoded.exp * 1000 < Date.now()
    if (isExpired) {
      localStorage.removeItem("token")
      return { user: null }
    }

    return { user: { role: decoded.role, ...decoded } }
  } catch {
    localStorage.removeItem("token")
    return { user: null }
  }
}