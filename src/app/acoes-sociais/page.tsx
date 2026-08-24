import type { Metadata } from "next";
import { HeartHandshake, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import { LinkButton } from "@/components/ui/Button";
import { FlameDivider } from "@/components/ui/FlameDivider";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { socialProjects } from "@/data/social";

export const metadata: Metadata = {
  title: "Ações Sociais",
  description: "Conheça os projetos sociais da Chef do Disco e o impacto que geramos além da mesa.",
};

export default function AcoesSociaisPage() {
  return (
    <div>
      <section className="relative overflow-hidden ember-gradient texture-iron py-24">
        <EmberParticles count={16} />
        <Container className="relative z-10 max-w-3xl text-center">
          <HeartHandshake className="h-10 w-10 text-gold mx-auto mb-4" />
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Impacto</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-stone mt-4">
            Além da Mesa
          </h1>
          <p className="mt-5 text-stone/75 leading-relaxed">
            Acreditamos que o fogo que une pessoas à mesa também pode transformar comunidades.
            Conheça os projetos sociais que sustentamos com parte do resultado de cada evento e venda.
          </p>
        </Container>
      </section>

      <section className="bg-stone py-20">
        <Container>
          <div className="space-y-16">
            {socialProjects.map((project, i) => (
              <div
                key={project.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <GradientPlaceholder
                  gradient={project.gradient}
                  alt={project.title}
                  className="aspect-[4/3] rounded-md"
                />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-ember">{project.year}</p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mt-2">
                    {project.title}
                  </h2>
                  <p className="mt-4 text-charcoal/70 leading-relaxed">{project.description}</p>
                  <p className="mt-4 inline-block rounded-full bg-gold/15 px-4 py-1.5 text-sm font-semibold text-charcoal">
                    {project.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FlameDivider />

      <section className="relative bg-charcoal texture-iron py-20">
        <div className="absolute inset-0 ember-glow opacity-40 pointer-events-none" />
        <Container className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-stone">Quer ser parceiro?</h2>
          <p className="mt-4 text-stone/70">
            Empresas e instituições podem apoiar ou propor novas iniciativas em conjunto com a
            Chef do Disco. Fale com nossa equipe.
          </p>
          <div className="mt-8 flex justify-center">
            <LinkButton href="mailto:parcerias@chefdodisco.com.br" variant="secondary">
              <Mail className="h-4 w-4" /> Falar sobre parcerias
            </LinkButton>
          </div>
          <p className="mt-3 text-xs text-stone/40">(e-mail placeholder — substituir)</p>
        </Container>
      </section>
    </div>
  );
}
