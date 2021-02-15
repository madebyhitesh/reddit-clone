import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql"
import { User, UserModal } from "../entity/User"
import argon2 from "argon2"
import jwt, { verify } from "jsonwebtoken"
import { UserResponse, UsernamePasswordInput, Message, MyContext } from "../@types/interfaces"
import { COOKIE_NAME, JWT_SECRET } from "../constants"


@Resolver()
export class UserResolver {

    // query to get all the users available
    @Query(() => UserResponse)
    async me(
        @Ctx() { req }: MyContext
    ) {

        if (!req.session.token) {
            {
                return {
                    message: {
                        type: "Token Not Found",
                        message: "Unauthorized"
                    }
                }
            }
        } else {
            const data = verify(req.session.token, JWT_SECRET!) as User
            const users = await UserModal.find({ _id: data._id })
            if (users)
                return {
                    user: users
                }

            return {
                message: {
                    type: "NOT FOUND",
                    message: "No user found"
                }
            }


        }
    }
    // mutation to resgister a new user
    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { res, req }: MyContext
    ): Promise<UserResponse | undefined> {

        const { username, password } = options;
        //check if arguments exists or not if not then return error
        if (!username || !password)
            return {
                message: {
                    type: "BAD REQUEST",
                    message: "Fill all the required feilds"
                }
            }
        try {

            const checkUser = await UserModal.findOne({ username })
            //user with same username already exist return erorr
            if (checkUser)
                return {
                    message: {
                        type: "BAD REQUEST",
                        message: "User already exists"
                    }
                }

            //hashing the password before saving
            const hashPassword = await argon2.hash(password)
            if (!hashPassword)
                return { message: { type: "hash", message: "someting went wrong with hashing password" } }

            const newUser = new UserModal({
                username: options.username,
                password: hashPassword
            })
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!)
            if (!token)
                return { message: { type: "TOKEN", message: "someting went wrong with generating token" } }
            else {
                await newUser.save()
                req.session.token = token;

                return {
                    user: [newUser]
                }
            }

        } catch (error) {
            return {
                message: {
                    type: "SERVER_ERROR",
                    message: "Something went wrong try again later"
                }
            }

        }
    }

    //mutation for loggin in the user
    @Mutation(() => UserResponse)
    async login(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse | undefined> {

        const { username, password } = options;
        //check if arguments exists or not if not then return error
        if (!username || !password)
            return {
                message: {
                    type: "BAD REQUEST",
                    message: "Fill all the required feilds"
                }
            }

        try {
            // find user using the username passed in arguments
            const user = await UserModal.findOne({ username })
            //if no user found return erorr
            if (!user)
                return {
                    message: {
                        type: "BAD REQUEST",
                        message: "User doesn't exists"
                    }
                }

            //if user found verify the hased password
            const verify = await argon2.verify(user.password, password)
            //if password is incorrect return the error
            if (!verify)
                return { message: { type: "BAD REQUEST", message: "Incorrect Password" } }
            else {


                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!)
                if (token)
                    req.session.token = token;
                return {
                    user: [user]
                }

            }

        } catch (error) {
            return {
                message: {
                    type: "SERVER_ERROR",
                    message: "Something went wrong try again later"
                }
            }
        }

    }
    //mutation to delete the user using username
    @Mutation(() => Message)
    async deleteUser(
        @Arg("username", () => String) username: string
    ): Promise<Message | undefined> {

        //check if arguments exists or not if not then return error
        if (!username)
            return {
                type: "BAD REQUEST",
                message: "Username required"
            }


        try {
            // find user using the username passed in arguments
            const user = await UserModal.findOne({ username })
            //if no user found return erorr
            if (!user)
                return {
                    type: "BAD REQUEST",
                    message: "User doesn't exists"
                }
            await user.deleteOne()

            return {
                type: "Sucess",
                message: "User deleted sucessfully"
            }

        } catch (error) {
            return {
                type: "SERVER_ERROR",
                message: "Something went wrong try again later"
            }
        }

    }
    //mutaion of change the password of the user
    @Mutation(() => Message)
    async changePassword(
        @Arg("options") options: UsernamePasswordInput
    ): Promise<Message | undefined> {

        const { username, password } = options
        //check if arguments exists or not if not then return error
        if (!username || !password)
            return {
                type: "BAD REQUEST",
                message: "Username required"
            }


        try {
            // find user using the username passed in arguments
            const user = await UserModal.findOne({ username })
            //if no user found return erorr
            if (!user)
                return {
                    type: "BAD REQUEST",
                    message: "User doesn't exists"
                }

            // hash the password send in the args
            const hashedPassword = await argon2.hash(password)

            // if password is not hashed properly return the error
            if (!hashedPassword)
                return { type: "hash", message: "someting went wrong with hashing password" }

            //set the current password to new password
            user.password = hashedPassword
            // set the updated at to current date
            user.updatedAt = new Date()

            await user.save()

            return {
                type: "Sucess",
                message: "Password changed sucessfully"
            }

        } catch (error) {
            return {
                type: "SERVER_ERROR",
                message: "Something went wrong try again later"
            }
        }

    }

    @Mutation(() => Boolean)
    async logout(
        @Ctx() { req, res }: MyContext
    ) {
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    return false
                }
            })
            return true
        }

        return false

    }

}