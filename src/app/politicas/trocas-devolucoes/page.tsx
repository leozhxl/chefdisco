import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FlameDivider } from "@/components/ui/FlameDivider";
import { EmberParticles } from "@/components/ui/EmberParticles";

export const metadata: Metadata = {
  title: "Trocas e Devoluções",
  description: "Condições para troca e devolução de produtos Chef do Disco.",
};

export default function TrocasDevolucoesPage() {
  return (
    <div className="relative overflow-hidden bg-charcoal py-20">
      <div className="absolute inset-0 ember-glow opacity-20 pointer-events-none" />
      <EmberParticles count={6} subtle />
      <Container className="relative z-10 max-w-3xl">
        <h1 className="font-serif text-4xl font-black text-stone mb-4">Trocas e Devoluções</h1>
        <FlameDivider className="bg-charcoal justify-start! mb-8" />
        <div className="space-y-6 text-stone/75 leading-relaxed">
          <h2 className="font-serif text-xl font-bold text-stone">1. Direito de arrependimento</h2>
          <p>
            Conforme o Código de Defesa do Consumidor (Art. 49), você tem até 7 dias corridos após
            o recebimento do produto físico para solicitar a devolução por arrependimento, sem
            necessidade de justificativa, desde que o item esteja em sua embalagem original e sem
            sinais de uso.
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">2. Produtos com defeito</h2>
          <p>
            Caso identifique qualquer defeito de fabricação em facas ou tábuas, entre em contato em
            até 30 dias após o recebimento. Avaliaremos o caso e, se confirmado o defeito,
            ofereceremos troca ou reembolso integral, incluindo o frete.
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">3. Como solicitar</h2>
          <p>
            Envie um e-mail para trocas@chefdodisco.com.br (placeholder — substituir) informando o
            número do pedido, o motivo da troca/devolução e fotos do produto, quando aplicável.
            Nossa equipe responderá em até 2 dias úteis com as instruções de envio.
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">4. Produtos digitais</h2>
          <p>
            Por se tratar de conteúdo digital entregue imediatamente após a confirmação do
            pagamento, e-books e demais produtos digitais não são elegíveis para devolução após o
            download, exceto em caso de erro comprovado no arquivo entregue.
          </p>
          <h2 className="font-serif text-xl font-bold text-stone mt-8">5. Reembolso</h2>
          <p>
            Reembolsos aprovados são processados no mesmo método de pagamento utilizado na compra,
            em até 10 dias úteis após a confirmação de recebimento do produto devolvido.
          </p>
        </div>
      </Container>
    </div>
  );
}
