import { useMeQuery } from "../generated/graphql"


const useIsAuth = () => {
    const [{ data, fetching }] = useMeQuery()

    const isLogged = () => {
        if (data?.me.user && !fetching) {
            return true
        } else
            return false
    }

    return { isLogged }

}

export default useIsAuth

