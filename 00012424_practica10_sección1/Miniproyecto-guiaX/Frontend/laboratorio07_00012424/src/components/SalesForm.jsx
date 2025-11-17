import { useState, useEffect } from "react";
import API from "../utils/api";

export default function CreateSale({ goBack }) {
  const [amount, setAmount] = useState("");
  const [idCustomer, setIdCustomer] = useState("");
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");

  // Cargar clientes
  useEffect(() => {
    API.get("/customers")
      .then((res) => setCustomers(res.data))
      .catch(() => setError("Error cargando clientes"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/sales", {
        amount,
        id_customer: idCustomer,
      });

      alert("¡Venta creada con éxito!");
      goBack();
    } catch (err) {
      setError("Error creando venta");
    }
  };

  return (
    <>
      <h2>Crear Venta</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        
        {/* Monto */}
        <label>Monto:</label>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        {/* Cliente */}
        <label>Cliente:</label>
        <select
          value={idCustomer}
          onChange={(e) => setIdCustomer(e.target.value)}
          required
        >
          <option value="">Seleccione un cliente</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button type="submit">Guardar Venta</button>
      </form>

      <button onClick={goBack}>Regresar</button>
    </>
  );
}
