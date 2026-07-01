import express from "express";
import {getHomePage} from "../controllers/homeController"
import isAuth from "../authMiddleware/isAuth";

const router = express.Router();

router.get('/homepage', isAuth, getHomePage);

export default router