"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Music2, Eye, Users, TrendingUp, ArrowUpRight, type LucideIcon } from "lucide-react";

interface Stat {
  icon: LucideIcon;
  target: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Eye, target: 100, suffix: " milhões", label: "Visualizações acumuladas" },
  { icon: TrendingUp, target: 3, suffix: " milhões", label: "Visualizações mensais" },
  { icon: Users, target: 150, prefix: "+", suffix: " mil", label: "Seguidores nas redes" },
];

const platformStats = [
  { name: "TikTok", target: 70, decimals: 0, prefix: "+", suffix: " mil", icon: Music2, href: "https://tiktok.com/@chefdodisco" },
  { name: "Instagram", target: 70, decimals: 0, prefix: "+", suffix: " mil", icon: Camera, href: "https://instagram.com/chefdodisco" },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function AnimatedNumber({
  target,
  decimals = 0,
  prefix = "",
  suffix,
  active,
}: {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  active: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reduced-motion users skip the count-up and see the final value immediately
      setValue(target);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  return (
    <>
      {prefix}
      {value.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </>
  );
}

export default function AlcanceSection() {
  const { ref: statsRef, inView } = useInView<HTMLDivElement>();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 14 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-center text-left">
      <div
        className="relative mx-auto w-full max-w-sm lg:max-w-none perspective-distant"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 ember-glow opacity-60 pointer-events-none" aria-hidden="true" />
        <div className="fire-border-frame relative rounded-lg">
          <div className="fire-border-clip p-2">
            <div className="fire-border-spin" aria-hidden="true" />
            <Image
              src="/images/redes-sociais-phone.png"
              alt="Perfil @chefdodisco no Instagram, com mais de 70 mil seguidores"
              width={575}
              height={637}
              priority
              className="relative z-10 block w-full h-auto rounded-md transition-transform duration-150 ease-out will-change-transform"
              style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)` }}
            />
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Alcance</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone mt-2 mb-10">
          Uma comunidade que cresce a cada brasa
        </h2>

        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map(({ icon: Icon, label, ...num }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-lg border border-gold/15 bg-charcoal-light p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ember/50 hover:shadow-lg hover:shadow-ember/10"
            >
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-ember/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
              <Icon className="relative z-10 h-5 w-5 text-ember" strokeWidth={1.6} />
              <p className="relative z-10 font-serif text-2xl sm:text-3xl font-black gold-text mt-3 tabular-nums">
                <AnimatedNumber {...num} active={inView} />
              </p>
              <p className="relative z-10 text-xs text-stone/60 mt-1.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-stretch gap-4">
          {platformStats.map(({ name, icon: Icon, href, ...num }) => (
            <Link
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 flex items-center gap-4 rounded-lg border border-gold/15 bg-charcoal-light px-5 py-4 transition-all duration-300 hover:border-ember/50 hover:-translate-y-0.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal border border-gold/20 text-gold group-hover:bg-ember group-hover:text-charcoal group-hover:border-ember transition-colors">
                <Icon className="h-4.5 w-4.5" strokeWidth={1.6} />
              </div>
              <div className="flex-1">
                <p className="font-serif text-lg font-bold text-stone tabular-nums">
                  <AnimatedNumber {...num} active={inView} />
                </p>
                <p className="text-xs uppercase tracking-wide text-stone/50">seguidores no {name}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-stone/30 group-hover:text-ember transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
