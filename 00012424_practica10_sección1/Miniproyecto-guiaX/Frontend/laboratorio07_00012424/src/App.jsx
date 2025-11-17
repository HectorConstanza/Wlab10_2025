import { useEffect, useState } from "react";
import Login from "./components/login";
import Navbar from "./components/navbar";

import CustomerList from "./components/CustomerList";
import SalesForm from "./components/SalesForm";
import SalesList from "./components/SalesList";
import SalesReport from "./components/SalesReport";
import Home from "./components/home";

export default function App() {
  const [logged, setLogged] = useState(false);
  const [page, setPage] = useState("login");

  // Si ya hay token: usuario ya está logueado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogged(true);
      setPage("create-sale"); // ⬅️ Al entrar → va directo a Create Sale
    }
  }, []);

  const handleLoginSuccess = () => {
    setLogged(true);
    setPage("create-sale"); // ⬅️ Después del login → Create Sale
  };

  if (!logged) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{ padding: 20 }}>
      <Navbar setPage={setPage} />

      {page === "home" && <Home />}
      {page === "customers" && <CustomerList />}
      {page === "create-sale" && <SalesForm />}
      {page === "sales-list" && <SalesList />}
      {page === "sales-report" && <SalesReport />}
    </div>
  );
}
