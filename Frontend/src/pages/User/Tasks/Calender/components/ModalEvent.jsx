import moment from 'moment'
import classes from './styles/ModalEvent.module.css'
const ModalEvent = ({ taskStatus, title, startDate, endDate }) =>
{
    return (
        <div
            className={`
                    ${classes.event} 
                    ${taskStatus === "inProgress" ?
                    classes.inProgress : taskStatus === "done" ?
                        classes.done : ""}
            `}
        >
            <div
                className={classes.title}
            >
                {title}
            </div>
            
            <div
                className={classes.dates}
            >
                <span>
                    {moment(startDate).format('h:mm A')}
                </span>
                <span>
                    {moment(endDate).format('h:mm A')}
                </span>
            </div>
        </div>
    )
}

export default ModalEvent