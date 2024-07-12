import classes from './styles/PageLayout.module.css'

export const PageLayout = ({ children, type }) =>
{
    return (
        <div
            className={`${classes.container} ${type === 'guest' ? classes.guest : ''}`}
        >
            {children}
        </div>
    )
}
