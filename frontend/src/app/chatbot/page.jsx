"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./chatbot.module.css";
import { toast } from "react-toastify";

export default function Chatbot() {

    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi 👋, I'm your AI assistant. How can I help you today?" },
    ]);

    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {

        if (!input.trim()) {
            toast.warning("Please enter a message before sending!");
            return;
        }

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage.text }),
            });

            const data = await res.json();
            const botMessage = { sender: "bot", text: data.reply };
            setMessages((prev) => [...prev, botMessage]);
        }
        catch (err) {
            console.error("Error:", err);
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Unable to reach backend." },
            ]);
        }
        finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => e.key === "Enter" && handleSend();

    return (
        <div className={styles.chatPage}>
            <div className={styles.chatContainer}>
                <div className={styles.chatHeader}>
                    <div className={styles.chatTitle}>🤖 AI Chat Assistant</div>
                    <div className={styles.chatSubtitle}>Ask me anything!</div>
                </div>

                <div className={styles.chatBody}>
                    {messages.map((msg, i) => (
                        <div key={i} className={`${styles.chatMessage} ${msg.sender === "user" ? styles.user : styles.bot}`}>
                            <div className={styles.bubble}>{msg.text}</div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className={`${styles.chatMessage} ${styles.bot}`}>
                            <div className={`${styles.bubble} ${styles.typing}`}>
                                <span className={styles.dot}></span>
                                <span className={styles.dot}></span>
                                <span className={styles.dot}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className={styles.chatFooter}>
                    <input
                        type="text"
                        value={input}
                        placeholder="Type your message..."
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />

                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    );
}
