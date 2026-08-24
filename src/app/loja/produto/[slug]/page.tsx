import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Ruler, Layers, ShieldCheck, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import { FlameDivider } from "@/components/ui/FlameDivider";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { getProductBySlug, products, categoryLabels } from "@/data/products";
import { formatBRL } from "@/lib/utils";
import AddToCart from "./AddToCart";
import ProductGallery from "./ProductGallery";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="relative overflow-hidden bg-charcoal py-16">
      <div className="absolute inset-0 ember-glow opacity-30 pointer-events-none" />
      <EmberParticles count={10} subtle />
      <Container className="relative z-10">
        <a
          href="/loja"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone/60 hover:text-ember transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para a loja
        </a>

        <p className="text-sm text-stone/50 mb-8">
          <a href="/loja" className="hover:text-ember">Loja</a> / {categoryLabels[product.category]} / {product.name}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            {product.images && product.images.length > 0 ? (
              <ProductGallery images={product.images} alt={product.name} />
            ) : product.image ? (
              <div className="relative aspect-square rounded-md overflow-hidden border border-gold/15">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
            ) : (
              <GradientPlaceholder
                gradient={product.gradient}
                alt={product.name}
                className="aspect-square rounded-md"
              />
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ember">
              {categoryLabels[product.category]}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone mt-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current" : ""}`} />
                ))}
              </div>
              <span className="text-sm text-stone/60">
                {product.rating} · {product.reviewCount} avaliações
              </span>
            </div>

            <p className="mt-6 text-2xl font-bold text-stone">{formatBRL(product.priceCents)}</p>
            <p className="mt-2 text-stone/70">{product.shortDescription}</p>

            <div className="mt-8">
              <AddToCart slug={product.slug} />
              {product.isDigital && (
                <p className="mt-3 text-xs text-stone/50">
                  Produto digital: sem frete. Link de download enviado por e-mail após a confirmação do pagamento.
                </p>
              )}
            </div>

            <div className="mt-10 space-y-4 border-t border-gold/15 pt-8">
              <div className="flex gap-3">
                <Layers className="h-5 w-5 text-ember shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone text-sm">Material</p>
                  <p className="text-sm text-stone/60">{product.material}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Ruler className="h-5 w-5 text-ember shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone text-sm">Dimensões</p>
                  <p className="text-sm text-stone/60">{product.dimensions}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="h-5 w-5 text-ember shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone text-sm">Cuidados</p>
                  <ul className="text-sm text-stone/60 list-disc list-inside space-y-0.5 mt-1">
                    {product.care.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FlameDivider className="bg-charcoal my-16" />

        <div className="mt-4 max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-stone mb-4">Descrição</h2>
          <div className="space-y-4 text-stone/75 leading-relaxed">
            {product.description.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>

        <div className="mt-16 max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-stone mb-6">Avaliações</h2>
          <div className="space-y-6">
            {product.reviews.map((r, i) => (
              <div key={i} className="border-b border-gold/15 pb-6">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`h-3.5 w-3.5 ${j < r.rating ? "fill-current" : ""}`} />
                    ))}
                  </div>
                  <span className="font-semibold text-sm text-stone">{r.author}</span>
                </div>
                <p className="mt-2 text-sm text-stone/70">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
