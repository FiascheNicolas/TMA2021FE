import React, { useState, useEffect, Fragment } from 'react'
import { FormLocal } from '../../components/FormLocal';
import { TextField, Grid, LinearProgress, Button, MenuItem, Typography, Box, Paper, IconButton, Divider, FormControl, Checkbox, FormControlLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Cancel } from '@material-ui/icons'

import { useHistory, useLocation } from 'react-router'

import { useComercioPresenter } from '../../presenter/comerciosPresenter'
import { useLocalidadPresenter } from '../../presenter/localidadesPresenter';
import { useComidaPresenter } from '../../presenter/comidasPresenter'
import { useCategoriasPresenter } from '../../presenter/categoriasPresenter';

import { DataGrid } from '@material-ui/data-grid';
import TablaProductos from '../../components/TablaProductos';

import { makeStyles } from '@material-ui/styles';
import { Estilos } from '../../style/estilos';
import { usePedidosPresenter } from '../../presenter/pedidosPresenter';


const useStyles = makeStyles((theme) => Estilos(theme));


const GestionComercio = () => {

    const classes = useStyles()

    //******************** 
    // Estados
    //********************


    const { actualizarComercio, traerComercioPorIdDeUsuario } = useComercioPresenter();
    const { localidades, setLocalidades, traerLocalidades } = useLocalidadPresenter();
    const { comidas, setComidas, traerComidasPorComercio, eliminarComidas, crearComidas, editarComidas } = useComidaPresenter();
    const { categorias, setCategorias, traerCategorias } = useCategoriasPresenter();
    const { pedidos, setPedidos, traerPedidosPorIdComercio, updatePedido } = usePedidosPresenter();

    const [comercio, setComercio] = useState({})
    const [idUser, setIdUser] = useState(0);
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true);
    const [verPedidosActivos, setVerPedidosActivos] = useState(true);


    //******************** 
    // Hooks
    //********************
    const location = useLocation();


    //al cargar el componente se trae el comercio por id y  la lista de localidades
    useEffect(() => {
        if (location.state) {
            setIdUser(location.state.idUsuario);
            localStorage.setItem("idUsuario", location.state.idUsuario)
        }

    }, [])

    useEffect(() => {
        if (idUser !== 0) {
            cargarData()
        }
    }, [idUser])

    useEffect(() => {
        if (comercio) {
            console.log("Comercio: ", comercio)
            localStorage.setItem("idTienda", comercio.idComercio)
        }
    }, [comercio])


    const cargarData = async () => {
        console.log("GestionComercio - idUsuario recuperado", idUser)
        if (idUser !== 0) {
            try {
                const com = await traerComercioPorIdDeUsuario(idUser)
                setComercio(com)

                const locs = await traerLocalidades()
                setLocalidades(locs)

                const prods = await traerComidasPorComercio(com.idComercio);
                setProductos(prods)

                const cats = await traerCategorias();
                setCategorias(cats)

                const pedidos = await traerPedidosPorIdComercio(com.idComercio);
                setPedidos(pedidos)

                setCargando(false)
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <>
            <Grid container>
                {/* INFO Y PRODUCTOS */}
                <Grid item container md={8} xs={12}>
                    {
                        !location.state
                            ?
                            <Grid container spacing={1} justifyContent="center" alignItems="center" >
                                <Box display="flex" justifyContent="conter">
                                    <Alert severity="warning">Aun no estas logueado!</Alert>
                                </Box>
                            </Grid>
                            :
                            <>
                                {
                                    cargando
                                        ?
                                        <Grid item container
                                            direction="column"
                                            alignItems="center" >
                                            <LinearProgress />
                                        </Grid>
                                        :
                                        <Grid item container direction="column" justifyContent="flex-start" spacing={0}>
                                            <Grid item container
                                                direction="column"
                                                alignItems="center" >
                                                <FormLocal actualizarComercio={actualizarComercio} localContent={comercio} categorias={categorias} />
                                            </Grid>
                                            <Grid item container
                                                direction="column"
                                                alignItems="center" >
                                                <TablaProductos productos={productos} crearProducto={crearComidas} editarProductos={editarComidas} eliminarProductos={eliminarComidas} />
                                            </Grid>
                                        </Grid>
                                }
                            </>
                    }
                </Grid>


                <Grid item container md={4} xs={12}>
                    {/* Pedidos */}
                    <Box height="100%" width="95%" mt={3}>
                        <Box m={1}>
                            <Paper >
                                <Box p={2}>Ver pedidos activos: <FormControlLabel
                                    control={<Checkbox
                                        name="visible"
                                        onChange={() => { setVerPedidosActivos(!verPedidosActivos) }}
                                        checked={verPedidosActivos}
                                    />}
                                /></Box>
                            </Paper>
                        </Box>
                        {
                            verPedidosActivos ?
                                pedidos.filter(pedido => pedido.estado !== 'cancelado' && pedido.estado !== 'entregado').map(p => {
                                    return <Pedido key={p.idPedido} pedido={p} updatePedido={updatePedido} />
                                })
                                :
                                pedidos.map(p => {
                                    return <Pedido key={p.idPedido} pedido={p} updatePedido={updatePedido} />
                                })
                        }
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default GestionComercio;

const Pedido = (props) => {
    const { pedido, updatePedido } = props;
    const classes = useStyles()
    const [estado, setEstado] = useState(pedido.estado);
    const estados = ['cancelado', 'pendiente', 'en proceso', 'enviado', 'entregado'];

    let textoPedido = pedido.descripcion;
    textoPedido = textoPedido.slice(textoPedido.indexOf('\n'), textoPedido.lastIndexOf(')') + 2)
    textoPedido = textoPedido.replaceAll("\\n", "");

    const formatFechaHora = (fechaHora) => {
        const fecha = fechaHora.split("T")[0]
        const hora = fechaHora.split("T")[1]

        const formatFecha = fecha.split("-").reverse().join("-")

        return `Fecha: ${formatFecha}, Hora: ${hora}`
    }

    let hora = formatFechaHora(pedido.fechaHoraPedido);
    let precio = pedido.descripcion.slice(pedido.descripcion.indexOf('*T'), pedido.descripcion.length);
    precio = precio.replaceAll("*", "");

    // useEffect(() => {
    //     /*str = Hola, vi tu menu en PedidosYa y quiero hacer el siguiente pedido: 
    //             Mega Classic Not Burger (1 x $201.00) 
    //             Mega Deluxe Not Burger (1 x $555.00) 
    //             *Total:* $845.*/
    //     console.log(pedido)
    //     const strSplit = pedido.descripcion.split("\n")
    //     const items = strSplit.slice(1, strSplit.length - 2)
    //     const precio = strSplit[strSplit.length - 1]
    //     setItems(items)
    //     setPrecio(precio ? precio.replace("*Total:*", "").replace("\\n", "").replace("\\r", "") : "")
    // }, [])

    const handleChange = (event) => {
        console.log('Estado: ' + event.target.value)
        setEstado(event.target.value);
    };

    useEffect(() => {
        if (estado != pedido.estado) {
            pedido.estado = estado;
            updatePedido(estado, pedido);
        }
    }, [estado])

    return (
        <>
            <Box m={1}>
                <Paper >
                    <Box p={2}>
                        <Grid item container xs={12} justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="initial">{`ID: ${pedido.idPedido}`}</Typography>
                            {/* <IconButton onClick={()=>{alert("pedido resuelto")}}>
                                <Cancel fontSize="small"/>
                            </IconButton> */}
                            <FormControl sx={{ minWidth: 120 }} size="small">
                                <TextField
                                    select
                                    variant="outlined"
                                    size='small'
                                    SelectProps={{ value: estado, onChange: handleChange }}
                                    InputProps={{
                                        classes: { notchedOutline: classes.noBorder }
                                    }}
                                >
                                    {estados.map((estado) => (
                                        <MenuItem key={estado} value={estado}>
                                            {estado[0].toUpperCase() + estado.slice(1)}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </FormControl>
                        </Grid>
                        <Divider />
                        <Grid item container spacing={1} >
                            <Grid item container xs={12} alignItems="center">
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="initial">Direccion</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="caption" color="initial">{pedido.direccion}</Typography>
                                </Grid>

                                <Grid item container xs={12} alignItems="flex-start">
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="initial">Items:</Typography>
                                    </Grid>
                                    <Grid item xs={8} >

                                        <Grid item xs={12}>
                                            <Typography variant="caption">{`${textoPedido}`}</Typography>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="body2" color="initial">Comentarios:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="caption" color="initial">{pedido.comentarios}</Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="body2" color="initial">Precio:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="caption" color="initial">{precio}</Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="body2" color="initial">Realizado:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="caption" color="initial">{hora}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}