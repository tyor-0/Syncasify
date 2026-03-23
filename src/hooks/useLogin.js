import axiosInstance from "@/services/instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { jwtDecode } from "jwt-decode";

const signinSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    remember: z.boolean().optional(),
});

export function useLogin() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    async function onSubmit(data) {
        setSubmitting(true);
        try {
            const res = await axiosInstance.post("/user/login", data);
            const token = res.data.token;
            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);
            const role = decoded.role;

            if (role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }

            alert("Login Successful");

        } catch (error) {
            alert(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }




    return {
        submitting,
        onSubmit,
        errors,
        handleSubmit,
        register,
    };
}