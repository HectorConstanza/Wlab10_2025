
import { pool } from "../data/bd/conexion.js";

// GET /api/customers
export const getCustomers = (req, res) => {
  pool.query("SELECT * FROM customers", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows || results);
  });
};

// GET /api/customers/search?code=XYZ
export const searchCustomers = (req, res) => {
  const { code } = req.query;

  pool.query("SELECT * FROM customers WHERE code = $1", [code], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows || results);
  });
};
