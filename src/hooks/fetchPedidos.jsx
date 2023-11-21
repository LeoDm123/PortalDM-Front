import { useState, useEffect } from "react";
import serverAPI from "../api/serverAPI";

export default function fetchPedidos({ onSubmit }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await serverAPI.get("/pedido/obtenerPedidos");
        console.log(response);
        const sortedPedidos = response.data.slice();
        sortedPedidos.sort((a, b) => {
          const apellidoA = a.ClientApellido || a.ClientName[0];
          const apellidoB = b.ClientApellido || b.ClientName[0];
          return apellidoA.localeCompare(apellidoB);
        });
        setPedidos(sortedPedidos);

        if (sortedPedidos.length > 0) {
          const nuevoPedido = sortedPedidos[sortedPedidos.length - 1];
          await actualizarBaseDeDatos(nuevoPedido);
          console.log("Base de datos actualizada con éxito.");
        }
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    };

    fetchPedidos();
  }, [onSubmit]);

  return pedidos;
}
