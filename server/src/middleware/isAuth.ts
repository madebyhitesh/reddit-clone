import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../@types/interfaces";
import { JWT_SECRET } from "../constants";
import { User } from "../entity/User";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
    const token = context.req.session.token;
    if (!token)
        throw new Error("Not authenticated");

    const decoded = verify(token, JWT_SECRET!) as User
    if (!decoded)
        throw new Error("Not authenticated");

    context.req.userId = decoded._id!
    return next()

}