import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, Phone, AtSign, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { contactInfo } from "@/data/social";

export const metadata: Metadata = {
  title: "Roda Gigante de Costelas",
  description: "Conheça a Roda Gigante de Costelas do Chef do Disco, uma estação de assados girando ao vivo no fogo.",
};

const gallery = [
  { src: "/images/roda-gigante-costelas-1.jpeg", alt: "Roda Gigante de Costelas com carnes assando ao vivo" },
  { src: "/images/roda-gigante-costelas-2.jpeg", alt: "Roda Gigante de Costelas montada sobre reboque para eventos" },
  { src: "/images/roda-gigante-costelas-3.jpeg", alt: "Detalhe da estrutura em inox da Roda Gigante de Costelas Chef do Disco" },
];

export default function RodaGiganteDeCostelasPage() {
  return (
    <div>
      <section className="relative overflow-hidden texture-iron bg-charcoal">
        <EmberParticles count={16} />
        <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Estação ao vivo</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-black text-stone mt-4">
              Roda Gigante de Costelas
            </h1>
            <span className="inline-block mt-4 rounded-full border border-ember/40 bg-ember/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ember">
              Disponível para locação
            </span>
            <p className="mt-5 text-stone/75 leading-relaxed">
              Uma estação de assados que gira ao vivo diante dos convidados, com costelas
              lentamente preparadas no fogo até o ponto perfeito — um espetáculo visual e
              gastronômico que vira o destaque de qualquer evento.
            </p>
            <a
              href={`https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre a Roda Gigante de Costelas.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 rounded-sm bg-[#25D366] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-charcoal hover:brightness-95 transition"
            >
              <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
            </a>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 text-sm text-stone/70">
              <a href={`tel:+${contactInfo.whatsappNumber}`} className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                <Phone className="h-4 w-4" /> {contactInfo.phone}
              </a>
              <a
                href="https://instagram.com/chefdodisco"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:text-gold transition-colors"
              >
                <AtSign className="h-4 w-4 mr-1" />{contactInfo.instagramHandle.replace(/^@\s*/, "")}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                <Mail className="h-4 w-4" /> {contactInfo.email}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="absolute inset-0 ember-glow opacity-70 pointer-events-none" />
            <Image
              src={gallery[0].src}
              alt={gallery[0].alt}
              width={1000}
              height={1200}
              priority
              className="relative z-10 w-full h-auto rounded-md shadow-2xl border border-gold/15 object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="bg-charcoal texture-iron py-16">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {gallery.slice(1).map((image) => (
              <div key={image.src} className="relative rounded-md overflow-hidden border border-gold/15 card-hover">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={900}
                  height={1200}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
