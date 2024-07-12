import { Navigate, Route, Routes, } from 'react-router-dom'

import Login from '../pages/Guest/Login/Login'
import SignUp from '../pages/Guest/SignUp/SignUp'
import ForgetPassword from '../pages/Guest/ForgetPassword/ForgetPassword'
import ResetPassword from '../pages/Guest/ResetPassword/ResetPassword'
import ResendEmail from '../pages/Guest/ResendEmail/ResendEmail'

const Guest = () =>
{
    return (
        <Routes>
            <Route path='/signup' element={<SignUp />} >
                <Route path='resend-email' element={<ResendEmail />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<ForgetPassword />} />
            <Route path='/reset-password/*' element={<ResetPassword />} />

            <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
    )
}

export default Guest