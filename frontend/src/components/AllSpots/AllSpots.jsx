import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllSpotsThunk } from '../../store/spot';
import { IoIosStar } from "react-icons/io";
import asp from './AllSpots.module.css';

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
      <div className={asp.spotGrid}>
        {
          spots.Spots.map((spot) => (
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
            </div>
          ))
        }
      </div>
    </>
  );
}

export default AllSpots;