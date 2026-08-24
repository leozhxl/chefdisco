// ---------------------------------------------------------------------------
// STUB DE PAGAMENTO
// ---------------------------------------------------------------------------
// Este arquivo simula uma integração de pagamento. Nenhuma chamada real a um
// gateway (Stripe, Mercado Pago, PagSeguro etc.) é feita.
//
// ANTES DE IR PARA PRODUÇÃO:
//   1. Crie uma conta no gateway escolhido (ex.: Mercado Pago ou Stripe).
//   2. Adicione as chaves de API em variáveis de ambiente (.env.local),
//      nunca diretamente no código-fonte.
//   3. Substitua a função `processPayment` abaixo por uma chamada real à
//      API do gateway (geralmente feita a partir de uma Route Handler /
//      Server Action no backend, nunca só no cliente, por segurança).
//   4. Implemente tratamento de webhooks para confirmar pagamentos
//      assíncronos (Pix e boleto).
// ---------------------------------------------------------------------------

export type PaymentMethod = "cartao" | "pix" | "boleto";

export interface PaymentRequest {
  method: PaymentMethod;
  amountCents: number;
  customerName: string;
  customerEmail: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  method: PaymentMethod;
  message: string;
  /** "paid" para cartão (aprovação imediata simulada); "pending" para pix/boleto até a confirmação simulada. */
  status: "paid" | "pending";
  pix?: {
    copyPasteCode: string;
    expiresInMinutes: number;
  };
  boleto?: {
    barcodeDigits: string;
    dueDate: string;
    pdfUrl: string;
  };
}

/**
 * Simula o processamento de um pagamento.
 * Em produção, substitua o corpo desta função por uma chamada real, por exemplo:
 *
 *   const response = await fetch("/api/payments/create", {
 *     method: "POST",
 *     body: JSON.stringify(request),
 *   });
 *   return response.json();
 */
export async function processPayment(request: PaymentRequest): Promise<PaymentResult> {
  // Simula latência de rede / processamento do gateway.
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const transactionId = `SIMULADO-${Date.now().toString(36).toUpperCase()}`;

  const messages: Record<PaymentMethod, string> = {
    cartao: "Pagamento aprovado (simulado). Um gateway real validaria os dados do cartão aqui.",
    pix: "Pix gerado (simulado). Em produção, um QR Code real seria exibido pelo gateway e o pagamento confirmado via webhook.",
    boleto: "Boleto gerado (simulado). Em produção, o PDF do boleto seria disponibilizado para download e a compensação confirmada via webhook.",
  };

  const base = {
    success: true,
    transactionId,
    method: request.method,
    message: messages[request.method],
  };

  if (request.method === "pix") {
    return {
      ...base,
      status: "pending",
      pix: {
        // Código Pix "copia e cola" fictício — apenas para demonstração da interface.
        copyPasteCode: `00020126580014BR.GOV.BCB.PIX0136${transactionId.toLowerCase()}5204000053039865802BR5919CHEF DO DISCO LTDA6009SAO PAULO62070503***6304${transactionId.slice(-4)}`,
        expiresInMinutes: 30,
      },
    };
  }

  if (request.method === "boleto") {
    const due = new Date();
    due.setDate(due.getDate() + 3);
    return {
      ...base,
      status: "pending",
      boleto: {
        barcodeDigits: `34191.79001 01043.510047 91020.150008 9 ${Date.now().toString().slice(-14)}`,
        dueDate: due.toLocaleDateString("pt-BR"),
        // Link fictício apenas para demonstração da interface.
        pdfUrl: `https://boletos.chefdodisco.com.br/simulado/${transactionId}.pdf`,
      },
    };
  }

  return { ...base, status: "paid" };
}

/**
 * Simula a confirmação assíncrona de um pagamento pendente (Pix/boleto).
 * Em produção, esta etapa NÃO existiria no cliente — a confirmação chegaria
 * via webhook do gateway para o backend, que atualizaria o status do pedido.
 */
export async function simulateConfirmPendingPayment(): Promise<{ confirmed: true }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { confirmed: true };
}
