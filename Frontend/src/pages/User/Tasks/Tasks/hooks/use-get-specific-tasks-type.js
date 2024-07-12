import { useEffect } from 'react'
import useHttp from '../../../../../hooks/use-http';
import { useDispatch, useSelector } from 'react-redux';
import useScrollingPagination from '../../../../../hooks/use-scrolling-pagination';
import { tasksActions } from '../../../../../store/tasks-slice';
import { taskModulePath } from '../../../../../config';

const useGetSpecificTasksType = (taskStatus) =>
{
    // useGetSpecificTasksType hook to handle call getSpecificTasksType API

    const {
        sendRequest: specificTasksType,
        isLoading: isLoadingSpecificTasksType,
    } = useHttp();
    const userId = useSelector(state => state.auth.userData._id);
    const dispatch = useDispatch();

    // handle pagination 
    const initialTotalPages = useSelector(state => state.tasks.totalPages[taskStatus]);

    const {
        lastElementRef,
        currentPage
    } = useScrollingPagination(isLoadingSpecificTasksType, initialTotalPages);

    useEffect(() =>
    {
        const getResponse = ({ message, data, totalPages, totalNumOfItems }) =>
        {
            if (message.includes("success"))
            {
                // update store with new notes
                dispatch(tasksActions.mergeTasks({ taskStatus, tasks: data }))

                // update total pages in store
                dispatch(tasksActions.updateTotalPages({ taskStatus, totalPages }))

                // update total length in store
                dispatch(tasksActions.updateTotalLength({ taskStatus, totalLength: totalNumOfItems }))
            }
        };

        specificTasksType(
            {
                url: `${taskModulePath}/getSpecificTasksType?userId=${userId}&page=${currentPage + 1}&limit=${20}&type=${taskStatus}`,
            },
            getResponse
        );
    }, [currentPage, dispatch, specificTasksType, taskStatus, userId])

    return {
        isLoadingSpecificTasksType,
        lastElementRef,
    }
}

export default useGetSpecificTasksType