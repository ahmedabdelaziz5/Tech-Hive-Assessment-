import { useSelector } from "react-redux"

import { ProfilePic } from "../ui"
import classes from './styles/ProfileIcon.module.css'
import { UserMenu } from '../common'
import { ReactComponent as ArrowTopIcon } from '../../assets/icons/arrowTop.svg'


export const ProfileIcon = ({ id, onClose }) =>
{
    // user data
    const userName = useSelector((state) => state.auth.userData?.userName);
    const profileImage = useSelector((state) => state.auth.userData?.profileImage);

    //handle ui pop menu
    const profileIconId = id
    const isMenuOpened = !!useSelector(state => state.ui.isPopMenuOpened)[profileIconId];
    return (
        <UserMenu
            id={profileIconId}
            openBtnType="icon"
            openBtnChild={
                <>
                    <ProfilePic
                        userName={userName}
                        profileImage={profileImage}
                    />
                    {(isMenuOpened && id !== "smallProfileMenu") && <ArrowTopIcon className={classes.arrow} />}
                </>
            }
            openBtnClassName={classes.profileIcon}
            containerClassName={id === "profileMenu" ? classes.bigScreens : classes.smallScreens}
            onClose={onClose}
        />
    )
}
