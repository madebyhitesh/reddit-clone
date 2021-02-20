import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb"

@ObjectType()
export class User {

    @Field(() => String)
    readonly _id?: ObjectId

    @Field()
    @Property({ unique: true })
    email?: string;

    @Field()
    @Property({ unique: true })
    username?: string;

    @Property({ required: true })
    public password!: string

    @Field(() => Date)
    @Property({ default: new Date() })
    createdAt?: Date

    @Field()
    @Property({ default: 0 })
    count?: number

    @Field(() => Date)
    @Property({ default: new Date() })
    updatedAt?: Date

}


export const UserModal = getModelForClass(User)





