"use client";

import { useState } from "react";
import { Check, Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";

export default function AddToCart({ slug }: { slug: string }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
      <div className="flex items-center border border-gold/20 rounded-sm text-stone">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-4 py-3 text-stone hover:bg-stone/10"
          aria-label="Diminuir quantidade"
        >
          −
        </button>
        <span className="px-4 min-w-10 text-center">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="px-4 py-3 text-stone hover:bg-stone/10"
          aria-label="Aumentar quantidade"
        >
          +
        </button>
      </div>
      <Button onClick={handleAdd} className="flex-1">
        {added ? (
          <>
            <Check className="h-4 w-4" /> Adicionado
          </>
        ) : (
          <>
            <Flame className="h-4 w-4" /> Adicionar ao Carrinho
          </>
        )}
      </Button>
    </div>
  );
}
