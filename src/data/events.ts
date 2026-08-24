export interface EventPackage {
  name: string;
  description: string;
  includes: string[];
  priceFrom: string;
}

export const eventPackages: EventPackage[] = [
  {
    name: "Chef Privativo",
    description:
      "Uma experiência íntima com o Chef do Disco na sua casa ou espaço de eventos, para grupos de até 20 pessoas.",
    includes: [
      "Chef e equipe de apoio no local",
      "Cardápio personalizado de cortes nobres",
      "Estação de disco de arado montada ao vivo",
      "Harmonização sugerida com vinhos e drinks",
    ],
    priceFrom: "a partir de R$ 3.500",
  },
  {
    name: "Churrasco Corporativo",
    description:
      "Eventos empresariais que unem confraternização e alto padrão gastronômico, com estrutura completa para grupos maiores.",
    includes: [
      "Estrutura completa de cozinha ao vivo",
      "Cardápio para 30 a 200 convidados",
      "Equipe de garçons e atendimento",
      "Opções vegetarianas e sem glúten",
    ],
    priceFrom: "a partir de R$ 8.900",
  },
  {
    name: "Casamentos & Celebrações",
    description:
      "Uma estação de carnes de assinatura para casamentos, aniversários e celebrações que exigem sofisticação.",
    includes: [
      "Estação decorada com identidade Chef do Disco",
      "Cardápio degustação personalizado",
      "Prova de sabores antes do evento",
      "Equipe dedicada durante toda a celebração",
    ],
    priceFrom: "a partir de R$ 12.000",
  },
];

export interface PastEvent {
  title: string;
  location: string;
  guests: string;
  gradient: string;
}

export const pastEvents: PastEvent[] = [
  { title: "Casamento Beatriz & Lucas", location: "Campos do Jordão, SP", guests: "180 convidados", gradient: "from-[#3a1408] via-[#7a1f1f] to-[#c1440e]" },
  { title: "Confraternização Grupo Vértice", location: "São Paulo, SP", guests: "220 convidados", gradient: "from-[#1a1a1a] via-[#5a4720] to-[#c9a24b]" },
  { title: "Jantar Privativo — Família Nogueira", location: "Alto de Pinheiros, SP", guests: "14 convidados", gradient: "from-[#0d0d0d] via-[#262220] to-[#3a1408]" },
  { title: "Lançamento de Marca — Vinícola Serra Alta", location: "Bento Gonçalves, RS", guests: "90 convidados", gradient: "from-[#1a1a1a] via-[#4a1414] to-[#7a1f1f]" },
  { title: "Aniversário 50 anos — Sr. Aparício", location: "Ribeirão Preto, SP", guests: "60 convidados", gradient: "from-[#3a3226] via-[#5a4a33] to-[#c9a24b]" },
  { title: "Retiro Corporativo TechNova", location: "Búzios, RJ", guests: "45 convidados", gradient: "from-[#3a1408] via-[#7a1f1f] to-[#c1440e]" },
];
