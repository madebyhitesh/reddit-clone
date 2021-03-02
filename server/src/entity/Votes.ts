import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb"
import { User } from "./User";
import { Post } from "./Post";



@ObjectType()
export class Vote {

    @Field(() => String)
    readonly _id?: ObjectId

    @Field(() => User)
    @Property({ ref: User })
    userId?: Ref<User>

    @Field(() => Post)
    @Property({ ref: Post })
    postId?: Ref<Post>

    @Field(() => Number)
    @Property({ required: true })
    vote?: number
}


export const VoteModal = getModelForClass(Vote)




