class GoLCell {
    isAlive: boolean;
    willBeAlive: boolean;
    neighbours: GoLCell[];

    constructor(isAlive: boolean = false) {
        this.neighbours = [];
        this.isAlive = isAlive;
    }

    withNeighbour(n: GoLCell): this {
        this.neighbours.push(n);
        return this;
    }

    prepare(): this {
        const aliveNeighbours: number = this.neighbours.reduce((acc, curr) => curr.isAlive ? acc + 1 : acc, 0);

        switch (aliveNeighbours) {
            case 2:
                this.willBeAlive = this.isAlive;
                break;
            case 3:
                this.willBeAlive = true;
                break;
            default:
                this.willBeAlive = false;
                break;
        }

        return this;
    }

    iterate(): this {
        this.isAlive = this.willBeAlive;
        return this;
    }
}

export default GoLCell;