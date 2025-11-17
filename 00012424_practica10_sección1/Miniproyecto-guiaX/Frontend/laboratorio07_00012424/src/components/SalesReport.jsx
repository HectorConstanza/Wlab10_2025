import { useEffect, useState } from "react";
import API from "../utils/api";

/**
 * SalesReport
 * - Espera que el backend exponga GET /sales/report
 * - Respuesta esperada: [{ customer: "Nombre", total_sales: 123.45 }, ...]
 */
export default function SalesReport() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    API.get("/sales/report")
      .then((res) => {
        setReport(res.data || []);
        setError("");
      })
      .catch((err) => {
        console.error("Error fetching sales report:", err);
        if (err.response?.status === 401) setError("Token inválido o sesión expirada");
        else if (err.response?.status === 403) setError("No tienes permisos para ver el reporte");
        else setError("Error obteniendo reporte de ventas");
      })
      .finally(() => setLoading(false));
  }, []);

  const exportCSV = () => {
    if (!report.length) return;
    const headers = ["Cliente", "Total Ventas"];
    const rows = report.map(r => [r.customer, r.total_sales]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (loading) return <p>Cargando reporte...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <h2>Reporte de Ventas por Cliente</h2>

      <button onClick={exportCSV} disabled={!report.length} style={{ marginBottom: 10 }}>
        Exportar CSV
      </button>

      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: 8 }}>Cliente</th>
            <th style={{ padding: 8, textAlign: "right" }}>Total Ventas</th>
          </tr>
        </thead>

        <tbody>
          {report.map((r, idx) => (
            <tr key={idx}>
              <td style={{ padding: 8 }}>{r.customer}</td>
              <td style={{ padding: 8, textAlign: "right" }}>{Number(r.total_sales).toFixed(2)}</td>
            </tr>
          ))}

          {report.length === 0 && (
            <tr>
              <td colSpan="2" style={{ padding: 8, textAlign: "center" }}>No hay datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
