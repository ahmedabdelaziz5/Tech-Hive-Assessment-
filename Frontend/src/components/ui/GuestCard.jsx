import classes from './styles/GuestCard.module.css'

export const GuestCard = ({ children, color }) =>
{
    return (
        <div className={`
                ${classes.container} 
                ${color === 'secondary' ?
                classes.secondary : ''}`}
        >
            {children}
        </div>
    )
}
