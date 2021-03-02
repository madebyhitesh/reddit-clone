import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Message, MyContext, VoteStatusResponse } from "../@types/interfaces";
import { PostModal } from "../entity/Post";
import { Vote, VoteModal } from "../entity/Votes";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class VoteResolver {

    @Query(() => VoteStatusResponse)
    @UseMiddleware(isAuth)
    async getVoteStatus(
        @Arg("postId") postId: string,
        @Ctx() { req }: MyContext
    ): Promise<VoteStatusResponse> {
        const vote = await VoteModal.findOne({ userId: req.userId, postId })

        if (!vote)
            return {
                message: {
                    type: "Not Found",
                    message: "You have not voted for this post"
                }
            }

        return {
            vote
        }
    }

    @Mutation(() => Message)
    @UseMiddleware(isAuth)
    async vote(
        @Arg("postId") postId: string,
        @Arg("vote", () => Int) vote: number,
        @Ctx() { req }: MyContext
    ): Promise<Message> {

        if (!vote && !postId)
            return {
                type: "Not Found",
                message: "Please enter all the arguments"
            }

        try {
            const isUpvote = vote !== -1;
            const realValue = isUpvote ? 1 : -1;
            //checknig if the user already votes 
            const alreadyVoted = await VoteModal.findOne({ postId, userId: req.userId })

            if (alreadyVoted && alreadyVoted.vote !== realValue) {
                // if user has already voted but now changing vote

                alreadyVoted.vote = realValue;
                const voteCompleted = alreadyVoted.save()

                if (!voteCompleted) {
                    return {
                        type: "Oops",
                        message: "Something went wrong while savig your vote"
                    }

                }
                const post = await PostModal.findOne({ _id: postId })

                if (!post)
                    return {
                        type: "Post not found",
                        message: "There exist no post with this id"
                    };

                post.points! = post.points! + (2 * realValue)

                await post.save()

                return {
                    type: "Sucess",
                    message: "Your vote is done"
                }


            } else if (!alreadyVoted) {
                // new vote
                const newVote = new VoteModal({
                    userId: req.userId,
                    postId,
                    vote: realValue
                })

                const voteCompleted = await newVote.save({})

                if (!voteCompleted)
                    return {
                        type: "Not saved",
                        message: "Someting went wrong while saving the vote"
                    };

                const post = await PostModal.findOne({ _id: postId })

                if (!post)
                    return {
                        type: "Post not found",
                        message: "There exist no post with this id"
                    };

                post.points = post.points! + realValue;

                await post.save()

                return {
                    type: "Sucess",
                    message: "Your vote is done"
                }
            } else {
                return {
                    type: "Already voted",
                    message: "User already vo   ted"
                }
            }
        } catch (error) {
            return {
                type: "Server error",
                message: error.message
            }
        }
    }
}