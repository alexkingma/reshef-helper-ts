interface Duellist {
  id: number;
  name: string;
  deck: Deck;
  lp: number;
  location: string;
  payout: number;
  field: string;
  ante: CardName[];
}

type Deck = {
  [card in CardName]?: number;
};
