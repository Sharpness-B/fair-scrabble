import logo from './logo.svg';
import './App.css';

import Homepage from './pages/Homepage/Homepage';
import Game from './pages/Game/Game';

import {useState} from 'react'

function App() {
  const [gameState, setGameState] = useState("registrer")

  const [settings, setSettings] = useState({})

  return (
    <div className="App">
      <header className="App-header">
        { 
          gameState === "registrer" ?
            <Homepage settings={settings} setSettings={setSettings} />
          : gameState === "game" ?
            <Game settings={settings} />
          : null
        }
      </header>
    </div>
  );
}

export default App;
