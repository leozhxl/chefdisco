export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ricardo Nogueira",
    role: "Anfitrião de eventos corporativos",
    quote:
      "O Chef do Disco transformou nosso evento de fim de ano em uma experiência memorável. Técnica, apresentação e sabor em outro nível.",
  },
  {
    name: "Beatriz Amaral",
    role: "Noiva — Casamento 2025",
    quote:
      "Contratamos para o nosso casamento e até hoje os convidados comentam sobre a estação de carnes. Impecável do início ao fim.",
  },
  {
    name: "Felipe Zambon",
    role: "Colecionador de facas artesanais",
    quote:
      "A Lâmina Negra é a melhor faca que já tive. Equilíbrio perfeito e um acabamento que impressiona quem vê de perto.",
  },
];

export const seals = [
  "Curadoria Artesanal",
  "Aço de Alta Performance",
  "Produção em Pequena Escala",
  "Satisfação Garantida",
];
