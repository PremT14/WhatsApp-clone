import User from "../models/user";
import bcrypt from "bcrypt"
import { Request, Response, NextFunction } from "express"

interface customfunc {
    (par1: Request, par2: Response, par3: NextFunction): void;
}

const getSignUp: customfunc = (req, res, next) => {
    try {
        res.render("auth/signup", {
            pageTitle: "SignUp"
        });
    } catch (error) {
        console.log("Error occured while rendering the page", error)
        next(error);
    }
}

const signUp: customfunc = async (req, res, next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const mobileNumber = req.body.mobileNumber;
        const password = req.body.password;

        const isPresent = await User.findOne({
            where: {
                email: email
            }
        })

        if (isPresent) {
            res.status(409).json({
                success: false,
                message: "User with provided email is already present"
            })
            return;
        }
        const hashedPass = await bcrypt.hash(password, 12);

        const user = await User.create({
            id: crypto.randomUUID(),
            username,
            email,
            mobileNumber,
            password: hashedPass
        })

        console.log("User created-------------", user);

        res.redirect(' /login')

    } catch (error) {
        console.log("Server Error while signUp", error);
        next(error);
    }
}

const getlogin: customfunc = (req, res, next) => {
    try {
        res.render("auth/login", {
            pageTitle: "login"
        });
    } catch (error) {
        console.log("Error occured while rendering the page", error)
        next(error);
    }
}

const login: customfunc = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User with provided email is not present"
            })
            return;
        }
        const comparedPassword = bcrypt.compare(password, user.password);

        if (!comparedPassword) {
            res.status(404).json({
                success: false,
                message: "Entered credentials are wrong, Please check the credentials carefully"
            })
            return;
        }

        res.status(404).json({
            success: true,
            message: "Entry granted"
        })

    } catch (error) {
        console.log("Server Error while signUp", error);
        next(error);
    }
}


export {
    signUp,
    getSignUp,
    getlogin,
    login
}
