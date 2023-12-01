import { useState, useEffect } from "react";
import serverAPI from "../../../api/serverAPI";

export default function useFetchPedidosVarios(
  onSubmit,
  onMatSubmit,
  onDelete,
  onEstadoChange
) {
  const [pedidosVarios, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidosVarios = async () => {
      try {
        const response = await serverAPI.get("/pedidoVarios/obtenerPedidos");
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
    fetchPedidosVarios();
  }, [onSubmit, onMatSubmit, onDelete, onEstadoChange]);

  return pedidosVarios;
}
