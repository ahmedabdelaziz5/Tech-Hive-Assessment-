import { LoadingButton } from '@mui/lab';

import classes from './styles/OutlinedBtn.module.css'
import btnClasses from './styles/Btn.module.css'
import { NavLink } from 'react-router-dom';

export const OutlinedBtn = (props) =>
{
    const {
        children,
        onClick,
        isLoading,
        type,
        size,
        endIcon,
        startIcon,
        className,
        disabled,
        ...rest
    } = props;
    return (
        <LoadingButton
            type={type}
            onClick={onClick}
            loading={isLoading}
            fullWidth={size !== "small"}
            className={`
            ${btnClasses.btn} 
            ${classes.outlined}
            ${className} 
            ${size === "small" ? btnClasses.small : ""}
            `}
            endIcon={endIcon}
            startIcon={startIcon}
            disabled={disabled}
            LinkComponent={NavLink}
            {...rest}
        >
            {children}
        </LoadingButton>
    )
}