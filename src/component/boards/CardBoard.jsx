import ImageComposant from "../cards/imgComposants";
import { cardImage } from "../services/imageCardService";

function CardBoard() {
  return (
    <section>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {cardImage.map((card, index) => (
          <ImageComposant
            key={index}
            nameCard={card.nameCard} // ou "back" si tu veux que toutes soient face cachée
            flipped={false} // ou true pour la face visible
          />
        ))}
      </div>
    </section>
  );
}

export default CardBoard;
