import { useDispatch } from "react-redux";

import useHttp from "../../../../hooks/use-http";
import { authActions } from "../../../../store/auth-slice";
import {  userModulePath } from "../../../../config";

const useChangeProfilePic = () =>
{
    // useChangeProfilePic hook to handle call changeProfileImage API

    const {
        sendRequest: changeProfilePic,
        isLoading: isLoadingChangeProfilePic,
    } = useHttp();
    const dispatch = useDispatch();

    const handleChangeProfilePic = (reqBody, newImage) =>
    {

        const getResponse = (res) =>
        {
            if (res?.success || res?.message.includes("success"))
            {
                dispatch(authActions.updateUserData({ profileImage: res?.imageUrl || newImage }))
            }
        };

        changeProfilePic(
            {
                url: `${ userModulePath }/changeProfileImage`,
                method: "POST",
                body: reqBody,
                contentType: "form-data",
            },
            getResponse
        );
    }

    return {
        handleChangeProfilePic,
        isLoadingChangeProfilePic
    }
}

export default useChangeProfilePic;