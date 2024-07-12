import classes from './styles/Card.module.css'

export const Card = ({ children, className }) =>
{
    return (
        <div
            className={`${classes.container} ${className}`}
        >
            {children}
        </div>
    )
}
