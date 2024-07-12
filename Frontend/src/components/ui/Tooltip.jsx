import { Tooltip as TooltipMUI } from '@mui/material'

export const Tooltip = ({ children, title }) =>
{
    return (
        <TooltipMUI
            title={title}
        >
            {children}
        </TooltipMUI>
    )
}