import { ButtonBase, IconButton } from '@mui/material';

import classes from './styles/TasksList.module.css'
import Task from './Task';
import { ReactComponent as AddTaskIcon } from '../../../../../assets/icons/add.svg';
import { ReactComponent as DeleteTasksIcon } from '../../../../../assets/icons/binOutlined.svg';
import { Btn } from '../../../../../components/inputs/Btn';
import { LoadingCenter } from '../../../../../components/ui/LoadingCenter';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { NavLink } from 'react-router-dom';
import { Droppable } from 'react-beautiful-dnd';
import { ConfirmDeleteModal } from '../../../../../components/common';
import useModal from '../../../../../hooks/use-modal';
import useDeleteAllTasksType from '../hooks/use-delete-all-tasks-type';
const TasksList = (props) =>
{
    const { tasks, type, totalTasksLength, lastElementRef, isLoading } = props;

    const getTitle = () =>
    {
        if (type === "toDo")
        {
            return ('To do')
        } else if (type === "inProgress")
        {
            return ('In Progress')
        } else
        {
            return ('Done')
        }
    }

    // handle modal ui state 
    const {
        openModal,
        closeModal,
        isModalOpened,
    } = useModal(type);

    // delete task
    const {
        isLoadingDeleteAllTasksType,
        handleDeleteAllTasksType,
    } = useDeleteAllTasksType(tasks[0]?.taskStatus);

    return (
        <Droppable droppableId={type}>
            {(provided, snapshot) => (
                <Grid2
                    xs={4}
                >
                    <div
                        className={classes.container}
                    >
                        {/* header section && Loading spinner*/}
                        <div
                            className={`
                                ${classes.header} 
                                ${type === "inProgress" ?
                                    classes.inProgress : type === "done" ?
                                        classes.done : ""}
                        `}>
                            <div className='space-between center-y'>
                                <h5>
                                    {getTitle()}
                                </h5>

                                <span
                                    className={`${classes.tasksLength} center-x center-y`}
                                >
                                    {totalTasksLength}
                                </span>
                            </div>

                            <div>
                                {type === "toDo" && <ButtonBase
                                    className={classes.addIconBtn}
                                    LinkComponent={NavLink}
                                    to={`new?type=${type}`}
                                >
                                    <AddTaskIcon />
                                </ButtonBase>}

                                {/* Delete All Tasks Icon Btn */}
                                <IconButton
                                    className={`${classes.deleteIconBtn} ${!tasks.length ? classes.deleteTasksBtnDisabled :''}`}
                                    title={`Delete All ${getTitle()} Tasks`}
                                    onClick={openModal}
                                    disabled={!tasks.length || isLoadingDeleteAllTasksType}
                                    cursor='disabled'
                                >
                                    <DeleteTasksIcon />
                                </IconButton>

                                {/* Confirm delete all tasks modal  */}
                                <ConfirmDeleteModal
                                    open={!!isModalOpened}
                                    onClose={closeModal}
                                    deleteMessage={`All ${getTitle()} Tasks`}
                                    onDelete={() => handleDeleteAllTasksType(type)}
                                    isLoading={isLoadingDeleteAllTasksType}
                                />
                            </div>
                        </div>

                        {/* Tasks list */}
                        <div
                            className={`${classes.content} ${type === "toDo" ? classes.todoContent : ''}`}
                            ref={provided.innerRef}
                        >
                            {
                                tasks.map((task, index) =>
                                {
                                    return (
                                        <Task
                                            key={task._id}
                                            {...task}
                                            lastElementRef={(index === tasks.length - 1) ? lastElementRef : null}
                                            index={index}
                                        />
                                    )
                                })
                            }

                            {provided.placeholder}

                            {isLoading && <LoadingCenter />}
                        </div>

                        {/* Add Task btn */}
                        {type === "toDo" && <Btn
                            className={classes.addBtn}
                            startIcon={<AddTaskIcon />}
                            to={`new?type=${type}`}
                        >
                            Add Task
                        </Btn>}
                    </div>
                </Grid2>)}
        </Droppable>
    )
}

export default TasksList