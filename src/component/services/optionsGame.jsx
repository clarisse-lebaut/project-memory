export const numberDuplication = 10;

export const duplicateCard = (cards, count = numberDuplication) =>
  cards.flatMap((card) => Array.from({ length: count }, () => ({ ...card, flipped: true })));
