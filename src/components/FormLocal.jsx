import React, { useReducer, useEffect } from 'react'
import { TextField, Grid, Box, Button, Select, MenuItem, Collapse, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



export const FormLocal = (props) => {
    const { localContent, actualizarComercio, categorias } = props;
    const [categoriasLocal, setCategoriasLocal] = React.useState([]);
    const [state, setState] = React.useState(false);

    const [local, setLocal] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        localContent
    );

    useEffect(() => {
        setCategoriasLocal(localContent.categorias)
    }, [])


    const handleInputChange = (event) => {
        setLocal({
            ...local,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        local.categorias = categoriasLocal
        actualizarComercio(local).then((data) => {
            console.log(JSON.stringify(data) +
                "UPDATEADO")
            alert("Usuario actualizado")
        })
    }

    const handleExpandClick = () => {
        setState(!state);
    };

    return (
        <Grid container justify="center">
            <Box pt={5} style={{ width: '90%' }}>
                <Paper mt={10}>
                    <Box p={5}>
                        <Box mb={3}>
                            <Typography variant="h6" gutterBottom>
                                {` Pedidos Ya - Usuario ${localStorage.getItem("user")} - Información del Local`}
                                <IconButton
                                    onClick={handleExpandClick}
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </Typography>
                        </Box>
                        <Collapse in={state}>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3} style={{ width: '100%' }}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Local"
                                            defaultValue={local.nombre}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            name="nombre"
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            label="Descripción"
                                            defaultValue={local.descripcion}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            name="descripcion"
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="direccion"
                                            onChange={handleInputChange}
                                            label="Dirección"
                                            defaultValue={local.direccion}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="localidad"
                                            onChange={handleInputChange}
                                            label="Localidad"
                                            defaultValue={local.localidad}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="telefono"
                                            onChange={handleInputChange}
                                            label="Teléfono"
                                            defaultValue={local.telefono}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h8" gutterBottom></Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" gutterBottom>Categorías del local: </Typography>
                                    </Grid>
                                    <Grid item xs={12} container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center">

                                        {categorias.map(categoria => {
                                            return <Box>
                                                {
                                                    (!categoriasLocal.filter(e => e.nombre === categoria.nombre).length > 0) ?

                                                        <Button variant="text" cursor="pointer" onClick={() => setCategoriasLocal(categoriasLocal.concat(categoria))}>{categoria.nombre}</Button>
                                                        :

                                                        <Button variant="contained" cursor="pointer" onClick={() => setCategoriasLocal(categoriasLocal.filter(cat => cat.nombre !== categoria.nombre))}>{categoria.nombre}</Button>

                                                }
                                            </Box>
                                        })}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button type="submit" variant="contained" color="primary">
                                            Actualizar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Collapse>
                    </Box>
                </Paper>
            </Box>
        </Grid>
     
    );
}

export default FormLocal