import User from "../models/user";
import { Request, Response, NextFunction } from "express"

interface customfunc {
    (par1: Request, par2: Response, par3: NextFunction): void;
}

const data = [
  {
    "id": 101,
    "sender_name": "Alice Smith",
    "profile_picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWszUrHnkNi1xphLHyMGFf2suJ3mYN0F1bmonj0LKLLA&s=10",
    "message": "Hey! Are we still meeting for lunch today?",
    "created_at": "2026-07-01T10:15:30Z",
    "is_read": true
  },
  {
    "id": 102,
    "sender_name": "Bob Jones",
    "profile_picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYlrGoB10X3HhLAyY2DVDlNUu9YttWchHJsjikg2vlGg&s=10",
    "message": "Yes, I will be there by 12:30 PM.",
    "created_at": "2026-07-01T10:16:12Z",
    "is_read": true
  },
  {
    "id": 103,
    "sender_name": "Charlie Brown",
    "profile_picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdZTRcCp5iC8oydTxw48RqUdue4uHyNKbMN727VyOmIQ&s=10",
    "message": "Can you please send me the project files?",
    "created_at": "2026-07-01T10:17:05Z",
    "is_read": false
  },
  {
    "id": 104,
    "sender_name": "Diana Prince",
    "profile_picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Up4CKstdL30cJh67IHNNMkGucXwRnB9jv42p3BsmVw&s=10",
    "message": "The review meeting is scheduled for tomorrow at 9 AM.",
    "created_at": "2026-07-01T11:02:45Z",
    "is_read": true
  },
  {
    "id": 105,
    "sender_name": "Evan Wright",
    "profile_picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxrlZTMXHB9pHkp_Tp-F-pBcCbAu7yvN_1tmWN68Xx2g&s=10",
    "message": "Thanks for the update, I will prepare the slides.",
    "created_at": "2026-07-01T11:05:18Z",
    "is_read": true
  },
  {
    "id": 106,
    "sender_name": "Fiona Gallagher",
    "profile_picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWBqR19S4kB-sbX5kS_YlgTIX8Vo1JyHeUYtNV1l-WbA&s=10",
    "message": "Did anyone leave their keys in the conference room?",
    "created_at": "2026-07-01T12:40:22Z",
    "is_read": false
  },
  {
    "id": 107,
    "sender_name": "George Clark",
    "profile_picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1f5DlXwOBotLfq_5WxHITefNB0G6OWkeXZdXawQBF4g&s=10",
    "message": "I think those might belong to the design team.",
    "created_at": "2026-07-01T12:42:01Z",
    "is_read": false
  },
  {
    "id": 108,
    "sender_name": "Hannah Abbott",
    "profile_picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK01fCameh4rYMMgDApSV1v-VXqLZP9xxrWb9AZii4Rw&s=10",
    "message": "Are you available for a quick debugging call?",
    "created_at": "2026-07-01T14:10:55Z",
    "is_read": true
  },
  {
    "id": 109,
    "sender_name": "Ian Malcolm",
    "profile_picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNdFUXsKvRBdN_WK7LkyTpIvAMuznPxSCgTNyeTPx9IQ&s=10",
    "message": "Life finds a way, but this bug certainly shouldn't.",
    "created_at": "2026-07-01T14:15:12Z",
    "is_read": true
  },
  {
    "id": 110,
    "sender_name": "Julia Roberts",
    "profile_picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxrlZTMXHB9pHkp_Tp-F-pBcCbAu7yvN_1tmWN68Xx2g&s=10",
    "message": "Great job on completing the sprint goals ahead of time!",
    "created_at": "2026-07-01T15:30:00Z",
    "is_read": false
  }
]


const getHomePage: customfunc = async(req, res, next) => {
    try {
        const userId = req.user?.userId;
        const user = await User.findByPk(userId);
        if(!user || !userId){
            res.status(404).json({
                success: false,
                message: "Authorization Failed"
            })
            return;
        }

        res.render("home/homePage",{
            pageTitle: "homepage",
            chat: data,
            user: user
        });
    } catch (error) {
        console.log("Error occured while rendering the page", error)
        next(error);
    }
}


export {
    getHomePage
}
