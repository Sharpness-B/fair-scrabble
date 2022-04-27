import './App.css';

import Homepage from './pages/Homepage/Homepage';
import Game from './pages/Game/Game';
import Results from './pages/Results/Results';

import { useState, useEffect } from 'react'

import {cookie} from './functions/cookie';
import { team } from './functions/objects';


function CookieConsentModal({setShowCookieConsentModal, setCookieConsent}) {
  return (
    <div>
      <p>Denne appen bruker cookies for å sørge for at du ikke mister spillet, er det ok?</p>
      <div>
        <button onClick={()=>{setCookieConsent(true) ; setShowCookieConsentModal(false)}}>Ja</button>
        <button onClick={()=>{setCookieConsent(false); setShowCookieConsentModal(false)}}>Nei</button>
      </div>
    </div>
  )
}


function App() {
  const [gameState, setGameState] = useState("initializing")

  const [teams, setTeams] = useState([])
  const [settings, setSettings] = useState({})
  const [whosTurn, setWhosTurn] = useState(0)

  const [showCookieConsentModal, setShowCookieConsentModal] = useState(true)
  const [cookieConsent, setCookieConsent] = useState(false)

  // read cookie on render
  useEffect(() => {
    const data = JSON.parse( 
      cookie.readCookie("fair-scrabble") 
    )

    if (!data) return
    
    setGameState( data.gameState )
    setTeams    ( data.teams.map(obj => new team(obj.teamName, obj.id, obj.score)) )
    setSettings ( data.settings  )
    setWhosTurn ( data.whosTurn  )

    setCookieConsent( true )
    setShowCookieConsentModal( false )
  }, [])

  // update cookie
  useEffect(() => {
    if (!cookieConsent) return;
    
    if (gameState==="initializing" && teams.length===0 && cookieConsent===false) return

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
  }, [gameState, teams, settings, whosTurn, cookieConsent])

  return (
    <div className="App">
      {showCookieConsentModal && <CookieConsentModal setShowCookieConsentModal={setShowCookieConsentModal} setCookieConsent={setCookieConsent} />}

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
