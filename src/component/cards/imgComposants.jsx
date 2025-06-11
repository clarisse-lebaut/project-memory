import illustrations from "@illustration";

function ImageComposant({ nameCard, flipped, onClick }) {
  const imageSrc = flipped ? illustrations[nameCard] : illustrations["back"];
  if (!imageSrc) return <p>Image non trouvée</p>;

  return (
    <>
      <img src={imageSrc} alt={`Carte ${nameCard}`} onClick={onClick} />
    </>
  );
}

export default ImageComposant;
