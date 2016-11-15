import Card from "./Card";
import Slot from "./Slot";

class SlotUp extends Slot
{
    public isValid(card: Card): boolean
    {
        if (this.cards.length == 0) {
            return true;
        }

        let lastCard = this.cards[this.cards.length - 1];

        if (card.value == lastCard.value - 10) {
            return true;
        }

        return card.value > lastCard.value;
    }
}

export default SlotUp