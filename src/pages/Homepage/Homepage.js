import "./Homepage.css"
// import logo from  "./../../logo.svg"
import logo from  "./../../R.png"

import {useEffect, useState} from "react"

class team {
    constructor (teamName) {
        this.teamName = teamName
        this.score = 0
    }
}


function ListTeams({teams}) {
    return (
        <ul>
            {teams.map((teamobj, i) =>
                <li key={i}>{teamobj.teamName}</li>
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

        setTeams(currentteams => 
            [ ...currentteams, new team(userInput) ]
        )
        
        setUserInput("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={userInput} type="text" onChange={handleChange} placeholder="lagnavn"/>
            <button>Submit</button>
        </form>
    )
}

function Homepage({teams, setTeams}) {
    useEffect( () =>
        setTeams([new team("Eira og Vårin"), new team("Bendik og Jørgen")])
    , [])

    console.log(teams)

    return (
      <div className="homepage">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Rettferdig Scrabble</h1>
        <p>Regsitrer lag, velg regler og ordbok.</p>

        <ListTeams teams={teams} />
        <TeamsForm setTeams={setTeams} />
      </div>
    );
}
  
export default Homepage;  