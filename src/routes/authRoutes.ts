import express from "express";
import {signUp, getSignUp, getlogin, login} from "../controllers/authController"

const router = express.Router();

router.get('/signup', getSignUp);

router.post('/signup', signUp);

router.get('/login', getlogin);

router.post('/login', login);

export default router