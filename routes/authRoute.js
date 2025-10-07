
import express from "express";
import {Login, logOut, GetMe} from "../controllers/authController.js";

const router = express.Router();

router.get('/GetMe', GetMe);
router.post('/login', Login);
router.delete('/logout', logOut);

export default router;