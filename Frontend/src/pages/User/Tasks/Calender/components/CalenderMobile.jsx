import { DateCalendar, DayCalendarSkeleton } from '@mui/x-date-pickers'
import moment from 'moment'
import { ButtonBase } from '@mui/material';
import { useSelector } from 'react-redux';

import classes from './styles/CalenderMobile.module.css'
import { ReactComponent as LeftTriangleIcon } from '../../../../../assets/icons/leftTriangle.svg';
import TasksMobileList from './TasksMobileList';
import useDate from '../hooks/use-date';

const CustomDay = ({ day, today, outsideCurrentMonth }) =>
{
    // filter with day
    const tasks = useSelector(state => state.tasks.tasks.all).filter(task => moment(task.startDate).isSame(moment(day), 'day'));

    return (
        <div
            className={`
            ${classes.containerCell}
            `}
        >
            <div
                className={`${classes.dateCell} 
                            ${today ? classes.todayCell : ""}
                ${outsideCurrentMonth ? classes.dayOutside : ""}`}
            >
                {day.format('D')}
            </div>

            <div
                className={classes.tasks}
            >
                {tasks.map(({ taskStatus }, index) => (
                    <div
                        key={index}
                        className={classes.taskContainer}
                    >
                        {index <= 2 && <span className={`${classes.task}
                                ${taskStatus === "inProgress" ?
                                classes.inProgress : taskStatus === "done" ?
                                    classes.done : ""}`} />}
                        {index === 3 && (
                            <p>{`+${tasks.length - 3}`}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const CalenderMobile = ({ isLoadingGetAllTasks }) =>
{
    const { selectedDate, handleDateSelect } = useDate();
    
    return (
        <div>
            {/* calender section */}
            <div
                className={classes.container}
            >
                {/* today section */}
                <div
                    className={`toolbar-actions-today ${classes.today}`}
                >
                    {`Today ${moment().format("DD/M/YYYY")}`}
                </div>
                
                <DateCalendar
                    value={moment(selectedDate)}
                    onMonthChange={(newValue) => handleDateSelect(newValue, "mob")}
                    className={classes.calender}
                    slots={{
                        leftArrowIcon: LeftTriangleIcon,
                        rightArrowIcon: LeftTriangleIcon,
                        nextIconButton: ButtonBase,
                        previousIconButton: ButtonBase,
                        day: CustomDay
                    }}
                    slotProps={{
                        nextIconButton: { className: `right-triangle toolbar-actions-btn ${classes.rightBtn}` },
                        previousIconButton: { className: `toolbar-actions-btn ${classes.leftBtn}` },
                        switchViewButton: { style: { display: "none" } },
                        calendarHeader: { className: classes.header },
                    }}
                    showDaysOutsideCurrentMonth
                    loading={isLoadingGetAllTasks}
                    renderLoading={() => <DayCalendarSkeleton />}
                    sx={{
                        "& .MuiDayCalendar-weekDayLabel": {
                            fontWeight: 400,
                            color: "var(--date-cell)"
                        },
                        "& .MuiDayCalendar-slideTransition": {
                            height: "300px !important"
                        },
                    }}
                />
            </div>

            <TasksMobileList isLoadingGetAllTasks={isLoadingGetAllTasks} />
        </div>
    )
}

export default CalenderMobile