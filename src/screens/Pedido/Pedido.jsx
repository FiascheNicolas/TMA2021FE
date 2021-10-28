import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { usePedidosPresenter } from '../../presenter/pedidosPresenter'
import Typography from '@material-ui/core/Typography'
import CardPedido from '../../components/CardPedido'
import { LinearProgress, Grid, Box, Button } from '@material-ui/core';
import CardLocalDetallado from '../../components/CardLocalDetallado'
import { useComercioPresenter } from '../../presenter/comerciosPresenter'
import { SettingsRemoteOutlined } from '@material-ui/icons'
import ModalCalificacion from '../../components/ModalCalificacion';




const Pedido = (props) => {

    const { setUrl } = props

    //Hooks
    const { id } = useParams()
    const { traerPedidoPorId, updatePedido, actualizarPedidoCompleto } = usePedidosPresenter();
    const { traerComercioPorId } = useComercioPresenter()


    //Estados
    const [cargando, setCargando] = useState(true);
    const [pedido, setPedido] = useState({})
    const [comercio, setComercio] = useState({})
    const [open, setOpen] = useState(false);


    //al cargar el componente se trae el comercio por id
    useEffect(() => {
        traerPedidoPorId(id).then(data => {
            setPedido(data)
            traerComercioPorId(data.idComercio)
                .then(data => {
                    setCargando(false)
                    setComercio(data)
                }).catch(err => console.error(err))
        }).catch(err => console.error(err))
    }, [])

    useEffect(() => {
        traerComercioPorId(id).then(data => setComercio(data)).catch(err => console.error(err))
        setUrl(window.location.href)
    }, [])
    //console.log(comercio);

    // useEffect(() => {
    //     if (id !== 8) {
    //         traerComidasPorComercio(id).then((data) => {
    //             setComidas(data)
    //             setCargando(false)
    //         }).catch(err => console.log(err))
    //     }
    // }, [id])

    useEffect(() => {
        if (pedido) {
            console.log(pedido)
        }
    }, [pedido])

    return (
        <div>
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="left"
            >
                {
                    cargando ?
                        <LinearProgress />
                        :
                        <CardPedido pedido={pedido} setPedido={setPedido} local={comercio} traerPedidoPorId={traerPedidoPorId} updatePedido={updatePedido} />
                }

            </Grid>
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="left"
            >
                {
                    pedido.estado === 'entregado' && pedido.calificacion===0?
                        <Box pb={4} >
                            <Button onClick={() => setOpen(true)} variant="contained" color="primary">
                                Opiná sobre el pedido
                            </Button>
                        </Box>
                        :
                        <></>
                }
            </Grid>
            <ModalCalificacion open={open} setOpen={setOpen} pedido={pedido} setPedido={setPedido} updatePedido={actualizarPedidoCompleto} />
        </div >
    )
}

export default Pedido;