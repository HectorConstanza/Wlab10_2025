import { pool } from "../data/bd/conexion.js";
export const displayHome = async (req, res) => {
  return res.status(200).json({
    status: true,
    message: "🚀 Servidor activo y funcionando al 100%! 🔥"
  });
};
