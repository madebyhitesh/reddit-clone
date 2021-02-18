import { CookieOptions } from "express"
import { Cookie, Session, SessionData, SessionOptions } from "express-session"
import { InputType, Field, ObjectType } from "type-graphql"
import { Post } from "../entity/Post"
import { User } from "../entity/User"


//input for login the user
@InputType()
export class LoginInput {
    @Field({ nullable: false })
    username?: string

    @Field({ nullable: false })
    password?: string
}
//input for create post
@InputType()
export class InputCreatePost {
    @Field({ nullable: false })
    title?: string

    @Field({ nullable: false })
    body?: string
}
//input for registering  the user
@InputType()
export class RegisterInput {
    @Field({ nullable: false })
    username?: string

    @Field({ nullable: false })
    password?: string

    @Field({ nullable: false })
    email?: string
}


// type of error
@ObjectType()
export class Message {
    @Field()
    type?: string

    @Field()
    message?: string
}

@ObjectType()
export class UserResponse {
    @Field(() => Message, { nullable: true })
    message?: Message
    @Field(() => [User], { nullable: true })
    user?: User[]

}

@ObjectType()
export class PostResponse {
    @Field(() => Message, { nullable: true })
    message?: Message
    @Field(() => [Post], { nullable: true })
    posts?: Post[]

}

export type MyContext = {
    res: Express.Response & { clearCookie: Session };
    req: Express.Request & { session: Session & Partial<SessionData> & { token?: string }; } & { userId: string }
}
