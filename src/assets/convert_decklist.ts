import txt from "./raw_decklists.txt";

const separator =
  "===============================================================================";

const segments = txt.split(separator).filter((x) => x);
const names = segments
  .filter((x, i) => i % 2 === 0)
  .map((name) =>
    name
      .split("\n")
      .join("")
      .split("\t")
      .join("")
      .replace(/[0-9\.]+ - /, "")
  );
const decks = segments.filter((x, i) => i % 2 === 1);
const map: { [name: string]: { [card: string]: number } } = {};
decks.map((str, i) => {
  const multidecks = str.split("Deck |");
  multidecks.map((multideck, deckIdx) => {
    const deck: { [card: string]: number } = {};
    multideck.split("\n").map((line) => {
      if (line.match(/^[1-3]\t/)) {
        const [quant, card] = line.split("\t");
        deck[card] = parseInt(quant, 10);
      }
    });
    if (Object.keys(deck).length) {
      const name = names[i] + (multidecks.length > 1 ? " " + deckIdx : "");
      map[name] = deck;
    }
  });
  return multidecks;
});

console.log(map);
