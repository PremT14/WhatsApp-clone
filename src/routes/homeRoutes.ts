import express from "express";
import {findUser, getHomePage} from "../controllers/homeController"
import isAuth from "../authMiddleware/isAuth";

const router = express.Router();

router.get('/homepage', isAuth, getHomePage);

router.get('/finduser', isAuth, findUser);

export default router