import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetailThunk, getReviewsBySpotThunk } from '../../store/spot';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import sdi from './SpotDetailById.module.css';

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
      <div className={sdi.mainContainer} style={{ marginTop: "100px" }}>
      <h3>{spotDetail.name}</h3>
      <h4>{spotDetail.city}, {spotDetail.state}, {spotDetail.country}</h4>
        <div className={sdi.topContainer}>
          <div className={sdi.topLeftSide}>
            <div>
              <img className={sdi.mainImage} src={spotDetail.previewImage} />
            </div>
          </div>
          <div className={sdi.topRightSide}>
            {spotDetail.SpotImages.map((image) => (
              <div key={spotDetail.SpotImages.id} className={sdi.otherImages}>
                <img src={image.url} />
              </div>
            ))}
          </div>
        </div>
        <div className={sdi.midContainer}> 
          <div className={sdi.midLeftSide}>
            <h2>Hosted by {spotDetail.Owner.firstName} {spotDetail.Owner.lastName}</h2>
            <p>{spotDetail.description}</p>
          </div>
          <div className={sdi.midRightSide}>
            <div className={sdi.priceRatingContainer}>
              <h2 className={sdi.price}>${parseFloat(spotDetail.price).toFixed(2)} night</h2>
              <div className={sdi.midRatingContainer}>
                <IoIosStar />
                <h2 className={sdi.midRating}>
                  {spotDetail.avgRating ? parseFloat(spotDetail.avgRating).toFixed(1) : 'New'}
                </h2>
              </div>
              {
                reviewLength > 0 && (
                  <div className={sdi.midReviewsContainer}>
                    <GoDotFill />
                    <h2 className={sdi.midReviews}>
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
        <div className={sdi.bottomContainer}>
          <div className={sdi.bottomRatingReviews}>
            <span className={sdi.bottomRating}>
                <IoIosStar />
                {spotDetail.avgRating ? parseFloat(spotDetail.avgRating).toFixed(1) : 'New'}
              {reviewLength > 0 && (
                <div className={sdi.bottomReviewsContainer}>
                  <GoDotFill />
                  <span className={sdi.bottomReviews}>
                    {`${reviewLength} ${reviewLength === 1 ? 'review' : 'reviews'}`}
                  </span>
                </div> 
              )}
            </span>
          </div>

          <div className={sdi.bottomReviewsList}>
            {!reviewLists?.Reviews || reviewLists?.Reviews?.length === 0 ? (
              <h3>Be the first to post a review!</h3>
            ) : (
              reviewLists?.Reviews?.map((review) => (
                <div key={reviewLists.id} className={sdi.reviewListDetails}>
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