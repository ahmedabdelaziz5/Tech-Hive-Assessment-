import { useSelector } from 'react-redux'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Outlet, useLocation } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'

import useGetSpecificTasksType from './hooks/use-get-specific-tasks-type'
import TasksList from './components/TasksList'
import classes from './styles/Tasks.module.css'
import TasksTabs, { tasksTabsMap } from './components/TasksTabs'
import useScreenWidth from '../../../../hooks/use-screen-width'
import useDrag from './hooks/use-drag'

const RenderTodoTasks = () =>
{
    const {
        isLoadingSpecificTasksType: isLoadingGetTodoTasks,
        lastElementRef: lastTodoTaskRef,
    } = useGetSpecificTasksType("toDo");

    const todoTasks = useSelector(state => state.tasks.tasks.toDo);
    const totalTodoTasksLength = useSelector(state => state.tasks.totalLength.toDo);

    return (
        <TasksList
            type="toDo"
            tasks={todoTasks}
            totalTasksLength={totalTodoTasksLength}
            lastElementRef={lastTodoTaskRef}
            isLoading={isLoadingGetTodoTasks}
        />
    )
}

const RenderInProgressTasks = () =>
{
    const {
        isLoadingSpecificTasksType: isLoadingGetInProgressTasks,
        lastElementRef: lastInProgressTaskRef,
    } = useGetSpecificTasksType("inProgress")

    const inProgressTasks = useSelector(state => state.tasks.tasks.inProgress);
    const totalInProgressTasksLength = useSelector(state => state.tasks.totalLength.inProgress);

    return (
        <TasksList
            type="inProgress"
            tasks={inProgressTasks}
            totalTasksLength={totalInProgressTasksLength}
            lastElementRef={lastInProgressTaskRef}
            isLoading={isLoadingGetInProgressTasks}
        />
    )
}

const RenderDoneTasks = () =>
{
    const {
        isLoadingSpecificTasksType: isLoadingGetDoneTasks,
        lastElementRef: lastDoneTaskRef,
    } = useGetSpecificTasksType("done")

    const doneTasks = useSelector(state => state.tasks.tasks.done);
    const totalDoneTasksLength = useSelector(state => state.tasks.totalLength.done);

    return (
        <TasksList
            type="done"
            tasks={doneTasks}
            totalTasksLength={totalDoneTasksLength}
            lastElementRef={lastDoneTaskRef}
            isLoading={isLoadingGetDoneTasks}
        />
    )
}

const Tasks = () =>
{
    const tasksTypeMap = {
        0: <RenderTodoTasks />,
        1: <RenderInProgressTasks />,
        2: <RenderDoneTasks />,
    }
    const pathname = useLocation().pathname;
    const RenderOpenedTypeForSmallScreens = tasksTypeMap[tasksTabsMap[pathname]]

    // for render component based on size of window
    const screenWidth = useScreenWidth();
    const isSmall = screenWidth <= 768;

    const onDragEnd = useDrag();

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div
                className={classes.container}
            >
                {/* for bigger than 768px */}
                {!isSmall && <Grid2
                    container
                    columnSpacing={2}
                    className={classes.bigScreens}
                >
                    <RenderTodoTasks />
                    <RenderInProgressTasks />
                    <RenderDoneTasks />
                </Grid2>}

                {/* for smaller than 768px */}
                {isSmall && <div
                    className={classes.smallScreens}
                >
                    <TasksTabs />
                    {RenderOpenedTypeForSmallScreens}
                </div>}

                <Outlet />
            </div>
        </DragDropContext>
    )
}


export default Tasks