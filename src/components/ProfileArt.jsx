import React from "react";

/**
 * Minimal line-art bust portrait used as a placeholder for the home section image.
 * Swap this out for a real <img src="/profile.jpg" /> — see the note in Home.jsx.
 */
export default function ProfileArt({ className = "" }) {
  return (
    <svg
      viewBox="0 0 320 380"
      className={className}
      role="img"
      aria-label="Line illustration portrait placeholder"
    >
      <circle cx="160" cy="150" r="2" fill="#E8A33D" />
      <circle cx="270" cy="70" r="2" fill="#5FC9BE" />
      <circle cx="40" cy="300" r="2" fill="#5FC9BE" />

      {/* shoulders / torso */}
      <path
        d="M60 380 C60 290 105 250 160 250 C215 250 260 290 260 380"
        fill="none"
        stroke="#F3F1EA"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* neck */}
      <path d="M140 225 L140 255 M180 225 L180 255" stroke="#F3F1EA" strokeWidth="2" />
      {/* head */}
      <ellipse cx="160" cy="150" rx="62" ry="75" fill="none" stroke="#F3F1EA" strokeWidth="2" />
      {/* hair */}
      <path
        d="M100 140 C94 90 122 60 160 60 C200 60 228 90 222 140 C214 122 200 110 160 108 C122 108 108 122 100 140 Z"
        fill="none"
        stroke="#F3F1EA"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* ear */}
      <path d="M98 150 C90 150 90 168 98 168" fill="none" stroke="#F3F1EA" strokeWidth="1.5" />
      <path d="M222 150 C230 150 230 168 222 168" fill="none" stroke="#F3F1EA" strokeWidth="1.5" />
      {/* face detail: glasses */}
      <rect x="115" y="150" width="34" height="26" rx="6" fill="none" stroke="#E8A33D" strokeWidth="2" />
      <rect x="171" y="150" width="34" height="26" rx="6" fill="none" stroke="#E8A33D" strokeWidth="2" />
      <path d="M149 162 L171 162" stroke="#E8A33D" strokeWidth="2" />
      {/* nose + mouth */}
      <path d="M160 178 L160 200 L170 205" fill="none" stroke="#F3F1EA" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M142 220 C150 226 170 226 178 220" fill="none" stroke="#F3F1EA" strokeWidth="1.5" strokeLinecap="round" />

      {/* dashed orbit ring — signature accent */}
      <circle
        cx="160"
        cy="160"
        r="150"
        fill="none"
        stroke="#2A3040"
        strokeWidth="1"
        strokeDasharray="4 6"
      />
    </svg>
  );
}
