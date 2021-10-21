import { grid, gridCommon } from './gridCommon'

export const Estilos = theme => {
  return ({
    ...gridCommon,
    grid: {
      ...grid,
      '& .data-grid-chip-cell': {
        padding: '0 2.5em'
      },
      '& .data-grid-op-cell': {
        padding: '0 3.em'
      }
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    dialogContainer: {
      display: 'grid',
      rowGap: '1em'
    },
    divisor: {
      margin: `10px 0 0 ${theme.spacing(4)}px`,
    },
    cardHorizontal: {
      'border-radius': '6px',
      display: "flex",
      padding: "12px",
      margin: "0px",
      "background-color": "white",
      marginBottom: theme.spacing(2),
    },
    imgLocal: {
      'border-radius': '20px',
      'padding-right': '12px',
      'padding-top': '5px'
    },
    imgPlatillo: {
      'border-radius': '20px',
      'padding-right': '12px',
      'padding-top': '5px',
      'width': '100%',
      'max-width': '200px'
    },
    textoCardLocal: {
      'padding-top': '5px',
      'border-radius': '20px',
    },
    listadoCategorias: {
      'position': 'sticky',
    },
    acciones: {
      display: "flex",
      justifyContent: "between"
    }
  })
};