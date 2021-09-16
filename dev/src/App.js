import React, { useState } from 'react';
import { Grid } from '@material-ui/core'
import GameBoard from './Components/GameBoard'
import GameDetails from './Components/GameDetails'
import PlayerDetails from './Components/PlayerDetails'
import {connect} from 'react-redux'

const App = (props) => {


  return (
    <div style={{ background: 'black' }}  >
      <div style={{  margin: 'auto',height:'100vh' }}  >
        {props.currentPage === 1 ?
          <GameDetails />
          :
          props.currentPage === 2 ?
            <PlayerDetails />
            :
            <GameBoard />
        }
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { currentPage } = state.app
  return {currentPage}
}

const mapDispatchToProps = (dispatch) => {
 return{}
}
export default connect(mapStateToProps,mapDispatchToProps)(App);