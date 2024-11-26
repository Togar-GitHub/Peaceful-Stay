// import { useParams, useEffect } from 'react-router-dom';
import bbs from './BookingsBySpot.module.css'

function BookingsBySpot() {
  // const { spotId } = useParams();

  // useEffect(() => {
  //   console.log('Fetching data for spotId: ', spotId);

  //   const fetchBookings = async () => {
  //     console.log(`Fetching bookings for spot: ${spotId}`)
  //   }

  //   fetchBookings();
  // }, [spotId])

  return (
    <>
      <div className={bbs.featureComingSoon}>
        <h1>Feature Coming Soon</h1>
      </div>
    </>
  )
}

export default BookingsBySpot;