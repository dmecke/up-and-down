import Hand from "./Hand";
import Slot from "./Slot";
import SlotUp from "./SlotUp";
import SlotDown from "./SlotDown";
import Stack from "./Stack";

class Game
{
    private stack: Stack = new Stack();
    private hand: Hand = new Hand();
    private slotOneUp: SlotUp = new SlotUp();
    private slotTwoUp: SlotUp = new SlotUp();
    private slotOneDown: SlotDown = new SlotDown();
    private slotTwoDown: SlotDown = new SlotDown();
    
    constructor()
    {
        this.hand.take(this.stack.draw(7));
    }

    public score(): number
    {
        return this.stack.numberOfCards() + this.hand.numberOfCards();
    }

    public isGameOver(): boolean
    {
        if (this.slotOneUp.canBeServedBy(this.hand)) {
            return false;
        }

        if (this.slotTwoUp.canBeServedBy(this.hand)) {
            return false;
        }

        if (this.slotOneDown.canBeServedBy(this.hand)) {
            return false;
        }

        if (this.slotTwoDown.canBeServedBy(this.hand)) {
            return false;
        }

        return true;
    }

    public slot(index: number): Slot
    {
        switch (index) {
            case 0:
                return this.slotOneUp;

            case 1:
                return this.slotTwoUp;

            case 2:
                return this.slotOneDown;

            case 3:
                return this.slotTwoDown;
        }
    }
}

export default Game;