import { v4 as uuid } from 'uuid';

class team {
    constructor(teamName, id, score) {
        this.teamName = teamName
        this.id = id || uuid()
        this.score = score || 0
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