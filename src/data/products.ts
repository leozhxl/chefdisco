export type ProductCategory =
  | "facas"
  | "livros"
  | "bones"
  | "copos";

export const categoryLabels: Record<ProductCategory, string> = {
  facas: "Facas de Churrasco",
  livros: "Livros de Receitas Digitais",
  bones: "Bonés",
  copos: "Copos",
};

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  priceCents: number;
  isDigital: boolean;
  shortDescription: string;
  description: string[];
  material: string;
  dimensions: string;
  care: string[];
  gradient: string;
  gallery: string[];
  /** Foto real do produto (opcional) — quando ausente, usa o placeholder de gradiente. */
  image?: string;
  /** Galeria de fotos reais adicionais (opcional) — exibidas como miniaturas na página do produto. */
  images?: string[];
  rating: number;
  reviewCount: number;
  reviews: { author: string; rating: number; comment: string }[];
  featured?: boolean;
}

const g = {
  ember: "from-[#3a1408] via-[#7a1f1f] to-[#c1440e]",
  gold: "from-[#1a1a1a] via-[#5a4720] to-[#c9a24b]",
  charcoal: "from-[#0d0d0d] via-[#262220] to-[#3a1408]",
  blood: "from-[#1a1a1a] via-[#4a1414] to-[#7a1f1f]",
  stone: "from-[#3a3226] via-[#5a4a33] to-[#c9a24b]",
};

