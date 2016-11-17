class HighscoreRank
{
    public score: number;
    public date: Date;

    constructor(score: number)
    {
        this.score = score;
        this.date = new Date();
    }
}

export default HighscoreRank