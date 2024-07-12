//these component for make css overwrite mui style
import { StyledEngineProvider } from '@mui/material/styles';

export  function GlobalCssPriority({ children })
{
    return (
        <StyledEngineProvider injectFirst>
            {children}
        </StyledEngineProvider>
    );
}