import type { MetadataRoute } from "next";

const BASE_URL = "https://www.chefedodisco.com";

const routes = [
  "",
  "/sobre",
  "/eventos",
  "/estrutura",
  "/roda-gigante-de-costelas",
  "/acoes-sociais",
  "/redes-sociais",
  "/loja",
  "/politicas/privacidade",
  "/politicas/termos",
  "/politicas/trocas-devolucoes",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
