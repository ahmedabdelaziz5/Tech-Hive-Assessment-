const CalenderEvent = ({ title, taskStatus }) =>
{
    return (
        <div
            className={`
                    
                    ${taskStatus === "inProgress" ? "rbc-event-in-progress" :
                    taskStatus === "done" ? "rbc-event-done" : ""
                }`}
        >
            {title}
        </div>
    )
}

export default CalenderEvent