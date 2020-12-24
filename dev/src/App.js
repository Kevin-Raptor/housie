import React, { useState } from 'react';
import { Grid } from '@material-ui/core'
import GameBoard from './Components/GameBoard'
import GameDetails from './Components/GameDetails'
import PlayerDetails from './Components/PlayerDetails'
const App = () => {

  const [currentPage, setCurrentPage] = useState(1)


  return (
    <div style={{ background: 'black' }}  >
      <div style={{  margin: 'auto',height:'100vh' }}  >
        {currentPage === 1 ?
          <GameDetails nextPage={() => setCurrentPage(currentPage + 1)} />
          :
          currentPage === 2 ?
            <PlayerDetails nextPage={() => setCurrentPage(currentPage + 1)} />
            :
            <GameBoard />
        }
      </div>
    </div>
  );
}

export default App;