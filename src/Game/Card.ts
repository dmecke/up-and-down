class Card
{
    public value: number;

    public rotation: number;

    constructor(value: number)
    {
        this.value = value;
        this.rerotate();
    }

    public rerotate(): void
    {
        this.rotation = Math.random() * 6 - 3;
    }
}

export default Card