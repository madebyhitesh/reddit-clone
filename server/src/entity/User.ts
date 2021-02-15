import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {

    @Field()
    readonly _id?: string

    @Field()
    @Property({ unique: true })
    username?: string;

    @Property({ required: true })
    public password!: string

    @Field(() => Date)
    @Property({ default: new Date() })
    createdAt?: Date

    @Field(() => Date)
    @Property({ default: new Date() })
    updatedAt?: Date

}


export const UserModal = getModelForClass(User)





