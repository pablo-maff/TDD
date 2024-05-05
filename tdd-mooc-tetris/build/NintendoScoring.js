export class NintendoScoring {
    #score = 0;
    #ScorePerLinesCleared = Object.freeze({
        1: 40,
        2: 100,
        3: 300,
        4: 1200,
    });
    update(data) {
        this.#score += this.#ScorePerLinesCleared[data.clearedLines] * (data.level + 1);
    }
    get value() {
        return this.#score;
    }
}
