import React from 'react';
import BackgroundImage from '../Images/background.jpeg'
import { makeStyles } from '@material-ui/styles';
import { Card, Grid, TextField, Typography } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${BackgroundImage})`,
        height: '100vh',
        margin: 'auto'
    }
}))

const GameDetails = (props) => {
    const classes = useStyle()
    return (

        <Grid container className={classes.root} justify="center" alignItems='center'>

            <Card style={{ width: '50%', textAlign: 'center', padding: 20 }} raised>
                <Grid container direction='column' justify='center' alignItems='center' >
                    <Typography style={{ marginTop: 10 }} variant='h4'>
                        Housie
                    </Typography>
                    <TextField style={{ marginTop: 10 }} variant='outlined' label='Number of players' fullWidth></TextField>
                    <TextField style={{ marginTop: 10 }} variant='outlined' label='Hostname' fullWidth></TextField>
                </Grid>
            </Card >

        </Grid >
    );
}

export default GameDetails;