import { Navigate } from 'react-big-calendar'
import moment from 'moment';

import ToolbarActions from './ToolbarActions'

const MonthToolbar = ({ onNavigate, date }) =>
{
    const navigateTo = (action) =>
    {
        onNavigate(Navigate[action]);
    };

    return (
        <div
            className='calender-toolbar center-y'
        >
            <div
                className='toolbar-actions-today'
            >
                {`Today ${moment().format("DD/M/YYYY")}`}
            </div>

            <ToolbarActions
                onBack={() => navigateTo('PREVIOUS')}
                backTitle='Previous month'
                onNext={() => navigateTo('NEXT')}
                nextTitle='Next month'
                currentDate={moment(date).format("MMMM, YYYY")}
            />
        </div>
    )
}

export default MonthToolbar