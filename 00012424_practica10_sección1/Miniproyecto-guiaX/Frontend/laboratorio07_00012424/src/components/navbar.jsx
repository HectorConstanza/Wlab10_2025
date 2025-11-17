export default function Navbar({ setPage }) {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav style={{
      display: "flex",
      gap: "20px",
      padding: "10px",
      background: "#f0f0f0",
      marginBottom: "20px",
      borderBottom: "2px solid #ccc"
    }}>
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("customers")}>Customers</button>
      <button onClick={() => setPage("create-sale")}>Create Sale</button>
      <button onClick={() => setPage("sales-list")}>Sales List</button>
      <button onClick={() => setPage("sales-report")}>Sales Report</button>

      <button style={{ marginLeft: "auto", background: "red", color: "white" }} onClick={logout}>
        Logout
      </button>
    </nav>
  );
}
