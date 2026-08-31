import type { MetadataRoute } from "next";

const BASE_URL = "https://www.chefedodisco.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/conta", "/loja/carrinho", "/loja/checkout"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
