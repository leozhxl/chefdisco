"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CreditCard, QrCode, FileText, CheckCircle2, Download, Flame, Copy, Check, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { useCart } from "@/lib/cart-context";
import { formatBRL, isValidEmail, isValidPhoneBR } from "@/lib/utils";
import { processPayment, simulateConfirmPendingPayment, type PaymentMethod, type PaymentResult } from "@/lib/payments";
import { simulateDigitalDelivery } from "@/lib/digital-delivery";

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutPage() {
  const { lineItems, totalCents, hasPhysicalItems, clearCart } = useCart();
  const [method, setMethod] = useState<PaymentMethod>("cartao");
  const [processing, setProcessing] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [pending, setPending] = useState<PaymentResult | null>(null);
  const [result, setResult] = useState<{
    transactionId: string;
    message: string;
    downloads: { name: string; url: string }[];
  } | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cep: "",
    address: "",
    city: "",
    state: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Informe seu nome completo.";
    if (!isValidEmail(form.email)) e.email = "Informe um e-mail válido.";
    if (!isValidPhoneBR(form.phone)) e.phone = "Informe um telefone válido com DDD.";
    if (hasPhysicalItems) {
      if (!form.cep.trim()) e.cep = "Informe o CEP.";
      if (!form.address.trim()) e.address = "Informe o endereço.";
      if (!form.city.trim()) e.city = "Informe a cidade.";
      if (!form.state.trim()) e.state = "Informe o estado.";
    }
    if (method === "cartao") {
      if (form.cardNumber.replace(/\s/g, "").length < 13) e.cardNumber = "Número de cartão inválido.";
      if (!form.cardExpiry.trim()) e.cardExpiry = "Informe a validade.";
      if (form.cardCvv.length < 3) e.cardCvv = "CVV inválido.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function finalizeOrder(payment: PaymentResult) {
    const digitalItems = lineItems.filter((li) => li.product.isDigital);
    const downloads = [];
    for (const li of digitalItems) {
      const delivery = await simulateDigitalDelivery(li.product.slug, form.email);
      downloads.push({ name: li.product.name, url: delivery.downloadUrl });
    }

    // Persist a simple mock order for the "Minha Conta" order history.
    try {
      const orders = JSON.parse(localStorage.getItem("chef-do-disco:orders") || "[]");
      orders.unshift({
        id: payment.transactionId,
        date: new Date().toISOString(),
        email: form.email,
        items: lineItems.map((li) => ({ name: li.product.name, quantity: li.quantity })),
        totalCents,
        method,
        downloads,
      });
      localStorage.setItem("chef-do-disco:orders", JSON.stringify(orders));
    } catch {
      // ignore storage errors
    }

    setResult({
      transactionId: payment.transactionId,
      message: method === "cartao" ? payment.message : "Pagamento confirmado (simulado). Pedido processado com sucesso.",
      downloads,
    });
    clearCart();
  }

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    if (!validate()) return;
    setProcessing(true);

    const payment = await processPayment({
      method,
      amountCents: totalCents,
      customerName: form.name,
      customerEmail: form.email,
      cardNumber: form.cardNumber,
      cardExpiry: form.cardExpiry,
      cardCvv: form.cardCvv,
    });

    setProcessing(false);

    if (payment.status === "pending") {
      // Pix e boleto ficam aguardando confirmação — em produção isso viria de um webhook do gateway.
      setPending(payment);
      return;
    }

    await finalizeOrder(payment);
  }

  async function handleConfirmPending() {
    if (!pending) return;
    setConfirming(true);
    await simulateConfirmPendingPayment();
    await finalizeOrder(pending);
    setConfirming(false);
    setPending(null);
  }

  async function handleCopyPixCode() {
    if (!pending?.pix) return;
    try {
      await navigator.clipboard.writeText(pending.pix.copyPasteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — ignore
    }
  }

  if (lineItems.length === 0 && !result) {
    return (
      <Container className="py-24 text-center max-w-xl">
        <p className="text-stone/60 mb-6">Seu carrinho está vazio.</p>
        <Link href="/loja" className="text-ember font-semibold hover:underline">Voltar para a loja</Link>
      </Container>
    );
  }

  if (pending?.pix) {
    return (
      <div className="relative overflow-hidden bg-charcoal py-20 min-h-[60vh]">
        <div className="absolute inset-0 ember-glow opacity-30 pointer-events-none" />
        <EmberParticles count={10} subtle />
        <Container className="relative z-10 max-w-md text-center">
          <QrCode className="h-10 w-10 text-ember mx-auto mb-4" />
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone">Pague com Pix</h1>
          <p className="mt-2 text-stone/60 text-sm">
            Escaneie o QR Code no app do seu banco ou copie o código abaixo.
          </p>

          <div className="mt-8 mx-auto flex h-52 w-52 items-center justify-center rounded-md border border-gold/20 bg-charcoal-light">
            <PixQrPlaceholder seed={pending.transactionId} />
          </div>

          <p className="mt-6 text-2xl font-bold text-stone">{formatBRL(totalCents)}</p>

          <div className="mt-6 flex items-center gap-2 rounded-md border border-gold/15 bg-charcoal-light p-3">
            <code className="flex-1 truncate text-left text-xs text-stone/70">{pending.pix.copyPasteCode}</code>
            <button
              type="button"
              onClick={handleCopyPixCode}
              className="shrink-0 flex items-center gap-1.5 rounded-sm bg-ember px-3 py-2 text-xs font-semibold uppercase tracking-wide text-charcoal hover:brightness-95 transition"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-stone/50">
            <Clock className="h-3.5 w-3.5" /> Expira em {pending.pix.expiresInMinutes} minutos
          </p>

          <Button type="button" onClick={handleConfirmPending} disabled={confirming} className="w-full mt-8">
            <Flame className="h-4 w-4" /> {confirming ? "Confirmando..." : "Já paguei — confirmar pagamento"}
          </Button>
          <p className="mt-3 text-xs text-stone/40">
            (Em produção, a confirmação chegaria automaticamente via webhook do gateway — este botão simula essa etapa.)
          </p>
        </Container>
      </div>
    );
  }

  if (pending?.boleto) {
    return (
      <div className="relative overflow-hidden bg-charcoal py-20 min-h-[60vh]">
        <div className="absolute inset-0 ember-glow opacity-30 pointer-events-none" />
        <EmberParticles count={10} subtle />
        <Container className="relative z-10 max-w-lg text-center">
          <FileText className="h-10 w-10 text-ember mx-auto mb-4" />
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone">Boleto Gerado</h1>
          <p className="mt-2 text-stone/60 text-sm">
            Pague em qualquer banco, lotérica ou pelo internet banking até o vencimento.
          </p>

          <div className="mt-8 rounded-md border border-gold/20 bg-charcoal-light p-6 text-left">
            <BoletoBarcode />
            <p className="mt-4 text-center font-mono text-sm text-stone tracking-wide break-all">
              {pending.boleto.barcodeDigits}
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-gold/15 pt-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-stone/50">Vencimento</p>
                <p className="font-semibold text-stone">{pending.boleto.dueDate}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wide text-stone/50">Valor</p>
                <p className="font-semibold text-stone">{formatBRL(totalCents)}</p>
              </div>
            </div>
          </div>

          <a
            href={pending.boleto.pdfUrl}
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-ember hover:underline"
          >
            <Download className="h-4 w-4" /> Baixar boleto em PDF
          </a>

          <Button type="button" onClick={handleConfirmPending} disabled={confirming} className="w-full mt-8">
            <Flame className="h-4 w-4" /> {confirming ? "Confirmando..." : "Já paguei — confirmar pagamento"}
          </Button>
          <p className="mt-3 text-xs text-stone/40">
            (Em produção, a compensação bancária pode levar até 3 dias úteis e seria confirmada via webhook — este botão simula essa etapa.)
          </p>
        </Container>
      </div>
    );
  }

  if (result) {
    return (
      <div className="relative overflow-hidden bg-charcoal py-20 min-h-[60vh]">
        <div className="absolute inset-0 ember-glow opacity-40 pointer-events-none" />
        <EmberParticles count={14} />
        <Container className="relative z-10 max-w-xl text-center">
          <Flame className="h-14 w-14 text-ember mx-auto mb-3 flame-flicker" />
          <CheckCircle2 className="h-10 w-10 text-ember mx-auto mb-6" />
          <h1 className="font-serif text-3xl font-bold text-stone">Pedido confirmado!</h1>
          <p className="mt-3 text-stone/70">{result.message}</p>
          <p className="mt-1 text-sm text-stone/50">Código do pedido: {result.transactionId}</p>

          {result.downloads.length > 0 && (
            <div className="mt-10 text-left rounded-md border border-gold/15 bg-charcoal-light p-6">
              <h2 className="font-serif font-bold text-stone mb-4">Seus downloads</h2>
              <ul className="space-y-3">
                {result.downloads.map((d) => (
                  <li key={d.url} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-stone/80">{d.name}</span>
                    <a
                      href={d.url}
                      className="flex items-center gap-1.5 text-sm font-semibold text-ember hover:underline"
                    >
                      <Download className="h-4 w-4" /> Baixar
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-stone/40">
                Um e-mail com estes links também foi enviado (simulado) para {form.email}.
              </p>
            </div>
          )}

          <Link href="/loja" className="inline-block mt-10 text-ember font-semibold hover:underline">
            Continuar comprando
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-charcoal py-16">
      <div className="absolute inset-0 ember-glow opacity-25 pointer-events-none" />
      <EmberParticles count={8} subtle />
      <Container className="relative z-10 max-w-5xl">
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-stone mb-10">Checkout</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          <div className="space-y-10">
            <section>
              <h2 className="font-serif text-xl font-bold text-stone mb-4">Dados de Contato</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nome completo" error={errors.name}>
                  <input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} />
                </Field>
                <Field label="E-mail" error={errors.email}>
                  <input className="input" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </Field>
                <Field label="Telefone" error={errors.phone}>
                  <input className="input" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(11) 90000-0000" />
                </Field>
              </div>
            </section>

            {hasPhysicalItems && (
              <section>
                <h2 className="font-serif text-xl font-bold text-stone mb-4">Endereço de Entrega</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="CEP" error={errors.cep}>
                    <input className="input" value={form.cep} onChange={(e) => set("cep", e.target.value)} />
                  </Field>
                  <Field label="Endereço" error={errors.address}>
                    <input className="input" value={form.address} onChange={(e) => set("address", e.target.value)} />
                  </Field>
                  <Field label="Cidade" error={errors.city}>
                    <input className="input" value={form.city} onChange={(e) => set("city", e.target.value)} />
                  </Field>
                  <Field label="Estado" error={errors.state}>
                    <input className="input" value={form.state} onChange={(e) => set("state", e.target.value)} />
                  </Field>
                </div>
              </section>
            )}

            <section>
              <h2 className="font-serif text-xl font-bold text-stone mb-4">Pagamento</h2>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { id: "cartao" as const, label: "Cartão", icon: CreditCard },
                  { id: "pix" as const, label: "Pix", icon: QrCode },
                  { id: "boleto" as const, label: "Boleto", icon: FileText },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => setMethod(id)}
                    className={`flex flex-col items-center gap-2 rounded-md border p-4 transition-colors ${
                      method === id ? "border-ember bg-ember/10 text-ember" : "border-gold/15 text-stone/60 hover:border-gold/30"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
                  </button>
                ))}
              </div>

              {method === "cartao" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field label="Número do cartão" error={errors.cardNumber} className="sm:col-span-3">
                    <input className="input" value={form.cardNumber} onChange={(e) => set("cardNumber", e.target.value)} placeholder="0000 0000 0000 0000" />
                  </Field>
                  <Field label="Validade" error={errors.cardExpiry}>
                    <input className="input" value={form.cardExpiry} onChange={(e) => set("cardExpiry", e.target.value)} placeholder="MM/AA" />
                  </Field>
                  <Field label="CVV" error={errors.cardCvv}>
                    <input className="input" value={form.cardCvv} onChange={(e) => set("cardCvv", e.target.value)} placeholder="000" />
                  </Field>
                </div>
              )}
              {method === "pix" && (
                <p className="text-sm text-stone/60">
                  Um QR Code Pix seria exibido aqui em uma integração real. Nesta demonstração, o pagamento é simulado como aprovado instantaneamente.
                </p>
              )}
              {method === "boleto" && (
                <p className="text-sm text-stone/60">
                  O boleto seria gerado e disponibilizado para download/impressão em uma integração real. Nesta demonstração, ele é simulado.
                </p>
              )}
            </section>
          </div>

          <aside className="h-fit rounded-md border border-gold/15 bg-charcoal-light p-6">
            <h2 className="font-serif text-lg font-bold text-stone mb-4">Resumo do Pedido</h2>
            <div className="space-y-3">
              {lineItems.map((li) => (
                <div key={li.product.slug} className="flex justify-between text-sm">
                  <span className="text-stone/70">{li.product.name} × {li.quantity}</span>
                  <span className="text-stone font-medium">{formatBRL(li.subtotalCents)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gold/15 mt-4 pt-4 flex justify-between font-bold text-stone">
              <span>Total</span>
              <span className="text-ember">{formatBRL(totalCents)}</span>
            </div>
            {!hasPhysicalItems && (
              <p className="mt-3 text-xs text-stone/50">Pedido 100% digital — sem frete.</p>
            )}
            <Button type="submit" className="w-full mt-6" disabled={processing}>
              <Flame className="h-4 w-4" />
              {processing
                ? "Processando..."
                : method === "pix"
                ? "Gerar Pix"
                : method === "boleto"
                ? "Gerar Boleto"
                : "Confirmar Pedido"}
            </Button>
          </aside>
        </form>
      </Container>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid rgba(201,162,75,0.25);
          border-radius: 2px;
          padding: 0.65rem 0.85rem;
          font-size: 0.9rem;
          background: var(--color-charcoal-light);
          color: var(--color-stone);
        }
        .input::placeholder {
          color: rgba(237,230,218,0.35);
        }
        .input:focus {
          outline: none;
          border-color: var(--color-ember);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block text-sm ${className ?? ""}`}>
      <span className="block mb-1.5 font-medium text-stone/80">{label}</span>
      {children}
      {error && <span className="block mt-1 text-xs text-ember">{error}</span>}
    </label>
  );
}

/**
 * Representação visual de um QR Code Pix — puramente decorativa (grade
 * determinística a partir da seed). Em produção, use o QR Code real
 * retornado pelo gateway de pagamento.
 */
function PixQrPlaceholder({ seed }: { seed: string }) {
  const size = 11;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;

  const cells: boolean[] = [];
  let state = hash || 1;
  for (let i = 0; i < size * size; i++) {
    state = (state * 1103515245 + 12345) >>> 0;
    cells.push((state >> 16) % 3 === 0);
  }

  return (
    <div
      className="grid gap-[2px] bg-stone p-3 rounded-sm"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, width: 176, height: 176 }}
    >
      {cells.map((filled, i) => {
        // Force solid corner "finder" squares like a real QR code for visual authenticity.
        const x = i % size;
        const y = Math.floor(i / size);
        const inCorner =
          (x < 3 && y < 3) || (x >= size - 3 && y < 3) || (x < 3 && y >= size - 3);
        return (
          <span
            key={i}
            className={inCorner || filled ? "bg-charcoal" : "bg-transparent"}
            style={{ borderRadius: 1 }}
          />
        );
      })}
    </div>
  );
}

/**
 * Representação visual de um código de barras de boleto — puramente
 * decorativa. Em produção, use o código de barras real do boleto emitido.
 */
function BoletoBarcode() {
  const bars = Array.from({ length: 54 }, (_, i) => 1 + ((i * 37) % 4));
  return (
    <div className="flex h-14 items-stretch gap-[2px]" aria-hidden="true">
      {bars.map((w, i) => (
        <span
          key={i}
          className="bg-stone"
          style={{ width: `${w}px` }}
        />
      ))}
    </div>
  );
}
