import { useEffect, useState } from "react";
import API from "../utils/api";
import "./css/customes.css"; // ⬅️ IMPORTANTE

export default function CustomerList({ goCreate,}) {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [searchCode, setSearchCode] = useState("");

  const loadCustomers = () => {
    API.get("/customers")
      .then((res) => setCustomers(res.data))
      .catch(() => setError("Error obteniendo clientes"));
  };

  useEffect(() => {
    loadCustomers();
  }, []);


  const filteredCustomers = customers.filter((c) =>
    c.code?.toLowerCase().includes(searchCode.toLowerCase())
  );

  if (error) return <p className="error-msg">{error}</p>;

  return (
    <div className="customer-container">
      <h2 className="title">Lista de Clientes</h2>

      <div className="actions">
        <button className="btn-primary" onClick={goCreate}> Nuevo Cliente</button>
        <input
          type="text"
          placeholder="Buscar por código..."
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          className="search-input"
        />
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Código</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.address}</td>
                <td>{c.phone}</td>
                <td>{c.code}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-results">No se encontraron clientes con ese código</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
