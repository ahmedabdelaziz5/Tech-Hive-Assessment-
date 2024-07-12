import classes from './styles/HeaderText.module.css'

export const HeaderText = ({ children, size, align }) =>
{
    return (
        <h1
            className={`
                ${classes.basics}
                ${size === "medium" && classes.medium}
                center-text
            `}
        >{children}
        </h1>
    )
}