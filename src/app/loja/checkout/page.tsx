"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { QrCode, CheckCircle2, Flame, Copy, Check, Clock, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { useCart } from "@/lib/cart-context";
import { formatBRL, isValidEmail, isValidPhoneBR } from "@/lib/utils";
import { processPayment, type PaymentResult } from "@/lib/payments";

// Número da loja para envio de comprovante de pagamento (Pix) via WhatsApp.
const WHATSAPP_NUMBER = "5548999858799";

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutPage() {
  const { lineItems, totalCents, hasPhysicalItems, clearCart } = useCart();
  const [processing, setProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [pending, setPending] = useState<PaymentResult | null>(null);
  const [result, setResult] = useState<{
    transactionId: string;
    items: { name: string; quantity: number }[];
    totalCents: number;
  } | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cep: "",
    address: "",
    city: "",
    state: "",
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
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // Nenhum download é liberado automaticamente. O cliente envia o
  // comprovante pelo WhatsApp e o dono da loja confere e manda o PDF por lá.
  function finalizeOrder(payment: PaymentResult) {
    const items = lineItems.map((li) => ({ name: li.product.name, quantity: li.quantity }));

    try {
      const orders = JSON.parse(localStorage.getItem("chef-do-disco:orders") || "[]");
      orders.unshift({
        id: payment.transactionId,
        date: new Date().toISOString(),
        email: form.email,
        items,
        totalCents,
        method: "pix",
      });
      localStorage.setItem("chef-do-disco:orders", JSON.stringify(orders));
    } catch {
      // ignore storage errors
    }

    setResult({ transactionId: payment.transactionId, items, totalCents });
    clearCart();
  }

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    if (!validate()) return;
    setProcessing(true);

    const payment = await processPayment({
      method: "pix",
      amountCents: totalCents,
      customerName: form.name,
      customerEmail: form.email,
    });

    setProcessing(false);
    setPending(payment);
  }

  function handleSentProof() {
    if (!pending) return;
    finalizeOrder(pending);
    setPending(null);
  }

  function whatsappProofLink(
    transactionId: string,
    items: { name: string; quantity: number }[],
    itemsTotalCents: number
  ) {
    const itemsList = items.map((i) => `- ${i.name}${i.quantity > 1 ? ` (x${i.quantity})` : ""}`).join("\n");
    const text = `Olá! Acabei de pagar o pedido ${transactionId} via Pix na loja Chef do Disco.\n\nProduto(s):\n${itemsList}\n\nTotal: ${formatBRL(itemsTotalCents)}\n\nSegue o comprovante:`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
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

          <div className="mt-8 rounded-md border border-gold/15 bg-charcoal-light p-5 text-left">
            <p className="text-sm text-stone/80">
              Após pagar, envie o comprovante para nosso WhatsApp. Assim que confirmarmos o
              recebimento, enviamos o PDF do e-book por lá.
            </p>
            <a
              href={whatsappProofLink(
                pending.transactionId,
                lineItems.map((li) => ({ name: li.product.name, quantity: li.quantity })),
                totalCents
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-sm bg-ember px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-charcoal hover:brightness-95 transition"
            >
              <MessageCircle className="h-4 w-4" /> Enviar comprovante no WhatsApp
            </a>
          </div>

          <Button type="button" onClick={handleSentProof} className="w-full mt-4">
            <Flame className="h-4 w-4" /> Já enviei o comprovante
          </Button>
          <p className="mt-3 text-xs text-stone/40">
            O download só é liberado depois que conferirmos o pagamento — o link será enviado
            manualmente pelo WhatsApp.
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
          <h1 className="font-serif text-3xl font-bold text-stone">Pedido registrado!</h1>
          <p className="mt-3 text-stone/70">Aguardando confirmação do pagamento.</p>
          <p className="mt-1 text-sm text-stone/50">Código do pedido: {result.transactionId}</p>

          <div className="mt-10 text-left rounded-md border border-gold/15 bg-charcoal-light p-6">
            <h2 className="font-serif font-bold text-stone mb-2">Aguardando confirmação</h2>
            <p className="text-sm text-stone/70">
              Assim que confirmarmos o pagamento pelo comprovante enviado no WhatsApp, o PDF do
              e-book será enviado por lá.
            </p>
            <a
              href={whatsappProofLink(result.transactionId, result.items, result.totalCents)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-sm bg-ember px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-charcoal hover:brightness-95 transition"
            >
              <MessageCircle className="h-4 w-4" /> Enviar comprovante no WhatsApp
            </a>
          </div>

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
              <div className="flex items-center gap-3 rounded-md border border-ember bg-ember/10 p-4 text-ember mb-4 w-fit">
                <QrCode className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-wide">Pix</span>
              </div>
              <p className="text-sm text-stone/60">
                Após confirmar o pedido, um código Pix será gerado. Pague e envie o comprovante
                pelo WhatsApp para receber o e-book.
              </p>
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
              {processing ? "Processando..." : "Gerar Pix"}
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
      className="grid gap-0.5 bg-stone p-3 rounded-sm"
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
