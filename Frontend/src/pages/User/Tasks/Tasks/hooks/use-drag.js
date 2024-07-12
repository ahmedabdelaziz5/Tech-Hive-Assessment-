import { useSelector } from 'react-redux';

import useMoveTask from './use-move-task';

const useDrag = () =>
{
    const allTasksType = useSelector(state => state.tasks.tasks);
    const  handleMoveTask  = useMoveTask();

    const onDragEnd = result =>
    {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination)
        {
            return;
        }
        // when drop on the same type 
        if (source.droppableId === destination.droppableId)
        {
            //TODO reorder
        }
        // when drop on different type 
        else
        {
            const task = { ...allTasksType[source.droppableId][source.index] };
            const newTaskStatus = destination.droppableId;
            handleMoveTask(task, newTaskStatus);
        }
    };

    return onDragEnd
}

export default useDrag