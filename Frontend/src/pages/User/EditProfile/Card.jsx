import classes from './styles/Card.module.css'

const Card = ({ title, children, className }) =>
{
    return (
        <div
            className={`${classes.container} ${className}`}
        >
            <h4
                className={classes.title}
            >
                {title}
                <div className={classes.line} />
            </h4>
            {children}
        </div>
    )
}

export default Card