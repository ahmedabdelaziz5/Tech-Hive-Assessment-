import { IconButton, Tooltip } from "@mui/material"
import classes from './styles/ArrayIconBtn.module.css'
export const ArrayIconBtn = (props) =>
{
    const { children, title, onClick, disabled } = props;
    return (
        <div
            style={{ width: "30px" }}
        >
            {!disabled ? (
                <Tooltip
                    title={title}
                >
                    <IconButton
                        type="button"
                        onClick={onClick}
                        className={classes.arrayIconBtn}
                    >
                        {children}
                    </IconButton>
                </Tooltip>
            ) :
                (null)
            }
        </div>

    )
}