import React, { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import { TextField, Grid, Box, Button } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';


const ModalCalificacion = (props) => {

    //******************** 
    // Props
    //********************

    const {
        open,
        setOpen,
        pedido,
        setPedido,
        updatePedido
    } = props;

    const [value, setValue] = useState(5);
    const [guardado, setGuardado] = useState(0);

    const cerrar = () => {
        setOpen(false);
    }

    useEffect(() => {
        pedido.calificacion = value;
        setPedido(pedido);
        console.log("pedido con estrellas: " + value)
    }, [value])

    useEffect(() => {
        pedido.calificacion = value;
        setPedido(pedido);
    }, [])

    const handleInputChange = (event) => {
        setPedido({
            ...pedido,
            [event.target.name]: event.target.value
        })
    }

    const guardarComentario = () => {
        updatePedido(pedido).then((data) => {
            console.log(JSON.stringify(data) +
                "UPDATEADO")
            setGuardado(data.status);
        })
    }

    return (
        <Dialog open={open} onClose={cerrar} fullWidth maxWidth="xs">
            <Box pb={3} style={{ width: '100%' }}> <Grid container justify="center">
                <Box p={3} style={{ width: '100%' }}>
                    <Box p={1}>
                        <Grid container
                            justify="center"
                            direction="column"
                            alignItems="left">
                            <Grid item >
                                <Box mt={2}>
                                    <Typography variant="h6" gutterBottom>
                                        {"¡Opiná de tu pedido!"}
                                    </Typography>
                                </Box>
                            </Grid>
                            {guardado == 0 ?
                                <form>
                                    <Grid item fullWidth>
                                        <Box mb={3}>
                                            <Rating
                                                size="large"
                                                name="simple-controlled"
                                                value={value}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12} fullWidth>
                                        <TextField
                                            label=""
                                            variant="outlined"
                                            fullWidth
                                            name="opinion"
                                            multiline
                                            rows={4}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </form> : guardado == 204 ?
                                    <Box mt={2}>
                                        <Typography variant="h6" gutterBottom>
                                            {"¡Gracias por opinar!"}
                                        </Typography>
                                    </Box> :
                                    <Typography variant="h6" gutterBottom>
                                        {"Hubo un error al guardar tu opinión, intentá de nuevo"}
                                    </Typography>}
                        </Grid>
                    </Box>
                </Box>
            </Grid>
                <DialogActions style={{ display: "flex", justifyContent: "center" }} >
                    {guardado === 0 ? <Button onClick={guardarComentario} variant="contained" color="secondary">
                        Guardar
                    </Button> : <></>}
                    <Button onClick={cerrar} variant="outlined" color="secondary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}


export default ModalCalificacion;
