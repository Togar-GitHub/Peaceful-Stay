import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetailThunk } from '../../store/spot';
import './SpotDetailById.css';

function SpotDetailById(spotId) {
  const [loading, setLoading] = useState(true);
  // const spotDetail = useSelector((state) => state.spots.detail);
  // const reviews = useSelector((state) => state.reviews)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotDetailThunk(spotId)).finally(() => {
      setLoading(false);
    });
  }, [spotId, dispatch])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <h1>THIS IS THE SPOT DETAIL BY ID {spotId}</h1>
  )
}

export default SpotDetailById;