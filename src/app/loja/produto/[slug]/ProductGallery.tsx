"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square rounded-md overflow-hidden border border-gold/15">
        <Image
          src={images[active]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 mt-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square rounded-md overflow-hidden border transition-colors",
                active === i ? "border-ember" : "border-gold/15 hover:border-gold/40"
              )}
              aria-label={`Ver imagem ${i + 1} de ${alt}`}
            >
              <Image src={src} alt={`${alt} — imagem ${i + 1}`} fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
