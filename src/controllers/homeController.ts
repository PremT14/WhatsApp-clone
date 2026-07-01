import User from "../models/user";
import { Request, Response, NextFunction } from "express"

interface customfunc {
    (par1: Request, par2: Response, par3: NextFunction): void;
}

const getHomePage: customfunc = (req, res, next) => {
    try {
        const chat: string[] = [];
        res.render("home/homePage",{
            pageTitle: "homepage",
            chat: chat
        });
    } catch (error) {
        console.log("Error occured while rendering the page", error)
        next(error);
    }
}


export {
    getHomePage
}
