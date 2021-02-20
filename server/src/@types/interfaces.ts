import { Session, SessionData } from "express-session"
import { InputType, Field, ObjectType } from "type-graphql"
import { Post } from "../entity/Post"
import { User } from "../entity/User"
import { ObjectId } from "mongodb"
import { IPaginateResult } from "typegoose-cursor-pagination"
import { Request, Response } from "express"



// interface IPaginateResult<T> {
//   hasNext: Boolean // hasNext is true if there is a next page
//   hasPrevious: Boolean // hasPrevious is true if there is a previous page
//   next: String // next is the cursor for the next page
//   previous: String // previous is the cursor for the previous page
//   totalDocs: Number // totalDocs is the total amount of docs for the query
//   docs: T[] // docs are the resulting documents for this page
// }

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
// pagination 
@InputType()
export class InputPaginateOptions {
    @Field()
    limit?: number; // The page size. Set 0 for no limit.
    @Field()
    sortField?: string; // The field name to query the range for. The field must be:

    @Field()
    sortAscending?: boolean; // True to sort using paginatedField ascending (default is false - descending).
    @Field({ nullable: true })
    next?: string; // The value to start querying the page.
    @Field({ nullable: true })
    previous?: string; // The value to start querying previous page.
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
@ObjectType()
export class PostResponsePaginated {
    @Field(() => Message, { nullable: true })
    message?: Message
    @Field(() => [Post], { nullable: true })
    posts?: IPaginateResult<Post>

}

export type MyContext = {
    res: Response;
    req: Request & { userId: ObjectId | undefined };
    // req: Request & { session: Session & Partial<SessionData> & { token?: string }; } & { userId: ObjectId }
}
