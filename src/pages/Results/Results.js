import "./Results.css"

function Results({teams, setGameState, setTeams}) {
  function compare( a, b ) {
    if ( a.score > b.score ){
      return -1;
    }
    if ( a.score < b.score ){
      return 1;
    }
    return 0;
  }

  return (
    <div>
      <table>
        {/* <tHead> */}
          <tr>
            <th>Lagnavn</th>
            <th>Poeng</th>
          </tr>
        {/* </tHead>
        <tBody> */}
          {teams.sort( compare ).map(teamobj => 
            <tr key={teamobj.id}>
              <td>{teamobj.teamName}</td>
              <td>{teamobj.score}</td>
            </tr>
          )}
        {/* </tBody> */}
      </table>

      <form>
        <button onClick={() => 
          setGameState("game")
        }>Tilbake til spill</button>

        <button onClick={()=>{
          setTeams([])
          setGameState("initializing")
        }}>Nytt spill</button>
      </form>
    </div>
  );
}
  
export default Results;  