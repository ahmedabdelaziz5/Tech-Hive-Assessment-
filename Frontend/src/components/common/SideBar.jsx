import React from 'react'
import { Grid, Tab, Tabs, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';

import classes from './styles/SideBar.module.css'
import { ReactComponent as EditProfileIcon } from '../../assets/icons/profile.svg';
import { ReactComponent as ChangePasswordIcon } from '../../assets/icons/shield.svg';

export const SideBar = () =>
{
    //handle if page opened not from tabs active page 
    let url = window.location.pathname;
    const tabsUrl = {
        "/profile/edit": 0,
        "/profile/change-password": 1,
    };
    const [value, setValue] = React.useState(tabsUrl[url] || 0);

    const handleChange = (event, newValue) =>
    {
        setValue(newValue);
    };
    return (
        <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={1.5}
            xs={2}
            className={classes.container}
        >
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="navigation tabs"
                sx={{
                    "& a": {
                        textTransform: "none",
                        minHeight: 0,
                        fontSize: "16px"
                    },
                    "& .active path": {
                        fill: "var(--secondary) !important",
                    },
                    "& .active": {
                        color: "var(--secondary) !important",
                    },
                    width: "90%",
                    backgroundColor: "var(--primary)",
                    padding: "20px 0",
                    borderRadius: "  var(--border-radius-150)",
                }}
                TabIndicatorProps={{
                    style: {
                        width: '5px',
                        borderRadius: "0px 15px 15px 0px",
                        backgroundColor: "var(--secondary)",
                        left: 0,
                    }
                }}
                className={classes.tabs}
            >
                <Tab
                    sx={{ justifyContent: "left" }}
                    iconPosition="start"
                    icon={
                        <div
                            className={`center-x center-y ${classes.icon}`}
                        >
                            <Tooltip title="Public Profile">
                                <EditProfileIcon fill='var(--text-header)' />
                            </Tooltip>
                        </div>}
                    label="Public Profile"
                    to="/profile/edit"
                    component={NavLink} />
                <Tab
                    sx={{ justifyContent: "left" }}
                    iconPosition="start"
                    icon={
                        <div
                            className={`center-x center-y ${classes.icon}`}
                        >
                            <Tooltip title="Password">
                                <ChangePasswordIcon fill='var(--text-header)' />
                            </Tooltip>
                        </div>}
                    label="Password"
                    to="/profile/change-password"
                    component={NavLink} />
            </Tabs>
        </Grid>
    )
}
