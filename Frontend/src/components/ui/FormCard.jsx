import classes from './styles/FormCard.module.css'

export const FormCard = ({ children, size, action, isSignUp }) =>
{
    return (
        <div
            className={`
                ${classes.formCard} 
                ${size === "big" ?
                    classes.big :
                    size === "full" ?
                        classes.full :
                        classes.small
                }
                ${!isSignUp ? classes.contentNotSignUp : ""}
            `}
        >
            <div
                className={`
                ${classes.content} 
                ${size === "full" ? classes.fullContent : ""}
                `}
            >
                {children}
            </div>
            {!!action && (
                <div
                    className={classes.action}
                >
                    {action}
                </div>
            )}
        </div>
    )
}