import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getCurrentUserSpotsThunk, getAllSpotsThunk, deleteSpotThunk } from '../../store/spot';
import { IoIosStar } from "react-icons/io";
import { setCustomProp, clearCustomProp } from '../../store/customProp';
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import asp from './AllSpots.module.css';

function AllSpots() {
  const [loading, setLoading] = useState(true);
  const [spotToDelete, setSpotToDelete] = useState(null);
  const spotsCurrent = useSelector((state) => state.spots.spotsCurrent)
  const allSpots = useSelector((state) => state.spots.allSpots);
  const noSpotsMessage = useSelector((state) => state.spots.noSpotsMessage);
  const customProp = useSelector((state) => state.customProp.customProp);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSpotToDelete(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const createSpotNav = () => {
    dispatch(clearCustomProp());
    navigate('/createNewSpot');
  }
  const updateSpotNav = (id) => {
    dispatch(setCustomProp(id));
    navigate('/createNewSpot');
  }

  const handleDeleteSpot = (id) => {
    dispatch(deleteSpotThunk(id))
      .then(() => {
        dispatch(getCurrentUserSpotsThunk())
          .finally(() => {
            dispatch(setCustomProp('manageSpots'));
            navigate('/');
            closeModal();
          });
      })
      .catch((error) => {
        console.error('Error deleting Spot:', error);
      })
  }

  const closeModal = () => setSpotToDelete(null);

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

              {noSpotsMessage && (
                <div className={asp.createNewSpotContainer}>
                  <button onClick={createSpotNav}
                    className={asp.createSpotButton}>
                    Create a New Spot
                  </button>
                </div>
              )}
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
        <>
        {
          spots?.Spots?.map((spot) => (
            <div key={spot.id} className={asp.spotCard}>
              <NavLink to={`/spotDetail/${spot.id}`} className={asp.spotImageLink}>
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
                      <button onClick={() => updateSpotNav(spot.id)}
                        className={asp.updateSpotButton}>
                        Update
                      </button>
                    </div>

                    <div className={asp.deleteSpotContainer}>
                      <button
                        onClick={() => setSpotToDelete(spot.id)}
                        className={asp.deleteSpotButton}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}  
            </div>
          ))
        }
      </>
      </div>
      ) : (
        !noSpotsMessage && <p>No Spots Available.</p>
      )}

      {spotToDelete && (
        <div ref={modalRef}>
          <DeleteSpotModal
            onClose={closeModal}
            onConfirm={() => {
              handleDeleteSpot(spotToDelete);
              closeModal();
          }}
          />
        </div>
      )}
    </>
  );
}

export default AllSpots;