import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";



@ObjectType()
export class Post {

    @Field()
    readonly _id?: string

    @Field(() => Int, { nullable: true })
    hasVote?: number

    @Field(() => String, { nullable: true })
    @Property()
    title?: string;

    @Field(() => String, { nullable: true })
    @Property()
    body?: string;

    @Field()
    textSnippet?: string;

    @Field(() => User)
    @Property({ ref: () => User, required: true })
    creatorId!: Ref<User>

    @Field(() => Int)
    @Property({ default: 0 })
    points?: number

    @Field(() => Date)
    @Property({ default: new Date() })
    createdAt?: Date

    @Field(() => Date)
    @Property({ default: new Date() })
    updatedAt?: Date

}


export const PostModal = getModelForClass(Post)