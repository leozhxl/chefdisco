import { cn } from "@/lib/utils";

export function FlameDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-4 py-2", className)} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none" className="text-gold">
        <path
          d="M11 0C11 0 4 8 4 14.5C4 19.7467 7.13401 22 11 22C14.866 22 18 19.7467 18 14.5C18 12 16.5 9.5 15.5 8C15.8 10.2 15 11.5 13.5 12C14 9 12.5 5.5 11 0Z"
          fill="currentColor"
          opacity="0.85"
        />
        <path
          d="M11 26C13.7614 26 16 23.9853 16 21.5C16 19.5 14.5 17.8 13.5 17C13.7 18.2 13.2 19 12.5 19.3C12.8 17.5 11.8 15.7 11 14C10.2 15.7 9.2 17.5 9.5 19.3C8.8 19 8.3 18.2 8.5 17C7.5 17.8 6 19.5 6 21.5C6 23.9853 8.23858 26 11 26Z"
          fill="currentColor"
        />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}
