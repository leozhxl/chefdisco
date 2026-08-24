"use client";

import { useMemo, useState } from "react";
import { products, categoryLabels, type ProductCategory } from "@/data/products";
import { ProductCard } from "@/components/sections/ProductCard";

const categories: (ProductCategory | "todos")[] = ["todos", "facas", "tabuas", "bones", "copos", "livros", "kits"];

export default function ShopClient() {
  const [category, setCategory] = useState<ProductCategory | "todos">("todos");
  const [maxPrice, setMaxPrice] = useState(350000);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "todos" && p.category !== category) return false;
      if (p.priceCents > maxPrice) return false;
      return true;
    });
  }, [category, maxPrice]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
      <aside className="space-y-8">
        <div>
          <h3 className="font-serif text-sm font-bold uppercase tracking-wide text-stone mb-3">
            Categoria
          </h3>
          <div className="space-y-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`block w-full text-left text-sm rounded-sm px-3 py-2 transition-colors ${
                  category === c ? "bg-charcoal-light text-gold" : "text-stone/70 hover:bg-stone/5"
                }`}
              >
                {c === "todos" ? "Todos os produtos" : categoryLabels[c]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-sm font-bold uppercase tracking-wide text-stone mb-3">
            Preço máximo: R$ {(maxPrice / 100).toFixed(0)}
          </h3>
          <input
            type="range"
            min={2000}
            max={350000}
            step={1000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-ember"
          />
        </div>
      </aside>

      <div>
        <p className="mb-6 text-sm text-stone/60">{filtered.length} produto(s) encontrado(s)</p>
        {filtered.length === 0 ? (
          <p className="text-stone/60">Nenhum produto corresponde aos filtros selecionados.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
