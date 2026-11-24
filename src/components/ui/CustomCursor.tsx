import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    // Check if device supports fine cursor (hover capability)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;
    setIsPointer(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if target is clickable
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, .cursor-pointer");
      const projectCard = target.closest(".project-card");

      if (projectCard) {
        setHovered(true);
        setCursorText("VIEW");
      } else if (interactive) {
        setHovered(true);
        setCursorText("");
      } else {
        setHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  if (!isPointer) return null;

  return (
    <>
      
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[var(--accent)]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: hovered ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.1 }}
        style={{ width: 8, height: 8 }}
      />

      
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[var(--accent)] flex items-center justify-center font-mono text-[10px] font-bold text-[var(--bg)]"
        animate={{
          x: hovered ? position.x - (cursorText ? 32 : 24) : position.x - 18,
          y: hovered ? position.y - (cursorText ? 32 : 24) : position.y - 18,
          width: hovered ? (cursorText ? 64 : 48) : 36,
          height: hovered ? (cursorText ? 64 : 48) : 36,
          backgroundColor: hovered ? "var(--accent)" : "transparent",
        }}
        transition={{ type: "spring", damping: 22, stiffness: 220, mass: 0.2 }}
      >
        {cursorText}
      </motion.div>
    </>
  );
}
