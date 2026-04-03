"use client";

import { useState } from "react";

import styles from "./content_generator.module.css";
import { toast } from "react-toastify";

import GeneratorForm from "@/components/GeneratorForm";
import ResultBox from "@/components/ResultBox";

export default function ContentGenerator() {
    
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async (topic, tone, length) => {
        setLoading(true);
        setContent("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic, tone, length: Number(length) }),
            });

            const data = await res.json();
            setContent(data.content || "No content generated.");
        }
        catch (err) {
            console.error(err);
            setContent("Error connecting to backend.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <header className={styles.pageHeader}>
                <p>AI Content Generator</p>
                <p>Create High-Quality AI Content Instantly</p>
            </header>

            <GeneratorForm onGenerate={handleGenerate} loading={loading} />
            <ResultBox content={content} loading={loading} />
        </div>
    );
}
