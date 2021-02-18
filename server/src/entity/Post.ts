import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Post {

    @Field()
    readonly _id?: string

    @Field(() => String, { nullable: true })
    @Property()
    title?: string;

    @Field(() => String, { nullable: true })
    @Property({ unique: true })
    body?: string;

    @Field(() => String)
    @Property({ ref: () => User })
    creatorId?: Ref<User>

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