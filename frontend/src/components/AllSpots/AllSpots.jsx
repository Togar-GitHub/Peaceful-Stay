import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getCurrentUserSpotsThunk, getAllSpotsThunk } from '../../store/spot';
import { IoIosStar } from "react-icons/io";
import asp from './AllSpots.module.css';

function AllSpots() {
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const sessionUser = useSelector((state) => state.session.user)
  const spotsCurrent = useSelector((state) => state.spots.spotsCurrent)
  const allSpots = useSelector((state) => state.spots.allSpots);
  const noSpotsMessage = useSelector((state) => state.spots.noSpotsMessage);
  const customProp = useSelector((state) => state.customProp.customProp);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let spots;
  if (customProp) {
    spots = spotsCurrent;
  } else {
    spots = allSpots;
  }

  useEffect(() => {
    setLoading(true);
    if (customProp) {
      dispatch(getCurrentUserSpotsThunk()).finally(() => 
        setLoading(false));
    } else {
      dispatch(getAllSpotsThunk()).finally(() => 
        setLoading(false));
    }
  }, [customProp, dispatch]);

  const createSpotNav = () => {
    navigate('/createNewSpot');
  }
  const updateSpotNav = () => {
    navigate('/updateSpot');
  }
  const deleteSpotNav = () => {
    navigate('/deleteSpot');
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className={asp.topContainer}>
        {customProp && (
          <>
            <div className={asp.topSide}>
              <div className={asp.titleManageSpots}>
                <h2 className={asp.titleManageSpotsH2}>
                  Manage Your Spots
                </h2>
              </div>
              <div className={asp.createNewSpotContainer}>
                <button onClick={createSpotNav}
                  className={asp.createSpotButton}>
                  Create a New Spot
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {noSpotsMessage && (
        <p className={asp.noSpotsMessage}>
          {noSpotsMessage}
        </p>
      )}
      
      {(!noSpotsMessage && spots?.Spots?.length > 0) ? (

      <div className={asp.spotGrid}>
        {
          spots?.Spots?.map((spot) => (
          <>
            <div key={spot.id} className={asp.spotCard}>
              <NavLink to={`/api/spots/${spot.id}`} className={asp.spotImageLink}>
                <img
                 src={spot.previewImage} 
                //  alt={spot.name}
                 className={asp.spotImage} 
                />
                <h3 className={asp.spotName}>{spot.name}</h3>
              </NavLink>
              <div className={asp.spotInfo}>
                <div className={asp.topRow}>
                  <h3 className={asp.cityState}>{spot.city}, {spot.state}</h3>
                  <h3 className={asp.rating}>
                    <IoIosStar />
                    {spot.avgRating ? parseFloat(spot.avgRating).toFixed(1) : 'New'}
                  </h3>
                </div>
                <h3 className={asp.price}>${parseFloat(spot.price).toFixed(2)} night</h3>
              </div>

                {customProp && (
                  <div className={asp.bottomContainer}>
                    <div className={asp.updateSpotContainer}>
                      <button onClick={updateSpotNav}
                        className={asp.updateSpotButton}>
                        Update
                      </button>
                    </div>
                    <div className={asp.deleteSpotContainer}>
                      <button onClick={deleteSpotNav}
                        className={asp.deleteSpotButton}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
            </div>
          </>
          ))
        }
      </div>
      ) : (
        !noSpotsMessage && <p>No Spots Available.</p>
      )}
    </>
  );
}

export default AllSpots;