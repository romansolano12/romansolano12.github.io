Roman_ | Full-Stack Portfolio & AI Agent
A high-performance, responsive portfolio designed to showcase the intersection of Data Analytics, Full-Stack Development, and Cybersecurity. This project features an integrated AI assistant that responds to professional inquiries using a curated knowledge base.

Architecture Overview
The system is divided into a static frontend for speed and a dynamic backend for AI processing:

Frontend: Hosted on GitHub Pages for low-latency delivery.

Backend: A Python/Flask microservice hosted on Render.

AI Engine: Gemini 2.5 Flash integrated via the Google AI SDK.

Technical Features
1. Roman_AI (RAG Implementation)
Unlike standard chatbots, this agent uses Retrieval-Augmented Generation to stay in scope.

Knowledge Base: A secure text corpus containing career history, project deep-dives, and technical competencies.

In-Scope Processing: The agent is instructed to only provide information present in the local RAG file, preventing "hallucinations" or off-topic conversation.

2. Security & Compliance
Reflecting a CompTIA Security+ background, the AI agent is built with strict guardrails:

PII Protection: Filters are in place to ensure Personal Identifiable Information is never exposed in chat responses.

Code Sanitization: The agent is restricted from sharing sensitive backend logic or proprietary scripts.

CORS Management: The Flask API on Render is configured to only accept requests from the portfolio domain, preventing unauthorized API usage.

3. Dynamic UI
Terminal Aesthetic: Dark-mode interface with a glowing cyan (#00d2ff) accent.

Responsive Case Studies: Uniform project grid utilizing CSS Flexbox and Grid for seamless cross-device compatibility.
