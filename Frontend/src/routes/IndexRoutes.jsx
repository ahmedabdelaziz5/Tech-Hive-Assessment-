
import { useSelector } from 'react-redux'

import Guest from './Guest'
import User from './User'

const IndexRoutes = () =>
{
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    return (
        <>
            {
                isLoggedIn ?
                    <User /> :
                    <Guest />
            }
        </>
    )
}

export default IndexRoutes