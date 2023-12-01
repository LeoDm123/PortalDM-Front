import { useState, useEffect } from "react";
import serverAPI from "../../api/serverAPI";

export default function fetchUsers() {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await serverAPI.get("/auth/obtenerUsuarios");
      const sortedUsers = response.data.slice();
      sortedUsers.sort((a, b) => {
        const apellidoA = a.Apellido || a.Name[0];
        const apellidoB = b.Apellido || b.Name[0];
        return apellidoA.localeCompare(apellidoB);
      });
      setUsers(sortedUsers);
    };

    fetchUsers();
  }, []);

  return Users;
}
