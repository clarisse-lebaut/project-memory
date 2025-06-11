import illustrations from "@illustration";

function ImageComposant({ nameCard }) {
  const imageSrc = illustrations[nameCard];
  if (!imageSrc) return <p>Image non trouvée</p>;

  return (
    <>
      <img src={imageSrc} alt={`illustration du ${nameCard}`} />
    </>
  );
}

export default ImageComposant;
