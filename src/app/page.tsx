import Link from "next/link";
import Image from "next/image";
import { Flame, UtensilsCrossed, HeartHandshake, PartyPopper, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { FlameDivider } from "@/components/ui/FlameDivider";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { testimonials, seals } from "@/data/testimonials";
import { products } from "@/data/products";
import { socialLinks } from "@/data/social";

const quickLinks = [
  { href: "/loja", label: "Loja", icon: UtensilsCrossed, desc: "Facas, tábuas e livros digitais" },
  { href: "/eventos", label: "Eventos", icon: PartyPopper, desc: "Experiências gastronômicas ao vivo" },
  { href: "/acoes-sociais", label: "Ações Sociais", icon: HeartHandshake, desc: "Impacto além da mesa" },
  { href: "/sobre", label: "Sobre", icon: Flame, desc: "A história por trás do fogo" },
];

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
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <LinkButton href="/loja" variant="primary">
              <Flame className="h-4 w-4" strokeWidth={1.8} /> Explorar a Loja
            </LinkButton>
            <LinkButton href="/eventos" variant="outline">Contratar um Evento</LinkButton>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />
      </section>

      {/* Quick links */}
      <section className="bg-charcoal texture-iron py-20">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map(({ href, label, icon: Icon, desc }) => (
              <Link
                key={href}
                href={href}
                className="card-hover group flex flex-col items-start gap-4 rounded-md border border-gold/15 bg-charcoal-light p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-charcoal text-gold group-hover:bg-ember transition-colors">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone">{label}</h3>
                  <p className="mt-1 text-sm text-stone/60">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FlameDivider className="bg-charcoal" />

      {/* Manifesto */}
      <section className="bg-stone py-20">
        <Container className="max-w-3xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Nosso Manifesto
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-charcoal/75">
            Acreditamos que o churrasco é mais do que uma técnica — é um ritual. Um encontro entre
            o fogo bruto e a mão que o domina. Cada faca que forjamos, cada tábua que lapidamos e
            cada evento que assinamos carrega essa filosofia: a busca pela excelência através do
            respeito ao ingrediente, ao instrumento e ao momento compartilhado à mesa.
          </p>
        </Container>
      </section>

      <FlameDivider className="bg-stone" />

      {/* Featured products */}
      <section className="bg-charcoal texture-iron py-20 relative">
        <div className="absolute inset-0 ember-glow opacity-60 pointer-events-none" />
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Seleção</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone mt-2">
                Peças em Destaque
              </h2>
            </div>
            <Link href="/loja" className="hidden sm:block text-sm font-semibold uppercase tracking-wide text-gold hover:text-gold-light transition-colors">
              Ver loja completa →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <Link key={p.slug} href={`/loja/produto/${p.slug}`} className="card-hover group block">
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
            ))}
          </div>
        </Container>
      </section>

      {/* Social proof */}
      <section className="bg-stone py-20 texture-stone">
        <Container>
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ember">Confiança</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-2">
              Quem já viveu a experiência
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-md bg-white/70 border border-charcoal/10 p-7">
                <div className="flex gap-1 text-gold mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
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
            ))}
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-4">
            {seals.map((seal) => (
              <span key={seal} className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
                {seal}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Social media */}
      <section className="bg-charcoal texture-iron py-20">
        <Container className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Nos siga</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone mt-2 mb-10">
            Chef do Disco nas Redes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover rounded-md border border-gold/20 bg-charcoal-light p-6 text-left hover:border-gold/50"
              >
                <p className="font-serif text-lg font-bold text-stone">{s.name}</p>
                <p className="text-gold text-sm mt-1">{s.handle}</p>
                <p className="text-stone/60 text-sm mt-2">{s.description}</p>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
