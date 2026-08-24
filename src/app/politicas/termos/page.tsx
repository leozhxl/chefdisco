import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FlameDivider } from "@/components/ui/FlameDivider";
import { EmberParticles } from "@/components/ui/EmberParticles";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos e condições de uso do site e da loja Chef do Disco.",
};

export default function TermosPage() {
  return (
    <div className="relative overflow-hidden bg-charcoal py-20">
      <div className="absolute inset-0 ember-glow opacity-20 pointer-events-none" />
      <EmberParticles count={6} subtle />
      <Container className="relative z-10 max-w-3xl">
        <h1 className="font-serif text-4xl font-black text-stone mb-4">Termos de Uso</h1>
        <FlameDivider className="bg-charcoal justify-start! mb-8" />
        <div className="space-y-6 text-stone/75 leading-relaxed">
          <p>
            Ao acessar e utilizar o site da Chef do Disco, você concorda com os termos e condições
            descritos abaixo. Recomendamos a leitura atenta antes de realizar qualquer compra.
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">1. Sobre a empresa</h2>
          <p>
            Chef do Disco (razão social a definir), CNPJ 00.000.000/0001-00 (placeholder —
            substituir), com sede em Av. das Brasas, 1000, São Paulo, SP (placeholder — substituir).
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">2. Cadastro e conta</h2>
          <p>
            Ao criar uma conta, você é responsável por manter a confidencialidade de suas
            credenciais e por todas as atividades realizadas em sua conta.
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">3. Preços e pagamentos</h2>
          <p>
            Todos os preços estão em Reais (BRL) e podem ser alterados sem aviso prévio. O
            pagamento é processado por meio de gateways de pagamento parceiros, e a confirmação do
            pedido está sujeita à aprovação da transação.
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">4. Produtos digitais</h2>
          <p>
            Livros de receitas digitais são de uso pessoal e não podem ser redistribuídos,
            revendidos ou compartilhados publicamente sem autorização expressa da Chef do Disco.
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">5. Eventos e serviços</h2>
          <p>
            Orçamentos solicitados através do site não constituem contrato até a confirmação formal
            por escrito entre as partes, incluindo condições de pagamento, escopo e data do evento.
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">6. Propriedade intelectual</h2>
          <p>
            Todo o conteúdo do site — textos, imagens, identidade visual e receitas — é de
            propriedade da Chef do Disco e protegido por leis de direitos autorais.
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">7. Alterações</h2>
          <p>
            Estes termos podem ser atualizados periodicamente. Recomendamos revisá-los com
            regularidade.
          </p>
        </div>
      </Container>
    </div>
  );
}
