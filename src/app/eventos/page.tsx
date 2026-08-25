import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, Building2, Gem, Cake, Phone, AtSign } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { eventPackages } from "@/data/events";
import { contactInfo } from "@/data/social";

export const metadata: Metadata = {
  title: "Eventos",
  description: "Chef privativo, churrasco corporativo e experiências gastronômicas Chef do Disco para o seu evento.",
};

const eventFormats = [
  {
    icon: Building2,
    title: "Eventos Corporativos",
    description: "Sofisticação, organização e impacto para fortalecer marcas e conexões.",
  },
  {
    icon: Gem,
    title: "Casamentos",
    description: "Experiências gastronômicas marcantes para celebrar grandes momentos.",
  },
  {
    icon: Cake,
    title: "Aniversários",
    description: "Uma experiência exclusiva para transformar a comemoração.",
  },
];

export default function EventosPage() {
  return (
    <div>
      <section className="relative overflow-hidden texture-iron bg-charcoal">
        <EmberParticles count={16} />
        <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16 lg:py-0">
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Experiências</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-black text-stone mt-4">
              O Chef do Disco no seu evento
            </h1>
            <p className="mt-5 text-stone/75 leading-relaxed">
              O Chef do Disco atende diferentes formatos de eventos com soluções personalizadas —
              do jantar íntimo à grande celebração corporativa, com técnica, apresentação e sabor
              de outro nível.
            </p>
            <a
              href={`https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento para um evento Chef do Disco.")}`}
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
                className="inline-flex items-center gap-2 hover:text-gold transition-colors"
              >
                <AtSign className="h-4 w-4" /> {contactInfo.instagramHandle}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="absolute inset-0 ember-glow opacity-70 pointer-events-none" />
            <Image
              src="/images/eventos-hero.jpg"
              alt="O Chef do Disco no seu evento — chef com faca artesanal diante de fundo esfumaçado"
              width={800}
              height={1200}
              priority
              className="relative z-10 w-full h-auto rounded-md shadow-2xl border border-gold/15"
            />
          </div>
        </Container>
      </section>

      <section className="bg-charcoal texture-iron py-16">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {eventFormats.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-md border border-gold/15 bg-charcoal-light p-7 card-hover">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-ember">
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <h3 className="mt-4 font-serif text-lg font-bold text-stone">{title}</h3>
                <p className="mt-2 text-sm text-stone/65 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative bg-charcoal texture-iron py-20">
        <div className="absolute inset-0 ember-glow opacity-40 pointer-events-none" />
        <Container className="relative z-10">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone">Pacotes de Serviço</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventPackages.map((pkg) => (
              <div key={pkg.name} className="rounded-md border border-gold/15 bg-charcoal-light p-8 card-hover">
                <h3 className="font-serif text-xl font-bold text-stone">{pkg.name}</h3>
                <p className="mt-3 text-sm text-stone/70 leading-relaxed">{pkg.description}</p>
                <ul className="mt-5 space-y-2">
                  {pkg.includes.map((item) => (
                    <li key={item} className="text-sm text-stone/70 flex gap-2">
                      <span className="text-ember">—</span> {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-semibold text-ember">{pkg.priceFrom}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden texture-iron bg-charcoal py-20">
        <EmberParticles count={14} />
        <div className="absolute inset-0 ember-glow opacity-50 pointer-events-none" />
        <Container className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Agenda limitada</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-stone mt-4">
            Poucas datas disponíveis por mês
          </h2>
          <p className="mt-4 text-stone/70 leading-relaxed">
            O Chef do Disco atende um número reduzido de eventos por mês para garantir a mesma
            qualidade em cada experiência. Fale agora no WhatsApp e garanta sua data.
          </p>
          <a
            href={`https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent("Olá! Quero garantir uma data para meu evento com o Chef do Disco.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 rounded-sm bg-[#25D366] px-8 py-4 text-base font-bold uppercase tracking-wide text-charcoal hover:brightness-95 transition"
          >
            <MessageCircle className="h-5 w-5" /> Garantir minha data no WhatsApp
          </a>
        </Container>
      </section>
    </div>
  );
}
