"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FlameDivider } from "@/components/ui/FlameDivider";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { products } from "@/data/products";
import { pastEvents } from "@/data/events";
import { socialProjects } from "@/data/social";
import { formatBRL } from "@/lib/utils";

interface MockOrder {
  id: string;
  date: string;
  email: string;
  items: { name: string; quantity: number }[];
  totalCents: number;
  method: string;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<MockOrder[]>([]);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
      setOrders(JSON.parse(localStorage.getItem("chef-do-disco:orders") || "[]"));
    } catch {
      setOrders([]);
    }
  }, []);

  return (
    <div className="relative overflow-hidden bg-charcoal py-16 min-h-[70vh]">
      <div className="absolute inset-0 ember-glow opacity-25 pointer-events-none" />
      <EmberParticles count={8} subtle />
      <Container className="relative z-10">
        <div className="mb-10 flex items-start gap-3 rounded-md border border-gold/40 bg-gold/10 p-5">
          <AlertTriangle className="h-5 w-5 text-ember shrink-0 mt-0.5" />
          <p className="text-sm text-stone/80">
            <strong>Protótipo interno.</strong> Este painel lê dados estáticos (src/data) e pedidos
            simulados salvos em localStorage. Não há autenticação real, backend ou banco de dados —
            antes de usar em produção, implemente autenticação de administrador segura e uma API
            real de gerenciamento.
          </p>
        </div>

        <h1 className="font-serif text-3xl font-black text-stone mb-4">Painel Administrativo</h1>
        <FlameDivider className="bg-charcoal justify-start! mb-10" />

        <section className="mb-14">
          <h2 className="font-serif text-xl font-bold text-stone mb-4">
            Produtos ({products.length})
          </h2>
          <div className="overflow-x-auto rounded-md border border-gold/15 bg-charcoal-light">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-stone/50 uppercase text-xs border-b border-gold/15">
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">Categoria</th>
                  <th className="px-4 py-3">Preço</th>
                  <th className="px-4 py-3">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug} className="border-b border-gold/10 last:border-0">
                    <td className="px-4 py-3 font-medium text-stone">{p.name}</td>
                    <td className="px-4 py-3 text-stone/60">{p.category}</td>
                    <td className="px-4 py-3 text-stone/60">{formatBRL(p.priceCents)}</td>
                    <td className="px-4 py-3 text-stone/60">{p.isDigital ? "Digital" : "Físico"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="font-serif text-xl font-bold text-stone mb-4">
            Pedidos Simulados ({orders.length})
          </h2>
          {orders.length === 0 ? (
            <p className="text-stone/60 text-sm">Nenhum pedido simulado registrado neste navegador ainda.</p>
          ) : (
            <div className="overflow-x-auto rounded-md border border-gold/15 bg-charcoal-light">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-stone/50 uppercase text-xs border-b border-gold/15">
                    <th className="px-4 py-3">Pedido</th>
                    <th className="px-4 py-3">E-mail</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Método</th>
                    <th className="px-4 py-3">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-gold/10 last:border-0">
                      <td className="px-4 py-3 font-medium text-stone">{o.id}</td>
                      <td className="px-4 py-3 text-stone/60">{o.email}</td>
                      <td className="px-4 py-3 text-stone/60">{formatBRL(o.totalCents)}</td>
                      <td className="px-4 py-3 text-stone/60 capitalize">{o.method}</td>
                      <td className="px-4 py-3 text-stone/60">{new Date(o.date).toLocaleDateString("pt-BR")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mb-14">
          <h2 className="font-serif text-xl font-bold text-stone mb-4">Ações Sociais / Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {socialProjects.map((p) => (
              <div key={p.title} className="rounded-md border border-gold/15 bg-charcoal-light p-4">
                <p className="font-semibold text-stone text-sm">{p.title}</p>
                <p className="text-xs text-stone/50 mt-1">{p.year}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-stone mb-4">Agenda de Eventos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pastEvents.map((e) => (
              <div key={e.title} className="rounded-md border border-gold/15 bg-charcoal-light p-4">
                <p className="font-semibold text-stone text-sm">{e.title}</p>
                <p className="text-xs text-stone/50 mt-1">{e.location} · {e.guests}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
