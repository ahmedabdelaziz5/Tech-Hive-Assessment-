import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import ProfileUi from './ProfileUi'
import { LoadingFullScreen } from '../../../components/ui';
import useGetMyProfile from '../../../hooks/commonApis/use-get-my-profile';
import useChangeProfilePic from './hooks/use-change-profile-pic';

const Profile = () =>
{
    const [searchParams] = useSearchParams();
    const myData = useSelector((state) => state?.auth?.userData);
    const myId = useSelector((state) => state?.auth?.userData)?._id;
    console.log("myID", myId)
    const userId = searchParams.get("userId");
    const navigate = useNavigate();
    const { enqueueSnackbar: popMessage } = useSnackbar();
    const currentUrl = window.location.href;
    // to handle where i come from like come from partners requests

    const {
        handleGetMyProfile,
        isLoadingGetMyProfile,
    } = useGetMyProfile();

    const onCopy = () =>
    {
        popMessage("Copied successfully")
    }

    useEffect(() =>
    {
        console.log("profile use eff")
        // in case no id
        if (!userId) navigate("/");

        handleGetMyProfile();
    }, [handleGetMyProfile, navigate, userId])

    const {
        handleChangeProfilePic,
        isLoadingChangeProfilePic
    } = useChangeProfilePic();

    return (
        <>
            {( isLoadingGetMyProfile || (!myData )) ?
                (<LoadingFullScreen />) : (
                    <ProfileUi
                        profileData={ myData }
                        isMyProfile={true}
                        currentUrl={currentUrl}
                        onCopy={onCopy}
                        handleChangeProfilePic={handleChangeProfilePic}
                        isLoadingChangeProfilePic={isLoadingChangeProfilePic}
                    />
                )}
        </>
    )
}

export default Profile