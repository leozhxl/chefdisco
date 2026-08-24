import Link from "next/link";
import Image from "next/image";
import { Camera, PlayCircle, Music2, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { socialLinks } from "@/data/social";

export default function Footer() {
  const icons = { Instagram: Camera, TikTok: Music2, YouTube: PlayCircle };

  return (
    <footer className="texture-iron bg-charcoal text-stone mt-24">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/images/logo-chef-do-disco.png"
              alt="Chef do Disco"
              width={64}
              height={54}
              className="h-14 w-auto"
            />
            <span className="font-serif text-lg font-bold">Chef do Disco</span>
          </div>
          <p className="text-sm text-stone/70 leading-relaxed">
            Churrasco de alto nível, forjado no fogo, no ferro e na tradição do disco de arado.
          </p>
          <div className="flex gap-3 mt-5">
            {socialLinks.map((s) => {
              const Icon = icons[s.name as keyof typeof icons];
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-charcoal transition-colors"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.6} />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold mb-4">
            Navegação
          </h3>
          <ul className="space-y-2.5 text-sm text-stone/75">
            <li><Link href="/sobre" className="hover:text-gold transition-colors">Sobre</Link></li>
            <li><Link href="/loja" className="hover:text-gold transition-colors">Loja</Link></li>
            <li><Link href="/eventos" className="hover:text-gold transition-colors">Eventos</Link></li>
            <li><Link href="/conta" className="hover:text-gold transition-colors">Minha Conta</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold mb-4">
            Políticas
          </h3>
          <ul className="space-y-2.5 text-sm text-stone/75">
            <li><Link href="/politicas/privacidade" className="hover:text-gold transition-colors">Política de Privacidade</Link></li>
            <li><Link href="/politicas/trocas-devolucoes" className="hover:text-gold transition-colors">Trocas e Devoluções</Link></li>
            <li><Link href="/politicas/termos" className="hover:text-gold transition-colors">Termos de Uso</Link></li>
          </ul>
          <div className="mt-6 space-y-2 text-sm text-stone/70">
            <p className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold" />
              Rua Maria Avani Barreto, nº 87 — Bairro Guarita, Sombrio/SC — CEP 88960-000
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              +55 48 99985-8799
            </p>
          </div>
        </div>
      </Container>

      <div className="border-t border-stone/10 py-6">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone/50">
          <p>&copy; {new Date().getFullYear()} Chef do Disco. Todos os direitos reservados.</p>
          <p>Feito com fogo, ferro e ofício.</p>
        </Container>
      </div>
    </footer>
  );
}
