import Card from "./Card";

class Hand
{
    public cards: Array<Card> = [];

    public take(cards: Array<Card>)
    {
        let card;
        while (card = cards.pop()) {
            this.cards.push(card);
        }
    }

    public takeOne(card: Card, index: number)
    {
        this.cards[index] = card;
    }

    public numberOfCards(): number
    {
        return this.cards.length;
    }
}

export default Hand