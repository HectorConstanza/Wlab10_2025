import { useEffect, useState } from "react";
import API from "../utils/api";

export default function SalesList({ goCreate, goEdit }) {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState("");

  const loadSales = () => {
    API.get("/sales")
      .then((res) => setSales(res.data))
      .catch(() => setError("Error obteniendo ventas"));
  };

  useEffect(() => {
    loadSales();
  }, []);

  const deleteSale = async (id) => {
    if (!confirm("¿Eliminar venta?")) return;

    try {
      await API.delete(`/sales/${id}`);
      loadSales();
    } catch (err) {
      alert("Error eliminando venta");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <h2>Lista de Ventas</h2>

      <button onClick={goCreate}>Nueva Venta</button>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Monto</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>${s.amount}</td>
              <td>{s.customer_name}</td>   {/* ← AQUI SE MUESTRA EL CLIENTE */}
              <td>{new Date(s.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => goEdit(s)}>Editar</button>
                <button onClick={() => deleteSale(s.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
