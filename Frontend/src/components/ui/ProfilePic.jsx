import { Avatar } from "@mui/material";

import classes from './styles/ProfilePic.module.css'

export const ProfilePic = (props) =>
{
    const { userName, profileImage, component, to, className, onClick } = props;

    return (
        <Avatar
            className={`${classes.container} ${className ? className : ""}`}
            src={profileImage}
            component={component}
            to={to}
            onClick={onClick}
        >
            {(userName) && `${userName.split(' ')[0][0]}${userName.split(' ').length === 2 ? userName.split(' ')[1][0] : ""}`}
        </Avatar>
    )
}
