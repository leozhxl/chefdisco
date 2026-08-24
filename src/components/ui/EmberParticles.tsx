import { cn } from "@/lib/utils";

interface EmberParticlesProps {
  className?: string;
  count?: number;
  subtle?: boolean;
}

/**
 * Pure CSS animated rising-ember background effect. No canvas, no library.
 * Respects prefers-reduced-motion (static fallback via globals.css).
 */
export function EmberParticles({ className, count = 14, subtle = false }: EmberParticlesProps) {
  const particles = Array.from({ length: count });

  return (
    <div className={cn("ember-particles", subtle && "opacity-40", className)} aria-hidden="true">
      {particles.map((_, i) => {
        const left = ((i * 137.5) % 100).toFixed(1);
        const size = 2 + (i % 4);
        const duration = 5 + (i % 6);
        const delay = (i % 8) * 0.9;
        const drift = ((i % 3) - 1) * 24;
        return (
          <span
            key={i}
            className="ember-particle"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              ["--drift" as string]: `${drift}px`,
            }}
          />
        );
      })}
    </div>
  );
}
