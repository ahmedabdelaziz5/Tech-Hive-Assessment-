import moment from 'moment'

import classes from './styles/TaskMobileListDate.module.css'

const TaskMobileListDate = ({ day }) =>
{
    return (
        <div
            className={classes.container}
        >
            {moment(day).format('D MMMM, YYYY')}
        </div>
    )
}

export default TaskMobileListDate