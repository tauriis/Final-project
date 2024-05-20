import express from 'express';
import { login, register, getAll } from '../controllers/UserController';

const router = express.Router();

router.route("/auth").get(getAll).post(login);
router.post("/register", register);

export default router;