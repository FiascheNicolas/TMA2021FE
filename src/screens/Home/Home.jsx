import React, {useEffect} from 'react'

import FiltroLocales from '../FiltroLocales/FiltroLocales';


const Home = () => {

  useEffect(() => {
    localStorage.setItem("idUsuario", "0")
  }, [])

  return (
    <>
    <FiltroLocales />
    </>
  );
}


export default Home