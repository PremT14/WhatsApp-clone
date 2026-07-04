import { UUID } from "node:crypto";
import User from "../models/user";
import Message from "../models/messages";
import { Request, Response, NextFunction } from "express"
import Connection from "../models/connection";
import { Op } from "sequelize"

interface customfunc {
  (par1: Request, par2: Response, par3: NextFunction): void;
}

const getHomePage: customfunc = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const user = await User.findByPk(userId);
    if (!user || !userId) {
      res.status(404).json({
        success: false,
        message: "Authorization Failed"
      })
      return;
    }

    const chat = await Connection.findAll({
      where: {
        userId,
      },
      include : [{
        model: User,
        as: "receiver"
      }]
    })

    res.render("home/homePage",{
      pageTitle: "homepage",
      chat,
      user: user,
    });
  } catch (error) {
    console.log("Error occured while rendering the page", error)
    next(error);
  }
}

const findUser: customfunc = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const user = await User.findByPk(userId);
    if (!user || !userId) {
      res.status(404).json({
        success: false,
        message: "Authorization Failed"
      })
      return;
    }

    const search = req.body.search;
    if (!search) {
      res.status(404).json({
        success: false,
        message: "Search space is empty"
      })
      return;
    }

    const finduser = await User.findOne({
      where: {
        mobileNumber: search
      }
    })

    if (!finduser) {
      res.status(404).json({
        success: false,
        message: "User with provided mobile number is not present"
      })
      return;
    }

    res.render('home/findUser', {
      pageTitle: "user",
      success: true,
      user,
      finduser,
    })

  } catch (error) {
    console.log("Server Error finding user", error);
    next(error);
  }
}


const getPrivateChat: customfunc = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const user = await User.findByPk(userId);
    if (!user || !userId) {
      res.status(404).json({
        success: false,
        message: "Authorization Failed"
      })
      return;
    }

    const receiverId = req.params.receiverId;
    const receiver = await User.findByPk(receiverId as UUID);

    if (!receiver) {
      res.status(404).json({
        success: false,
        message: "No receiver found"
      })
      return;
    }

    const chat = await Connection.findAll({
      where: {
        userId,
      },
      include : [{
        model: User,
        as: "receiver"
      }]
    })

    const message = await Message.findAll({
      where:{
        [Op.or]: [
          {senderId: userId},
          {senderId: receiverId},
        ]
      },
      order: [['createdAt' , 'ASC']]
    })

    // console.log(message)

    res.render("home/privateChat", {
      pageTitle: "homepage",
      chat,
      user: user,
      receiver,
      messages: message
    });
  } catch (error) {
    console.log("Error occured while getting private chat", error)
    next(error);
  }
}

const sendMessage: customfunc = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const user = await User.findByPk(userId);
    if (!user || !userId) {
      res.status(404).json({
        success: false,
        message: "Authorization Failed"
      })
      return;
    }

    const receiverId = req.params.receiverId as UUID;
    const receiver = await User.findByPk(receiverId);
    if(!receiver){
      res.status(404).json({
        success: false,
        message: "Receiver not present"
      })
      return;
    }
    
    const message = req.body.message;

    let connection = await Connection.findOne({
      where: {
        userId,
        receiverId
      }
    })

    if(!connection){
      connection = await Connection.create({
        id: crypto.randomUUID(),
        userId,
        receiverId,
      })
    }

    const newMessage = await Message.create({
      id: crypto.randomUUID(),
      senderId: userId,
      receiverId,
      message,
    })

    res.status(200).json({
      success: true,
      message: "Message Sent",
      newMessage,
      connection,
    })

  } catch (error) {
    console.log("Error occured while sending message", error)
    next(error);
  }
}


export {
  getHomePage,
  findUser,
  getPrivateChat,
  sendMessage
}

