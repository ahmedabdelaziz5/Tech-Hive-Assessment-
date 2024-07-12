import { CircularProgress } from '@mui/material';
import { ProfilePic } from '../../../components/ui'
import classes from './Profile.module.css'
import ChangeProfilePic from './components/ChangeProfilePic'

const ProfileUi = (props) =>
{
    const {
        profileData,
        isMyProfile,
        handleChangeProfilePic,
        isLoadingChangeProfilePic
    } = props;

    return (
        <>
            <div
                className={classes.cover}
            >
                {/* Profile pic */}
                <div
                    className={classes.pic}
                >
                    {isLoadingChangeProfilePic && <div className={classes.loading}><CircularProgress thickness={2} /></div>}
                    <ProfilePic
                        userName={profileData?.userName}
                        profileImage={profileData?.profileImage}
                    />
                    {isMyProfile &&
                        <ChangeProfilePic
                            handleChangeProfilePic={handleChangeProfilePic}
                            isLoadingChangeProfilePic={isLoadingChangeProfilePic}
                        />}
                </div>

            </div>
            <div
                className={classes.content}
            >
                {/* User data section */}
                <div
                    className={classes.userData}
                >
                    <h4>
                        Username: {profileData.userName}
                    </h4>
                    <p>
                        Email: {profileData.email}
                    </p>

                    <p>
                        National ID: {profileData.nationalId}
                    </p>
                    <p>
                        Age: {profileData.age}
                    </p>
                    <p>
                        Gender: {profileData.gender}
                    </p>
                    <p>
                        Location: {profileData.location}
                    </p>
                </div>

            </div >
        </>
    )
}

export default ProfileUi