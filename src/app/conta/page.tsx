"use client";

import { useEffect, useState, type FormEvent } from "react";
import { LogOut, Download, Package } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FlameDivider } from "@/components/ui/FlameDivider";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { useAuth } from "@/lib/auth-context";
import { isValidEmail, formatBRL } from "@/lib/utils";

interface MockOrder {
  id: string;
  date: string;
  email: string;
  items: { name: string; quantity: number }[];
  totalCents: number;
  method: string;
  downloads: { name: string; url: string }[];
}

export default function ContaPage() {
  const { user, login, register, logout } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<MockOrder[]>([]);

  useEffect(() => {
    if (!user) return;
    try {
      const all: MockOrder[] = JSON.parse(localStorage.getItem("chef-do-disco:orders") || "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
      setOrders(all.filter((o) => o.email === user.email));
    } catch {
      setOrders([]);
    }
  }, [user]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!isValidEmail(form.email)) {
      setError("Informe um e-mail válido.");
      return;
    }
    if (form.password.length < 4) {
      setError("A senha deve ter ao menos 4 caracteres.");
      return;
    }
    const result =
      mode === "login"
        ? login(form.email, form.password)
        : register(form.name, form.email, form.password);
    if (!result.success) setError(result.error ?? "Erro desconhecido.");
  }

  if (user) {
    const downloads = orders.flatMap((o) => o.downloads);
    return (
      <div className="relative overflow-hidden bg-charcoal py-16 min-h-[60vh]">
        <div className="absolute inset-0 ember-glow opacity-25 pointer-events-none" />
        <EmberParticles count={8} subtle />
        <Container className="relative z-10 max-w-3xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-serif text-3xl font-black text-stone">Olá, {user.name}</h1>
              <p className="text-stone/60 text-sm mt-1">{user.email}</p>
            </div>
            <button onClick={logout} className="flex items-center gap-1.5 text-sm font-semibold text-stone/60 hover:text-ember">
              <LogOut className="h-4 w-4" /> Sair
            </button>
          </div>

          <section className="mb-12">
            <h2 className="font-serif text-xl font-bold text-stone mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-ember" /> Histórico de Pedidos
            </h2>
            {orders.length === 0 ? (
              <p className="text-stone/60 text-sm">Você ainda não fez nenhum pedido.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="rounded-md border border-gold/15 bg-charcoal-light p-5">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-stone">Pedido {o.id}</span>
                      <span className="text-stone/50">{new Date(o.date).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <ul className="mt-2 text-sm text-stone/70">
                      {o.items.map((it, i) => <li key={i}>{it.name} × {it.quantity}</li>)}
                    </ul>
                    <p className="mt-2 font-semibold text-ember">{formatBRL(o.totalCents)}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-stone mb-4 flex items-center gap-2">
              <Download className="h-5 w-5 text-ember" /> Downloads Digitais
            </h2>
            {downloads.length === 0 ? (
              <p className="text-stone/60 text-sm">Nenhum e-book disponível ainda.</p>
            ) : (
              <ul className="space-y-2">
                {downloads.map((d, i) => (
                  <li key={i} className="flex justify-between items-center rounded-md border border-gold/15 bg-charcoal-light px-4 py-3">
                    <span className="text-sm text-stone/80">{d.name}</span>
                    <a href={d.url} className="text-sm font-semibold text-ember hover:underline">Baixar</a>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <FlameDivider className="bg-charcoal justify-start! mb-8" />

          <p className="mt-4 text-xs text-stone/40 border-t border-gold/15 pt-4">
            Este login é uma simulação local (localStorage) apenas para fins de demonstração —
            não representa autenticação segura. Antes de produção, substitua por um provedor real
            como NextAuth.js, Clerk ou Auth0.
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-charcoal py-20 min-h-[60vh]">
      <div className="absolute inset-0 ember-glow opacity-30 pointer-events-none" />
      <EmberParticles count={10} subtle />
      <Container className="relative z-10 max-w-md">
        <h1 className="font-serif text-3xl font-black text-stone mb-2 text-center">
          {mode === "login" ? "Entrar" : "Criar Conta"}
        </h1>
        <p className="text-center text-stone/60 text-sm mb-8">
          {mode === "login" ? "Acesse seus pedidos e downloads." : "Cadastre-se para acompanhar seus pedidos."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <input
              className="input"
              placeholder="Nome completo"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          )}
          <input
            className="input"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <input
            className="input"
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
          {error && <p className="text-sm text-blood">{error}</p>}
          <Button type="submit" className="w-full">
            {mode === "login" ? "Entrar" : "Criar Conta"}
          </Button>
        </form>

        <button
          onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
          className="mt-6 text-sm text-center w-full text-ember hover:underline"
        >
          {mode === "login" ? "Ainda não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
        </button>

        <p className="mt-10 text-xs text-stone/40 text-center">
          Autenticação simulada localmente (localStorage), sem segurança real — apenas para fins
          de demonstração de interface.
        </p>
      </Container>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid rgba(201,162,75,0.25);
          border-radius: 2px;
          padding: 0.7rem 0.9rem;
          font-size: 0.9rem;
          background: var(--color-charcoal-light);
          color: var(--color-stone);
        }
        .input::placeholder { color: rgba(237,230,218,0.35); }
        .input:focus { outline: none; border-color: var(--color-ember); }
      `}</style>
    </div>
  );
}
