'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const handleLogout = (): void => {
        if (typeof window !== "undefined") {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userData');
        }
        router.push('/');
    };
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="flex-1 p-8">
                <div className="bg-blue-600 text-white p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <div className="flex space-x-4">
                            <Link href="/dashboard" className="hover:text-blue-200">Profile</Link>
                            <Link href="/dashboard/topic" className="hover:text-blue-200 font-semibold">Topics</Link>
                            <Link href="/dashboard/progress" className="hover:text-blue-200">Progress</Link>
                            <button
                                onClick={handleLogout}
                                className="hover:text-blue-200 border border-white px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


