import logo from './logo.svg';
import './App.css';

import Homepage from './pages/Homepage/Homepage';
import Game from './pages/Game/Game';

import {useState} from 'react'

function App() {
  const [gameState, setGameState] = useState("registrer")

  const [teams, setTeams] = useState([])
  const [settings, setSettings] = useState({})

  return (
    <div className="App">
      <header className="App-header">
        { 
          gameState === "registrer" ?
            <Homepage teams={teams} setTeams={setTeams} settings={settings} setSettings={setSettings} />
          : gameState === "game" ?
            <Game teams={teams} />
          : null
        }
      </header>
    </div>
  );
}

export default App;
