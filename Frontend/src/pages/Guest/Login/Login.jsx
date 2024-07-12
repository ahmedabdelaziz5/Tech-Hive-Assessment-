import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginUi from './LoginUi'
import useHttp from '../../../hooks/use-http';
import { authActions } from '../../../store/auth-slice';

const Login = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        isLoading: isLoadingLogin,
        sendRequest: login
    } = useHttp();

    const handleLogin = async (values) =>
    {
        const getResponse = ({ message, token, data }) =>
        {
            if (message === "success")
            {
                navigate("/", { replace: true });
                dispatch(authActions.login({
                    token: token,
                    userData: {  ...data }
                }))
            }
        };

        await login(
            {
                url: `user/login`,
                method: "post",
                body: values,
            },
            getResponse
        );
    }

    return (
        <LoginUi
            handleLogin={handleLogin}
            isLoadingLogin={isLoadingLogin}
        />
    )
}

export default Login