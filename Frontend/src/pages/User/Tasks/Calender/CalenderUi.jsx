import { Outlet } from 'react-router-dom';

import './Calender.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalenderDesktop from './components/CalenderDesktop';
import CalenderMobile from './components/CalenderMobile';

const CalenderUi = (props) =>
{
    const { events, onOpenDay, isLoadingGetAllTasks } = props;

    return (
        <div
        // className='calender-container'
        >
            <div
                className='calender-desktop'
            >
                <CalenderDesktop
                    events={events}
                    onOpenDay={onOpenDay}
                />
            </div>

            <div
                className='calender-mobile'
            >
                <CalenderMobile 
                    isLoadingGetAllTasks={isLoadingGetAllTasks}
                />
            </div>

            <Outlet />
        </div>
    )
}

export default CalenderUi