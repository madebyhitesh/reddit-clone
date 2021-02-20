import { sign } from "jsonwebtoken"
import { JWT_SECRET } from "../constants"
import { User } from "../entity/User"

export const genreateTokens = (user: User) => {

    const token = sign({ _id: user._id }, JWT_SECRET!, { expiresIn: "10h" })
    const refreshToken = sign({ _id: user._id, count: user.count }, JWT_SECRET!, { expiresIn: "7d" })
    return { token, refreshToken }
}