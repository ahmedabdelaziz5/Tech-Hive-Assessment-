import { useLocation } from 'react-router-dom'
import { Tabs } from '../../../../components/common'
import classes from './styles/TabsBar.module.css'
const TabsBar = () =>
{
    const tabs = [
        {
            value: 0,
            label: "Tasks",
            to: "",
        },
        {
            value: 1,
            label: "Calender",
            to: `calender/${new Date().toISOString()}`
        },
    ]

    const tabsMap = {
        "/tasks": 0,
        "/tasks/calender": 1,
    }

    const location = useLocation();
    const pathName = location.pathname;

    return (
        <Tabs
            tabs={tabs}
            tabsMap={tabsMap}
            tabsClassName={classes.tabs}
            defaultValue={pathName.includes('calender') ? 1 : 0}
        />
    )
}

export default TabsBar