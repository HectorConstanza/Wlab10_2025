import "./css/home.css";

export default function Home({ goToCustomers, goToSales, goToReports }) {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Sistema de Ventas</h1>
        <p className="home-subtitle">Bienvenido, selecciona una opción:</p>

        <div className="home-buttons">
          <button onClick={goToCustomers} className="home-btn">
            Gestionar Clientes
          </button>

          <button onClick={goToSales} className="home-btn">
            Gestionar Ventas
          </button>

          <button onClick={goToReports} className="home-btn">
            Reportes
          </button>
        </div>
      </div>
    </div>
  );
}
