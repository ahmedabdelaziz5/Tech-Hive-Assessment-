import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import './index.css';
import App from './App';
import store from './store';
import { GlobalCssPriority } from './components/ui';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <>
      <BrowserRouter>
        <SnackbarProvider autoHideDuration={3000} maxSnack={5}>
          <GlobalCssPriority>
            <>
              <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                <App />
              </LocalizationProvider>
            </>
          </GlobalCssPriority>
        </SnackbarProvider>
      </BrowserRouter>
    </>
  </Provider>
  // </React.StrictMode>
);

