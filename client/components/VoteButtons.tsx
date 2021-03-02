import { Maybe } from 'graphql/jsutils/Maybe'
import React from 'react'
import { ArrowUpSquare, ArrowDownSquare } from 'react-bootstrap-icons'
import { useVoteMutation } from '../generated/graphql'

interface Props {
    postId: string,
    hasVote: Maybe<number>,
    points: number
}
const VoteButtons: React.FC<Props> = ({ postId, hasVote, points }) => {
    const [, vote] = useVoteMutation()
    return (
        <div className="points d-flex flex-column align-items-center mr-2 justify-content-start pt-2">
            <ArrowUpSquare cursor="pointer"
                color={hasVote === 1 ? "green" : "black"}
                size={24}
                onClick={() => vote({ postId, vote: 1 })} />
            <strong>{points}</strong>

            <ArrowDownSquare cursor="pointer"
                color={hasVote === -1 ? "red" : "black"}
                size={24} onClick={() => vote({ postId, vote: -1 })} />

        </div>
    )
}

export default VoteButtons
