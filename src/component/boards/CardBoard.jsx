import { useState } from "react";
import ImageComposant from "../cards/imgComposants";
import { cardImage as initialCardImage } from "../services/imageCardService";
import Button from "../global/Button";

const numberDuplication = 2;
const duplicateCard = (cards, count = numberDuplication) =>
  cards.flatMap((card) => Array.from({ length: count }, () => ({ ...card, flipped: true })));

function CardBoard() {
  const [cards, setCards] = useState(duplicateCard(initialCardImage, numberDuplication));
  const [disable, setDisable] = useState(false);

  const flipCard = (index) => {
    if (disable) return;
    setCards((prevCards) =>
      prevCards.map((card, i) => (i === index ? { ...card, flipped: !card.flipped } : card))
    );
  };

  const schuffleCards = () => {
    const schuffleCards = [...cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), flipped: false }));

    setCards(schuffleCards);
    setDisable(false);
  };

  const seeCards = () => {
    setCards((prevCards) => prevCards.map((card) => ({ ...card, flipped: true })));

    setDisable(true);

    setTimeout(() => {
      setCards((prevCards) => prevCards.map((card) => ({ ...card, flipped: false })));
      setDisable(false);
    }, 1000);
  };

  const cancelGame = () => {
    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        flipped: true,
      }))
    );
    setDisable(true);
  };

  const rebootGameSession = () => {
    setCards(duplicateCard(initialCardImage, numberDuplication));
  };

  return (
    <section>
      <Button text="Commencer une nouvelle partie" onClick={schuffleCards} />
      <Button text="Stoper tout, j'en ai marre." onClick={cancelGame} />
      <Button text="Un coup de main ?" onClick={seeCards} />
      <Button text="Reboot la session de jeu" onClick={rebootGameSession} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {cards.map((card, index) => (
          <div key={index}>
            <ImageComposant
              nameCard={card.nameCard}
              flipped={card.flipped}
              onClick={() => flipCard(index)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardBoard;
