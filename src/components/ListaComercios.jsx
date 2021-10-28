import React from 'react';
import { Grid } from '@material-ui/core';
import { CardLocal } from './CardLocal'

export const ListaComercios = (props) => {
  //parametros
  const {
    comercios
  } = props

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        {!comercios.length
          ?
          <div>No hay resultados</div>
          :
          comercios.map(comercio => {
            return <CardLocal
              idComercio= {comercio.idComercio}
              nombreLocal={comercio.nombre}
              telefono={comercio.telefono}
              urlLogo= {comercio.logo}
              promCalificacion ={comercio.promCalificacion}
              key={comercio.idComercio} />
          })

        }
      </Grid>
    </div>
  );
};

export default ListaComercios

