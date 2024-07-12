import { useLocation, useNavigate } from 'react-router-dom'

const useNavigateBack = (defaultPath) =>
{
    const navigate = useNavigate();
    const location = useLocation();

    const navigateBack = () =>
    {
        if (location.key !== "default")
        {
            navigate(-1)
        } else
        {
            navigate(defaultPath || "/")
        }
    }
    
    return navigateBack;
}

export default useNavigateBack