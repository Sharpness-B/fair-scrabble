import "./Homepage.css"
import logo from "./../../R.png"
import { team } from "../../functions/teams";

import { useEffect, useState } from "react"


function ListTeams({ teams, setTeams }) {
    const removeTeam = (e) => {
        const id = e.currentTarget.id
        const filtered = teams.filter(teamobj => teamobj.id !== id)

        setTeams(filtered)
    }

    return (
        <ul>
            <p>Registrer lag</p>
            {teams.map((teamobj, i) =>
                <li onClick={removeTeam} key={i} id={teamobj.id}>{teamobj.teamName}</li>
            )}
        </ul>
    )
}



function TeamsForm({ setTeams }) {

    const [userInput, setUserInput] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userInput) return

        setTeams(currentteams =>
            [...currentteams, new team(userInput)]
        )

        setUserInput("");
    }

    return (
        <form onSubmit={handleSubmit} className={"teams-form"}>
            <input value={userInput} type="text" onChange={handleChange} placeholder="lagnavn" />
            <button>Legg til</button>
        </form>
    )
}



function SettingsForm({ settigns, setSettings, setGameState }) {
    const handleSubmit = (e) => {
        e.preventDefault();

        setSettings({
            dictionary: dictionary,
            time: time,
            halfShortTerms: halfShortTerms
        })

        setGameState("game")
    }

    const [dictionary, setDictionary] = useState("uib")
    const [time, setTime] = useState(0)
    const [halfShortTerms, setHalfShortTerms] = useState(true)



    return (
        <form onSubmit={handleSubmit} className={"settings-form"}>

            <p>Velg ordbok</p>

            <label className="container" onClick={()=>setDictionary("uib")}> UiB
                <input type="radio" defaultChecked name="radio" />
                <span className="checkmark"></span>
            </label>
            <label className="container" onClick={()=>setDictionary("naob")}> Naob
                <input type="radio" name="radio" />
                <span className="checkmark"></span>
            </label>

            <p>Spille med klokke?</p>

            <label className="container">
                <input type="number" min="0" value={time} onChange={(e)=>setTime(e.target.value)} />  Minutter per trekk
            </label>

            <p>Halve poeng for forkortelser?</p>

            <label className="container"> Jørgens regel
                <div onClick={() => setHalfShortTerms(prev=>!prev)}>
                    <input type="checkbox" defaultChecked />
                    <span className="checkmark"></span>
                </div>
            </label>

            <button className="button-start">Start</button>

        </form>
    )
}



function Homepage({ teams, setTeams, settings, setSettings, setGameState }) {
    // useEffect(() =>
    //     setTeams([new team("Eira og Vårin"), new team("Bendik og Jørgen")])
    // , [])

    return (
        <div className="homepage">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Rettferdig Scrabble</h1>

            <ListTeams teams={teams} setTeams={setTeams} />
            <TeamsForm setTeams={setTeams} />
            <SettingsForm settigns={settings} setSettings={setSettings} setGameState={setGameState} />
        </div>
    );
}

export default Homepage;  