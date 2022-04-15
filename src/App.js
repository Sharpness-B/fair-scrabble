import './App.css';

import Homepage from './pages/Homepage/Homepage';
import Game from './pages/Game/Game';
import Results from './pages/Results/Results';

import {useState} from 'react'

function App() {
  const [gameState, setGameState] = useState("initializing")

  const [teams, setTeams] = useState([])
  const [settings, setSettings] = useState({})
  const [whosTurn, setWhosTurn] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        { 
          gameState === "initializing" ?
            <Homepage teams={teams} setTeams={setTeams} settings={settings} setSettings={setSettings} setGameState={setGameState} />
          
          : gameState === "game" ?
            <Game teams={teams} settings={settings} whosTurn={whosTurn} setWhosTurn={setWhosTurn} setGameState={setGameState} />
          
          : gameState === "results" ?
            <Results teams={teams} setGameState={setGameState} />
          
          : null
        }
      </header>
    </div>
  );
}

export default App;
