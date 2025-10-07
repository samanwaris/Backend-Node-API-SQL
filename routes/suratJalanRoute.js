import express from "express";

import { getSuratJalan } from "../controllers/suratJalanController.js";
import { verifyUser } from "../middleware/userMidleware.js";

const router = express.Router();
router.get("/getSuratJalan/:pageNumber/:pageSize", verifyUser, getSuratJalan);

export default router;
