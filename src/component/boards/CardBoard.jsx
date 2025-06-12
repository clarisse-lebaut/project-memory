import { useState } from "react";
import { cardImage as initialCardImage } from "../services/imageCardService";
import { duplicateCard, numberDuplication } from "../services/optionsGame";
import ImageComposant from "../cards/imgComposants";
import Button from "../global/Button";

function CardBoard() {
  const [cards, setCards] = useState(duplicateCard(initialCardImage, numberDuplication));
  const [selected, setSelected] = useState([]);
  const [disable, setDisable] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const flipCard = (index) => {
    if (disable) return;
    setCards((prevCards) =>
      prevCards.map((card, i) => (i === index ? { ...card, flipped: !card.flipped } : card))
    );
  };

  const schuffleCards = () => {
    const shuffled = [...cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), flipped: false }));

    setCards(shuffled);
    setDisable(false);
    setGameStarted(true);
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
    setDisable(true);
    setCards(duplicateCard(initialCardImage, numberDuplication));
    setGameStarted(false);
  };

  const selectCard = (card) => {
    if (disable) return;

    console.log(card.nameCard);

    setSelected((prevSelectedCards) => {
      const newSelectedCards = [...prevSelectedCards, card];

      if (newSelectedCards.length === numberDuplication) {
        const selectedCard = newSelectedCards;
        if (selectedCard[0].nameCard === selectedCard[1].nameCard) {
          setCards((prevSelectedCards) =>
            prevSelectedCards.map((card) =>
              card.nameCard === selectedCard[0].nameCard
                ? { ...card, flipped: true, matched: true }
                : card
            )
          );
        } else {
          setDisable(true);

          setTimeout(() => {
            setCards((prevCards) =>
              prevCards.map((card) => (card.matched ? card : { ...card, flipped: false }))
            );
            setDisable(false);
          }, 1000);
        }

        return [];
      }
      return newSelectedCards;
    });
  };

  const handleClick = (index, card) => {
    if (card.matched) return;
    flipCard(index);
    selectCard(card);
  };

  return (
    <section>
      {!gameStarted ? (
        <Button
          text={!gameStarted ? "Commencer la partie" : "Recommencer la partie"}
          onClick={schuffleCards}
        />
      ) : (
        <>
          <Button text="Recommencer la partie." onClick={schuffleCards} />
          <Button text="Arrêter la partie." onClick={rebootGameSession} />
          <Button text="Un coup de main ?" onClick={seeCards} />
          <Button text="J'arrête, je veux voir la solution." onClick={cancelGame} />
        </>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {cards.map((card, index) => (
          <div key={index}>
            <ImageComposant
              nameCard={card.nameCard}
              flipped={card.flipped}
              onClick={() => handleClick(index, card)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardBoard;
