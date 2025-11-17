import express from "express";

// imports de módulos para validaciones
import { verifyToken } from "../utils/middlewares/verifyToken.js";

// Módulos controladores importados
import { SingIn } from "../controladores/signin.js";
import { SingUp } from "../controladores/signup.js";
import { displayHome } from "../controladores/displayHome.js";
import { getUserById, getUsers, getUsersDesc } from "../controladores/getUsers.js";
import { updateUser } from "../controladores/updateUser.js";
import { deleteUser } from "../controladores/deleteUser.js";
import { createSale }  from "../controladores/sales.js";
import { getSalesReport } from "../controladores/sales.js";
import { getSales } from "../controladores/sales.js";
import { getCustomers, searchCustomers} from "../controladores/customers.js";

// creación del enrutador 
const router = express.Router();

// Routes
router.get("/", displayHome);
router.post("/signin", SingIn);
router.post("/signup", SingUp);
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.put("/users/:id", verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);
router.post('/sales', verifyToken, createSale);
router.get('/sales/report', verifyToken, getSalesReport);
router.get('/sales', verifyToken, getSales);
router.get('/customers', verifyToken, getCustomers);
router.get('/customers/:id', verifyToken, searchCustomers);

export default router;