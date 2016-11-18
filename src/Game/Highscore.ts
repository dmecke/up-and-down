class Highscore
{
    private ranks;

    constructor(ranks)
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
            this.getRank(100),
            this.getRank(100),
            this.getRank(100),
            this.getRank(100),
            this.getRank(100),
            this.getRank(100),
            this.getRank(100),
            this.getRank(100),
            this.getRank(100),
            this.getRank(100)
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

        this.ranks.splice(index, 0, Highscore.getRank(score));
        this.ranks.pop();
    }

    private getInsertIndex(score: number): number
    {
        let index = 10;
        while (index > 0 && score < this.ranks[index - 1].score) {
            index--;
        }

        return index;
    }

    public all()
    {
        return this.ranks;
    }

    public save(): void
    {
        for (let i = 0; i < 10; i++) {
            localStorage.setItem('rank' + (i + 1), JSON.stringify(this.ranks[i]));
        }
    }

    private static getRank(score): any
    {
        var date = new Date();
        var dateString = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();

        return { score: score, date: dateString };
    }
}

export default Highscore
