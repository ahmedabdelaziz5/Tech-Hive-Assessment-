import useHttp from '../../../../../hooks/use-http';
import { useDispatch, useSelector } from 'react-redux';
import {  tasksActions } from '../../../../../store/tasks-slice';
import { uiActions } from '../../../../../store/ui-slice';
import { taskModulePath } from '../../../../../config';

const useDeleteTask = (taskStatus, taskId) =>
{
    // useDeleteTask hook to handle call deleteTask API

    const {
        sendRequest: deleteTask,
        isLoading: isLoadingDeleteTask,
    } = useHttp();
    const userId = useSelector(state => state.auth.userData._id);
    const dispatch = useDispatch();
    const handleDeleteTask = () =>
    {
        const getResponse = ({ message }) =>
        {
            if (message.includes("success"))
            {
                const taskData = { taskStatus: taskStatus, _id: taskId }
                // remove task from store
                dispatch(tasksActions.removeTask(taskData));

                // close modal of confirmation
                dispatch(uiActions.closeModal(taskId))

                // close pop menu of task options
                dispatch(uiActions.closePopMenu(taskId))
            }
        };

        deleteTask(
            {
                url: `${taskModulePath}/deleteTask?userId=${userId}&taskId=${taskId}`,
                method: "DELETE",
            },
            getResponse
        );
    }

    return {
        isLoadingDeleteTask,
        handleDeleteTask,
    }
}

export default useDeleteTask