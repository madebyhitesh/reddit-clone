import { Arg, Ctx, Mutation, Resolver, UseMiddleware, Query, Args, FieldResolver, Root } from "type-graphql";
import { InputCreatePost, Message, MyContext, PostResponse, } from "../@types/interfaces";
import { PostModal, Post } from "../entity/Post";
import { UserModal } from "../entity/User";
import { VoteModal } from "../entity/Votes";
import { isAuth } from "../middleware/isAuth";

@Resolver(Post)
export class PostResolver {
    // feild resolver to return the vote status of current logged in user
    @FieldResolver()
    @UseMiddleware(isAuth)
    async hasVote(
        @Root() post: any,
        @Ctx() { req }: MyContext
    ) {
        if (!req.userId)
            return null
        const vote = await VoteModal.findOne({ userId: req.userId, postId: post._id })

        if (!vote)
            return null

        if (vote.vote === 1)
            return 1
        else if (vote.vote === -1)
            return -1

    }
    // feild resolver to show snippet of the post body
    @FieldResolver()
    @UseMiddleware(isAuth)
    async textSnippet(
        @Root() post: any
    ) {

        if (post)
            return `${post.body?.slice(0, 25)}...`
    }

    @FieldResolver()
    // @UseMiddleware(isAuth)
    async creatorId(
        @Root() post: any,
        @Ctx() { getUserLoader }: MyContext
    ) {
        return await getUserLoader.load(post.creatorId)
        // const user = await UserModal.findOne({ _id: post.creatorId })
        // console.log("user", user)
        // if (user)
        //     return user
    }

    // get all the posts

    @Query(() => PostResponse)
    async getPost(
        @Arg("cursor", () => Date, { nullable: true }) cursor: Date,
    ): Promise<PostResponse> {



        try {
            if (!cursor) {

                const posts = await PostModal.find({}).limit(10).sort({ createdAt: -1 })

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
            } else {
                const posts = await PostModal.find({ createdAt: { $lte: cursor } }).limit(10).sort({ createdAt: -1 })

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
    // get single post using id
    @Query(() => PostResponse)
    async getSinglePost(
        @Arg("id") id: string
    ): Promise<PostResponse> {
        if (!id)
            return {
                message: {
                    type: "Give Id",
                    message: "Id is required"
                }
            }

        try {
            const post = await PostModal.findOne({ _id: id }).exec()

            if (!post)
                return {
                    message: {
                        type: "Not Found",
                        message: "There is no post related to this id"
                    }
                }

            return {
                posts: [post]
            }

        } catch (error) {
            return {
                message: {
                    type: "Server Error",
                    message: error.message
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

    @Mutation(() => Message)
    @UseMiddleware(isAuth)
    async deletePost(
        @Arg("id") id: string,
        @Ctx() { req }: MyContext
    ): Promise<Message> {

        try {

            const post = await PostModal.findOne({ _id: id })
            if (!post)
                return {
                    type: "Not Found",
                    message: "Post not found"
                }

            const isCreator = req.userId == post.creatorId

            if (!isCreator)
                return {
                    type: "Unautorized",
                    message: "This post does not belong to logged in user"
                }
            const votes = await VoteModal.find({ postId: id })
            console.log("votes", votes)
            if (!votes)
                return {
                    type: "Not Found",
                    message: "Votes not found"
                }

            await post.deleteOne()
            await VoteModal.deleteMany(votes)

            return {
                type: "Sucess",
                message: "Deleted succefully"
            }

        } catch (error) {
            return {
                type: "Server error",
                message: error.message
            }
        }
    }

    @Mutation(() => Message)
    async updatePost(
        @Arg("options") options: InputCreatePost
    ): Promise<Message> {
        const { postId, title, body } = options
        if (!body && !title && !postId) {
            return {
                type: "Bad Request",
                message: "Fill all the required feilds"
            }
        }

        try {
            const post = await PostModal.findById(postId).exec()

            if (!post)
                return {
                    type: "Bad Request",
                    message: "There is not post related to this id"
                }


            post.body = body;
            post.title = title;
            post.updatedAt = new Date()

            await post.save()

            return {
                type: "Sucess",
                message: "Updated sucessfully"
            }
        } catch (error) {

            return {
                type: "Bad Request",
                message: error.message
            }
        }

    }

}