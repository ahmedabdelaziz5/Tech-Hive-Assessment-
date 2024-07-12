import useHttp from '../../../../../hooks/use-http';
import { useDispatch, useSelector } from 'react-redux';
import {  tasksActions } from '../../../../../store/tasks-slice';
import { uiActions } from '../../../../../store/ui-slice';
import { taskModulePath } from '../../../../../config';

const useDeleteAllTasksType = (type) =>
{
    // useDeleteTask hook to handle call deleteAllTasksType API

    const {
        sendRequest: deleteAllTasksType,
        isLoading: isLoadingDeleteAllTasksType,
    } = useHttp();
    const userId = useSelector(state => state.auth.userData._id);
    const dispatch = useDispatch();

    const handleDeleteAllTasksType = () =>
    {
        const getResponse = ({ message }) =>
        {
            if (message.includes("success"))
            {
                // remove tasks type from store
                dispatch(tasksActions.removeAllTasksType(type));

                // close modal of confirmation
                dispatch(uiActions.closeModal(type))
            }
        };

        deleteAllTasksType(
            {
                url: `${taskModulePath}/deleteAllTasksType?userId=${userId}&type=${type}`,
                method: "DELETE",
            },
            getResponse
        );
    }

    return {
        isLoadingDeleteAllTasksType,
        handleDeleteAllTasksType,
    }
}

export default useDeleteAllTasksType