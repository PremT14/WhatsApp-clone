import { type Request, type Response, type NextFunction } from "express";
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
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        res.status(401).send('Authorization failed');
        return;
    }

    const token = authHeader.split(' ')[1] as string;
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET as string) as jwtPayload;
        if(!req.user){
            res.status(404).send('Authorization failed token not found');
            return;
        }
        next()
    } catch (err) {
        res.status(401).send('Error occurred while verifying the token');
        next(err);
    }
};


export default isAuth;