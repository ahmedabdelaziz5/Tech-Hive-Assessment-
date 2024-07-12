import { Tabs } from '../../../../../components/common/Tabs'
import classes from './styles/TasksTabs.module.css'


export const tasksTabsMap = {
    "/tasks": 0,
    "/tasks/todo": 0,
    "/tasks/inprogress": 1,
    "/tasks/done": 2,
}

const TasksTabs = () =>
{
    const tasksTabs = [
        {
            label: "To do",
            to: "/tasks/todo",
            value: 0
        },
        {
            label: "In Progress",
            to: "/tasks/inprogress",
            value: 1
        },
        {
            label: "Done",
            to: "/tasks/done",
            value: 2
        },
    ]

    const activeColorsMap = {
        0: "todo",
        1: "in-progress",
        2: "done",
    }

    const currentPathName = window.location.pathname;
    const activeColor = activeColorsMap[tasksTabsMap[currentPathName]];

    const tabIndicatorStyle = {
        backgroundColor: `var(--${activeColor})`
    }
    
    // active selected tabs style
    const selectedStyle = {
        color: `var(--${activeColor}) !important`,
        position: "relative",
        "& ::before": {
            content: `" "`,
            position: "absolute",
            left: 0,
            bottom: "calc(50% - 3.5px)",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            backgroundColor: `var(--${activeColor})`
        }
    }

    return (
        <div
            className={classes.tabs}
        >
            <Tabs
                tabs={tasksTabs}
                tabsMap={tasksTabsMap}
                tabIndicatorStyle={tabIndicatorStyle}
                selectedStyle={selectedStyle}
            />
        </div>
    )
}

export default TasksTabs