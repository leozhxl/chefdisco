"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Flame, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { isValidEmail, isValidPhoneBR } from "@/lib/utils";
import { contactInfo } from "@/data/social";

// Envia o formulário de verdade por e-mail via FormSubmit (https://formsubmit.co) —
// serviço gratuito que entrega o e-mail sem precisar de backend ou chave de API própria.
// IMPORTANTE: no primeiro envio, o FormSubmit manda um e-mail de confirmação para
// contactInfo.email que precisa ser aberto e confirmado uma única vez para ativar o
// recebimento automático das próximas solicitações.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${contactInfo.email}`;

interface FormState {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  guests: string;
  location: string;
  message: string;
  website: string; // honeypot
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  eventType: "Chef Privativo",
  date: "",
  guests: "",
  location: "",
  message: "",
  website: "",
};

export default function QuoteForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.website) return; // honeypot: bots fill hidden fields

    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Informe seu nome.";
    if (!isValidEmail(form.email)) newErrors.email = "E-mail inválido.";
    if (!isValidPhoneBR(form.phone)) newErrors.phone = "Telefone inválido.";
    if (!form.date) newErrors.date = "Selecione uma data.";
    if (!form.guests || Number(form.guests) <= 0) newErrors.guests = "Informe o número de convidados.";
    if (!form.location.trim()) newErrors.location = "Informe o local do evento.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSending(true);
    setSendError(false);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Novo pedido de orçamento — ${form.eventType}`,
          Nome: form.name,
          Email: form.email,
          Telefone: form.phone,
          "Tipo de evento": form.eventType,
          "Data do evento": form.date,
          "Número de convidados": form.guests,
          "Local do evento": form.location,
          Mensagem: form.message || "(sem mensagem adicional)",
        }),
      });
      if (!res.ok) throw new Error("Falha no envio");
      setSubmitted(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-md border border-gold/30 bg-white/70 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-ember mx-auto mb-4" />
        <h3 className="font-serif text-2xl font-bold text-charcoal">Solicitação enviada!</h3>
        <p className="mt-3 text-charcoal/70">
          Recebemos sua solicitação de orçamento para <strong>{form.eventType}</strong>. Nossa
          equipe entrará em contato em até 48h pelo e-mail ou telefone informado.
        </p>
        <button
          onClick={() => { setForm(initialState); setSubmitted(false); }}
          className="mt-6 text-sm font-semibold text-ember hover:underline"
        >
          Enviar nova solicitação
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — invisible to real users */}
      <input
        type="text"
        value={form.website}
        onChange={(e) => set("website", e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nome completo" error={errors.name}>
          <input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="E-mail" error={errors.email}>
          <input className="input" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field label="Telefone" error={errors.phone}>
          <input className="input" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(11) 90000-0000" />
        </Field>
        <Field label="Tipo de evento">
          <select className="input" value={form.eventType} onChange={(e) => set("eventType", e.target.value)}>
            <option>Chef Privativo</option>
            <option>Churrasco Corporativo</option>
            <option>Casamento</option>
            <option>Outro</option>
          </select>
        </Field>
        <Field label="Data do evento" error={errors.date}>
          <input className="input" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
        </Field>
        <Field label="Número de convidados" error={errors.guests}>
          <input className="input" type="number" min={1} value={form.guests} onChange={(e) => set("guests", e.target.value)} />
        </Field>
        <Field label="Local do evento" error={errors.location} className="sm:col-span-2">
          <input className="input" value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Cidade / Estado / Endereço" />
        </Field>
        <Field label="Mensagem (opcional)" className="sm:col-span-2">
          <textarea className="input" rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} />
        </Field>
      </div>

      {sendError && (
        <p className="flex items-center gap-2 text-sm text-blood">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          Não foi possível enviar sua solicitação agora. Tente novamente ou fale pelo WhatsApp.
        </p>
      )}

      <Button type="submit" className="w-full sm:w-auto" disabled={sending}>
        <Flame className="h-4 w-4" /> {sending ? "Enviando..." : "Solicitar Orçamento"}
      </Button>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid rgba(26,26,26,0.15);
          border-radius: 2px;
          padding: 0.65rem 0.85rem;
          font-size: 0.9rem;
          background: white;
        }
        .input:focus { outline: none; border-color: var(--color-ember); }
      `}</style>
    </form>
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
      <span className="block mb-1.5 font-medium text-charcoal/80">{label}</span>
      {children}
      {error && <span className="block mt-1 text-xs text-blood">{error}</span>}
    </label>
  );
}
