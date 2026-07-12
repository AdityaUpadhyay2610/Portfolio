import React from "react";
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { CornerMarks } from "./ui.jsx";

export default function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center border-b border-line px-6 py-28 sm:px-10 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-[400px_1fr] lg:gap-24">

        {/* LEFT SIDE */}
        <div className="mx-auto w-full max-w-[360px] lg:mx-0">
          <div className="relative">

            {/* Badge */}
            <div className="absolute left-4 top-4 z-20 rounded-full bg-white/95 px-4 py-1 text-xs font-semibold text-gray-800 shadow-lg">
              Available for Internship
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF7E2] via-[#F8EBC5] to-[#F4D27A] shadow-[0_25px_70px_rgba(0,0,0,0.18)]">

              <img
                src="./Aditya.png"
                alt="Aditya Upadhyay"
                className="h-full w-full object-cover"
              />

              <CornerMarks className="inset-4" />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="max-w-2xl">

          <p className="mb-5 font-mono text-xs uppercase tracking-[0.30em] text-amber">
            Computer Science Student
          </p>

          <h1 className="mb-6 font-display text-5xl font-bold leading-[1.05] text-paper sm:text-6xl md:text-7xl">
            Hi, I'm Aditya —
            <br />
            I build fast, honest
            <br />
            <span className="text-amber">
              interfaces.
            </span>
          </h1>

          <p className="mb-10 font-body text-base leading-relaxed text-mute sm:text-lg">
            I’m a Computer Science student and aspiring full-stack developer
            who enjoys building practical web applications with React, Java,
            and Spring Boot. I’m focused on creating thoughtful user
            experiences and reliable backend systems that work smoothly in
            real-world projects.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">

            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-amber px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-amber/90"
            >
              View My Work
              <ArrowDown size={18} />
            </a>

            <a
              href="/Aditya_Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-line px-7 py-3 text-sm font-semibold text-paper transition-all duration-300 hover:border-amber hover:text-amber"
            >
              <Download size={18} />
              Resume
            </a>

          </div>

          {/* Social Links */}
          <div className="mt-8 flex items-center gap-6">

            <a
              href="https://github.com/AdityaUpadhyay2610"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-amber"
            >
              <Github size={22} />
            </a>

            <a
              href="https://www.linkedin.com/in/adityaupadhyay26/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-amber"
            >
              <Linkedin size={22} />
            </a>

            <a
              href="mailto:aditya2610upadhyay@gmail.com"
              className="transition-colors hover:text-amber"
            >
              <Mail size={22} />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}