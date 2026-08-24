"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/sobre", label: "Quem Sou" },
  { href: "/loja", label: "Loja" },
  { href: "/eventos", label: "Eventos" },
  { href: "/redes-sociais", label: "Redes Sociais" },
  { href: "/acoes-sociais", label: "Ações Sociais" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { totalCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-gold/10 bg-charcoal/95 backdrop-blur">
      <EmberParticles count={6} subtle className="hidden sm:block" />
      <Container className="relative z-10 flex h-24 items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo-chef-do-disco.png"
            alt="Chef do Disco"
            width={88}
            height={74}
            priority
            className="h-16 w-auto flame-flicker transition-transform group-hover:scale-110"
          />
          <span className="font-serif text-xl font-bold tracking-tight text-stone">
            Chef do Disco
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wide text-stone/80 hover:text-ember transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/conta"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-stone/80 hover:text-ember transition-colors"
            aria-label="Minha conta"
          >
            <User className="h-5 w-5" strokeWidth={1.6} />
          </Link>
          <Link
            href="/loja/carrinho"
            className="relative flex items-center gap-1.5 text-sm font-medium text-stone/80 hover:text-ember transition-colors"
            aria-label="Carrinho de compras"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.6} />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-ember text-[10px] font-bold text-stone">
                {totalCount}
              </span>
            )}
          </Link>
          <button
            className="lg:hidden text-stone"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "relative z-10 lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out border-t border-gold/10",
          open ? "max-h-96" : "max-h-0 border-t-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-medium uppercase tracking-wide text-stone/80 hover:text-ember transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/conta"
            onClick={() => setOpen(false)}
            className="py-2.5 text-sm font-medium uppercase tracking-wide text-stone/80 hover:text-ember transition-colors"
          >
            Minha Conta
          </Link>
        </Container>
      </div>
    </header>
  );
}
