"use client";

import { useState } from "react";
import styles from "../app/content_generator/content_generator.module.css";

export default function GeneratorForm({ onGenerate, loading }) {
    const [topic, setTopic] = useState("");
    const [tone, setTone] = useState("neutral");
    const [length, setLength] = useState(100);
    const [error, setError] = useState("");

    const allowOnlyWholeNumbers = (e) => {
        if (
            !/[0-9]/.test(e.key) &&
            e.key !== "Backspace" &&
            e.key !== "ArrowLeft" &&
            e.key !== "ArrowRight" &&
            e.key !== "Delete" &&
            e.key !== "Tab"
        ) {
            e.preventDefault();
        }
    };

    const validateLengthInput = (value) => {
        if (!value) return "";
        const numVal = parseInt(value);
        if (isNaN(numVal)) return "Please enter a valid number.";
        if (numVal < 50 || numVal > 1000)
            return "Length must be between 50 and 1000 words.";
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const numLength = parseInt(length);
        if (isNaN(numLength) || numLength < 50 || numLength > 1000) {
            setError(validateLengthInput(length));
            return;
        }
        setError("");
        onGenerate(topic, tone, numLength);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label>Topic</label>
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter topic (e.g., Future of AI)"
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label>Tone</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)}>
                    <option value="neutral">Neutral</option>
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="creative">Creative</option>
                    <option value="informative">Informative</option>
                    <option value="persuasive">Persuasive</option>
                    <option value="funny">Funny</option>
                    <option value="motivational">Motivational</option>
                    <option value="educational">Educational</option>
                    <option value="sarcastic">Sarcastic</option>
                    <option value="empathetic">Empathetic</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label>Length (in words)</label>
                <input
                    type="text"
                    value={length}
                    placeholder="Enter word count (50-1000)"
                    onKeyDown={allowOnlyWholeNumbers}
                    onChange={(e) => {
                        const val = e.target.value;
                        setLength(val);
                        setError(validateLengthInput(val));
                    }}
                />
                {error && <p className={styles.inputError}>{error}</p>}
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Generating..." : "Generate Content"}
            </button>
        </form>
    );
}
