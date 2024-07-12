import {  Grid,  } from '@mui/material'

import classes from './styles/Navbar.module.css'
import { ProfileIcon } from './ProfileIcon'
import { Logo, Tooltip } from '../ui'

export const NavBar = () =>
{

    return (
        <Grid
            container
            className={classes.container}
            columnSpacing={{ sm: 0.5 }}
        >
            {/* logo + search bar */}
            <Grid
                item
                xl={4}
                lg={3.5}
                md={4}
                sm={6}
                xs={4}
                className="center-y"
            >
                <div className={classes.logo}>
                    <Logo />
                </div>
            </Grid>

            {/* rights icons */}
            <Grid
                item
                lg={2}
                md={2}
                sm={2.5}
                className={`${classes.rightIcons} center-y `}
            > 
                <Tooltip
                    title={'User Menu'}
                >
                    <div className={classes.profileIcon}>
                        <ProfileIcon id={"profileMenu"} />
                    </div>
                </Tooltip>
            </Grid>
        </Grid>
    )
}
