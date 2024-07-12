import { useSelector } from 'react-redux';
import classes from './styles/TasksMobileList.module.css'
import { LoadingCenter } from '../../../../../components/ui/LoadingCenter';
import ModalEvent from './ModalEvent';
import moment from 'moment';
import TaskMobileListDate from './TaskMobileListDate';

const TasksMobileList = ({ isLoadingGetAllTasks }) =>
{
    const tasks = useSelector(state => state.tasks.tasks.all);

    return (
        <div
            className={classes.container}
        >
            <div
                className={classes.content}
            >

                {tasks.map((task, index) =>
                {
                    const isLastTaskInSameDay = index && moment(task.startDate).isSame(moment(tasks[index - 1].startDate), 'day')
                    const isNextTaskInSameDay = (tasks.length !== index + 1) && moment(task.startDate).isSame(moment(tasks[index + 1].startDate), 'day')
                    return (
                        <div
                            key={task._id}
                        >
                            {!isLastTaskInSameDay && (
                                <TaskMobileListDate day={task.startDate} />
                            )}
                            <div
                                className={`${classes.taskContainer} 
                                ${isNextTaskInSameDay ? classes.taskBorderBottom : ""}`}
                            >
                                <ModalEvent {...task} />
                            </div>
                        </div>
                    )
                })}

                {/* loading section */}
                {isLoadingGetAllTasks && <div className={classes.loading}><LoadingCenter /></div>}

                {/* no tasks section */}
                {(!tasks.length && !isLoadingGetAllTasks) && (
                    <div
                        className={classes.empty}
                    >
                        In that month's task list, you haven't assigned any
                        tasks yet
                    </div>
                )}
            </div>
        </div>
    )
}

export default TasksMobileList