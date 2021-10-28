import axios from 'axios'

export const PedidosApi = {

    crearPedido: async (body) => {
        try {
            const res = await axios.post(`https://dry-thicket-39505.herokuapp.com/api/Pedido`, body);
            const locs = await res;
            return locs
        } catch (err) {
            console.error(err)
        }
    },

    traerPedidosPorId: async (id) => {
        try {
            const res = await axios.get(`https://dry-thicket-39505.herokuapp.com/api/Pedido/porid/${id}`);
            const locs = await res.data;
            return locs
        } catch (err) {
            console.error(err)
        }
    },

    traerPedidosPorIdComercio: async (id) => {
        try {
            const res = await axios.get(`https://dry-thicket-39505.herokuapp.com/api/Pedido/PedidosXComercio/${id}`);
            const locs = await res.data;
            return locs
        } catch (err) {
            console.error(err)
        }
    },

    updatePedido: async (estado, body) => {
        try {
            const res = await axios.put(`https://dry-thicket-39505.herokuapp.com/api/Pedido/?estado=${estado}`, body);
            const locs = await res;
            return locs
        } catch (err) {
            console.error(err)
        }
    },

    actualizarPedidoCompleto: async (body) => {
        try {
            console.log(JSON.stringify(body));
            const res = await axios.put(`https://dry-thicket-39505.herokuapp.com/api/Pedido/UpdatetPedido`, body);
            const locs = await res;
            return locs
        } catch (err) {
            console.error(err)
        }
    }

}