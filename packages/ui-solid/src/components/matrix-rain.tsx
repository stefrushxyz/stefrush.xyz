import { createSignal, onCleanup, onMount } from "solid-js";

const matrixCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ";

const fadeInKeyframes = `
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;

export function MatrixRain() {
  const [canvas, setCanvas] = createSignal<HTMLCanvasElement>();
  const drops: number[] = [];
  let animationFrameId: number;

  onMount(() => {
    const canvasEl = canvas();
    if (!canvasEl) return;

    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    const initializeCanvas = () => {
      const canvasEl = canvas();
      if (!canvasEl) return;

      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;

      const columns = Math.ceil(canvasEl.width / 20);
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

    let lastDrawTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const draw = (timestamp: number) => {
      const elapsed = timestamp - lastDrawTime;

      if (elapsed > frameInterval) {
        lastDrawTime = timestamp;

        const canvasEl = canvas();
        if (!canvasEl || !ctx) return;

        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

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

          if (dropY * 20 > canvasEl.height && Math.random() > 0.975) {
            drops[i] = 0;
          }

          drops[i] = (drops[i] ?? 0) + 1;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    onCleanup(() => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    });
  });

  return (
    <>
      <style>{fadeInKeyframes}</style>
      <canvas
        ref={setCanvas}
        style={{
          position: "fixed",
          inset: 0,
          opacity: 0,
          animation: "fade-in 1s forwards",
        }}
      />
    </>
  );
}
