import classes from './styles/ButtonGroup.module.css'

export const ButtonGroup = ({ children }) =>
{
    // for add margin right to first btn
    return (
        <div
            className={classes.group}
        >
            {children}
        </div>
    )
}
