import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FlameDivider } from "@/components/ui/FlameDivider";
import { EmberParticles } from "@/components/ui/EmberParticles";

export const metadata: Metadata = {
  title: "Quem Sou",
  description:
    "Conheça Vinicius Barreto, chef especialista em disco de arado, fundador da Chef do Disco, e a filosofia por trás da marca.",
};

export default function SobrePage() {
  return (
    <div>
      <section className="relative overflow-hidden ember-gradient texture-iron py-24">
        <EmberParticles count={14} />
        <Container className="relative z-10 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Quem Sou</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-stone mt-4">
            Vinicius Barreto
          </h1>
        </Container>
      </section>

      <section className="bg-charcoal texture-iron py-20">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-md overflow-hidden shadow-xl border border-gold/15">
            <Image
              src="/images/vinicius-perfil.jpg"
              alt="Vinicius Barreto, fundador da Chef do Disco, com facas de churrasco artesanais"
              fill
              className="object-cover object-top"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ember">Vinicius Barreto</p>
            <p className="text-stone/60 font-medium">34 anos</p>
            <h2 className="font-serif text-3xl font-bold text-stone mt-4">
              À frente do Chef do Disco
            </h2>
            <p className="mt-5 text-stone/75 leading-relaxed">
              Vinicius Barreto transformou sua paixão pela gastronomia em uma verdadeira experiência
              para os olhos e o paladar. À frente da Chef do Disco, ele une preparo ao vivo, presença
              de palco, estrutura profissional e forte atuação digital, desenvolvendo um formato que
              vai além da gastronomia tradicional.
            </p>
            <p className="mt-4 leading-relaxed font-semibold text-ember">
              Entrega interação, entretenimento e uma experiência memorável para os convidados.
            </p>
          </div>
        </Container>
      </section>

      <FlameDivider className="bg-charcoal" />

      <section className="relative bg-charcoal texture-iron py-20">
        <div className="absolute inset-0 ember-glow opacity-50 pointer-events-none" />
        <Container className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-stone">A Filosofia do Fogo e da Carne</h2>
          <p className="mt-6 text-stone/75 leading-relaxed">
            Para Vinicius, o fogo é um colaborador, não uma ferramenta. Ele exige paciência, leitura e
            respeito. A carne, por sua vez, é o protagonista — e cada instrumento que a Chef do Disco
            produz, de facas a tábuas, existe para servir a ela sem se sobrepor. Não se busca o
            espetáculo do improviso, mas a precisão de quem entende o tempo do fogo, o ponto exato da
            brasa e o corte que revela o melhor de cada peça.
          </p>
        </Container>
      </section>

      <FlameDivider className="bg-charcoal" />

      <section className="bg-stone py-20">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="font-serif text-3xl font-bold text-charcoal">Bastidores do ofício</h2>
            <p className="mt-5 text-charcoal/75 leading-relaxed">
              Cada faca é forjada em parceria com ferreiros artesãos que dominam técnicas passadas
              por gerações. Cada tábua nasce de madeiras selecionadas, tratadas para durar décadas.
              Não trabalhamos com produção em massa — trabalhamos com curadoria, tempo e ofício.
            </p>
            <p className="mt-4 text-charcoal/75 leading-relaxed">
              Essa mesma filosofia guia os eventos conduzidos por Vinicius: cada experiência é pensada
              como uma peça única, moldada ao cliente, ao espaço e à ocasião — nunca um roteiro genérico.
            </p>
          </div>
          <div className="relative order-1 lg:order-2 aspect-[4/5] rounded-md overflow-hidden shadow-xl border border-gold/15">
            <Image
              src="/images/bastidores-oficio.jpg"
              alt="Vinicius Barreto em ação com fogo, vestindo o avental Chef do Disco"
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
