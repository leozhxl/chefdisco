"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import { LinkButton } from "@/components/ui/Button";
import { FlameDivider } from "@/components/ui/FlameDivider";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { useCart } from "@/lib/cart-context";
import { formatBRL } from "@/lib/utils";

export default function CartPage() {
  const { lineItems, updateQuantity, removeItem, totalCents } = useCart();

  return (
    <div className="relative overflow-hidden bg-charcoal py-16 min-h-[60vh]">
      <div className="absolute inset-0 ember-glow opacity-30 pointer-events-none" />
      <EmberParticles count={10} subtle />
      <Container className="relative z-10 max-w-4xl">
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-stone mb-6">
          Seu Carrinho
        </h1>
        <FlameDivider className="bg-charcoal justify-start! mb-6" />

        {lineItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone/60 mb-6">Seu carrinho está vazio.</p>
            <LinkButton href="/loja">Ir para a loja</LinkButton>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {lineItems.map(({ product, quantity, subtotalCents }) => (
                <div
                  key={product.slug}
                  className="flex flex-col sm:flex-row gap-4 sm:items-center border-b border-gold/10 pb-6"
                >
                  <GradientPlaceholder
                    gradient={product.gradient}
                    alt={product.name}
                    className="w-full sm:w-24 h-24 rounded-md shrink-0"
                  />
                  <div className="flex-1">
                    <Link href={`/loja/produto/${product.slug}`} className="font-serif font-bold text-stone hover:text-ember">
                      {product.name}
                    </Link>
                    <p className="text-sm text-stone/50 mt-1">{formatBRL(product.priceCents)} / unid.</p>
                  </div>
                  <div className="flex items-center border border-gold/20 rounded-sm text-stone">
                    <button
                      onClick={() => updateQuantity(product.slug, quantity - 1)}
                      className="px-3 py-2 hover:bg-stone/10"
                      aria-label="Diminuir"
                    >
                      −
                    </button>
                    <span className="px-3 min-w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.slug, quantity + 1)}
                      className="px-3 py-2 hover:bg-stone/10"
                      aria-label="Aumentar"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold text-stone w-28 text-right">{formatBRL(subtotalCents)}</p>
                  <button
                    onClick={() => removeItem(product.slug)}
                    className="text-stone/40 hover:text-ember"
                    aria-label={`Remover ${product.name}`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-end gap-4">
              <p className="text-xl font-bold text-stone">
                Total: <span className="text-ember">{formatBRL(totalCents)}</span>
              </p>
              <LinkButton href="/loja/checkout">Finalizar Compra</LinkButton>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
