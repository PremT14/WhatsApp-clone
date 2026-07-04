import {   Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { UUID } from "node:crypto";

interface jwtPayload{
    userId: UUID;
    iat: number;
    exp: number;
}

declare global{
    namespace Express{
        interface Request{
            user?: jwtPayload
        }
    }
}

const isAuth= async (req: Request, res: Response, next: NextFunction) => {
    const authHeader:string = req.cookies.token;

    if (!authHeader) {
        console.log("---------reached inside if check--------", authHeader)
        res.status(401).send('Authorization failed');
        res.redirect('/login')
        return;
    }

    const token = authHeader;
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET as string) as jwtPayload;
        // console.log("--------after verification----------------", req.user);
        if(!req.user){
            res.status(404).send('Authorization failed token not found');
            res.redirect('/login');
            return;
        }
        next()
    } catch (err) {
        res.status(401).send('Error occurred while verifying the token');
        next(err);
    }
};


export default isAuth;