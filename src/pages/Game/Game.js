import "./Game.css"

import {useState} from "react"

import { word } from "../../functions/objects";
import { isSymbol } from "../../functions/isSymbol";

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




function Timer(){}

function Game({teams, settings, whosTurn, setWhosTurn}) {
    // console.log(teams, settings)

    const [words, setWords] = useState([])

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

    console.log(currentTeam.score)

    return (
        <div>

            <h1>{currentTeam.teamName} sin tur</h1>

            <ListWords words={words} setWords={setWords} />
            <WordsForm setWords={setWords} />

            <button onClick={handleMove}>Spill</button>

            <p>Protest</p>
            <form>
                <button>Protest</button>
            </form>

    velg hvem som tar protest
      protestknapp

resultatliste
      </div>
    );
}
  
export default Game;  