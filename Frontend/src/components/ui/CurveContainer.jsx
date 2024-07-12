import classes from './styles/CurveContainer.module.css'

export const CurveContainer = ({ children, color }) =>
{
    return (
        <div
            className={`${classes.container} ${color === 'secondary' ? classes.secondary :''}`}
        >
            {children}
        </div>
    )
}
