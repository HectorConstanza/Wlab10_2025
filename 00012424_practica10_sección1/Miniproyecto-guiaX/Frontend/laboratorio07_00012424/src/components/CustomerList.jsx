import { useEffect, useState } from "react";
import API from "../utils/api";

export default function CustomerList({ goCreate, goEdit }) {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");

  const loadCustomers = () => {
    API.get("/customers")
      .then((res) => setCustomers(res.data))
      .catch(() => setError("Error obteniendo clientes"));
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este cliente?")) return;

    await API.delete(`/customers/${id}`);
    loadCustomers();
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <h2>Lista de Clientes</h2>

      <button onClick={goCreate}>Nuevo Cliente</button>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Código</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.address}</td>
              <td>{c.phone}</td>
              <td>{c.code}</td>
              <td>
                <button onClick={() => goEdit(c)}>Editar</button>
                <button onClick={() => deleteCustomer(c.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}


