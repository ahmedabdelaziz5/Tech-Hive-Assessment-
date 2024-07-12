import useHttp from "../../../../hooks/use-http";
import { useNavigate } from "react-router-dom";

import { userModulePath } from "../../../../config";

const useGetMyProfile = () =>
{
    const {
        isLoading: isLoadingGetMyProfile,
        sendRequest: getMyProfile
    } = useHttp();

    const navigate = useNavigate();
    const currentUrl = window.location.pathname;
    const handleGetMyProfile = (setProfileData, myId) =>
    {
        const getResponse = ({ message, data, profileDetails }) =>
        {
            if (message === "success")
            {
                setProfileData({ ...profileDetails, ...data })
                if (currentUrl !== "/profile") navigate(`/profile?userId=${myId}`)
            } else
            {
                navigate("/")
            }
        };

        getMyProfile(
            {
                url: `${userModulePath}/getUserProfile`,
            },
            getResponse
        );

    }
    return {
        handleGetMyProfile,
        isLoadingGetMyProfile,
    }
}

export default useGetMyProfile;