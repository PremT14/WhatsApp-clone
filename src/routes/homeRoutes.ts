import express from "express";
import {getHomePage} from "../controllers/homeController"

const router = express.Router();

router.get('/homepage', getHomePage);

export default router