import "./Homepage.css"
import logo from  "./../../R.png"
import { v4 as uuid } from 'uuid';

import {useEffect, useState} from "react"

class team {
    constructor (teamName) {
        this.id = uuid()
        this.teamName = teamName
        this.score = 0
    }
}



function ListTeams({teams, setTeams}) {
    const removeTeam = (e) => {
        const id = e.currentTarget.id
        const filtered = teams.filter(teamobj => teamobj.id !== id)

        setTeams(filtered)
    }

    return (
        <ul>
            {teams.map((teamobj, i) =>
                <li onClick={removeTeam} key={i} id={teamobj.id}>{teamobj.teamName}</li>
            )}
        </ul>
    )
}



function TeamsForm({setTeams}) {

    const [userInput, setUserInput] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userInput) return

        setTeams(currentteams => 
            [ ...currentteams, new team(userInput) ]
        )
        
        setUserInput("");
    }

    return (
        <form onSubmit={handleSubmit} className={"teams-form"}>
            <input value={userInput} type="text" onChange={handleChange} placeholder="lagnavn"/>
            <button>Legg til</button>
        </form>
    )
}



function SettingsForm({settigns, setSettings, setGameState}) {
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(e)
        // setSettings({})
        // setGameState("game")
    }

    return (
        <form onSubmit={handleSubmit} className={"settings-form"}>
            <input type="radio" name="dict" defaultChecked/> UiB
            <input type="radio" name="dict" /> NAOB

            <input type="number" name="time" min="0" defaultValue="0" /> Klokke

            <input type="checkbox" name="shortTerms" defaultChecked /> Halve poeng for forkortelser

            <button>Start</button>
        </form>
    )
}



function Homepage({teams, setTeams, settings, setSettings, setGameState}) {
    useEffect( () =>
        setTeams([new team("Eira og Vårin"), new team("Bendik og Jørgen")])
    , [])

    console.log(teams)

    return (
      <div className="homepage">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Rettferdig Scrabble</h1>
        <p>Regsitrer lag, velg regler og ordbok.</p>

        <ListTeams teams={teams} setTeams={setTeams} />
        <TeamsForm setTeams={setTeams} />
        <SettingsForm settigns={settings} setSettings={setSettings} setGameState={setGameState} />
      </div>
    );
}
  
export default Homepage;  