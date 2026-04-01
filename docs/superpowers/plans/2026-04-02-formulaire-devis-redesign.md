# Formulaire Devis AIMAN Renovation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Build a 5-step renovation quote form PWA with Next.js 16 + Tailwind + shadcn/ui, email via Resend + WhatsApp.

**Architecture:** Single-page client component orchestrates 5 form steps with shared state. Server Action handles email via Resend. Photos compressed client-side, sent as base64 attachments. WhatsApp link opens wa.me with pre-filled text.

**Tech Stack:** Next.js 16, Tailwind CSS, shadcn/ui, Resend, Geist fonts, Vercel.

---

## Task 1–14: See full plan in conversation context

Plan validated and ready for execution. 14 tasks total:
1. Scaffold Next.js + install deps
2. Layout, fonts, metadata, global styles
3. Hero, Footer, MascotTip components
4. StepIndicator component
5. Form types and constants
6. Step 1 — Contact
7. Step 2 — Project
8. Image compression utility
9. Step 3 — Photos
10. Step 4 — Plan
11. Step 5 — Recap + Send
12. Server Action — Resend email
13. Main page orchestrator
14. Cleanup and verify
