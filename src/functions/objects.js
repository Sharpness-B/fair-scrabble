import { v4 as uuid } from 'uuid';

class team {
    constructor(teamName) {
        this.id = uuid()
        this.teamName = teamName
        this.score = 0
    }

    addToScore(scoreToAdd) {
        this.score += scoreToAdd
    }
}

class word {
    constructor (word, score) {
        this.id = uuid()
        this.word = word
        this.score = score
    }
}

export {team,word}