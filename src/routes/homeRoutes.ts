import express from "express";
import {findUser, getHomePage, getPrivateChat, sendMessage} from "../controllers/homeController"
import isAuth from "../authMiddleware/isAuth";

const router = express.Router();

router.get('/homepage', isAuth, getHomePage);

router.post('/finduser', isAuth, findUser);

router.get('/chat/:receiverId', isAuth, getPrivateChat);

router.post('/send/:receiverId', isAuth, sendMessage);

export default router

