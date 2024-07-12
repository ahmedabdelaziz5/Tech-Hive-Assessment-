import { ConfirmDeleteModal, PopUpMenu } from '../../../../../components/common'
import { ReactComponent as OptionsIcon } from '../../../../../assets/icons/options.svg';
import classes from './styles/TaskOptions.module.css'
import useModal from '../../../../../hooks/use-modal';
import useDeleteTask from '../hooks/use-delete-task';
import { NavLink } from 'react-router-dom';
import { uiActions } from '../../../../../store/ui-slice';
import { useDispatch } from 'react-redux';
import { tasksActions } from '../../../../../store/tasks-slice';
import useMoveTask from '../hooks/use-move-task';

const TaskOptions = ({ task }) =>
{
    const dispatch = useDispatch();

    // handle modal ui state 
    const {
        openModal,
        closeModal,
        isModalOpened,
    } = useModal(task._id);

    // delete task
    const {
        isLoadingDeleteTask,
        handleDeleteTask,
    } = useDeleteTask(task.taskStatus, task._id);

    const handleOpenDeleteModal = () =>
    {
        closeMenu();
        openModal()
    }
    // move task
    const handleMoveTask = useMoveTask();

    const closeMenu = () =>
    {
        dispatch(uiActions.closePopMenu(task._id));
    };

    const handleOpenEditModal = () =>
    {
        closeMenu();
        dispatch(tasksActions.updateOpenedTask(task));
    }

    const MoveTaskToToDoOption = {
        onClick: () => { handleMoveTask(task, "toDo", closeMenu) },
        children: "Move To To Do",
    }

    const MoveTaskToProgressOption = {
        onClick: () => { handleMoveTask(task, "inProgress", closeMenu) },
        children: "Move To In Progress",
    }

    const MoveTaskToDoneOption = {
        onClick: () =>
        { handleMoveTask(task, 'done', closeMenu) },
        children: "Move To Done",
    }

    const menuItemsForTodo = [MoveTaskToProgressOption, MoveTaskToDoneOption]
    const menuItemsForProgress = [MoveTaskToToDoOption, MoveTaskToDoneOption]
    const menuItemsForDone = [MoveTaskToToDoOption, MoveTaskToProgressOption]

    const menuItems = [
        {
            onClick: handleOpenEditModal,
            menuItemComponent: NavLink,
            to: "edit",
            children: "Edit Task",
        },

        ...(task.taskStatus === "toDo" ? menuItemsForTodo : []),
        ...(task.taskStatus === "inProgress" ? menuItemsForProgress : []),
        ...(task.taskStatus === "done" ? menuItemsForDone : []),

        {
            onClick: handleOpenDeleteModal,
            children: "Delete",
        },
    ]

    return (
        <>
            <PopUpMenu
                id={task._id}
                openBtnType="icon"
                openBtnChild={
                    <OptionsIcon />
                }
                openBtnClassName={classes.optionsBtn}
                popperClassName={classes.popper}
                menuItems={menuItems}
            />

            {/* Confirm delete task modal  */}
            <ConfirmDeleteModal
                open={!!isModalOpened}
                onClose={closeModal}
                deleteMessage="this task"
                onDelete={handleDeleteTask}
                isLoading={isLoadingDeleteTask}
            />

        </>
    )
}

export default TaskOptions