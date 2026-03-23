// src/pages/unauthorized.jsx
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Unauthorized() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-semibold">Access Denied</h1>
      <p className="text-muted-foreground">You don't have permission to view this page.</p>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </div>
  )
}