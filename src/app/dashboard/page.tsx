'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const email = typeof window !== "undefined"
        ? localStorage.getItem("userEmail") || "User"
        : null;

    const token = typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    useEffect(() => {
        if (typeof window !== "undefined" && !token) {
            router.push("/login");
        }
    }, [token, router]);

    const username = email?.match(/^[a-zA-Z]+/)?.[0] || "User";
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);

    if (email === null) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex" style={{ marginTop: '-30rem' }}>
            <div className="flex-1 p-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h1 className="text-2xl font-semibold">
                        Welcome: {capitalizedUsername}
                    </h1>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Email: {email}</h3>
                </div>
            </div>
        </div>
    );
}





