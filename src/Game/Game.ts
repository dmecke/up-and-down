import Card from "./Card";
import Hand from "./Hand";
import Highscore from "./Highscore";
import Slot from "./Slot";
import SlotUp from "./SlotUp";
import SlotDown from "./SlotDown";
import Stack from "./Stack";

class Game
{
    private stack: Stack;
    private hand: Hand;
    private slotOneUp: SlotUp;
    private slotTwoUp: SlotUp;
    private slotOneDown: SlotDown;
    private slotTwoDown: SlotDown;
    
    constructor()
    {
        this.restart();
    }

    public restart()
    {
        this.stack = new Stack();
        this.hand = new Hand();
        this.slotOneUp = new SlotUp();
        this.slotTwoUp = new SlotUp();
        this.slotOneDown = new SlotDown();
        this.slotTwoDown = new SlotDown();
        this.hand.take(this.stack.draw(7));
    }

    public score(): number
    {
        return this.stack.numberOfCards() + this.hand.numberOfCards();
    }

    public isRunning(): boolean
    {
        return this.score() != 100;
    }

    public dropCard(handIndex: number, slot: number, card: Card): void
    {
        this.slot(slot).drop(card);
        this.slot(slot).lastCard().rerotate();
        var newCard = this.stack.drawOne();
        if (newCard) {
            newCard.rerotate();
            this.hand.takeOne(newCard, handIndex);
        } else {
            this.hand.clear(handIndex);
        }

        if (this.isGameOver()) {
            this.saveHighscore();
        }
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

    public isWon(): boolean
    {
        return this.hand.numberOfCards() == 0;
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

    public highscore(): Highscore
    {
        return Highscore.create();
    }

    private saveHighscore(): void
    {
        var highscore = Highscore.create();
        highscore.add(this.score());
        highscore.save();
    }
}

export default Game;
