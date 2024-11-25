import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetailThunk, getReviewsBySpotThunk } from '../../store/spot';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import './SpotDetailById.css';

function SpotDetailById() {
  const { spotId } = useParams();
  const [loadingSpot, setLoadingSpot] = useState(true);
  const [loadingReview, setLoadingReview] = useState(true);
  const spotDetail = useSelector((state) => state.spots.spotDetail);
  const reviewLists = useSelector((state) => state.spots.reviewLists);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSpotDetailThunk(spotId)).finally(() => {
      setLoadingSpot(false);
    });
  }, [spotId, dispatch]);

  useEffect(() => {
    dispatch(getReviewsBySpotThunk(spotId)).finally(() => {
      setLoadingReview(false);
    });
  }, [spotId, dispatch])

  function DisplayedDate({ updatedAt }) {
    const date = new Date(updatedAt);
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[monthIndex];
    const formattedDate = `${month} ${year}`;
    return formattedDate;
  }

  const reviewLength = reviewLists && Array.isArray(reviewLists.Reviews) 
      ? reviewLists.Reviews.length 
      : 0;

  const reservation = (e) => {
    e.preventDefault();
    navigate(`/reservation`);
  }

  if (loadingSpot) {
    return <p>Loading Spots...</p>
  }

  if (loadingReview) {
    return <p>Loading Reviews...</p>
  }

  return (
    <>
      <div className='main-container' style={{ marginTop: "100px" }}>
      <h3>{spotDetail.name}</h3>
      <h4>{spotDetail.city}, {spotDetail.state}, {spotDetail.country}</h4>
        <div className='top-container'>
          <div className='top-left-side'>
            <div>
              <img className='main-image' src={spotDetail.previewImage} />
            </div>
          </div>
          <div className='top-right-side'>
            {spotDetail.SpotImages.map((image) => (
              <div key={spotDetail.SpotImages.id} className='other-images'>
                <img src={image.url} />
              </div>
            ))}
          </div>
        </div>
        <div className='mid-container'> 
          <div className='mid-left-side'>
            <h2>Hosted by {spotDetail.Owner.firstName} {spotDetail.Owner.lastName}</h2>
            <p>{spotDetail.description}</p>
          </div>
          <div className='mid-right-side'>
            <div className='price-rating-container'>
              <h2 className='price'>${spotDetail.price} night</h2>
              <div className='mid-rating-container'>
                <IoIosStar />
                <h2 className='mid-rating'>
                  {spotDetail.avgRating ? parseFloat(spotDetail.avgRating).toFixed(1) : 'New'}
                </h2>
              </div>
              {
                reviewLength > 0 && (
                  <div className='mid-reviews-container'>
                    <GoDotFill />
                    <h2 className='mid-reviews'>
                      {`${reviewLength} ${reviewLength === 1 ? 'review' : 'reviews'}`}
                    </h2>
                  </div> 
                )
              }
            </div>
            <button onClick={reservation}>Reserve</button>
          </div>
        </div>  
        <hr />
        <div className='bottom-container'>
          <div className='bottom-rating-reviews'>
            <span className='bottom-rating'>
                <IoIosStar />
                {spotDetail.avgRating ? parseFloat(spotDetail.avgRating).toFixed(1) : 'New'}
              {reviewLength > 0 && (
                <div className='bottom-reviews-container'>
                  <GoDotFill />
                  <span className='bottom-reviews'>
                    {`${reviewLength} ${reviewLength === 1 ? 'review' : 'reviews'}`}
                  </span>
                </div> 
              )}
            </span>
          </div>

          <div className='bottom-reviews-list'>
            {!reviewLists?.Reviews || reviewLists?.Reviews?.length === 0 ? (
              <h3>Be the first to post a review!</h3>
            ) : (
              reviewLists?.Reviews?.map((review) => (
                <div key={reviewLists.id} className='review-list-details'>
                  <h3>{review.User.firstName}</h3>
                  <h4>{DisplayedDate({ updatedAt: review.updatedAt })}</h4>
                  <p>{review.review}</p>
                </div>
            )))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SpotDetailById;