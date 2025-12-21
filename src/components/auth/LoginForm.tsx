'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import axios from "axios";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await api.post("/auth/login", { email, password });

            if (!res.data?.token) {
                throw new Error("Token not received");
            }

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userEmail", email);

            router.push("/dashboard");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Login failed");
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Sign in</h2>

            {error && <p className="text-red-600 mb-3">{error}</p>}

            <input
                className="w-full border p-2 mb-3 rounded"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />

            <input
                className="w-full border p-2 mb-4 rounded"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />

            <button
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                disabled={loading}
            >
                {loading ? "Signing in..." : "Sign in"}
            </button>
        </form>
    );
}
