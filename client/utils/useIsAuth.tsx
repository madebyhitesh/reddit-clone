import { useEffect, useState } from "react"
import { useMeQuery } from "../generated/graphql"


const useIsAuth = () => {

    const [{ data }] = useMeQuery()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        if (!data?.me.user) {
            setIsLoggedIn(false)
        } else {
            setIsLoggedIn(true)
        }
    }, [data])

    return isLoggedIn
}

export default useIsAuth

