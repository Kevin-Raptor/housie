import React, { useState } from 'react';
import { connect } from 'react-redux';
import BackgroundImage from '../Images/background.jpeg'
import { makeStyles } from '@material-ui/styles';
import { TextField, Grid, Card, Button, Typography, Dialog, Select, DialogTitle, DialogContent, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import ticket from '../util/ticketGen';
import axios from 'axios';

const useStyle = makeStyles((theme) => ({
    root: {
        // backgroundImage: `url(${BackgroundImage})`,
        height: '100vh',
        margin: 'auto',
        background: '#99b2dd',
        overflow: 'auto'
    },
    numberContainer: {
        background: 'black',
        color: 'white',
        margin: 10,
        textAlign: 'center',
        borderRadius: 30,
        border: 'black 2px solid'

    },
    numberCalledContainer: {
        background: 'white',
        color: 'black',
        margin: 10,
        textAlign: 'center',
        borderRadius: 30,
        border: 'black 2px solid'
    }
}))

const dialogModes = {
    picker: 'picker',
    winner: 'winner'
}

const GameBoard = (props) => {
    const classes = useStyle()
    const [gameStateActive, setGameStateActive] = useState(false)
    const [drawSequence, setDrawSquence] = useState([])
    const [calledNumbers, setCalledNumbers] = useState([])
    const [drawSequenceCurrentIndex, setDrawSequenceCurrentIndex] = useState(0)
    const [openValidateWinnerDialog, setOpenValidateWinnerDialog] = useState(false)
    const [pickedPlayerIndex, setPickedPlayerIndex] = useState('')
    const [pickedHand, setPickedHand] = useState('')
    const [playerTickets, setPlayerTickets] = useState([])
    const [winnerCheckText, setWinnerCheckText] = useState('')
    const [dialogMode, setDialogMode] = useState(dialogModes.picker)

    const startNewGame = () => {
        setGameStateActive(true)
        setDrawSquence(ticket.getDrawSequence())
        let tempTickets = ticket.getTickets(props.playerCount)
        setPlayerTickets(tempTickets)
        props.playersData.map((i, index) => {
            axios.post('http://localhost:8080/send', {
                name: i.name,
                email: i.email,
                ticket: tempTickets[index]
            })
                .then(resp => console.log("Mail sent to " + props.playerList[i].name,))
                .catch(err => console.error())

        })

    }

    const nextNumber = () => {
        setCalledNumbers([...calledNumbers, drawSequence[drawSequenceCurrentIndex]])
        setDrawSequenceCurrentIndex(drawSequenceCurrentIndex + 1)

    }

    const resetGame = () => {
        setGameStateActive(false)
        setDrawSquence([])
        setCalledNumbers([])
        setDrawSequenceCurrentIndex(0)
        setPlayerTickets([])
    }

    const validateWinner = () => {

        if (pickedHand || !pickedPlayerIndex) {
            alert('Please select an option in the drop down')
            return
        }
        let hand = playerTickets[pickedPlayerIndex]
        console.log(hand, pickedPlayerIndex)
        let lastNumFlag = false
        const lastNumCalled = calledNumbers[calledNumbers.length - 1]
        let ticketNumbers = []
        let foundNumbersCount = 0

        if (pickedHand === 'Jaldi 5' || pickedHand === 'Full House') {
            ticketNumbers = [...hand[0], ...hand[1], ...hand[2]]
        } else {
            if (pickedHand === 'Top Line')
                ticketNumbers = [...hand[0]]
            else if (pickedHand === 'Middle Line')
                ticketNumbers = [...hand[1]]
            else
                ticketNumbers = [...hand[2]]
        }

        console.log("ticket nos", ticketNumbers.filter(i => i !== 0))
        ticketNumbers.map(i => {
            if (i === lastNumCalled)
                lastNumFlag = true

            if (calledNumbers.includes(i))
                foundNumbersCount += 1
        })

        console.log('foundNumbersCount', foundNumbersCount)
        let resultText = ''
        if (lastNumFlag) {

            if (foundNumbersCount === 5 && (pickedHand === 'Jaldi 5' || pickedHand === 'Top Line' || pickedHand === 'Middle Line' || pickedHand === 'Bottom Line')) {
                console.log("yOU WON " + pickedHand)
                resultText = 'won ' + pickedHand

            } else if (foundNumbersCount === 15 && pickedHand === 'Full House') {
                resultText = 'won ' + pickedHand


            } else {
                console.log(`NOT WON: you have ${foundNumbersCount} called numbers`)
                resultText = 'not won ' + pickedHand

            }
        } else {
            console.log("you do not have last number called " + lastNumCalled)
            resultText = 'not got the last number called on the ticket '

        }
        setWinnerCheckText(props.playersData[pickedPlayerIndex].name + ' has ' + resultText)
        setDialogMode(dialogModes.winner)

    }

    return (
        <Grid container className={classes.root} direction='column' justify="space-around" alignItems='center'>
            {!gameStateActive &&
                <Button variant="contained" color="primary" onClick={() => startNewGame()}>Start New game</Button>
            }
            {gameStateActive &&
                <div style={{ textAlign: 'center' }}>
                    <Card raised style={{ width: '30%', padding: 20, margin: 'auto' }}>
                        <Typography variant='h5' style={{fontWeight:700}}>Last Numbers Called : {calledNumbers ? calledNumbers[calledNumbers.length - 1] : ''} </Typography>
                    </Card>
                    <Grid container style={{ paddingLeft: 50, paddingRight: 50, marginTop: 20 }} justify="center" alignItems='center'>
                        {[...Array(90).keys()].map(i => {
                            return (
                                <Grid key={i} item sm={1} className={calledNumbers.includes(i + 1) ? classes.numberCalledContainer : classes.numberContainer}>
                                    <Typography variant='h6'>{i + 1}</Typography>
                                </Grid>
                            )
                        })}

                        <Grid item container xs={12} justify='space-around' style={{ padding: '0px 200px 0px 200px', marginTop: 20 }}>
                            <Button variant='contained' color='primary' onClick={() => nextNumber()} >Next number</Button>
                            <Button variant='contained' color='primary' onClick={() => setOpenValidateWinnerDialog(true)} >Validate Winner</Button>
                            <Button variant='contained' color='primary' onClick={() => resetGame()} >Reset</Button>
                        </Grid>
                    </Grid>

                </div>
            }

            <Dialog open={openValidateWinnerDialog}>
                {dialogMode === dialogModes.picker ?
                    <Grid container>
                        <Grid item xs={12}>

                            <DialogTitle>Select the player and win condition</DialogTitle>
                        </Grid>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Player Name</InputLabel>
                                        <Select value={pickedPlayerIndex} onChange={(e) => setPickedPlayerIndex(e.target.value)} fullWidth>
                                            {props.playersData && props.playersData !== '' && props.playersData.map((i, index) => {
                                                return (<MenuItem key={i.name} value={index} style={{ textAlign: 'center' }}  >{i.name}</MenuItem>)
                                            })}
                                        </Select>
                                    </FormControl>

                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Hand</InputLabel>
                                        <Select value={pickedHand} onChange={(e) => setPickedHand(e.target.value)} fullWidth>
                                            <MenuItem value={"Jaldi 5"}>Jaldi 5</MenuItem>
                                            <MenuItem value={"Top Line"}>Top Line</MenuItem>
                                            <MenuItem value={"Middle Line"}>Middle Line</MenuItem>
                                            <MenuItem value={"Bottom Line"}>Bottom Line</MenuItem>
                                            <MenuItem value={"Full House"}>Full House</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Grid>
                            </Grid>
                            <Grid container justify="flex-end" style={{ marginTop: 10 }}>
                                <Button onClick={() => setOpenValidateWinnerDialog(false)} color="primary" autoFocus>
                                    Cancel
                                </Button>
                                <Button onClick={() => validateWinner()} color="primary" autoFocus>
                                    Verify
                                </Button>
                            </Grid>
                        </DialogContent>

                    </Grid>
                    :
                    <Grid container>
                        <DialogContent>
                            <DialogTitle>Verification result :</DialogTitle>

                            <Grid container>

                                <Typography>
                                    {winnerCheckText}
                                </Typography>
                            </Grid>
                            <Grid container justify="flex-end" style={{ marginTop: 10 }}>
                                <Button onClick={() => setDialogMode(dialogModes.picker)} color="primary" autoFocus>
                                    Back
                                </Button>
                                <Button onClick={() => setOpenValidateWinnerDialog(false)} color="primary" autoFocus>
                                    Close
                                </Button>
                            </Grid>
                        </DialogContent>

                    </Grid>
                }
            </Dialog>

        </Grid >
    );
}

const mapStateToProps = (state) => {
    return state.app
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);