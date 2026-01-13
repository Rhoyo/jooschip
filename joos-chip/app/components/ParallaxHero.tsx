"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxHero() {
  const { scrollY } = useScroll();

  // Parallax mappings
  const yBg = useTransform(scrollY, [0, 600], [0, 150]);    // background moves faster
  const yFg = useTransform(scrollY, [0, 600], [0, -60]);    // text moves slower
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);  // fade out

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Background image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        // Replace with your own hero image
        // could also be a poem background, handwriting, clouds, etc.
        style={{
          y: yBg,
          backgroundImage: `url('/turkey.jpeg')`,
        }}
      />

      {/* Soft dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Foreground content */}
      <motion.div
        style={{ y: yFg, opacity }}
        className="relative flex h-full flex-col items-center justify-center text-center px-6"
      >
        <h1 className="text-white text-5xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
          Your Poem Collection
        </h1>

        <p className="text-neutral-300 mt-4 max-w-md text-lg">
          A quiet archive of fading moments, preserved here.
        </p>
      </motion.div>
    </div>
  );
}
