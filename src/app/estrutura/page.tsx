import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { contactInfo } from "@/data/social";

export const metadata: Metadata = {
  title: "Estrutura para Churrasco e Eventos",
  description:
    "Estrutura completa do Chef do Disco para eventos: roda gigante de costelas, estação de disco de arado, tenda e equipamentos profissionais de churrasco.",
};

const structureItems = [
  {
    title: "Roda Gigante de Costelas",
    description:
      "Estação de assados que gira ao vivo diante dos convidados, com costelas lentamente preparadas no fogo até o ponto perfeito.",
    image: "/images/estrutura-roda-gigante.jpeg",
    alt: "Roda Gigante de Costelas do Chef do Disco assando ao vivo",
    href: "/roda-gigante-de-costelas",
  },
  {
    title: "Estação de Fogo de Chão",
    description:
      "Estação de assados em inox e aço preto, montada com identidade visual Chef do Disco para receber cortes nobres direto do fogo.",
    image: "/images/estrutura-estacao-buffalo-negro-1.jpeg",
    alt: "Estação de assados Búfalo Negro com identidade Chef do Disco",
  },
  {
    title: "Tenda 5x5 Inflável",
    description:
      "Estrutura de tenda inflável 5x5 com identidade visual Chef do Disco, montada no local do evento para receber os convidados.",
    image: "/images/estrutura-tenda-inflavel.jpeg",
    alt: "Tenda 5x5 inflável com identidade visual Chef do Disco montada para evento",
  },
  {
    title: "Parrilla",
    description:
      "Estação Búfalo Negro em inox e aço preto, com brasa exposta para grelhar cortes nobres direto na parrilla.",
    image: "/images/estrutura-estacao-buffalo-negro-2.jpeg",
    alt: "Parrilla Búfalo Negro com identidade Chef do Disco",
  },
];

export default function EstruturaPage() {
  return (
    <div>
      <section className="relative overflow-hidden texture-iron bg-charcoal">
        <EmberParticles count={16} />
        <Container className="relative z-10 py-16 lg:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Equipamentos</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-black text-stone mt-4">Estrutura</h1>
            <p className="mt-5 text-stone/75 leading-relaxed">
              Equipamentos próprios e uma estrutura completa para levar a experiência Chef do
              Disco a qualquer evento, com técnica, apresentação e sabor de outro nível.
            </p>
            <a
              href={`https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre a estrutura do Chef do Disco.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 rounded-sm bg-[#25D366] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-charcoal hover:brightness-95 transition"
            >
              <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-charcoal texture-iron py-16">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {structureItems.map((item) => {
              const content = (
                <>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="font-serif text-xl font-bold text-stone">{item.title}</h3>
                    <p className="mt-2 text-sm text-stone/65 leading-relaxed">{item.description}</p>
                    {item.href && (
                      <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-ember">
                        Saiba mais <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </>
              );

              return item.href ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-md border border-gold/15 bg-charcoal-light overflow-hidden card-hover block"
                >
                  {content}
                </Link>
              ) : (
                <div
                  key={item.title}
                  className="group rounded-md border border-gold/15 bg-charcoal-light overflow-hidden card-hover"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
