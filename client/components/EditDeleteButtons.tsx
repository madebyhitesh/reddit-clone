import React from 'react'
import { Spinner } from 'react-bootstrap'
import { PencilSquare, TrashFill } from 'react-bootstrap-icons'
import { useMeQuery, useDeletePostMutation } from '../generated/graphql'
import NextLink from "next/link"


interface Props {
    id: string,
    creatorId: string
}


const EditDeleteButtons: React.FC<Props> = ({ id, creatorId }) => {
    const [{ data, fetching }] = useMeQuery()
    const [{ fetching: isDeleting }, deletePost] = useDeletePostMutation()
    if (fetching)
        return null

    if (!data)
        return null

    if (!data.me.user)
        return null

    if (data.me.user[0]._id !== creatorId)
        return null

    return (
        <div className="d-flex ml-auto align-items-center">
            {
                isDeleting ? <Spinner animation="border" /> :
                    <TrashFill className="mr-2" cursor="pointer" size={20} onClick={async () => {
                        await deletePost({ id })
                    }} />
            }
            <NextLink href={{ pathname: "/edit-post/[slug]", query: { slug: id } }}>
                <a href={`/post/${id}`} className="m-0 p-0" style={{ color: 'black' }}>
                    <PencilSquare cursor="pointer" size={20} />
                </a>
            </NextLink>
        </div>
    )
}

export default EditDeleteButtons;
