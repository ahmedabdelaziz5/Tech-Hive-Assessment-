import React, { useEffect } from 'react'
import EditProfileUi from './EditProfileUi'
import { useDispatch, useSelector } from 'react-redux'
import useHttp from '../../../hooks/use-http';
import { compareObjects } from '../../../helpers/compareObjects';
import { useSnackbar } from 'notistack';
import { authActions } from '../../../store/auth-slice';
import {  userModulePath } from '../../../config';
import useGetMyProfile from '../../../hooks/commonApis/use-get-my-profile';

const EditProfile = () =>
{
    const userData = useSelector(state => state.auth.userData);
    // clean object for only data can edit
    const initialUserData = {
        userName: userData.userName,
        email: userData.email,
        age: userData.age,
    }

    const {
        sendRequest: editProfile,
        isLoading: isLoadingEditProfile
    } = useHttp();

    const { enqueueSnackbar: popMessage } = useSnackbar();
    const dispatch = useDispatch();

    const handleEditProfile = (values) =>   
    {
        const submitData = compareObjects(initialUserData, values)

        if (!Object.keys(submitData).length)
        {
            popMessage("You didn't change anything to save")
            return
        }

        const getResponse = ({ message }) =>
        {
            if (message.includes("success"))
            {
                popMessage("Your data edited successfully", { variant: "success" })
                dispatch(authActions.updateUserData(values))
            }
        };

        editProfile(
            {
                url: `${ userModulePath}/editProfile`,
                method: "PATCH",
                body: submitData,
            },
            getResponse
        );
    }

    const {
        handleGetMyProfile,
    } = useGetMyProfile();
    useEffect(() =>
    {
        handleGetMyProfile();
    }, [handleGetMyProfile])
    return (
        <EditProfileUi
            initialUserData={initialUserData}
            handleEditProfile={handleEditProfile}
            isLoadingEditProfile={isLoadingEditProfile}
        />
    )
}

export default EditProfile