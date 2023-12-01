import { useState, useEffect } from "react";
import serverAPI from "../../../api/serverAPI";

export default function useFetchPedidosPerfiles(
  onSubmit,
  onMatSubmit,
  onDelete,
  onEstadoChange
) {
  const [pedidosPerfiles, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidosPerfiles = async () => {
      try {
        const response = await serverAPI.get("/pedidoPerfiles/obtenerPedidos");
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
    fetchPedidosPerfiles();
  }, [onSubmit, onMatSubmit, onDelete, onEstadoChange]);

  return pedidosPerfiles;
}
