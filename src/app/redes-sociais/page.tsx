import type { Metadata } from "next";
import { Camera, PlayCircle, Music2, ArrowUpRight, Flame } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { FlameDivider } from "@/components/ui/FlameDivider";
import { socialLinks } from "@/data/social";
import AlcanceSection from "./AlcanceSection";

export const metadata: Metadata = {
  title: "Redes Sociais",
  description: "Acompanhe a Chef do Disco no Instagram, TikTok e YouTube.",
};

const icons = { Instagram: Camera, TikTok: Music2, YouTube: PlayCircle };

export default function RedesSociaisPage() {
  return (
    <div className="relative overflow-hidden bg-charcoal texture-iron py-20 min-h-[60vh]">
      <div className="absolute inset-0 ember-glow opacity-40 pointer-events-none" />
      <EmberParticles count={16} />
      <Container className="relative z-10 text-center max-w-4xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ember">Comunidade</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-stone mt-2">
          Nos Siga nas Redes
        </h1>
        <p className="mt-4 text-stone/60 max-w-xl mx-auto">
          Bastidores do fogo, receitas exclusivas e a rotina de eventos — tudo em primeira mão.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {socialLinks.map((s) => {
            const Icon = icons[s.name as keyof typeof icons];
            return (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-lg border border-gold/15 bg-charcoal-light p-8 text-left card-hover hover:border-ember/60 transition-colors"
              >
                <div
                  className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-ember/25 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />
                <Flame
                  className="absolute top-5 right-5 h-5 w-5 text-ember/0 group-hover:text-ember/70 flame-flicker transition-colors duration-300"
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-charcoal border border-gold/20 text-gold group-hover:bg-ember group-hover:text-charcoal group-hover:border-ember transition-colors">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>

                  <p className="font-serif text-xl font-bold text-stone mt-5">{s.name}</p>
                  <p className="text-ember text-sm mt-1 font-medium">{s.handle}</p>
                  <p className="text-stone/55 text-sm mt-3 leading-relaxed">{s.description}</p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold group-hover:text-ember transition-colors">
                    Seguir <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <FlameDivider className="bg-charcoal mt-20 mb-4" />
      </Container>

      <Container className="relative z-10 mt-12">
        <AlcanceSection />
      </Container>
    </div>
  );
}
