import { useState } from 'react'
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined';

import { Input } from './'
import classes from './styles/Password.module.css'
export const Password = (props) =>
{
    const {
        ...rest
    } = props;
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) =>
    {
        event.preventDefault();
    };

    return (
        <Input
            type={showPassword ? 'text' : 'password'}
            {...rest}
        >
            <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                className={classes.iconButton}
            >
                {showPassword ?
                    <VisibilityOffIcon
                        className={classes.icon}
                    /> :
                    <VisibilityIcon
                        className={classes.icon}
                    />}
            </IconButton>
        </Input>
    )
}