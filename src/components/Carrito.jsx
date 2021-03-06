import { Grid, Paper, TextField, Button, Box, IconButton, ButtonGroup } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export const Carrito = (props) => {
    const { telefono, cartItems, onAdd, onDelete, onRemove, crearPedido, idComercio } = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.precio, 0);
    const shippingPrice = 89
    const totalPrice = itemsPrice + shippingPrice;
    const [direccion, setDireccion] = useState('');
    const [comentario, setComentario] = useState('');
    const [detalle, setDetalle] = useState('');
    const [idPedido, setIdPedido] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [url, setUrl] = useState('')
    const [pedidoRealizado, setPedidoRealizado] = useState(false);

    useEffect(() => {
        let text =
            "Hola, vi tu menu en PedidosYa y quiero hacer el siguiente pedido: \n "
        cartItems.map((item) => (
            text = text.concat(`${item.nombre} (${item.qty} x $${item.precio.toFixed(2)}) \n `)
        ))
        if (comentario !== "")
            text = text.concat(`*Comentarios:* ${comentario} \n`)
        text = text.concat(`*Total:* $${totalPrice}.`)
        setDetalle(text)
        text = text.concat(`\n Mi dirección es: ${direccion}. Gracias`)
        setMensaje(`https://wa.me/549${telefono}?text=${encodeURI(text)}`)
    }, [cartItems, direccion, comentario])

    useEffect(() => {
        let hostAddress = window.location.host;
        let url = window.location.protocol + "//" + hostAddress + "/pedido/" + idPedido;
        setUrl(url)
    }, [idPedido])

    const guardarPedido = (event) => {
        event.preventDefault();
        const pedido = {
            "descripcion": detalle,
            "direccion": direccion,
            "comentarios": comentario,
            "estado": "pendiente",
            "idComercio": parseInt(idComercio)
        }

        console.log("QUIERO PEDIR: " + JSON.stringify(pedido))
        crearPedido(pedido).then((res) => {
            if (res.status === 201) {
                setPedidoRealizado(true)
                setIdPedido(res.data)
            }
        })
    }

    return (
        <Box height="75%" width='35%' px={2}>
            <Paper>
                <Box p={3} pb={4} style={{ minHeight: 150 }}>

                    {!pedidoRealizado ?
                        <> <h2 style={{ 'text-align': 'center' }}>Tu pedido</h2>
                            <div>
                                {cartItems.length === 0 && <div>Tu pedido está vacío</div>}
                                {cartItems.map((item) => (
                                    <div key={item.idProducto} className="row" style={{ "padding-bottom": "10px" }}>
                                        <div className="col-2">{item.name}</div>
                                        <div className="col-2 text-right" style={{ "display": "flex" }}>
                                            <IconButton size="small" color="secondary" aria-label="" onClick={() => onDelete(item)}>
                                                <HighlightOffIcon /></IconButton>
                                            <div style={{ "align-items": "center", "display": "flex", "padding-right": "10px" }}>{item.nombre} ${item.precio.toFixed(2)}</div>
                                            <ButtonGroup size="small" aria-label="small outlined button group">
                                                <Button><IconButton size="small" color="secondary" aria-label="" onClick={() => onAdd(item)}>
                                                    <AddCircleOutlineIcon />
                                                </IconButton></Button>
                                                <Button>{item.qty}</Button>
                                                <Button><IconButton size="small" color="secondary" aria-label="" onClick={() => item.qty === 1 ? onDelete(item) : onRemove(item)}><RemoveCircleOutlineIcon /></IconButton>
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                ))}

                                {cartItems.length !== 0 && (
                                    <div style={{ 'text-align': 'right' }}>
                                        <hr></hr>
                                        <div className="row">
                                            <div className="col-2">Subtotal: </div>
                                            <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-2">Envío: </div>
                                            <div className="col-1 text-right">
                                                ${shippingPrice.toFixed(2)}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-2">
                                                <strong>Total: </strong>
                                            </div>
                                            <div className="col-1 text-right">
                                                <strong>${totalPrice.toFixed(2)}</strong>
                                            </div>
                                        </div>
                                        <hr />
                                        <Grid container direction="column" item xs>
                                            <Box my={1}>
                                                <TextField
                                                    m={50}
                                                    id="outlined-multiline-static"
                                                    multiline
                                                    rows={2}
                                                    fullWidth
                                                    label="Ingrese su dirección"
                                                    variant="outlined"
                                                    value={direccion}
                                                    onChange={e => setDireccion(e.target.value)} />
                                            </Box>
                                            <Box my={1}>
                                                <TextField
                                                    m={50}
                                                    id="outlined-multiline-static"
                                                    multiline
                                                    rows={2}
                                                    fullWidth
                                                    label="¿Algún comentario sobre tu pedido? ¡Hacelo acá!"
                                                    variant="outlined"
                                                    value={comentario}
                                                    onChange={e => setComentario(e.target.value)} />
                                            </Box>
                                            <Box >
                                                <Button variant="contained" size="small" onClick={(e) => {
                                                    direccion === '' ?
                                                        alert('No te olvides de agregar la dirección ;)')
                                                        :
                                                        window.open(mensaje, "_blank")
                                                    guardarPedido(e)
                                                }}>
                                                    Enviar Pedido
                                                </Button>
                                            </Box>

                                        </Grid>
                                    </div>
                                )}
                            </div>
                        </> :
                        <>
                            <h2 style={{ 'text-align': 'center' }}>¡Realizaste tu pedido!</h2>
                            <h3 style={{ 'text-align': 'center' }}>Numero de pedido: {`${idPedido}`}</h3>
                            <h5 style={{ 'text-align': 'center' }}> <Button onClick={(e) => {window.open(url, "_blank")}}>Mirá el estado de tu pedido acá</Button></h5>
                        </>}
                </Box>
            </Paper >
        </Box >);
}

export default Carrito