export const products: Product[] = [
  {
    slug: "ebook-10-receitas-no-disco-de-arado",
    name: "O Livro do Disco de Arado",
    category: "livros",
    priceCents: 1990,
    isDigital: true,
    shortDescription: "E-book digital com 10 receitas para reunir a família e os amigos e cozinhar de verdade no fogo, no disco de arado.",
    description: [
      "Um compilado de 10 receitas selecionadas e organizadas a partir do repertório de pratos do Chef do Disco, pensadas para o disco de arado e para reunir de 8 a 10 pessoas em cada preparo.",
      "Do clássico ao autoral: vaca atolada, hambúrguer com piscina de cheddar, massa com brie e bacon, risoto de camarão, arroz com coraçãozinho, entrevero, paella de frutos do mar, arroz carreteiro, penne ao molho de queijo com picanha e picanha ao molho de queijo com abacaxi.",
      "Cada receita traz ingredientes, modo de preparo passo a passo e a Dica do Chef do Disco para acertar o ponto — do fogo à finalização.",
      "Formato digital em PDF, com entrega automática por e-mail após a confirmação do pagamento.",
    ],
    material: "E-book em PDF, formato digital",
    dimensions: "10 receitas · Rendimento de 8–10 pessoas por receita",
    care: [
      "Acesso imediato após a confirmação do pagamento.",
      "Link de download válido por 30 dias, enviado por e-mail.",
      "Leitura em qualquer dispositivo compatível com PDF.",
    ],
    gradient: g.ember,
    gallery: [g.ember, g.gold],
    image: "/images/ebook-disco-de-arado-capa.svg",
    rating: 5,
    reviewCount: 4,
    reviews: [
      {
        author: "Marcelo A.",
        rating: 5,
        comment: "Comprei e fiz a vaca atolada no fim de semana, ficou idêntica à do Chef. As dicas de ponto do fogo fazem toda diferença.",
      },
      {
        author: "Fernanda R.",
        rating: 5,
        comment: "Receitas bem explicadas, fáceis de seguir mesmo pra quem não tem tanta prática com disco de arado. O risoto de camarão foi sucesso aqui em casa.",
      },
      {
        author: "Diego S.",
        rating: 4,
        comment: "Muito bom material, PDF chegou rapidinho por e-mail. Só queria que tivesse mais fotos do passo a passo, mas as receitas valem muito a pena.",
      },
      {
        author: "Camila T.",
        rating: 5,
        comment: "Reuni a família no domingo pra fazer o arroz carreteiro e a picanha com molho de queijo e abacaxi. Todo mundo elogiou, já virou tradição aqui.",
      },
    ],
    featured: true,
  },
  {
    slug: "bone-chef-do-disco-aba-curva",
    name: "Boné Chef do Disco Aba Curva",
    category: "bones",
    priceCents: 9990,
    isDigital: false,
    shortDescription: "Boné em sarja premium com logo bordado e fecho de metal ajustável.",
    description: [
      "O acessório definitivo para quem representa a marca fora da cozinha. Confeccionado em sarja de algodão premium, com o emblema Chef do Disco bordado em alta definição na frente.",
      "Aba curva estruturada e fecho traseiro de metal ajustável, garantindo caimento perfeito para diferentes tamanhos de cabeça.",
      "Peça de uso diário, tão resistente quanto confortável — pensada para acompanhar do fogão à rua.",
    ],
    material: "Sarja de algodão premium, bordado em alta definição, fecho de metal",
    dimensions: "Tamanho único ajustável (54cm–62cm)",
    care: [
      "Lavar à mão com água fria; não usar alvejante.",
      "Não torcer — secar à sombra em superfície plana.",
      "Evitar contato direto com fontes de calor para preservar o bordado.",
    ],
    gradient: g.charcoal,
    gallery: [g.charcoal, g.ember, g.gold],
    image: "/images/bone-chef-do-disco.jpg",
    rating: 4.8,
    reviewCount: 15,
    reviews: [
      { author: "Gabriel S.", rating: 5, comment: "Acabamento impecável, o bordado é lindo de perto." },
      { author: "Patrícia L.", rating: 4, comment: "Boné confortável, só achei o ajuste um pouco justo no começo." },
    ],
    featured: true,
  },
  {
    slug: "faca-artesanal-cabo-madeira",
    name: "Faca Artesanal Cabo de Madeira",
    category: "facas",
    priceCents: 22990,
    isDigital: false,
    shortDescription: "Lâmina forjada à mão, cabo em madeira clara e bainha de couro com acabamento em rebites de latão.",
    description: [
      "Uma faca de trabalho com alma artesanal: lâmina forjada e temperada à mão, com acabamento rústico que preserva as marcas do martelo — prova de que cada peça é única.",
      "O cabo em madeira clara maciça foi torneado para encaixar perfeitamente na mão, garantindo controle e conforto em cortes longos.",
      "Acompanha bainha em couro legítimo costurada à mão, com fecho em rebites de latão, protegendo o fio da lâmina e permitindo transporte seguro.",
    ],
    material: "Aço carbono forjado, cabo em madeira maciça, bainha em couro legítimo",
    dimensions: "Lâmina 18cm | Comprimento total 30cm",
    care: [
      "Lave à mão com água morna e sabão neutro imediatamente após o uso.",
      "Seque completamente antes de guardar na bainha.",
      "Aplique óleo mineral no cabo de madeira periodicamente.",
      "Não leve à lava-louças.",
    ],
    gradient: g.gold,
    gallery: [g.gold, g.charcoal],
    image: "/images/faca-artesanal-cabo-madeira-1.jpg",
    images: ["/images/faca-artesanal-cabo-madeira-1.jpg", "/images/faca-artesanal-cabo-madeira-2.jpg"],
    rating: 5,
    reviewCount: 6,
    reviews: [
      { author: "Henrique D.", rating: 5, comment: "Faca linda, acabamento artesanal impecável e corta muito bem." },
    ],
    featured: true,
  },
  {
    slug: "copo-termico-chef-do-disco",
    name: "Copo Térmico Chef do Disco",
    category: "copos",
    priceCents: 7990,
    isDigital: false,
    shortDescription: "Copo térmico em aço inox com gravação a laser do emblema Chef do Disco e tampa antivazamento.",
    description: [
      "Mantenha sua bebida na temperatura ideal com o copo térmico oficial Chef do Disco. Parede dupla em aço inoxidável garante isolamento térmico superior, mantendo bebidas geladas ou quentes por horas.",
      "O emblema da marca é gravado a laser — não descasca, não desbota e resiste ao uso diário intenso.",
      "Tampa com trava antivazamento e abertura para canudo, ideal para levar no evento, na cozinha ou no dia a dia.",
    ],
    material: "Aço inoxidável parede dupla, tampa em polipropileno com gravação a laser",
    dimensions: "Capacidade 590ml | Altura 18cm",
    care: [
      "Lavar à mão com água e sabão neutro.",
      "Não recomendado para lava-louças ou micro-ondas.",
      "Secar completamente antes de guardar com a tampa fechada.",
    ],
    gradient: g.stone,
    gallery: [g.stone, g.charcoal],
    image: "/images/copo-termico-chef-do-disco-1.jpg",
    images: ["/images/copo-termico-chef-do-disco-1.jpg", "/images/copo-termico-chef-do-disco-2.jpg"],
    rating: 4.9,
    reviewCount: 9,
    reviews: [
      { author: "Renato F.", rating: 5, comment: "Mantém a bebida gelada o dia todo, acabamento muito bom." },
    ],
    featured: true,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((p) => p.category === category);
}
