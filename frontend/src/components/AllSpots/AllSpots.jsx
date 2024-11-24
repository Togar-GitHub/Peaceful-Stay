import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllSpotsThunk } from '../../store/spot';
import { IoIosStar } from "react-icons/io";
import './AllSpots.css';

function AllSpots() {
  const [loading, setLoading] = useState(true);
  const spots = useSelector((state) => state.spots.allSpots);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsThunk()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className='spot-grid'>
        {
          spots.Spots.map((spot) => (
            <div key={spot.id} className='spot-card'>
              <NavLink to={`/api/spots/${spot.id}`} className='spot-image-link'>
                <img
                 src={spot.previewImage} 
                //  alt={spot.name}
                 className='spot-image' 
                />
                <h3 className='spot-name'>{spot.name}</h3>
              </NavLink>
              <div className='spot-info'>
                <div className='top-row'>
                  <h3 className='city-state'>{spot.city}, {spot.state}</h3>
                  <h3 className='rating'>
                    <IoIosStar />
                    {spot.avgRating ? spot.avgRating : 'New'}
                  </h3>
                </div>
                <h3 className='price'>${spot.price} night</h3>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default AllSpots;