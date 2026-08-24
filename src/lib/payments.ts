// ---------------------------------------------------------------------------
// PAGAMENTO VIA PIX
// ---------------------------------------------------------------------------
// A loja aceita apenas Pix. O código "copia e cola" abaixo é gerado no
// padrão real do Banco Central (BR Code / EMV) usando a chave Pix da loja,
// então ele é válido e pode ser pago de verdade em qualquer banco.
//
// Como não há integração com gateway, a CONFIRMAÇÃO do pagamento é manual:
// o cliente envia o comprovante pelo WhatsApp da loja e o pedido é liberado
// (e o PDF do e-book enviado) manualmente por lá — ver checkout/page.tsx.
// ---------------------------------------------------------------------------

// Chave Pix da loja (telefone). Ajuste aqui se a chave mudar.
const PIX_KEY = "+5548999858799";
const PIX_MERCHANT_NAME = "CHEF DO DISCO";
const PIX_MERCHANT_CITY = "SOMBRIO";

function crc16ccitt(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function emvField(id: string, value: string): string {
  return `${id}${value.length.toString().padStart(2, "0")}${value}`;
}

/**
 * Gera um código Pix "copia e cola" (BR Code / EMV) real e válido a partir
 * da chave Pix da loja. Não requer gateway — qualquer app bancário consegue
 * ler e pagar. O valor é opcional: se omitido, quem paga digita o valor.
 */
export function generatePixCopyPasteCode(amountCents?: number, txid?: string): string {
  const merchantAccount =
    emvField("00", "BR.GOV.BCB.PIX") + emvField("01", PIX_KEY);

  const sanitizedTxid = (txid ?? "***").replace(/[^A-Za-z0-9]/g, "").slice(0, 25) || "***";
  const additionalData = emvField("05", sanitizedTxid);

  const payload =
    emvField("00", "01") +
    emvField("26", merchantAccount) +
    emvField("52", "0000") +
    emvField("53", "986") +
    (amountCents !== undefined ? emvField("54", (amountCents / 100).toFixed(2)) : "") +
    emvField("58", "BR") +
    emvField("59", PIX_MERCHANT_NAME.slice(0, 25)) +
    emvField("60", PIX_MERCHANT_CITY.slice(0, 15)) +
    emvField("62", additionalData) +
    "6304";

  return payload + crc16ccitt(payload);
}

export interface PaymentRequest {
  method: "pix";
  amountCents: number;
  customerName: string;
  customerEmail: string;
}

export interface PaymentResult {
  transactionId: string;
  pix: {
    copyPasteCode: string;
    expiresInMinutes: number;
  };
}

export async function processPayment(request: PaymentRequest): Promise<PaymentResult> {
  const transactionId = `PEDIDO-${Date.now().toString(36).toUpperCase()}`;

  return {
    transactionId,
    pix: {
      copyPasteCode: generatePixCopyPasteCode(request.amountCents, transactionId),
      expiresInMinutes: 30,
    },
  };
}
