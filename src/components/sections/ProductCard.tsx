import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import { formatBRL } from "@/lib/utils";
import type { Product } from "@/data/products";
import { categoryLabels } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/loja/produto/${product.slug}`} className="card-hover group block rounded-md border border-gold/15 bg-charcoal-light p-4">
      <div className="relative">
        {product.image ? (
          <div className="relative aspect-square rounded-md overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </div>
        ) : (
          <GradientPlaceholder
            gradient={product.gradient}
            alt={product.name}
            className="aspect-square rounded-md"
          />
        )}
        {product.isDigital && (
          <span className="absolute top-3 left-3 rounded-full bg-charcoal/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold">
            Digital
          </span>
        )}
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ember">
        {categoryLabels[product.category]}
      </p>
      <h3 className="mt-1 font-serif text-lg font-bold text-stone group-hover:text-ember transition-colors">
        {product.name}
      </h3>
      <div className="mt-1 flex items-center gap-1 text-gold">
        <Star className="h-3.5 w-3.5 fill-current" />
        <span className="text-xs text-stone/60">{product.rating} ({product.reviewCount})</span>
      </div>
      <p className="mt-2 font-semibold text-stone">{formatBRL(product.priceCents)}</p>
    </Link>
  );
}
