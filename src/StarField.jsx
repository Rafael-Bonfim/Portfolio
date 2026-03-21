import { useEffect, useRef } from "react";

// Tipos de partículas para o efeito espacial
const LAYERS = [
  { count: 80,  speed: 0.05, minSize: 0.5, maxSize: 1.2, opacity: 0.25, color: "192,132,252" }, // estrelas distantes
  { count: 40,  speed: 0.12, minSize: 1.0, maxSize: 2.0, opacity: 0.35, color: "168,85,247"  }, // estrelas médias
  { count: 15,  speed: 0.22, minSize: 1.5, maxSize: 3.0, opacity: 0.45, color: "139,92,246"  }, // estrelas próximas
  { count: 6,   speed: 0.35, minSize: 2.0, maxSize: 4.0, opacity: 0.20, color: "124,58,237"  }, // partículas grandes
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animFrame;
    let scrollY = window.scrollY;

    // Ajusta o canvas ao tamanho da janela
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Gera todas as partículas com posição aleatória
    const particles = LAYERS.flatMap((layer) =>
      Array.from({ length: layer.count }, () => ({
        x:       Math.random() * window.innerWidth,
        y:       Math.random() * window.innerHeight,
        size:    randomBetween(layer.minSize, layer.maxSize),
        opacity: randomBetween(layer.opacity * 0.5, layer.opacity),
        speed:   layer.speed,
        color:   layer.color,
        // fase aleatória pro twinkle
        phase:   Math.random() * Math.PI * 2,
        twinkleSpeed: randomBetween(0.003, 0.012),
        // forma: 0 = círculo, 1 = losango, 2 = cruz
        shape: Math.random() < 0.75 ? 0 : Math.random() < 0.6 ? 1 : 2,
      }))
    );

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    let prevScroll = scrollY;

    const draw = () => {
      const delta = scrollY - prevScroll;
      prevScroll = scrollY;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // Move a partícula para cima conforme scroll (parallax inverso = efeito espacial)
        p.y -= delta * p.speed;

        // Reposiciona quando sai da tela (cria novos "astros" entrando)
        if (p.y < -10)  p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Twinkle suave
        p.phase += p.twinkleSpeed;
        const twinkle = 0.6 + 0.4 * Math.sin(p.phase);
        const alpha = p.opacity * twinkle;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle   = `rgb(${p.color})`;
        ctx.strokeStyle = `rgb(${p.color})`;

        if (p.shape === 0) {
          // Círculo / estrela
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Halo leve nas maiores
          if (p.size > 2) {
            ctx.globalAlpha = alpha * 0.2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (p.shape === 1) {
          // Losango
          const s = p.size * 2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - s);
          ctx.lineTo(p.x + s, p.y);
          ctx.lineTo(p.x, p.y + s);
          ctx.lineTo(p.x - s, p.y);
          ctx.closePath();
          ctx.fill();
        } else {
          // Cruz / plus
          const s = p.size * 2.5;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x - s, p.y);
          ctx.lineTo(p.x + s, p.y);
          ctx.moveTo(p.x, p.y - s);
          ctx.lineTo(p.x, p.y + s);
          ctx.stroke();
        }

        ctx.restore();
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}
