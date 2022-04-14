import "./Homepage.css"
// import logo from  "./../../logo.svg"
import logo from  "./../../R.png"

import {useEffect} from "react"

class team {
    constructor (teamName) {
        this.teamName = teamName
        this.score = 0
    }
}


function ListTeams({settings}) {
    return (
        <ul>
            {settings.teams && settings.teams.map((teamobj, i) =>
                <li key={i}>{teamobj.teamName}</li>
            )}
        </ul>
    )
}

function SettingsFrom({setSettings}) {
    return (<></>)
}

function Homepage({settings, setSettings}) {
    useEffect( () =>
        setSettings({teams: [new team("Eira og Vårin"), new team("Bendik og Jørgen")]})
    , [])
    
    return (
      <div className="homepage">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Rettferdig Scrabble</h1>
        <p>Regsitrer lag, velg regler og ordbok.</p>

        <ListTeams settings={settings} />
        <SettingsFrom setSettings={setSettings} />
      </div>

    );
}
  
export default Homepage;  