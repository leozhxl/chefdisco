export interface SocialLink {
  name: string;
  handle: string;
  href: string;
  description: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    handle: "@chefdodisco",
    href: "https://instagram.com/chefdodisco",
    description: "Bastidores dos eventos, cortes em preparo e novidades da loja.",
  },
  {
    name: "TikTok",
    handle: "@chefdodisco",
    href: "https://tiktok.com/@chefdodisco",
    description: "Vídeos rápidos de técnica no disco de arado e receitas.",
  },
  {
    name: "YouTube",
    handle: "Chef do Disco (placeholder — substituir)",
    href: "https://youtube.com/@chefdodisco",
    description: "Aulas completas, making-of de eventos e entrevistas.",
  },
];

// Contato real da marca (fonte: material institucional Chef do Disco).
export const contactInfo = {
  email: "chefdodisco@gmail.com",
  phone: "(48) 9 9985-8799",
  whatsappNumber: "5548999858799",
  instagramHandle: "@chefdodisco",
  tiktokHandle: "@chefdodisco",
};

export interface SocialProject {
  title: string;
  year: string;
  description: string;
  impact: string;
  gradient: string;
}

export const socialProjects: SocialProject[] = [
  {
    title: "Fogo que Ensina",
    year: "2023 — presente",
    description:
      "Curso gratuito de técnicas de churrasco para jovens em situação de vulnerabilidade social, com aulas mensais ministradas pela equipe Chef do Disco.",
    impact: "+120 jovens capacitados",
    gradient: "from-[#3a1408] via-[#7a1f1f] to-[#c1440e]",
  },
  {
    title: "Mesa Solidária",
    year: "2022 — presente",
    description:
      "A cada evento realizado, uma porção equivalente de carne é doada a instituições parceiras de assistência alimentar.",
    impact: "+8 toneladas de alimento doadas",
    gradient: "from-[#1a1a1a] via-[#5a4720] to-[#c9a24b]",
  },
  {
    title: "Ferro & Ofício",
    year: "2024 — presente",
    description:
      "Parceria com ferreiros e marceneiros locais para produção artesanal das facas e tábuas, fortalecendo a economia de pequenos artesãos.",
    impact: "12 artesãos parceiros ativos",
    gradient: "from-[#0d0d0d] via-[#262220] to-[#3a1408]",
  },
];
