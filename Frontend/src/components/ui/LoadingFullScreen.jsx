import { LoadingCenter } from './LoadingCenter'
import classes from './styles/LoadingFullScreen.module.css'
export const LoadingFullScreen = () =>
{
    return (
        <div className={classes.container}><LoadingCenter /></div>
    )
}
