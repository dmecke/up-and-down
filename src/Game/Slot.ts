import Card from "./Card";
import Hand from "./Hand";

abstract class Slot
{
    public cards: Array<Card> = [];

    public drop(card: Card)
    {
        this.cards.push(card);
    }

    public canBeServedBy(hand: Hand): boolean
    {
        for (let i = 1; i <= hand.numberOfCards(); i++) {
            if (this.isValid(hand.cards[i - 1])) {
                return true;
            }
        }

        return false;
    }

    public abstract isValid(card: Card);
}

export default Slot
