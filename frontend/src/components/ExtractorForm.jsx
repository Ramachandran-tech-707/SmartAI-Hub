"use client";

import { useState, useRef, useEffect } from "react";
import styles from "../app/data_extraction/data_extraction.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ExtractorForm({ onExtract, onReset, loading }) {

    const [inputType, setInputType] = useState("text");
    const [inputText, setInputText] = useState("");
    const [inputUrl, setInputUrl] = useState("");
    const [inputFile, setInputFile] = useState(null);
    const [pdfJsLoading, setPdfJsLoading] = useState(false);
    
    const pdfjsLibRef = useRef(null);
    const scriptLoadedRef = useRef(false);

    // Load PDF.js from CDN on component mount
    useEffect(() => {
        loadPdfJsFromCDN();
    }, []);

    const loadPdfJsFromCDN = () => {
        // Return if already loaded
        if (scriptLoadedRef.current || pdfjsLibRef.current) {
            return Promise.resolve(pdfjsLibRef.current);
        }

        // Check if already available in window
        if (typeof window !== 'undefined' && window.pdfjsLib) {
            pdfjsLibRef.current = window.pdfjsLib;
            scriptLoadedRef.current = true;
            // console.log("PDF.js already loaded from window");
            return Promise.resolve(window.pdfjsLib);
        }

        setPdfJsLoading(true);

        return new Promise((resolve, reject) => {
            // console.log("Loading PDF.js from CDN...");

            const script = document.createElement('script');
            // Using v3.11.174 which is stable and well-tested
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.async = true;

            script.onload = () => {
                // console.log("PDF.js script loaded");
                
                // Wait for pdfjsLib to be available
                const checkInterval = setInterval(() => {
                    if (window.pdfjsLib) {
                        clearInterval(checkInterval);
                        
                        // Set worker
                        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
                            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                        
                        // console.log("PDF.js worker configured");
                        pdfjsLibRef.current = window.pdfjsLib;
                        scriptLoadedRef.current = true;
                        setPdfJsLoading(false);
                        resolve(window.pdfjsLib);
                    }
                }, 50);

                // Timeout after 5 seconds
                setTimeout(() => {
                    clearInterval(checkInterval);
                    if (!window.pdfjsLib) {
                        setPdfJsLoading(false);
                        reject(new Error("PDF.js failed to initialize"));
                    }
                }, 5000);
            };

            script.onerror = () => {
                console.error("Failed to load PDF.js script");
                setPdfJsLoading(false);
                reject(new Error("Failed to load PDF.js from CDN"));
            };

            document.head.appendChild(script);
        });
    };

    const ensurePdfJsLoaded = async () => {
        if (pdfjsLibRef.current) {
            return pdfjsLibRef.current;
        }

        try {
            await loadPdfJsFromCDN();
            return pdfjsLibRef.current;
        }
        catch (error) {
            // console.error("Failed to load PDF.js:", error);

            toast.error("Failed to load PDF reader. Please refresh the page.");
            throw error;
        }
    };

    const parsePDF = async (file) => {
        try {
            // console.log("Starting PDF parsing for:", file.name);
            
            // Ensure PDF.js is loaded
            const pdfjsLib = await ensurePdfJsLoaded();
            
            if (!pdfjsLib || !pdfjsLib.getDocument) {
                throw new Error("PDF.js not available");
            }

            // console.log("Reading file as ArrayBuffer...");
            const arrayBuffer = await file.arrayBuffer();
            
            if (!arrayBuffer || arrayBuffer.byteLength === 0) {
                toast.error("PDF file is empty or corrupted.");
                return null;
            }
            
            // console.log(`File size: ${arrayBuffer.byteLength} bytes`);

            // Convert to Uint8Array
            const uint8Array = new Uint8Array(arrayBuffer);
            
            // Verify PDF signature
            const header = String.fromCharCode(...uint8Array.slice(0, 4));
            // console.log("PDF header:", header);
            
            if (!header.startsWith("%PDF")) {
                toast.error("Invalid PDF file format.");
                return null;
            }

            // Load PDF document
            // console.log("Loading PDF document...");
            const loadingTask = pdfjsLib.getDocument({
                data: uint8Array,
                verbosity: 0,
            });

            const pdf = await loadingTask.promise;
            // console.log(`PDF loaded successfully. Pages: ${pdf.numPages}`);

            let fullText = "";

            // Extract text from each page
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                // console.log(`Processing page ${pageNum}/${pdf.numPages}`);
                
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                
                const pageText = textContent.items
                    .map(item => item.str || "")
                    .join(" ");
                
                fullText += pageText + "\n\n";
                
                // console.log(`Page ${pageNum} extracted: ${pageText.length} characters`);
            }

            // Cleanup
            pdf.destroy();
            // console.log("PDF cleanup completed");

            const trimmedText = fullText.trim();
            
            if (!trimmedText) {
                toast.warning("This PDF contains no readable text (likely scanned/image-based).");
                return null;
            }

            // console.log(`Total text extracted: ${trimmedText.length} characters`);
            return trimmedText;
        }
        catch (error) {
            console.error("PDF parsing error:", error);
            console.error("Error details:", {
                name: error.name,
                message: error.message,
            });

            // Specific error messages
            if (error.name === "InvalidPDFException") {
                toast.error("Invalid or corrupted PDF file.");
            }
            else if (error.name === "MissingPDFException") {
                toast.error("PDF file is missing or empty.");
            }
            else if (error.message?.includes("not available")) {
                toast.error("PDF reader not loaded. Please refresh the page and try again.");
            }
            else {
                toast.error(`PDF error: ${error.message || "Unknown error"}`);
            }

            return null;
        }
    };

    const parseDOCX = async (file) => {
        try {
            // console.log("Parsing DOCX file:", file.name);
            
            const mammoth = (await import("mammoth")).default;
            const arrayBuffer = await file.arrayBuffer();

            if (!arrayBuffer || arrayBuffer.byteLength === 0) {
                toast.error("DOCX file is empty or corrupted.");
                return null;
            }

            const result = await mammoth.extractRawText({ arrayBuffer });
            // console.log(`DOCX text extracted: ${result.value.length} characters`);

            if (!result.value.trim()) {
                toast.warning("This DOCX file has no readable text.");
                return null;
            }

            return result.value.trim();
        }
        catch (error) {
            // console.error("DOCX parsing error:", error);
            toast.error(`DOCX error: ${error.message || "Unknown error"}`);
            return null;
        }
    };

    const parseJSON = async (file) => {
        try {
            // console.log("Parsing JSON file:", file.name);
            
            const text = await file.text();

            try {
                JSON.parse(text);
                console.log("Valid JSON file");
            }
            catch {
                toast.error("Invalid JSON file format.");
                return null;
            }

            return text;
        }
        catch (error) {
            // console.error("JSON parsing error:", error);
            toast.error(`JSON error: ${error.message || "Unknown error"}`);
            return null;
        }
    };

    const parseFile = async (file) => {
        if (!file) {
            toast.error("No file selected.");
            return null;
        }

        const ext = file.name.split(".").pop().toLowerCase();
        // console.log(`Parsing file: ${file.name}, type: ${ext}`);

        switch (ext) {
            case "pdf":
                return await parsePDF(file);
            case "docx":
                return await parseDOCX(file);
            case "json":
                return await parseJSON(file);
            default:
                toast.error("Unsupported file type. Only PDF, DOCX, JSON allowed.");
                return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Form submitted, input type:", inputType);

        // Validations
        if (inputType === "text" && !inputText.trim()) {
            toast.error("Please enter some text to extract!");
            return;
        }

        if (inputType === "url" && !inputUrl.trim()) {
            toast.error("Please enter a valid URL!");
            return;
        }

        if (inputType === "file" && !inputFile) {
            toast.error("Please select a file to extract!");
            return;
        }

        // Check if PDF.js is still loading
        if (inputType === "file" && inputFile.name.endsWith('.pdf') && pdfJsLoading) {
            toast.info("PDF reader is loading, please wait...");
            return;
        }

        try {
            if (inputType === "file") {
                // console.log("Processing file:", inputFile.name);
                const content = await parseFile(inputFile);
                
                if (!content) {
                    // console.log("File parsing returned no content");
                    return;
                }

                // console.log("File parsed successfully, calling onExtract");
                onExtract({
                    type: "file",
                    name: inputFile.name,
                    content
                });
            }
            else {
                // console.log("Processing text/URL input");
                onExtract({
                    type: inputType,
                    content: inputType === "text" ? inputText : inputUrl
                });
            }
        }
        catch (err) {
            // console.error("Submit error:", err);
            toast.error(`Failed to process: ${err.message || "Unknown error"}`);
        }
    };

    const handleReset = () => {
        console.log("Resetting form");
        setInputText("");
        setInputUrl("");
        setInputFile(null);
        setInputType("text");
        if (onReset) onReset();
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formBox}>
            <label className={styles.label}>Select Input Type:</label>
            <div className={styles.customSelectWrapper}>
                <select
                    className={styles.customSelect}
                    value={inputType}
                    onChange={(e) => setInputType(e.target.value)}
                >
                    <option value="text">Text</option>
                    <option value="url">Website URL</option>
                    <option value="file">Upload File</option>
                </select>
            </div>

            {inputType === "text" && (
                <>
                    <label className={styles.label}>Enter Text:</label>
                    <textarea
                        className={styles.textarea}
                        rows={6}
                        placeholder="Paste or type text here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </>
            )}

            {inputType === "url" && (
                <>
                    <label className={styles.label}>Enter Website URL:</label>
                    <input
                        type="url"
                        className={styles.textarea}
                        placeholder="https://example.com"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                    />
                </>
            )}

            {inputType === "file" && (
                <>
                    <label className={styles.label}>
                        Select File:
                        <span className={styles.hint}>(Allowed: .pdf, .docx, .json)</span>
                    </label>

                    <label className={styles.fileUpload}>
                        <input
                            type="file"
                            accept=".pdf,.docx,.json"
                            onChange={(e) => setInputFile(e.target.files?.[0] || null)}
                        />
                        <span>{inputFile ? inputFile.name : "Choose a file..."}</span>
                    </label>
                </>
            )}

            <div className={styles.buttonRow}>
                <button
                    type="submit"
                    disabled={loading || pdfJsLoading}
                    className={`${styles.button} ${styles.extractButton}`}
                >
                    {pdfJsLoading ? "Loading PDF Reader..." : loading ? "Extracting..." : "Extract Data"}
                </button>
                <button
                    type="button"
                    onClick={handleReset}
                    disabled={loading}
                    className={`${styles.button} ${styles.resetButton}`}
                >
                    Reset
                </button>
            </div>
        </form>
    );
}