import "./css/navbar.css"; // ⬅️ IMPORTANTE

export default function Navbar({ setPage }) {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("customers")}>Customers</button>
        <button onClick={() => setPage("create-sale")}>Create Sale</button>
        <button onClick={() => setPage("sales-list")}>Sales List</button>
        <button onClick={() => setPage("sales-report")}>Sales Report</button>
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}
