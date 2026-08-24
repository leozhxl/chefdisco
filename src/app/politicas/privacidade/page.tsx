import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FlameDivider } from "@/components/ui/FlameDivider";
import { EmberParticles } from "@/components/ui/EmberParticles";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Chef do Disco coleta, usa e protege seus dados pessoais.",
};

export default function PrivacidadePage() {
  return (
    <div className="relative overflow-hidden bg-charcoal py-20">
      <div className="absolute inset-0 ember-glow opacity-20 pointer-events-none" />
      <EmberParticles count={6} subtle />
      <Container className="relative z-10 max-w-3xl">
        <h1 className="font-serif text-4xl font-black text-stone mb-4">Política de Privacidade</h1>
        <FlameDivider className="bg-charcoal justify-start! mb-8" />
        <div className="prose-content space-y-6 text-stone/75 leading-relaxed">
          <p>Última atualização: agosto de 2026.</p>
          <p>
            A Chef do Disco valoriza a privacidade de seus clientes e visitantes. Esta política
            explica quais dados coletamos, como os utilizamos e quais são os seus direitos, em
            conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">1. Dados que coletamos</h2>
          <p>
            Coletamos dados fornecidos voluntariamente por você, como nome, e-mail, telefone,
            endereço de entrega e informações de pagamento durante compras na loja, solicitações
            de orçamento de eventos e cadastro na newsletter.
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">2. Como usamos seus dados</h2>
          <p>
            Utilizamos seus dados para processar pedidos, entregar produtos digitais e físicos,
            responder solicitações de orçamento, enviar comunicações de marketing (quando você
            optar por recebê-las) e cumprir obrigações legais.
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">3. Compartilhamento de dados</h2>
          <p>
            Não vendemos seus dados pessoais. Podemos compartilhar informações com prestadores de
            serviço essenciais à operação (processadores de pagamento, transportadoras) apenas na
            medida necessária para a execução do serviço contratado.
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">4. Seus direitos</h2>
          <p>
            Você pode solicitar a qualquer momento a confirmação, acesso, correção, anonimização
            ou eliminação de seus dados pessoais, entrando em contato pelo e-mail
            contato@chefdodisco.com.br (placeholder — substituir).
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">5. Cookies</h2>
          <p>
            Este site pode utilizar cookies para melhorar sua experiência de navegação. Você pode
            desativar cookies nas configurações do seu navegador a qualquer momento.
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">6. Contato</h2>
          <p>
            Em caso de dúvidas sobre esta política, entre em contato conosco pelo e-mail
            contato@chefdodisco.com.br (placeholder — substituir por canal oficial).
          </p>
        </div>
      </Container>
    </div>
  );
}
