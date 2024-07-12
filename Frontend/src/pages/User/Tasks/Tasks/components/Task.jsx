import moment from 'moment';

import classes from './styles/Task.module.css'
import TaskOptions from './TaskOptions';
import { Draggable } from 'react-beautiful-dnd';

const Task = (props) =>
{
    const { lastElementRef, ...rest } = props;
    const { title, content, taskStatus, startDate, endDate, _id, index } = rest;
    const formattedDate = moment(startDate).format('MMM DD, YYYY');
    const startTime = moment(startDate).format('h:mm A');
    const endTime = moment(endDate).format('h:mm A');

    return (
        <div
            ref={lastElementRef}
        >
            <Draggable
                draggableId={_id}
                index={index}
            >
                {(provided, snapshot) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`
                            ${classes.containerBasics}
                            ${classes.taskBorderRadius}
                            ${snapshot.isDragging ? "" : classes.taskPadding}
                            ${snapshot.isDragging ?
                                    (taskStatus === "inProgress" ?
                                    classes.isDraggingContainerInProgress :
                                    taskStatus === "done" ?
                                        classes.isDraggingContainerDone :
                                        classes.isDraggingContainerTodo)
                                :
                                classes.container
                            }
                        `}
                        ref={provided.innerRef}
                    >
                        <div
                            className={`
                            ${snapshot.isDragging ? classes.isDraggingContent : ""} 
                            ${snapshot.isDragging ? classes.taskBorderRadius : ""}
                            ${snapshot.isDragging ? classes.taskPadding : ""}
                            ${snapshot.isDropAnimating ? classes.stopDraggingInput : ""} `}
                        >
                            {title &&
                                <h6 title={title}>
                                    {title}
                                </h6>
                            }

                            {content &&
                                <p title={content}>
                                    {content}
                                </p>
                            }

                            <div className='space-between center-y flex-wrap'>
                                {/* date */}
                                <span
                                    className={`
                                ${classes.date} 
                                ${taskStatus === "inProgress" ?
                                            classes.inProgress : taskStatus === "done" ?
                                                classes.done : ""
                                        }`}
                                >
                                    {formattedDate}
                                </span>

                                {/* start time - end time */}
                                <div className={classes.time}>
                                    {`${startTime} - ${endTime}`}
                                </div>
                            </div>

                            {/*Options btn  */}
                            <TaskOptions
                                task={rest}
                            />
                        </div>
                    </div>
                )}
            </Draggable>
        </div>
    )
}

export default Task