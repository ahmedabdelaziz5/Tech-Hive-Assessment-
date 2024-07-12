import { useEffect } from 'react'
import useHttp from '../../../../../hooks/use-http';
import { useDispatch, useSelector } from 'react-redux';
import useScrollingPagination from '../../../../../hooks/use-scrolling-pagination';
import { tasksActions } from '../../../../../store/tasks-slice';
import { taskModulePath } from '../../../../../config';
import { useParams } from 'react-router-dom';

const useGetAllTasks = () =>
{
    // useGetAllTasks hook to handle call getAllTasks API

    const {
        sendRequest: getAllTasks,
        isLoading: isLoadingGetAllTasks,
    } = useHttp();
    const userId = useSelector(state => state.auth.userData._id);
    const dispatch = useDispatch();
    const taskStatus = "all"
    // handle pagination 
    const initialTotalPages = useSelector(state => state.tasks.totalPages[taskStatus]);

    const {
        lastElementRef,
        currentPage
    } = useScrollingPagination(isLoadingGetAllTasks, initialTotalPages);

    const { date } = useParams();
    const year = String(new Date(date).getFullYear());
    const month = String(new Date(date).getMonth())

    useEffect(() =>
    {
        const getResponse = ({ message, data, totalPages, totalNumOfItems }) =>
        {
            if (message.includes("success"))
            {
                // update store with new notes
                dispatch(tasksActions.setTasks({ taskStatus, tasks: data }))

                // update total pages in store
                dispatch(tasksActions.updateTotalPages({ taskStatus, totalPages }))

                // update total length in store
                dispatch(tasksActions.updateTotalLength({ taskStatus, totalLength: totalNumOfItems }))
            }
        };

        if (year && month) getAllTasks(
            {
                url: `${taskModulePath}/getAllTasks?userId=${userId}&page=${currentPage + 1}&limit=${20}&year=${year}&month=${Number(month) + 1}`,
            },
            getResponse
        );
    }, [currentPage, dispatch, userId, getAllTasks, year, month])

    return {
        isLoadingGetAllTasks,
        lastElementRef,
    }
}

export default useGetAllTasks