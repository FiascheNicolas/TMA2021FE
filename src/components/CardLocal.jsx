import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Estilos } from '../style/estilos';
import PhoneIcon from '@material-ui/icons/Phone';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import StarIcon from '@material-ui/icons/Star';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { useHistory } from 'react-router-dom';
import { yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => Estilos(theme));

export const CardLocal = (props) => {
  //Estilos
  const classes = useStyles();
  //parametros
  const { idComercio, nombreLocal, telefono, urlLogo, promCalificacion } = props;

  //hooks
  const history = useHistory()

  const irAComercio = () => {
    history.push(`/comercio/${idComercio}`)
  }

  return (
    <Box className={classes.cardHorizontal} width='100%' onClick={irAComercio}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="logo" src={urlLogo} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Grid container item alignItems="center">
                <Typography gutterBottom
                  variant="subtitle1"
                  className={classes.tituloLocal}>{nombreLocal}
                </Typography>
              </Grid>
              <Grid item container spacing={1}>
                <Grid container item alignItems="center"> <AccessTimeIcon color="action" fontSize="small" /><Typography variant="body2" color="textSecondary">&nbsp;Entrega entre 20 y 30 minutos</Typography></Grid>
                <Grid container item alignItems="center"> <PhoneIcon color="action" fontSize="small" /><Typography variant="body2" color="textSecondary">&nbsp;{telefono}</Typography></Grid>
                <Grid container item alignItems="center"><StarIcon style={{ color: yellow[700] }} /><Typography variant="body2" color="textSecondary">&nbsp;{promCalificacion}</Typography></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box >
  );
};

export default CardLocal;
