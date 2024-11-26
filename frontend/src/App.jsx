import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import AllSpots from './components/AllSpots/AllSpots';
import SpotDetailById from './components/SpotDetailById/SpotDetailById';
import BookingsBySpot from './components/BookingsBySpot/BookingsBySpot';
import CreateNewSpot from './components/CreateNewSpot/CreateNewSpot';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/api/spots/:spotId',
        element: <SpotDetailById />
      },
      {
        path: '/createNewSpot',
        element: <CreateNewSpot />
      },
      {
        path: '/reservation',
        element: <BookingsBySpot />
      },
      {
        path: '/',
        element: <AllSpots />
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
