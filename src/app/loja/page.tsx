import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { FlameDivider } from "@/components/ui/FlameDivider";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Loja de Churrasco",
  description:
    "Facas de churrasco, tábuas artesanais, e-book de receitas de disco de arado e kits exclusivos assinados pelo Chef do Disco.",
};

export default function LojaPage() {
  return (
    <div className="bg-charcoal">
      <div className="relative overflow-hidden texture-iron py-16">
        <div className="absolute inset-0 ember-glow opacity-60 pointer-events-none" />
        <EmberParticles count={10} subtle />
        <Container>
          <div className="relative z-10 mb-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ember">Loja</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-black text-stone mt-2">
              Instrumentos de um Ofício
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-stone/70">
              Facas forjadas, tábuas artesanais e conhecimento em forma de livro digital — tudo
              pensado para elevar sua experiência com o fogo.
            </p>
          </div>
        </Container>
      </div>

      <FlameDivider className="bg-charcoal" />

      <Container className="py-16">
        <ShopClient />
      </Container>
    </div>
  );
}
