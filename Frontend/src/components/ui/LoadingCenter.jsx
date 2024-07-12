import { CircularProgress } from '@mui/material'
import classes from './styles/LoadingCenter.module.css'

export const LoadingCenter = () =>
{
    return (
        <div
            className={`${classes.container}  center-x`}
        >
            <CircularProgress />
        </div>
    )
}
