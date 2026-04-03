"use client";

import { useEffect, useState } from "react";
import styles from "../app/data_extraction/data_extraction.module.css";

export default function ExtractResultBox({ result, loading }) {
    const [visible, setVisible] = useState(false);

    // Fade in/out on result change
    useEffect(() => {
        if (loading) {
            setVisible(false);
        } else {
            const timer = setTimeout(() => setVisible(true), 50);
            return () => clearTimeout(timer);
        }
    }, [result, loading]);

    // Loading state
    if (loading) {
        return (
            <div className={styles.output}>
                <div className={styles.loader}></div>
            </div>
        );
    }

    // No result state
    if (!result) {
        return (
            <div className={`${styles.output} ${visible ? styles.visibleFadeIn : styles.visibleFadeOut}`}>
                <p className={styles.placeholder}>
                    No data extracted yet. Enter input and click <strong>“Extract Data”</strong>!
                </p>
            </div>
        );
    }

    const normalize = (data) => {
        if (data == null) return data;

        // Convert { type, value } → value
        if (typeof data === "object" && "value" in data && Object.keys(data).length <= 2) {
            return normalize(data.value);
        }

        // Arrays
        if (Array.isArray(data)) {
            return data.map(normalize);
        }

        // Objects
        if (typeof data === "object") {
            const clean = {};
            for (const key in data) {
                clean[key] = normalize(data[key]);
            }
            return clean;
        }

        return data;
    };

    // Parse result safely
    let parsed = {};
    let isError = false;

    if (typeof result === "object" && result.error) {
        isError = true;
        parsed.error = result.error;
    }

    if (!isError) {
        try {
            parsed = typeof result === "string" ? JSON.parse(result) : result;
        } catch (err) {
            parsed = { raw: result };
        }
    }

    // 🔥 CRITICAL LINE
    parsed = normalize(parsed);

    // Helper to check if a field has meaningful data
    const hasData = (field) => {
        if (!field) return false;
        if (Array.isArray(field)) return field.length > 0;
        if (typeof field === "object") return Object.keys(field).some((k) => hasData(field[k]));
        return field.toString().trim() !== "";
    };

    const isEmpty = !(
        hasData(parsed.summary) ||
        hasData(parsed.key_points) ||
        hasData(parsed.keywords) ||
        hasData(parsed.entities) ||
        hasData(parsed.sentiment) ||
        hasData(parsed.tone) ||
        hasData(parsed.important_numbers) ||
        hasData(parsed.action_items) ||
        hasData(parsed.raw) ||
        hasData(parsed.error) ||
        parsed.input_type
    );

    if (isEmpty) {
        return (
            <div className={`${styles.output} ${visible ? styles.visibleFadeIn : styles.visibleFadeOut}`}>
                <p className={styles.placeholder}>No data extracted from the input.</p>
            </div>
        );
    }

    // Filter entities
    const filteredEntities = parsed.entities
        ? Object.fromEntries(
            Object.entries(parsed.entities).filter(([_, arr]) => Array.isArray(arr) && arr.length > 0)
        )
        : null;

    return (
        <div className={`${styles.output} ${visible ? styles.visibleFadeIn : styles.visibleFadeOut}`}>

            {/* Input Type */}
            {parsed.input_type && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>📝 Input Type</h3>
                    <p className={styles.sectionText}>{parsed.input_type.toUpperCase()}</p>
                </section>
            )}

            {/* URL Display */}
            {parsed.input_type === "url" && parsed.url && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>🌐 Website URL</h3>
                    <a href={parsed.url} target="_blank" rel="noopener noreferrer" className={styles.sectionText}>
                        {parsed.url}
                    </a>
                    {parsed.url_summary && <p className={styles.sectionText}>{parsed.url_summary}</p>}
                </section>
            )}

            {/* File Display */}
            {parsed.input_type === "file" && parsed.file_name && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>📂 Uploaded File</h3>
                    <p className={styles.sectionText}>File Name: {parsed.file_name}</p>
                    {parsed.file_summary && <p className={styles.sectionText}>Summary: {parsed.file_summary}</p>}
                </section>
            )}

            {/* Text Extraction Sections */}
            {parsed.summary && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>📌 Summary</h3>
                    <p className={styles.sectionText}>{parsed.summary}</p>
                </section>
            )}

            {parsed.key_points?.length > 0 && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>🧩 Key Points</h3>
                    <ul className={styles.list}>
                        {parsed.key_points.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                </section>
            )}

            {parsed.keywords?.length > 0 && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>🏷️ Keywords</h3>
                    <div className={styles.tags}>
                        {parsed.keywords.map((word, i) => (
                            <span key={i} className={styles.tag}>{word}</span>
                        ))}
                    </div>
                </section>
            )}

            {filteredEntities && Object.keys(filteredEntities).length > 0 && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>🔍 Entities</h3>
                    <pre className={styles.pre}>{JSON.stringify(filteredEntities, null, 2)}</pre>
                </section>
            )}

            {parsed.sentiment && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>🧭 Sentiment</h3>
                    <p className={styles.sectionText}>{parsed.sentiment}</p>
                </section>
            )}

            {parsed.tone && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>🎭 Tone</h3>
                    <p className={styles.sectionText}>{parsed.tone}</p>
                </section>
            )}

            {parsed.important_numbers?.length > 0 && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>🔢 Important Numbers</h3>
                    <ul className={styles.list}>
                        {parsed.important_numbers.map((num, i) => <li key={i}>{num}</li>)}
                    </ul>
                </section>
            )}

            {parsed.action_items?.length > 0 && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>⚡ Action Items</h3>
                    <ul className={styles.list}>
                        {parsed.action_items.map((item, i) => (
                            <li key={i}>
                                {typeof item === "string" ? (
                                    item
                                ) : (
                                    <>
                                        <strong>{item.title}</strong>
                                        {item.description && `: ${item.description}`}
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Error */}
            {parsed.error && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>❌ Error</h3>
                    <p className={styles.sectionText}>{parsed.error}</p>
                </section>
            )}

            {/* Raw JSON */}
            {parsed.raw && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Raw Output</h3>
                    <pre className={styles.pre}>{parsed.raw}</pre>
                </section>
            )}
        </div>
    );
}
