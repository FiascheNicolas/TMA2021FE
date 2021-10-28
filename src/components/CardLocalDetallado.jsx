import { Grid, Box, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Estilos } from '../style/estilos';

import React from 'react';
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CommentIcon from '@material-ui/icons/Comment';
import StarIcon from '@material-ui/icons/Star';
const useStyles = makeStyles((theme) => Estilos(theme));

const CardLocalDetallado = (props) => {
    const { comercio } = props;
    const classes = useStyles();

    return ( <Box >
        <Paper className={classes.cardHorizontal} style={{
                background: "rgb(255,255,255)",
                background: "linear-gradient(180deg, rgba(255,192,192,1) 0%, rgba(199,103,103,1) 40%, rgba(198,40,40,1) 100%)"
            }}>
            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" style={{color: "white"}}>
                <Grid item ><img src={comercio.logo} width={150} height={150}></img></Grid>
                <Grid item container sm xs={12}  spacing={0}>   
                    <Grid item>
                        <Typography variant="h4" style={{fontWeight:"bold"}}>{comercio.nombre}</Typography>
                    </Grid>
                    
                    <Grid container item alignItems="center"><RoomIcon/><Typography>&nbsp;{comercio.direccion} - {comercio.localidad}</Typography></Grid>
                    
                    <Grid container item alignItems="center"><PhoneIcon/><Typography>&nbsp;{comercio.telefono}</Typography></Grid>
                    <Grid container item alignItems="center"><DateRangeIcon/><Typography>&nbsp;{comercio.diasAbierto}</Typography></Grid>
                    <Grid container item alignItems="center"><AccessTimeIcon/><Typography>&nbsp;{comercio.horario}</Typography></Grid>
                    <Grid container item alignItems="center"><LocalShippingIcon/><Typography>&nbsp;${comercio.costoEnvio} costo envío</Typography></Grid>
                    <Grid container item alignItems="center"><StarIcon/><Typography>&nbsp;{comercio.promCalificacion}</Typography></Grid>
                </Grid>
                <Grid xs={12} style={{paddingInline:10}}>
                    <Typography><span style={{fontWeight:"bold"}}>Descripción: </span>{comercio.descripcion}</Typography>
                </Grid>
            </Grid>
        </Paper>
        
    </Box> );
}
 
export default CardLocalDetallado;