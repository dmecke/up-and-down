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

    public clear(index: number)
    {
        this.cards[index] = new Card(0);
    }

    public numberOfCards(): number
    {
        var numberOfCards = 0;
        for (var i = 0; i < this.cards.length; i++) {
            if (!this.cards[i].isFake()) {
                numberOfCards++;
            }
        }

        return numberOfCards;
    }
}

export default Hand
