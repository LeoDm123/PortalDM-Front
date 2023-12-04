import { useState, useEffect } from "react";
import serverAPI from "../../api/serverAPI";

export default function fetchUsers(onUserCreation, onUserDelete) {
  const [Users, setUsers] = useState([]);

  console.log("onUserCreation-Fetch", onUserCreation);
  console.log("onUserDelete-Fetch", onUserDelete);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await serverAPI.get("/auth/obtenerUsuarios");
      const sortedUsers = response.data.slice();
      sortedUsers.sort((a, b) => {
        const apellidoA = a.userApellido || a.userName[0];
        const apellidoB = b.userApellido || b.userName[0];
        return apellidoA.localeCompare(apellidoB);
      });
      setUsers(sortedUsers);
    };

    fetchUsers();
  }, [onUserCreation, onUserDelete]);

  return Users;
}
