"use client";

import { useRouter } from "next/navigation";
import styles from "./home.module.css";

export default function HomePage() {
  const router = useRouter();

  const tools = [
    {
      title: "AI Chatbot",
      description:
        "Interact with an intelligent chatbot that understands and responds like a human.",
      route: "/chatbot",
      icon: "💬",
    },
    {
      title: "Content Generator",
      description:
        "Generate blog posts, social media content, and creative writing using AI.",
      route: "/content_generator",
      icon: "📝",
    },
    {
      title: "Data Extraction Tool",
      description:
        "Extract structured data from documents, text, or web content with AI precision.",
      route: "/data_extraction",
      icon: "📊",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AI Tools Application</h1>
      <p className={styles.subtitle}>
        Explore powerful AI tools for automation, creativity, and productivity.
      </p>

      <div className={styles.grid}>
        {tools.map((tool, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => router.push(tool.route)}
          >
            <div className={styles.icon}>{tool.icon}</div>
            <h2>{tool.title}</h2>
            <p>{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
