import './App.css';

import Homepage from './pages/Homepage/Homepage';
import Game from './pages/Game/Game';
import Results from './pages/Results/Results';

import {useState, useEffect} from 'react'

import {cookie} from './functions/cookie';
import { team } from './functions/objects';

function App() {
  const [gameState, setGameState] = useState("initializing")

  const [teams, setTeams] = useState([])
  const [settings, setSettings] = useState({})
  const [whosTurn, setWhosTurn] = useState(0)

  // read cookie on render
  useEffect(() => {
    const data = JSON.parse( 
      cookie.readCookie("fair-scrabble") 
    )

    console.log(data)
    
    setGameState( data.gameState )
    setTeams    ( data.teams.map(obj => new team(obj.teamName, obj.id, obj.score)) )
    setSettings ( data.settings  )
    setWhosTurn ( data.whosTurn  )
  }, [])

  // update cookie
  useEffect(() => {
    if (gameState==="initializing" && teams.length===0) return

    cookie.createCookie(
      "fair-scrabble", 
      JSON.stringify({
        gameState: gameState,
        teams:     teams,
        settings:  settings,
        whosTurn:  whosTurn
      }),
      60*60*4
    )
  }, [gameState, teams, settings, whosTurn])

  return (
    <div className="App">
      <header className="App-header">
        { 
          gameState === "initializing" ?
            <Homepage teams={teams} setTeams={setTeams} settings={settings} setSettings={setSettings} setGameState={setGameState} />
          
          : gameState === "game" ?
            <Game teams={teams} settings={settings} whosTurn={whosTurn} setWhosTurn={setWhosTurn} setGameState={setGameState} />
          
          : gameState === "results" &&
            <Results teams={teams} setGameState={setGameState} setTeams={setTeams} />
        }
      </header>
    </div>
  );
}

export default App;
