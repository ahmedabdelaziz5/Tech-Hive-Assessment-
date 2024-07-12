import { NavLink } from "react-router-dom"
import { ListItemIcon } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import { ProfilePic } from "../ui"
import classes from './styles/UserMenu.module.css'
import { PopUpMenu as PopUpMenuComponent } from '../common'
import { uiActions } from "../../store/ui-slice"
import { ReactComponent as SettingIcon } from '../../assets/icons/setting.svg'
import { ReactComponent as EditProfileIcon } from '../../assets/icons/profile.svg'
import { ReactComponent as ChangePasswordIcon } from '../../assets/icons/shield.svg'
import { ReactComponent as ExitIcon } from '../../assets/icons/exit.svg'
import { authActions } from "../../store/auth-slice"

export const UserMenu = ({ id, onClose, openBtnChild, openBtnClassName, openBtnType, containerClassName }) =>
{
    // user data
    const userId = useSelector((state) => state.auth.userData?._id);
    const userName = useSelector((state) => state.auth.userData?.userName);
    const profileImage = useSelector((state) => state.auth.userData?.profileImage);

    //handle ui pop menu
    const profileIconId = id
    const dispatch = useDispatch();
    const closeMenu = () =>
    {
        dispatch(uiActions.closePopMenu(profileIconId));
        onClose && onClose();
    };
    const menuItems = [
        {
            onClick: closeMenu,
            menuItemComponent: NavLink,
            children:
                <>
                    <ListItemIcon className={classes.icon}>
                        <ProfilePic
                            userName={userName}
                            profileImage={profileImage}
                        />
                    </ListItemIcon>
                    <p>
                        {userName}
                    </p>
                </>,
            to: `/profile?userId=${userId}`,
        },
        {
            onClick: closeMenu,
            menuItemComponent: NavLink,
            children:
                <>
                    <ListItemIcon className={classes.icon}>
                        <SettingIcon fill='var(--text-header)' />
                    </ListItemIcon>
                    Setting
                </>,
            to: "/profile/edit",
            className: classes.bigItem
        },
        {
            onClick: closeMenu,
            menuItemComponent: NavLink,
            children:
                <>
                    <ListItemIcon className={classes.icon}>
                        <EditProfileIcon fill='var(--text-header)' />
                    </ListItemIcon>
                    Edit Profile
                </>,
            to: "/profile/edit",
            className: classes.smItem
        },
        {
            onClick: closeMenu,
            menuItemComponent: NavLink,
            children:
                <>
                    <ListItemIcon className={classes.icon}>
                        <ChangePasswordIcon fill='var(--text-header)' />
                    </ListItemIcon>
                    Change Password
                </>,
            to: "/profile/change-password",
            className: classes.smItem
        },
        {
            onClick: () => { dispatch(authActions.logout()); closeMenu(); },
            children:
                <>
                    <ListItemIcon className={classes.icon}>
                        <ExitIcon fill='var(--text-header)' />
                    </ListItemIcon>
                    Logout
                </>,
        },
    ]

    return (
        <PopUpMenuComponent
            id={profileIconId}
            openBtnType={openBtnType}
            openBtnChild={openBtnChild}
            openBtnClassName={openBtnClassName}
            containerClassName={`${classes.container} ${containerClassName ? containerClassName : ""}`}
            menuItems={menuItems}
        />
    )
}
