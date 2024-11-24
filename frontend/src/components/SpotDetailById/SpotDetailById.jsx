import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetailThunk, getReviewsBySpotThunk } from '../../store/spot';
import { useParams } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";
import './SpotDetailById.css';

function SpotDetailById() {
  const { spotId } = useParams();
  const [loadingSpot, setLoadingSpot] = useState(true);
  const [loadingReview, setLoadingReview] = useState(true);
  const spotDetail = useSelector((state) => state.spots.spotDetail);
  const reviewLists = useSelector((state) => state.spots.reviewLists);
  const dispatch = useDispatch();

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
    const month = date.getMonth() + 1;
    const formattedDate = `${month < 10 ? `0${month}` : month}-${year}`;
    return formattedDate;
  }

  if (loadingSpot) {
    return <p>Loading Spots...</p>
  }
  if (loadingReview) {
    return <p>Loading Reviews...</p>
  }

  console.log('SPOT DETAIL > ', spotDetail);
  console.log('REVIEW LISTS > ', reviewLists);

  return (
    <>
      <div className='main-container'>
        <div className='top-container'>
          <h2>{spotDetail.name}</h2>
          <h3>{spotDetail.city}, {spotDetail.state}, {spotDetail.country}</h3>
          <div className='top-left-side'>
            <div>
              <img className='main-image' src={spotDetail.previewImage} />
          </div>  
          <div className='top-right-side'>
            {spotDetail.SpotImages.map((image) => (
              <div key={spotDetail.SpotImages.id} className='other-images'>
                <img src={image.url} />
              </div>
            ))}
            </div>
          </div>
        </div>
        <div className='mid-container'> 
          <div className='mid-left-side'>
            <h2>Hosted by {spotDetail.Owner.firstName} {spotDetail.Owner.lastName}</h2>
            <p>{spotDetail.description}</p>
          </div>
          <div className='mid-right-side'>
            <h2>${spotDetail.price} night</h2>
            <h3>
              <IoIosStar />
              {spotDetail.avgRating ? spotDetail.avgRating : 'New'}
              {` - `}{reviewLists.Reviews.length} reviews
            </h3>
            <button>Reserve</button>
          </div>
        </div>  
        <hr />
        <div className='bottom-container'>
          <h2>
            <IoIosStar />
            {spotDetail.avgRating ? spotDetail.avgRating : 'New'}
            {` - `}{reviewLists.Reviews.length} reviews
          </h2>
          {reviewLists.Reviews.map((review) => (
            <div key={reviewLists.id} className='review-list-details'>
              <h3>{review.User.firstName}</h3>
              <h4>{DisplayedDate({ updatedAt: review.updatedAt })}</h4>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SpotDetailById;