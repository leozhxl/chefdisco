import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

interface GradientPlaceholderProps {
  gradient: string;
  alt: string;
  className?: string;
  showIcon?: boolean;
}

/**
 * Elegant gradient placeholder standing in for product/brand photography.
 * Replace with real photos (next/image) before launch.
 */
export function GradientPlaceholder({
  gradient,
  alt,
  className,
  showIcon = true,
}: GradientPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        gradient,
        className
      )}
    >
      <div className="absolute inset-0 texture-iron opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      {showIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Flame className="h-10 w-10 text-gold/30" strokeWidth={1.2} />
        </div>
      )}
    </div>
  );
}
