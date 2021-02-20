import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../@types/interfaces";
import { JWT_SECRET } from "../constants";
import { User, UserModal } from "../entity/User";
import { genreateTokens } from "./generateTokens";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
    const tokens = context.req.cookies;
    const accessToken = (tokens.accessToken)
    const refreshToken = (tokens.refreshToken)


    if (!accessToken && !refreshToken) {
        return next()
    }

    if (accessToken) {
        const decodeAccessToken = verify(accessToken, JWT_SECRET!) as User
        if (decodeAccessToken) {
            context.req.userId = decodeAccessToken._id
            return next()
        }
    }

    const decodeRefreshToken = verify(refreshToken, JWT_SECRET!) as any
    if (decodeRefreshToken) {

        const user = await UserModal.findOne({ _id: decodeRefreshToken._id })

        if (!user)
            throw new Error("Not Authenticated");

        if (decodeRefreshToken!.count === user.count) {
            const { token, refreshToken } = genreateTokens(user)
            context.res.cookie("accessToken", token)
            context.res.cookie("refreshToken", refreshToken)
            context.req.userId = user._id;
            return next()
        }
    }

    return next()

}