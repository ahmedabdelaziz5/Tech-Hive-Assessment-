import React from 'react'
import TabsBar from './components/TabsBar'
import { Outlet } from 'react-router-dom'

const TasksHome = () =>
{
    return (
        <div>
            <TabsBar />

            {/* for make nested  pages in tasks */}
            <Outlet />
        </div>
    )
}

export default TasksHome