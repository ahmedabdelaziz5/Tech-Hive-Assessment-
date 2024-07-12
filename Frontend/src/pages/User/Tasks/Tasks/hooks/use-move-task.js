import { useDispatch } from 'react-redux';

import { tasksActions } from '../../../../../store/tasks-slice';
import useEditTask from './use-edit-task';

const useMoveTask = () =>
{
    // remove task + edit task status + move task to new tasks type

    const dispatch = useDispatch();
    const { handleEditTask } = useEditTask({ isNavigate: false });

    const handleMoveTask = (intialTask, newTaskStatus, onFinish) =>
    {
        const updatedTask = { ...intialTask };
        dispatch(tasksActions.removeTask(intialTask))
        updatedTask.taskStatus = newTaskStatus
        dispatch(tasksActions.addTask(updatedTask))
        handleEditTask(updatedTask, intialTask)
        if (typeof onFinish === 'function') onFinish()
    }

    return handleMoveTask
}

export default useMoveTask