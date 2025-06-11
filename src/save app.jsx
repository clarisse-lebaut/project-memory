import { useEffect, useState } from "react";

import SingleCard from "./component/Card";
import Title from "./component/title";
import ResetButton from "./component/resetButton";

import "./App.css";

const cardImage = [
  { src: "./src/assets/doctor-1.png", matched: false },
  { src: "./src/assets/doctor-2.png", matched: false },
  { src: "./src/assets/doctor-3.png", matched: false },
  { src: "./src/assets/doctor-4.png", matched: false },
  { src: "./src/assets/doctor-5.png", matched: false },
  { src: "./src/assets/doctor-6.png", matched: false },
  { src: "./src/assets/doctor-7.png", matched: false },
  { src: "./src/assets/doctor-8.png", matched: false },
  { src: "./src/assets/doctor-9.png", matched: false },
  { src: "./src/assets/doctor-10.png", matched: false },
  { src: "./src/assets/doctor-11.png", matched: false },
  { src: "./src/assets/doctor-12.png", matched: false },
  { src: "./src/assets/doctor-13.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTunrs] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [find, setFind] = useState(0);

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCadrds = [...cardImage, ...cardImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCadrds);
    setTunrs(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setFind((prevFind) => prevFind + 1);
      }
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choice & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTunrs((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start a new game automagically
  useEffect(() => {
    shuffleCards();
  }, []);

  // //end of the game
  // useEffect(() => {
  //   if (find === 13) {
  //     console.log("fini !");
  //   }
  // });

  //game over
  const gameEnd = () => {
    if (find === 13) {
      return "Tu as trouvé toutes les pairs !";
    } else {
      return "";
    }
  };

  return (
    <div className="App">
      <div className="mainBoard">
        <div>
          <Title text="Memory Game" />
          <ResetButton onClick={shuffleCards} text="Nouvelle partie" />
        </div>
        <div className="infoGame">
          <p className="info1">
            Tentative: <br /> {turns}
          </p>
          <p className="info2">
            Paires trouvée : <br /> {find}/13
          </p>
          <p className="info3">{gameEnd()}</p>
        </div>
      </div>

      <div className="boardGame">
        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              className="cards-style"
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
