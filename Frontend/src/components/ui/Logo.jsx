import { NavLink } from "react-router-dom";
import classes from './styles/Logo.module.css'
export const Logo = () =>
{
    return (
        <NavLink
            to="/"
            className={classes.logoContainer}
        >
            HIVO
        </NavLink>
    )
}