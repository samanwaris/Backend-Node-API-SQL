import express from "express";

import { getSuratJalan } from "../controllers/suratJalanController.js";
import { verifyUser } from "../middleware/userMidleware.js";

const router = express.Router();
// router.get(
//   "/getSuratJalanByPage/:pageNumber/:pageSize",
//   verifyUser,
//   getSuratJalan
// );
router.post("/getSuratJalan", verifyUser, getSuratJalan);

export default router;
