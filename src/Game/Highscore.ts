import HighscoreRank from "./HighscoreRank";

class Highscore
{
    private ranks: Array<HighscoreRank>;

    constructor(ranks: Array<HighscoreRank>)
    {
        this.ranks = ranks;
    }

    public static create(): Highscore
    {
        if (localStorage.getItem('rank1')) {
            return Highscore.createFromLocalStorage();
        }

        return Highscore.createFresh();
    }

    private static createFresh(): Highscore
    {
        var ranks = [
            new HighscoreRank(100),
            new HighscoreRank(100),
            new HighscoreRank(100),
            new HighscoreRank(100),
            new HighscoreRank(100),
            new HighscoreRank(100),
            new HighscoreRank(100),
            new HighscoreRank(100),
            new HighscoreRank(100),
            new HighscoreRank(100)
        ];

        return new Highscore(ranks);
    }

    private static createFromLocalStorage(): Highscore
    {
        var ranks = [
            JSON.parse(localStorage.getItem('rank1')),
            JSON.parse(localStorage.getItem('rank2')),
            JSON.parse(localStorage.getItem('rank3')),
            JSON.parse(localStorage.getItem('rank4')),
            JSON.parse(localStorage.getItem('rank5')),
            JSON.parse(localStorage.getItem('rank6')),
            JSON.parse(localStorage.getItem('rank7')),
            JSON.parse(localStorage.getItem('rank8')),
            JSON.parse(localStorage.getItem('rank9')),
            JSON.parse(localStorage.getItem('rank10'))
        ];

        return new Highscore(ranks);
    }

    public add(score: number): void
    {
        let index = this.getInsertIndex(score);
        if (index >= 10) {
            return;
        }

        this.ranks.splice(index, 0, new HighscoreRank(score));
        this.ranks.pop();
    }

    private getInsertIndex(score: number): number
    {
        console.log(this.ranks);
        let index = 10;
        while (index > 0 && score < this.ranks[index - 1].score) {
            console.log(index - 1);
            index--;
        }

        return index;
    }

    public get(rank: number): HighscoreRank
    {
        return this.ranks[rank];
    }

    public save(): void
    {
        for (let i = 0; i < 10; i++) {
            localStorage.setItem('rank' + (i + 1), JSON.stringify(this.ranks[i]));
        }
    }
}

export default Highscore
