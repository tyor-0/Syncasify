// src/components/require-role.js
import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function requireRole(allowedRoles) {
    const token = localStorage.getItem("token");
    if (!token) return redirect("/auth");
    try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp && decoded.exp * 1000 < Date.now();
        if (isExpired) {
            localStorage.removeItem("token");
            return redirect("/auth");
        }
        if (!allowedRoles.includes(decoded.role)) {
            return redirect("/unauthorized");
        }
        return null;
    } catch {
        localStorage.removeItem("token");
        return redirect("/auth");
    }
}