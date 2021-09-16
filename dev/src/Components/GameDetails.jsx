import React, { useState } from 'react';
import BackgroundImage from '../Images/background.jpeg'
import { makeStyles } from '@material-ui/styles';
import { Card, Grid, TextField, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux'

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${BackgroundImage})`,
        height: '100vh',
        margin: 'auto'
    }
}))

const GameDetails = (props) => {
    const classes = useStyle()

    const [playerCount,setPlayerCount] = useState('')
    const [hostname,setHostname] = useState('')

    const proceed = () => {
        props.nextPage()
        props.sendGameDetails({playerCount,hostname})
    }

    return (

        <Grid container className={classes.root} justify="center" alignItems='center'>

            <Card style={{ width: '50%', textAlign: 'center', padding: 20 }} raised>
                <Grid container direction='column' justify='center' alignItems='center' >
                    <Typography style={{ marginTop: 10 }} variant='h4'>
                        Housie
                    </Typography>
                    <TextField style={{ marginTop: 10 }} variant='outlined' label='Hostname' fullWidth  onChange={(e) => setHostname(e.target.value) }></TextField>
                    <TextField style={{ marginTop: 10 }} variant='outlined' label='Number of players' value={playerCount} onChange={(e) => setPlayerCount(e.target.value) } fullWidth></TextField>
                    <Button variant="contained" color="primary" onClick={() => proceed()}>Proceed</Button>
                </Grid>
            </Card >

        </Grid >
    );
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => ({
    nextPage: () => {
        dispatch({ type: 'next_page' })
    },
    sendGameDetails: (data) => {
        dispatch({ type: 'send_game_details', data })
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(GameDetails);