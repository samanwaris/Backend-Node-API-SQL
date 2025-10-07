import express from "express";
import {
    getUsers
    //getUser
    // getUserById,
    // createUser,
    // updateUser,
    // deleteUser
} from "../controllers/userController.js";
import { verifyUser } from "../middleware/userMidleware.js";

const router = express.Router();

router.get('/getUsers', verifyUser, getUsers);
//router.get('/user', getUser);
// router.post('/users', verifyUser, adminOnly, createUser);
// router.patch('/users/:id', verifyUser, adminOnly, updateUser);
// router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

export default router;