import classes from './styles/Paragraph.module.css'

export const Paragraph = ({ children, align }) =>
{
    return (
        <p
            className={`
                ${classes.paragraph} 
                ${align === "left" ? classes.left : "center-text"}
            `}
        >{children}</p>
    )
}