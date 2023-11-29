import { useState, useEffect } from "react";
import serverAPI from "../../../api/serverAPI";

export default function useFetchPedidosMadera(onSubmit, onMatSubmit, onDelete) {
  const [pedidosMadera, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidosMadera = async () => {
      try {
        const response = await serverAPI.get("/pedidoMadera/obtenerPedidos");
        const sortedPedidos = response.data.slice();
        sortedPedidos.sort((a, b) => {
          const PedidoA = a.NroPedido;
          const PedidoB = b.NroPedido;
          return PedidoA.localeCompare(PedidoB);
        });
        setPedidos(sortedPedidos);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    };

    console.log("fetchPedidos useEffect - onSubmit:", onSubmit);
    console.log("fetchPedidos useEffect - onMatSubmit:", onMatSubmit);
    console.log("fetchPedidos useEffect - onDelete:", onDelete);
    fetchPedidosMadera();
  }, [onSubmit, onMatSubmit, onDelete]);

  return pedidosMadera;
}
