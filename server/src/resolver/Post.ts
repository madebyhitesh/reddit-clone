import { Arg, Ctx, Mutation, Resolver, UseMiddleware, Query, Args } from "type-graphql";
import { InputCreatePost, MyContext, PostResponse, } from "../@types/interfaces";
import { PostModal } from "../entity/Post";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class PostResolver {
    @Query(() => PostResponse)
    async getPost(
        // @Arg("options") options: InputPaginateOptions,
    ): Promise<PostResponse> {

        try {

            const posts = await PostModal.find({}).populate("creatorId").sort({ createdAt: -1 })


            if (!posts)
                return {
                    message: {
                        type: "NOT FOUND",
                        message: "No post found"
                    }
                }

            return {
                posts: posts
            }


        } catch (error) {
            return {
                message: {
                    type: "SERVER ERROR",
                    message: "Something went wrong with sever"
                }
            }
        }

    }
    //mutation to create a new post
    @Mutation(() => PostResponse)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg("options") options: InputCreatePost,
        @Ctx() { req }: MyContext
    ): Promise<PostResponse> {
        const { body, title } = options;

        if (!body && !title) {
            return {
                message: {
                    type: "Bad Request",
                    message: "Fill all the required feilds"
                }
            }
        }

        try {
            const newPost = new PostModal({
                body,
                title,
                creatorId: req.userId
            })

            const savePost = await newPost.save()
            const response = await savePost.populate("creatorId").execPopulate()
            console.log(response)
            // await newPost.save()

            return {
                posts: [response]
            }
        } catch (error) {

            return {
                message: {
                    type: "Bad Request",
                    message: "Fill all the required feilds"
                }
            }
        }


    }

}