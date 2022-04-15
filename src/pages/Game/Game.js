import "./Game.css"

import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import {useState} from "react"

import { word } from "../../functions/objects";
import { isSymbol } from "../../functions/isSymbol";
import { checkUib } from "../../functions/checkDict";



function ListWords({ words, setWords }) {
    const removeWord = (e) => {
        const id = e.currentTarget.id
        const filtered = words.filter(wordobj => wordobj.id !== id)

        setWords(filtered)
    }

    return (
        <ul>
            <p>Registrer ord</p>
            {words.map((wordobj, i) =>
                <li onClick={removeWord} key={i} id={wordobj.id}>{wordobj.word} - {wordobj.score} poeng</li>
            )}
        </ul>
    )
}



function WordsForm({ setWords }) {

    const [userInput, setUserInput] = useState('');
    const [userInputNumber, setUserInputNumber] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }
    const handleChangeNumber = (e) => {
        setUserInputNumber(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userInput || !userInputNumber) return

        setWords(currentteams =>
            [...currentteams, new word(userInput, parseInt( userInputNumber ))]
        )

        setUserInput("");
    }

    return (
        <form onSubmit={handleSubmit} className={"teams-form"}>
            <input value={userInput} type="text" onChange={handleChange} placeholder="ord" />
            <input className="input-poeng" value={userInputNumber} type="number" min="0" onChange={handleChangeNumber} placeholder="poeng" />
            <button>Legg til</button>
        </form>
    )
}



function Timer({time, currentTeamID}) {
    return (
        <div className="container-timer">
            { time > 0 &&
            <CountdownCircleTimer
                key={currentTeamID}
                isPlaying
                duration={time * 60}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[time*60, time*60*2/3, time*60*1/3, 0]}
            >
                {({ remainingTime }) => {
                    const minutes = Math.floor(remainingTime / 60)
                    const seconds = remainingTime % 60
                
                    return remainingTime ? `${minutes}:${seconds}` : "Tiden er ute!"
                }}
            </CountdownCircleTimer>
            }
        </div>
    )
}

function Game({teams, settings, whosTurn, setWhosTurn}) {
    // console.log(teams, settings)

    const [words, setWords] = useState([])

    const [protestingTeamID, setProtestingTeamID] = useState("")

    const currentTeam = teams[whosTurn]


    const calculateScore = async (word, score) => {
        if (!settings.halfScoreForShortTerms) {
            return score
        }

        if (await isSymbol(word)) {
            return score/2
        }
        
        return score
    }

    const updateScore = () => {
        const pointsArr = words.map(wordobj => calculateScore(wordobj.word, wordobj.score) )
        
        Promise.all(pointsArr).then((values) => {
            currentTeam.addToScore(values.reduce( (a, b) => a + b, 0 ))
        });
    }
    const clearWords = () => {
        setWords([])
    }
    const nextPlayer = () => {
        setWhosTurn(current => (current+1) % teams.length)
    }



    const handleMove = async () => {
        updateScore()
        clearWords()
        nextPlayer()
    }

    const handleProtest = async (e) => {
        e.preventDefault();

        const validationArr = words.map(wordobj => checkUib(wordobj.word) )

        Promise.all(validationArr).then((values) => {
            const isValidMove = values.every(element => element.isWord === true);

            console.log(values)

            if (isValidMove) {
                const protestingTeam = teams.find(teamobj => teamobj.id === protestingTeamID)
                protestingTeam.addToScore( -10 )

                handleMove()
            }

            else {
                clearWords()
                nextPlayer()
            }
        });
    }

    console.log(currentTeam.score)

    return (
        <div>
            <Timer time={settings.time} currentTeamID={currentTeam.id} />

            <h1>{currentTeam.teamName} sin tur</h1>

            <ListWords words={words} setWords={setWords} />
            <WordsForm setWords={setWords} />

            <button onClick={handleMove}>Spill</button>

            <p>Protest</p>

            <form onSubmit={handleProtest}>
                {teams.filter(teamobj => teamobj.id !== currentTeam.id)
                    .map(teamobj => 
                        <label key={teamobj.id} className="container" onClick={()=>setProtestingTeamID(teamobj.id)}> {teamobj.teamName}
                            <input type="radio" name="radio" />
                            <span className="checkmark"></span>
                        </label>
                    )
                }
                <button>Protest</button>
            </form>

    {/* fjern markering

resultatliste */}
      </div>
    );
}
  
export default Game;  