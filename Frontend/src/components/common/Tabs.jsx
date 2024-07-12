import { Tab, Tabs as TabsMUI } from '@mui/material';
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';

import classes from './styles/Tabs.module.css'

export const Tabs = (props) =>
{
    const { tabs, tabsMap, tabIndicatorStyle, tabsClassName, defaultValue, selectedStyle, componentBeforeTabs } = props;

    // i use pathname to detect initial value 
    // to detect when reload where is tab indicator will be
    const location = useLocation();
    const pathName = location.pathname;
    const [value, setValue] = useState((tabsMap && tabsMap[pathName]) || defaultValue || 0);

    const handleChange = (event, newValue) =>
    {
        setValue(newValue);
    };

    return (
        <TabsMUI
            value={value}
            onChange={handleChange}
            className={`${classes.tabs} ${tabsClassName || ""}`}
            TabIndicatorProps={{
                style: {
                    background: "var(--secondary)",
                    borderRadius: "5px",
                    height: "3px",
                    ...tabIndicatorStyle
                }
            }}
            sx={{
                '& .Mui-selected': {
                    color: 'var(--secondary) !important',
                    ...selectedStyle
                },
            }}
        >
            {componentBeforeTabs}
            {tabs.map((tab) => (
                <Tab
                    key={tab.value}
                    component={NavLink}
                    {...tab}
                />
            ))}

        </TabsMUI>
    )
}
