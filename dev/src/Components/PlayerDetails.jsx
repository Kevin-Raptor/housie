import React, { useState } from 'react';
import { connect } from 'react-redux';
import BackgroundImage from '../Images/background.jpeg'
import { makeStyles } from '@material-ui/styles';
import { TextField, Grid, Card, Button, Typography } from '@material-ui/core';
const useStyle = makeStyles((theme) => ({
    root: {
        // backgroundImage: `url(${BackgroundImage})`,
        height: '100vh',
        margin: 'auto',
        padding: 100,
        overflow: 'auto',
        paddingTop: 50,
        background: '#99b2dd',

    },
    containers: {
        padding: 20,
    }
}))

const PlayerDetails = (props) => {
    const classes = useStyle()

    const [playerNames, setPlayerNames] = useState(new Array(props.playerCount))
    const [playerEmails, setPlayerEmails] = useState(new Array(props.playerCount))

    const handleNameChange = (name, i) => {
        let tempNames = playerNames
        tempNames[i] = name
        setPlayerNames(tempNames)
    }
    const handleEmailChange = (email, i) => {
        let tempEmails = playerEmails
        tempEmails[i] = email
        setPlayerEmails(tempEmails)
    }

    const submitData = () => {
        props.nextPage()
        props.sendPlayerDetails(playerNames, playerEmails)
    }



    return (
        <Grid container className={classes.root} >
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography color="primary" variant="h2">Enter Player Names</Typography>
            </Grid>
            {props.playerCount && [...Array(props.playerCount).keys()].map(i => {
                return (
                    <Grid key={i} item sm={6} className={classes.containers}>
                        <Card>
                            <Grid container style={{ padding: 5 }} spacing={2}>
                                <Grid item sm={12} style={{textAlign:'center'}}>

                                    <Typography variant='h6'>Player {i + 1}</Typography>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField variant="filled" color="primary" label={"Name"} value={playerNames[i]} onChange={(e) => handleNameChange(e.target.value, i)} fullWidth></TextField>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField variant="filled" color="primary" label={"Email"} value={playerEmails[i]} onChange={(e) => handleEmailChange(e.target.value, i)} fullWidth></TextField>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                )
            })}
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button color="primary" variant='contained' onClick={() => submitData()} >Proceed to Game</Button>
            </Grid>

        </Grid>
    );
}
const mapStateToProps = (state) => {
    return state.app
}

const mapDispatchToProps = (dispatch) => ({
    nextPage: () => {
        dispatch({ type: 'next_page' })
    },
    sendPlayerDetails: (playerNames, playerEmails) => {
        let temp = playerNames.map((i,index) => { return { "name": i, "email": playerEmails[index] } })
        dispatch({ type: 'send_player_names', data: temp })
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetails);