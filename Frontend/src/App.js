
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

import './App.css';
import IndexRoutes from './routes/IndexRoutes';
import { NavBar } from './components/appBar';
import { getWebsiteTitle } from './helpers/getWebsiteTitle';
import {  PageLayout } from './components/common';

function App()
{
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  //handle background color for user 
  //and guest i had handle it in index.css file 
  if (isLoggedIn) document.body.style.backgroundColor = "var(--background2)";
  else document.body.style.backgroundColor = "var(--background)";

  // Update title based on page
  useEffect(() =>
  {
    const tempTitle = getWebsiteTitle(location.pathname);
    if (!!tempTitle) document.title = ` ${tempTitle} - Hivo `;
  }, [location]);

  // Update locale of moment (language of date)
  // because use LocalizationProvider in index.js
  //  for date and time picker make language
  //  change for date in another pages
  moment.updateLocale('en', {});

  return (
    <div>
      {isLoggedIn ? (
        <>
          <NavBar />

          <PageLayout>
            <IndexRoutes />
          </PageLayout>
        </>
      ) :

        (<IndexRoutes />)
    }
    </div>
  );
}

export default App;
