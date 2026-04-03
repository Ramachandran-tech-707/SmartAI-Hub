"use client";

import { useState } from "react";
import styles from "./data_extraction.module.css";

import ExtractorForm from "@/components/ExtractorForm";
import ExtractResultBox from "@/components/ExtractorResultBox";

export default function DataExtraction() {

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Send content to backend
    const handleExtract = async (payload) => {
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/extract`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: payload.type,
                    content: payload.content,
                    name: payload.name || ""
                }),
            });

            const data = await res.json();

            // Attach file/url name for display only
            if (payload.type === "file") data.file_name = payload.name;
            if (payload.type === "url") data.url = payload.content;

            data.input_type = payload.type;

            setResult(data);
        }
        catch (err) {
            console.error(err);
            setResult({
                error: "Extraction failed. Please try again later.",
            });
        }
        setLoading(false);
    };

    const handleReset = () => setResult(null);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Data Extraction Tool</h1>
            <p className={styles.subtext}>
                Paste text, provide a URL, or upload a file to extract structured information instantly.
            </p>

            <ExtractorForm
                onExtract={handleExtract}
                onReset={handleReset}
                loading={loading}
            />

            <ExtractResultBox
                result={result}
                loading={loading}
            />

        </div>
    );
}
