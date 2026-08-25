import Link from "next/link";
import Image from "next/image";
import { Flame, Star, ChefHat } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { FlameDivider } from "@/components/ui/FlameDivider";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials, seals } from "@/data/testimonials";
import { products } from "@/data/products";
import { socialLinks } from "@/data/social";
import { pratos } from "@/data/pratos";

export default function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden ember-gradient texture-iron min-h-[88vh] flex items-center">
        <Image
          src="/images/hero-chef-do-disco.png"
          alt="Chef do Disco — chef segurando facas artesanais diante de fundo esfumaçado com brasas"
          fill
          priority
          className="object-cover object-[75%_center] opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/70 to-transparent" />
        <div className="absolute inset-0 ember-glow animate-ember" />
        <EmberParticles count={20} />
        <Container className="relative z-10 py-28 text-center">
          <Reveal variant="fade">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Fogo. Ferro. Ofício.
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-stone leading-[1.05]">
              Chef do <span className="gold-text">Disco</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-stone/80 leading-relaxed">
              Churrasco de alto nível, esculpido no disco de arado. Onde a tradição do fogo
              encontra a precisão do ferro forjado — em cada corte, em cada instrumento, em cada mesa.
            </p>
          </Reveal>
          <Reveal variant="up" delay={200}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <LinkButton href="/loja" variant="primary">
                <Flame className="h-4 w-4" strokeWidth={1.8} /> Explorar a Loja
              </LinkButton>
              <LinkButton href="/eventos" variant="outline">Contratar um Evento</LinkButton>
            </div>
          </Reveal>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />
      </section>

      <FlameDivider className="bg-charcoal" />

      {/* Featured products */}
      <section className="bg-charcoal texture-iron py-20 relative">
        <div className="absolute inset-0 ember-glow opacity-60 pointer-events-none" />
        <Container>
          <Reveal className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Seleção</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone mt-2">
                Peças em Destaque
              </h2>
            </div>
            <Link href="/loja" className="hidden sm:block text-sm font-semibold uppercase tracking-wide text-gold hover:text-gold-light transition-colors">
              Ver loja completa →
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link href={`/loja/produto/${p.slug}`} className="card-hover group block">
                  {p.image ? (
                    <div className="relative aspect-[4/5] rounded-md overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 25vw, 50vw"
                      />
                    </div>
                  ) : (
                    <GradientPlaceholder
                      gradient={p.gradient}
                      alt={p.name}
                      className="aspect-[4/5] rounded-md"
                    />
                  )}
                  <h3 className="mt-4 font-serif text-lg font-bold text-stone group-hover:text-gold transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-gold text-sm mt-1">
                    {(p.priceCents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Pratos feitos */}
      <section className="bg-charcoal texture-iron py-20 relative">
        <div className="absolute inset-0 ember-glow opacity-40 pointer-events-none" />
        <Container className="relative max-w-[1600px]">
          <Reveal className="mb-10 text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Direto do disco</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone mt-2">
              Pratos Feitos por Nós
            </h2>
            <p className="mt-4 text-stone/60 leading-relaxed">
              Um registro dos pratos que já saíram do disco de arado — e que você também pode
              reproduzir em casa.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {pratos.map((prato, i) => (
              <Reveal key={prato.src} delay={i * 80}>
                <div className="card-hover group rounded-md overflow-hidden border border-gold/20">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={prato.src}
                      alt={prato.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <p className="p-4 font-serif text-lg font-bold text-stone bg-charcoal-light">
                    {prato.name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={pratos.length * 80} className="mt-12 text-center">
            <p className="text-stone/70 mb-4">Quer saber como fazer essa receita?</p>
            <LinkButton href="/loja/produto/ebook-10-receitas-no-disco-de-arado" variant="secondary">
              <ChefHat className="h-4 w-4" strokeWidth={1.8} /> Clique aqui
            </LinkButton>
          </Reveal>
        </Container>
      </section>

      {/* Social proof */}
      <section className="bg-stone py-20 texture-stone">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-12 items-start">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ember">Confiança</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-2">
                Quem já viveu a experiência
              </h2>
              <p className="mt-4 text-charcoal/60 leading-relaxed">
                Cada evento carrega a mesma exigência de técnica e apresentação — é por isso que
                quem contrata uma vez, volta a chamar.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {seals.map((seal) => (
                  <span key={seal} className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
                    {seal}
                  </span>
                ))}
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={i * 100} className={i === 0 ? "sm:col-span-2" : undefined}>
                  <figure className="h-full rounded-md bg-white/70 border border-charcoal/10 p-7">
                    <div className="flex gap-1 text-gold mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-charcoal/80 leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5">
                      <p className="font-semibold text-charcoal">{t.name}</p>
                      <p className="text-sm text-charcoal/50">{t.role}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Social media */}
      <section className="bg-charcoal texture-iron py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,420px)] gap-12 items-center">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Nos siga</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone mt-2">
                Chef do Disco nas Redes
              </h2>
              <p className="mt-4 text-stone/60 leading-relaxed max-w-md">
                Bastidores dos eventos, técnica no disco de arado e o processo por trás de cada
                peça — tudo registrado e compartilhado nas redes.
              </p>
            </Reveal>

            <div className="flex flex-col gap-4">
              {socialLinks.map((s, i) => (
                <Reveal key={s.name} delay={i * 100}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-hover flex items-center justify-between gap-4 rounded-md border border-gold/20 bg-charcoal-light p-5 text-left hover:border-gold/50"
                  >
                    <div>
                      <p className="font-serif text-lg font-bold text-stone">{s.name}</p>
                      <p className="text-stone/60 text-sm mt-1">{s.description}</p>
                    </div>
                    <span className="shrink-0 text-gold text-sm font-semibold">{s.handle}</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
