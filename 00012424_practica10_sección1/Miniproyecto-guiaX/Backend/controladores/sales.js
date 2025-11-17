import { pool } from "../data/bd/conexion.js";

// POST /api/sales
export const createSale = (req, res) => {
  const { amount, id_customer } = req.body;

  // 1️⃣ Validar cliente
  pool.query("SELECT id FROM customers WHERE id = $1", [id_customer], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.rows.length === 0) {
      return res.status(400).json({ error: "El cliente no existe" });
    }

    // 2️⃣ Insertar la venta
    pool.query(
      "INSERT INTO sales (amount, created_at, id_customer) VALUES ($1, NOW(), $2)",
      [amount, id_customer],
      (error2) => {
        if (error2) {
          throw error2;
        }
        res.status(200).json({ message: "Venta registrada correctamente" });
      }
    );
  });
};

// GET /api/sales
export const getSales = (req, res) => {
  pool.query(
    `SELECT s.id, s.amount, s.created_at, c.name AS customer_name
     FROM sales s
     JOIN customers c ON s.id_customer = c.id`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows || results);
    }
  );
};

// GET /api/sales/report
export const getSalesReport = (req, res) => {
  pool.query(
    `SELECT c.name AS customer, SUM(s.amount) AS total_sales
     FROM sales s
     JOIN customers c ON s.id_customer = c.id
     GROUP BY c.id`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows || results);
    }
  );
};
