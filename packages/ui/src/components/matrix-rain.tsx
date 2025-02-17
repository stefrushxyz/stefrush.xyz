"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const matrixCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drops: number[] = [];

    const initializeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const columns = Math.ceil(canvas.width / 20);
      drops.length = 0; // clear existing drops
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
    };

    const handleResize = () => {
      initializeCanvas();
    };

    window.addEventListener("resize", handleResize);
    initializeCanvas();

    let animationFrameId: number;
    let lastDrawTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const draw = (timestamp: number) => {
      const elapsed = timestamp - lastDrawTime;

      if (elapsed > frameInterval) {
        lastDrawTime = timestamp;

        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "15px monospace";

        for (let i = 0; i < drops.length; i++) {
          const charIdx = Math.floor(Math.random() * matrixCharacters.length);
          const text = matrixCharacters[charIdx];
          if (!text) continue;

          const dropY = drops[i];
          if (dropY === undefined) continue;

          ctx.fillStyle = "#fff";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#fff";
          ctx.fillText(text, i * 20, dropY * 20);

          ctx.fillStyle = "#0a0";
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
          ctx.fillText(text, i * 20, dropY * 20);

          if (dropY * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }

          drops[i] = (drops[i] ?? 0) + 1;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}
