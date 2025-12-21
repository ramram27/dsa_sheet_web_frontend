"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function HeaderWrapper() {
    const pathname = usePathname();

    const hideHeaderOn = ["/", "/login"];

    if (hideHeaderOn.includes(pathname)) return null;

    return <Header />;
}

