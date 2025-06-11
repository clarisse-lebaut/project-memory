import illustrations from "@illustration";

const nameCard = [
  "doctor-1",
  "doctor-2",
  "doctor-3",
  "doctor-4",
  "doctor-5",
  "doctor-6",
  "doctor-7",
  "doctor-8",
  "doctor-9",
  "doctor-10",
  "doctor-12",
  "doctor-13",
];

const imageSrc = illustrations[nameCard];

export const cardImage = nameCard.flatMap((name) => [
  { nameCard: name, src: illustrations[name], matched: false },
]);
