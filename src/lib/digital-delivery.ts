// ---------------------------------------------------------------------------
// STUB DE ENTREGA DE PRODUTO DIGITAL
// ---------------------------------------------------------------------------
// Simula o envio de e-mail com link de download após a confirmação do
// pagamento de um e-book (produto digital).
//
// O arquivo do e-book "O Livro do Disco de Arado" já está publicado em
// /public/downloads e o link abaixo aponta para ele de verdade — porém,
// como está em /public, QUALQUER PESSOA com o link consegue baixar, mesmo
// sem pagar. O restante do fluxo (envio de e-mail, expiração, confirmação
// de pagamento) continua simulado.
//
// ANTES DE IR PARA PRODUÇÃO:
//   1. Integre um serviço de e-mail transacional (ex.: Resend, SendGrid,
//      Amazon SES) em uma Route Handler no backend.
//   2. Gere links de download assinados e com expiração, apontando para
//      arquivos armazenados em um bucket privado (ex.: S3, Supabase Storage).
//   3. Nunca exponha o arquivo real publicamente sem controle de acesso —
//      mova o PDF para fora de /public assim que a entrega for automatizada.
// ---------------------------------------------------------------------------

const PRODUCT_FILES: Record<string, string> = {
  "ebook-10-receitas-no-disco-de-arado": "/downloads/O_Livro_do_Chef_do_Disco_editado.pdf",
};

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
    downloadUrl: PRODUCT_FILES[productSlug] ?? `https://downloads.chefdodisco.com.br/simulado/${productSlug}.pdf`,
    emailSentTo: customerEmail,
    expiresAt: expires.toLocaleDateString("pt-BR"),
  };
}
