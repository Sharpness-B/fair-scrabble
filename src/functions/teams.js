import { v4 as uuid } from 'uuid';

class team {
    constructor(teamName) {
        this.id = uuid()
        this.teamName = teamName
        this.score = 0
    }
}

export {team}