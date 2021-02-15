import { CookieOptions } from "express"
import { Cookie, Session, SessionData, SessionOptions } from "express-session"
import { InputType, Field, ObjectType } from "type-graphql"
import { User } from "../entity/User"


//input for registering and login the user
@InputType()
export class UsernamePasswordInput {
    @Field({ nullable: false })
    username?: string

    @Field({ nullable: false })
    password?: string

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

    @Field(() => String, { nullable: true })
    token?: string
}

export type MyContext = {
    res: Express.Response & { clearCookie: Session };
    req: Express.Request & { session: Session & Partial<SessionData> & { token?: string }; };
}
