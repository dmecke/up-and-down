import Card from "./Card";

class Stack
{
    public cards: Array<Card> = [];

    constructor()
    {
        for (let i = 1; i <= 100; i++) {
            this.cards.push(new Card(i));
        }

        this.shuffleCards();
    }

    public draw(amount: number): Array<Card>
    {
        let cards = [];
        for (let i = 1; i <= amount; i++) {
            cards.push(this.cards.pop());
        }

        return cards;
    }

    public drawOne(): Card
    {
        return this.draw(1)[0];
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

    private shuffleCards(): void
    {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }
}

export default Stack
