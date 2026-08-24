// ---------------------------------------------------------------------------
// STUB DE ENTREGA DE PRODUTO DIGITAL
// ---------------------------------------------------------------------------
// Simula o envio de e-mail com link de download após a confirmação do
// pagamento de um e-book (produto digital).
//
// ANTES DE IR PARA PRODUÇÃO:
//   1. Integre um serviço de e-mail transacional (ex.: Resend, SendGrid,
//      Amazon SES) em uma Route Handler no backend.
//   2. Gere links de download assinados e com expiração, apontando para
//      arquivos armazenados em um bucket privado (ex.: S3, Supabase Storage).
//   3. Nunca exponha o arquivo real publicamente sem controle de acesso.
// ---------------------------------------------------------------------------

export interface DigitalDeliveryResult {
  downloadUrl: string;
  emailSentTo: string;
  expiresAt: string;
}

export async function simulateDigitalDelivery(
  productSlug: string,
  customerEmail: string
): Promise<DigitalDeliveryResult> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  const expires = new Date();
  expires.setDate(expires.getDate() + 30);

  return {
    // Link fictício apenas para demonstração da interface.
    downloadUrl: `https://downloads.chefdodisco.com.br/simulado/${productSlug}.pdf`,
    emailSentTo: customerEmail,
    expiresAt: expires.toLocaleDateString("pt-BR"),
  };
}
