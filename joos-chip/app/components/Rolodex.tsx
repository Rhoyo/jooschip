// Rolodex.tsx
"use client"
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cards from "../cards";

export default function Rolodex() {
  const [active, setActive] = useState(0);

  // Scroll (wheel)
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setActive(a => Math.min(a + 1, cards.length - 1));
      } else {
        setActive(a => Math.max(a - 1, 0));
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown")
        setActive(a => Math.min(a + 1, cards.length - 1));
      if (e.key === "ArrowUp")
        setActive(a => Math.max(a - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-neutral-950 overflow-hidden">
      <div className="relative w-[360px] h-[520px] touch-pan-y">
        {cards.map((card, i) => {
          const offset = i - active;

          return (
            <motion.div
              key={card.id}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.y < -50)
                  setActive(a => Math.min(a + 1, cards.length - 1));
                if (info.offset.y > 50)
                  setActive(a => Math.max(a - 1, 0));
              }}
              className="absolute left-0 right-0 mx-auto w-[360px] h-[520px]
                         bg-neutral-800 border border-neutral-700 rounded-xl
                         shadow-xl select-none p-8 cursor-pointer"
              animate={{
                y: offset * 60,               // vertical spacing
                rotateX: offset * 35,         // rolodex tilt
                scale: offset === 0 ? 1 : 0.9,
                opacity: offset > 2 || offset < -2 ? 0 : 1,
                zIndex: 100 - Math.abs(offset)
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15
              }}
            >
              <h1 className="text-white text-3xl font-semibold">{card.title}</h1>
              <p className="text-neutral-400 text-lg">{card.message}</p>
              <img
                src={card.image}
                alt={card.title}
                width={360}
                height={520}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
