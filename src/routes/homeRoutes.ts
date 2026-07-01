import express from "express";
import {signUp, getSignUp, getlogin, login} from "../controllers/authController"

const router = express.Router();

router.get('/homepage', getSignUp);

export default router