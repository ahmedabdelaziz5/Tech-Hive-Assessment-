import { Route, Routes, Navigate } from 'react-router-dom'

import TasksHome from '../pages/User/Tasks/TasksHome'
import Tasks from '../pages/User/Tasks/Tasks/Tasks'
import AddTask from '../pages/User/Tasks/Tasks/components/AddTask'
import EditTask from '../pages/User/Tasks/Tasks/components/EditTask'
import Calender from '../pages/User/Tasks/Calender/Calender'
import DayEventsModal from '../pages/User/Tasks/Calender/components/DayEventsModal'
import Profile from '../pages/User/Profile/Profile'
import EditProfile from '../pages/User/EditProfile/EditProfile'
import ChangePassword from '../pages/User/ChangePassword/ChangePassword'

const User = () =>
{
    return (
        <Routes>

            <Route path='/tasks' element={<TasksHome /> } >
                {/* for handle all paths for tasks page  */}
                {['', 'todo', 'inprogress', 'done'].map((tasksPath, index) => (
                    <Route key={index} path={tasksPath} element={<Tasks />}>
                        <Route path='new' element={<AddTask />} />
                        <Route path='edit' element={<EditTask />} />
                    </Route>
                ))}
                <Route path='calender/:date' element={<Calender />} >
                    <Route path='day' element={<DayEventsModal />} />
                </Route>
            </Route>
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/edit' element={<EditProfile />} />
            <Route path='/profile/change-password' element={<ChangePassword />} />

            <Route path="*" element={<Navigate to="/tasks" replace={true} />} />
        </Routes>
    )
}

export default User