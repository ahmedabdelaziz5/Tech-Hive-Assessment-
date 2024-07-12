import classes from './styles/HeaderTextHero.module.css'

export const HeaderTextHero = ({ children, type }) =>
{
    return (
        <>
            {type === 'h2' ? (
                <h2 className={`${classes.header} ${classes.h2}`}>{children}</h2 >
            ) : (
                <h1 className={classes.header}>{children}</h1 >
            )}
        </>
    )
}
