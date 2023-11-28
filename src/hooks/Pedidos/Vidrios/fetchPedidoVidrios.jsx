import { useState, useEffect } from "react";
import serverAPI from "../../../api/serverAPI";

export default function useFetchPedidosVidrios(
  onSubmit,
  onMatSubmit,
  onDelete
) {
  const [pedidosVidrios, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidosVidrios = async () => {
      try {
        const response = await serverAPI.get("/pedidoVidrios/obtenerPedidos");
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
    fetchPedidosVidrios();
  }, [onSubmit, onMatSubmit, onDelete]);

  return pedidosVidrios;
}
