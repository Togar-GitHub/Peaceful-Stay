import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegStar, FaStar } from "react-icons/fa";
import { createNewReviewThunk, getReviewsBySpotThunk, getSpotDetailThunk } from '../../store/spot';
import { getReviewByIdThunk, updateReviewThunk } from '../../store/review';
import prv from './PostReview.module.css';

function PostReviewModal({ closeModal, spotId, reviewAction, reviewIdValue, spotName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const [stars, setStars] = useState([]);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const modalRef = useRef(null);
  const [reviewData, setReviewData] = useState({
    id: '',
    userId: '',
    spotId: '',
    review: '',
    stars: []
  })

  useEffect(() => {
    if (reviewAction === 'update') {
      const getReviewData = async () => {
        try {
          const reviewById = await dispatch(getReviewByIdThunk(reviewIdValue));

          if (reviewById?.Reviews) {
            setReviewData({
              id: reviewById.id,
              userId: reviewById.Reviews.userId,
              spotId: reviewById.Reviews.spotId,
              review: reviewById.Reviews.review,
              stars: reviewById.Reviews.stars
            })
            setStars(Array(reviewById.Reviews.stars)
              .fill(true)
              .concat(Array(5 - reviewById.Reviews.stars)
              .fill(false)))
          } else {
            setErrors({ general: 'Review data not found' })
          }
        } catch (err) {
          setErrors({ general: 'Error fetching review data, please try again'});
          console.error('Error fetching Review data:', err)
        }
      };
      getReviewData();
    }
  }, [dispatch, reviewAction, reviewIdValue])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (closeModal) closeModal();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [closeModal]);

  const handleReviewChange = (e) => {
    const value = e.target.value;
    setReviewData((prevData) => ({
      ...prevData,
      review: value
    }));
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.review;
      return newErrors;
    })
  }
  
  // handling Stars
  const handleStarClick = (value) => {
    const newStars = Array(5).fill(false);
    for (let i = 0; i < value; i++) {
      newStars[i] = true;
    }
    setStars(newStars);
  }

  const handleMouseEnter = (value) => {
    setHoveredRating(value);
  }

  const handleMouseLeave = () => {
    setHoveredRating(0);
  }

  const renderStars = () => {
    const starElements = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = hoveredRating >= i || stars[i - 1]

      starElements.push(
        <span
          key={i}
          className={prv.star}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        >
          {/* {i <= (hoveredRating || rating) ? ( */}
          {isFilled ? (
            <FaStar className={prv.filled} />
          ) : (
            <FaRegStar className={prv.empty} />
          )}
        </span>
      )
    }
    return starElements;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const incomingReview = {
      userId: user.id,
      spotId: Number(spotId),
      review: reviewData.review,
      stars: stars.filter(Boolean).length
    }

    try {
      if (reviewAction === 'update') {
        await dispatch(updateReviewThunk(reviewIdValue, incomingReview))
      } else {
        await dispatch(createNewReviewThunk(incomingReview))
      }

      closeModal();
      await dispatch(getSpotDetailThunk(spotId));
      await dispatch(getReviewsBySpotThunk(spotId));
      await navigate(`/spotDetail/${spotId}`);
    } catch(error) {
      console.error('Failed to submit review:', error);
      if (error.response) {
        setErrorMessage(`Error ${error.response.status}: ${error.response.data.message || 'An error occurred.'}`);
      } else {
        setErrorMessage('An unknown error occurred. Please try again.');
      }
    }
  };

  useEffect(() => {
    const isValidForm = 
      (reviewData.review && reviewData.review.length >= 10) &&
      stars.some(Boolean) &&
      Object.keys(errors).length === 0;

    setIsSubmitDisabled(!isValidForm);
  }, [reviewData.review, stars, errors]);

  return (
    <>
      <div className={prv.mainContainer} ref={modalRef}>
        {reviewAction === 'update' ? (
          <>
            <h2 className={prv.mainH2}>How was your stay at</h2>
            <h2 className={prv.mainH2}>{spotName}?</h2>
          </>

        ) : (
          <h2 className={prv.mainH2}>How was your stay?</h2>
        )}

        {errorMessage && <p className={prv.error}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className={prv.reviewContainer}>
            <textarea
              className={prv.inputBox}
              type='text'
              value={reviewData.review}
              placeholder='Leave your review here - at least 10 characters'
              onChange={handleReviewChange}
              required
            />
          </div>

          <div className={prv.starRating}>
            <div className={prv.starsContainer}>
              {renderStars()}
            </div>
            <p>Stars</p>
          </div>

          {isSubmitDisabled && (
              <p className={prv.disabledMessage}>Please check your review and stars before submitting</p>
          )}
          <button className={prv.buttonSubmit}
            type='submit'
            disabled={isSubmitDisabled}>
            {reviewAction === 'update' ? 'Update Your Review' : 'Submit Your Review'}
          </button>

        </form>
      </div>
    </>
  )
}

export default PostReviewModal;