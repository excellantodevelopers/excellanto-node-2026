"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Node3D = {
  x: number;
  y: number;
  z: number;
  kind: "server" | "cloud" | "packet";
  hue: number;
  pulse: number;
};

export function Hero3DScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let tick = 0;
    let nodes: Node3D[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const buildITNetwork = () => {
      const list: Node3D[] = [];

      // Server cluster lattice
      for (let ix = -1; ix <= 1; ix++) {
        for (let iy = -1; iy <= 1; iy++) {
          for (let iz = -1; iz <= 1; iz++) {
            if (ix === 0 && iy === 0 && iz === 0) continue;
            list.push({
              x: ix * 0.42,
              y: iy * 0.34,
              z: iz * 0.42,
              kind: "server",
              hue: 205,
              pulse: (ix + iy + iz) * 0.7,
            });
          }
        }
      }

      // Cloud ring
      for (let i = 0; i < 18; i++) {
        const a = (i / 18) * Math.PI * 2;
        list.push({
          x: Math.cos(a) * 0.85,
          y: Math.sin(a) * 0.22,
          z: Math.sin(a) * 0.85,
          kind: "cloud",
          hue: 195,
          pulse: a,
        });
      }

      // Data packets
      for (let i = 0; i < 24; i++) {
        const theta = Math.acos(2 * Math.random() - 1);
        const phi = Math.random() * Math.PI * 2;
        const r = 0.5 + Math.random() * 0.55;
        list.push({
          x: r * Math.sin(theta) * Math.cos(phi),
          y: r * Math.sin(theta) * Math.sin(phi),
          z: r * Math.cos(theta),
          kind: "packet",
          hue: Math.random() > 0.5 ? 190 : 250,
          pulse: Math.random() * Math.PI * 2,
        });
      }

      nodes = list;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildITNetwork();
    };

    const rotateY = (n: Node3D, a: number): Node3D => {
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      return {
        ...n,
        x: n.x * cos - n.z * sin,
        z: n.x * sin + n.z * cos,
      };
    };

    const rotateX = (n: Node3D, a: number): Node3D => {
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      return {
        ...n,
        y: n.y * cos - n.z * sin,
        z: n.y * sin + n.z * cos,
      };
    };

    const project = (n: Node3D) => {
      const scale = Math.min(width, height) * 0.36;
      const perspective = 2.8 / (2.8 + n.z);
      return {
        x: width * 0.5 + n.x * scale * perspective,
        y: height * 0.48 + n.y * scale * perspective,
        s: perspective,
        z: n.z,
      };
    };

    const drawServerIcon = (x: number, y: number, s: number, alpha: number) => {
      const w = 10 * s;
      const h = 14 * s;
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
      ctx.strokeStyle = `rgba(186, 230, 253, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.rect(-w / 2, -h / 2, w, h);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.85})`;
      ctx.fillRect(-w / 2 + 2, -h / 2 + 3, w - 4, 1.5);
      ctx.fillRect(-w / 2 + 2, -1, w - 4, 1.5);
      ctx.fillRect(-w / 2 + 2, h / 2 - 5, w - 4, 1.5);
      ctx.restore();
    };

    const draw = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      const field = ctx.createRadialGradient(
        width * 0.5,
        height * 0.48,
        16,
        width * 0.5,
        height * 0.48,
        Math.max(width, height) * 0.48
      );
      field.addColorStop(0, "rgba(14, 165, 233, 0.16)");
      field.addColorStop(0.4, "rgba(37, 99, 235, 0.1)");
      field.addColorStop(1, "rgba(4, 7, 18, 0)");
      ctx.fillStyle = field;
      ctx.fillRect(0, 0, width, height);

      // Circuit grid floor
      ctx.save();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.06)";
      ctx.lineWidth = 1;
      const grid = 48;
      for (let x = 0; x < width; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      const rotY = reducedMotion ? 0.55 : tick * 0.0058;
      const rotX = reducedMotion ? 0.28 : 0.32 + Math.sin(tick * 0.0035) * 0.1;

      const transformed = nodes
        .map((n) => rotateX(rotateY(n, rotY), rotX))
        .sort((a, b) => a.z - b.z);

      // Network links
      for (let i = 0; i < transformed.length; i++) {
        for (let j = i + 1; j < transformed.length; j++) {
          const a = transformed[i];
          const b = transformed[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
          const max = a.kind === "server" && b.kind === "server" ? 0.78 : 0.55;
          if (dist < max) {
            const pa = project(a);
            const pb = project(b);
            const alpha = (1 - dist / max) * 0.32 * ((pa.s + pb.s) / 2);
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
            ctx.lineWidth = a.kind === "server" ? 1.35 : 1;
            ctx.stroke();
          }
        }
      }

      // Nodes / IT markers
      for (const n of transformed) {
        const p = project(n);
        const pulse = 0.75 + Math.sin(tick * 0.045 + n.pulse) * 0.25;
        const alpha = 0.4 + p.s * 0.5;

        if (n.kind === "server") {
          drawServerIcon(p.x, p.y, p.s * pulse, alpha);
        } else if (n.kind === "cloud") {
          const r = (2.4 + p.s * 2.8) * pulse;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${n.hue}, 90%, 65%, ${0.08 * p.s})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${n.hue}, 95%, 70%, ${alpha})`;
          ctx.fill();
        } else {
          const r = (1.4 + p.s * 2) * pulse;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${n.hue}, 95%, 72%, ${alpha})`;
          ctx.fill();
        }
      }

      // Data stream sweep
      if (!reducedMotion) {
        const y = height * 0.48 + Math.sin(tick * 0.018) * (height * 0.16);
        const beam = ctx.createLinearGradient(0, y - 24, 0, y + 24);
        beam.addColorStop(0, "rgba(14,165,233,0)");
        beam.addColorStop(0.5, "rgba(56,189,248,0.09)");
        beam.addColorStop(1, "rgba(14,165,233,0)");
        ctx.fillStyle = beam;
        ctx.fillRect(width * 0.18, y - 24, width * 0.64, 48);
      }

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const stage = stageRef.current;
      if (!stage || reducedMotion) return;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      stage.style.setProperty("--px", `${x * 16}px`);
      stage.style.setProperty("--py", `${y * 10}px`);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#040712]" />
      <div
        className="absolute inset-0 scale-105 opacity-55"
        style={{
          backgroundImage: "url(/images/ai/hero-it-infra-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-[#040712]/55" />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={stageRef}
          className="hero-ai-stage relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]"
          style={{
            transform: "translate3d(var(--px, 0px), var(--py, 0px), 0)",
            transition: "transform 0.4s ease-out",
          }}
        >
          <div className="hero-ai-core">
            {/* IT hub / datacenter core */}
            <div className="hero-it-hub" />
            <div className="hero-it-rack" />
            <div className="hero-ai-ring hero-ai-ring-1" />
            <div className="hero-ai-ring hero-ai-ring-2" />
            <div className="hero-ai-ring hero-ai-ring-3" />
            <span className="hero-ai-spark hero-ai-spark-1" />
            <span className="hero-ai-spark hero-ai-spark-2" />
            <span className="hero-ai-spark hero-ai-spark-3" />
            <span className="hero-ai-spark hero-ai-spark-4" />
          </div>

          <div className="hero-ai-orbit">
            <span className="hero-ai-orbiter" />
          </div>
          <div className="hero-ai-orbit hero-ai-orbit-b">
            <span className="hero-ai-orbiter hero-ai-orbiter-b" />
          </div>
          <div className="hero-ai-orbit hero-ai-orbit-c">
            <span className="hero-ai-orbiter hero-ai-orbiter-c" />
          </div>

          <motion.div
            className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl sm:h-72 sm:w-72"
            animate={{ opacity: [0.25, 0.65, 0.25], scale: [0.9, 1.12, 0.9] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/25 blur-3xl"
            animate={{ opacity: [0.2, 0.5, 0.2], rotate: [0, 35, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,7,18,0.6)_0%,rgba(4,7,18,0.3)_45%,rgba(4,7,18,0.8)_100%)]" />
    </div>
  );
}
