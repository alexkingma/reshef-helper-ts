const imageMap = (() => {
  const modules = import.meta.glob("../assets/images/*.png", { eager: true });
  const map: { [key: string]: string } = {};

  Object.entries(modules).forEach(([path, mod]) => {
    const fileName = path.split("/").pop()!;
    const key = fileName.replace("-ROD-EU-VG.png", "");
    map[key] = (mod as { default: string }).default;
  });
  return map;
})();

export const getImage = (cardName: CardName) => {
  // filenames have no spaces or special characters
  const condensedKey = cardName.replace(/(\s|-|#|\.|'|,|&|\"|\(|\))/g, "");
  if (!imageMap[condensedKey]) {
    throw new Error(`Could not find image with key: ${cardName}`);
  }
  return imageMap[condensedKey];
};
