import { useState, useEffect } from "react";
import serverAPI from "../api/serverAPI";

export default function useFetchPedidos(onSubmit, onMatSubmit, onDelete) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await serverAPI.get("/pedido/obtenerPedidos");
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
    fetchPedidos();
  }, [onSubmit, onMatSubmit, onDelete]);

  return pedidos;
}
