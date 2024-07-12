import { useDispatch } from "react-redux";
import { useCallback } from "react";

import useHttp from "../use-http";
import {  userModulePath } from "../../config";
import { authActions } from "../../store/auth-slice";

const useGetMyProfile = () =>
{
    const {
        isLoading: isLoadingGetMyProfile,
        sendRequest: getMyProfile
    } = useHttp();

    const dispatch = useDispatch();

    const handleGetMyProfile = useCallback((onSuccess) =>
    {
        const getResponse = ({ message, data }) =>
        {
            if (message === "success")
            {
                const updatedProfileData = { ...data.profileDetails, ...data, matchId: data?.matchId?._id }
                dispatch(authActions.updateUserData(updatedProfileData))
            }
        };

        getMyProfile(
            {
                url: `${userModulePath}/getUserProfile`,
            },
            getResponse
        );
    }, [dispatch, getMyProfile])

    return {
        handleGetMyProfile,
        isLoadingGetMyProfile,
    }
}

export default useGetMyProfile;