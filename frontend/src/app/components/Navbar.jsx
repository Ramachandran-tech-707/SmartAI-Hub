"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    
    const pathname = usePathname();

    return (
        <nav className="navbar">
            <Link href="/" className="navbar-brand">⚡ AI Tools Suite</Link>

            <ul className="nav-links">
                <li>
                    <Link href="/" className={pathname === "/" ? "active" : ""}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/chatbot" className={pathname === "/chatbot" ? "active" : ""}>
                        Chatbot
                    </Link>
                </li>
                <li>
                    <Link href="/content_generator" className={pathname === "/content_generator" ? "active" : ""}>
                        Content Generator
                    </Link>
                </li>
                <li>
                    <Link href="/data_extraction" className={pathname === "/data_extraction" ? "active" : ""}>
                        Data Extraction
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
