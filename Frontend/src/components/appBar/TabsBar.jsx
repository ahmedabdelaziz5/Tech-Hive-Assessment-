import { Tab, Tabs, Tooltip } from '@mui/material'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import homeIcon from '../../assets/icons/home.svg'
import classes from './styles/TabsBar.module.css'
import { Logo } from '../ui';
export const TabsBar = () =>
{
    //handle if page opened not from tabs active page 
    let url = window.location.pathname;
    const tabsUrl = {
        "/": 0,
    };
    const [value, setValue] = useState(tabsUrl[url] || false);

    const handleChange = (event, newValue) =>
    {
        setValue(newValue);
    };
    return (
        <div
            className={classes.container}
        >
            <div
                className={`
                        ${classes.height}
                        center-x
                        center-y
                    `}
            >
                <Logo />
            </div>
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="navigation tabs"
                TabIndicatorProps={{
                    style: {
                        background: "var(--text-header)",
                    }
                }}
            >
                <Tab
                    // sx={{ justifyContent: "left" }}
                    iconPosition="start"
                    icon={
                        <>
                            <Tooltip
                                title="Home"
                            >
                                <img src={homeIcon} alt="home" />
                            </Tooltip>
                        </>}
                    label="Home"
                    to="/"
                    component={NavLink}
                    className={`
                        ${classes.height}
                        ${classes.tab}
                    `}
                />
            </Tabs>
        </div>
    )
}
