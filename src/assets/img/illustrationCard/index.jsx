const illustrations = import.meta.glob("/src/assets/img/illustrationCard/*.png", {
  eager: true,
  import: "default",
});

const imageMap = {};

for (const path in illustrations) {
  const fileName = path.split("/").pop().replace(".png", "");
  imageMap[fileName] = illustrations[path];
}

export default imageMap;
