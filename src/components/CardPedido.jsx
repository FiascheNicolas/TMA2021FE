import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Button, Box, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Paper, Typography, } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RoomIcon from '@material-ui/icons/Room';
import { typography } from '@material-ui/system';
import { usePedidosPresenter } from '../presenter/pedidosPresenter';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const CardPedido = (props) => {

  const { pedido, setPedido, local, traerPedidoPorId, updatePedido } = props;

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const [colorBotonPedido, setColorBotonPedido] = useState("#fff")

  let pedidoTexto = pedido.descripcion;
  const total = pedidoTexto.indexOf("*Total:*");
  const totalTexto = pedidoTexto.substr(total + 8);
  pedidoTexto = pedidoTexto.substr(pedidoTexto.indexOf(":") + 1, total);
  pedidoTexto.replace("\n", "<br />", "g")
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let textoPedido = pedido.descripcion;
  textoPedido = textoPedido.slice(textoPedido.indexOf('\n'), textoPedido.lastIndexOf(')') + 2)
  textoPedido = textoPedido.replaceAll("\\n", "");

  let totalTextos = pedido.descripcion.slice(pedido.descripcion.indexOf('*T'), pedido.descripcion.length);
  totalTextos = totalTextos.replaceAll("*", "");


  const formatFechaHora = (fechaHora) => {
    const fecha = fechaHora.split("T")[0]
    const hora = fechaHora.split("T")[1]

    const formatFecha = fecha.split("-").reverse().join("-")

    return `${formatFecha} - ${hora}`
  }

  let hora = formatFechaHora(pedido.fechaHoraPedido);

  const changeEstadoPedido = async () => {
    if (pedido.estado === "pendiente") {
      await updatePedido("cancelado", pedido)
    } else if (pedido.estado === "cancelado") {
      await updatePedido("pendiente", pedido)
    } //else alert("no se puede cancelar un pedido procesado")

    const res = await traerPedidoPorId(pedido.idPedido)
    setPedido(res)

  }

  useEffect(() => {
    switch (pedido.estado) {
      case ("pendiente"):
        setColorBotonPedido("#ffc107")
        break
      case ("cancelado"):
        setColorBotonPedido("#bf280a")
        break
    }
  }, [pedido])

  return (
    <Box pt={4} pb={1}>
      <Paper>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar} src={local.logo}>
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={local.nombre}
            subheader={hora}
          />
          <CardMedia
            className={classes.media}
            image="https://previews.123rf.com/images/captainvector/captainvector1705/captainvector170506588/77175739-concepto-de-pedido-de-comida-en-l%C3%ADnea.jpg"
          />
          <CardContent style={{ "padding": "0px" }}>
            <IconButton disabled label>
              <RoomIcon />
              <Typography>{pedido.direccion}</Typography>
            </IconButton>
          </CardContent>
          <CardContent style={{ paddingTop: "0px", paddingBottom: "0px" }}>
            <Typography variant="body2" color="textSecondary" component="p">
              {textoPedido}
            </Typography>
            <Typography variant="h6" component="p">
              {totalTextos}
            </Typography>
          </CardContent>
          <CardActions disableSpacing style={{ padding: "16px" }}>
            <Button variant="contained" style={{ backgroundColor: pedido.estado === "pendiente" ? "#ffc107" : "#bf280a" }} onClick={changeEstadoPedido}>
              {pedido.estado}
            </Button>

            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Indicaciones del pedido:</Typography>
              <Typography paragraph>
                {pedido.comentarios}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Paper>
    </Box>
  );
}

export default CardPedido;