"use client"
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

const cards = [
  { id: 1, title: "Poem One", subtitle: "Memory in Blue" },
  { id: 2, title: "Poem Two", subtitle: "A Whisper Left Behind" },
  { id: 3, title: "Poem Three", subtitle: "Soft as a Tide" },
  { id: 4, title: "Poem Four", subtitle: "The Clock’s Hands" },
  { id: 5, title: "Poem Five", subtitle: "Etched in Light" }
];

export default function FileBox() {
  const [active, setActive] = useState(0);
  const [openCard, setOpenCard] = useState<number | null>(null);

  const yDrag = useMotionValue(0);

  // -- Scroll wheel (you already had this)
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setActive((a) => Math.min(a + 1, cards.length - 1));
      } else {
        setActive((a) => Math.max(a - 1, 0));
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // -- Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setActive((a) => Math.min(a + 1, cards.length - 1));
      } else if (e.key === "ArrowUp") {
        setActive((a) => Math.max(a - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // -- Drag/swipe navigation
  const handleDragEnd = (_: any, info: any) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    const threshold = 120;       // required swipe distance
    const fastSwipe = 350;       // OR very fast flick

    if (offset > threshold || velocity > fastSwipe) {
      // swipe down = previous card
      setActive((a) => Math.max(a - 1, 0));
    } else if (offset < -threshold || velocity < -fastSwipe) {
      // swipe up = next card
      setActive((a) => Math.min(a + 1, cards.length - 1));
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-neutral-950">
      <div className="relative w-[360px] h-[520px]">

        {cards.map((card, i) => {
          const offset = i - active;

          return (
            <motion.div
              key={card.id}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              style={{ y: yDrag }}
              onDragEnd={handleDragEnd}
              className="absolute left-0 right-0 mx-auto w-[360px] h-[520px]
                         bg-neutral-800 border border-neutral-700 rounded-xl 
                         shadow-xl cursor-pointer select-none p-8"
              onClick={() => setOpenCard(card.id)}
              animate={{
                y: offset * 28,
                scale: offset === 0 ? 1 : 0.94,
                opacity: offset < 3 ? 1 - offset * 0.25 : 0,
                rotateX: offset * 8,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
            >
              <h1 className="text-white text-3xl font-semibold">{card.title}</h1>
              <p className="text-neutral-400 text-lg">{card.subtitle}</p>
            </motion.div>
          );
        })}

        {/* Modal */}
        <AnimatePresence>
          {openCard !== null && (
            <motion.div
              className="fixed inset-0 bg-black/70 flex items-center justify-center p-8 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenCard(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-neutral-900 rounded-xl p-10 max-w-lg w-full border border-neutral-700 shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h2 className="text-white text-4xl font-bold mb-4">
                  {cards.find((c) => c.id === openCard)?.title}
                </h2>
                <p className="text-neutral-300 leading-relaxed">
                  This is where the poem text will go.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
