import { useState } from "react";
import ImageComposant from "../cards/imgComposants";
import { cardImage as initialCardImage } from "../services/imageCardService";

function CardBoard() {
  const [cards, setCards] = useState(initialCardImage.map((card) => ({ ...card, flipped: false })));

  const flipCard = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, i) => (i === index ? { ...card, flipped: !card.flipped } : card))
    );
  };

  return (
    <section>
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
