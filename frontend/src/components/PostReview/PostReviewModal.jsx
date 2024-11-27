import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegStar, FaStar } from "react-icons/fa";
import { createNewReviewThunk, getReviewsBySpotThunk, getSpotDetailThunk } from '../../store/spot';
import prv from './PostReview.module.css';

function PostReviewModal({ closeModal, spotId, handleReviewSubmission }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const [review, setReview] = useState('');
  const [stars, setStars] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const modalRef = useRef(null);

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
  }, [closeModal, handleReviewSubmission]);

  const incomingReview = {
    userId: user.id,
    spotId,
    review,
    stars: stars.length
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewReviewThunk(incomingReview))
      .then(() => {
        closeModal();
        navigate(`/api/spots/${spotId}`, { replace: true});
        dispatch(getSpotDetailThunk(spotId));
        dispatch(getReviewsBySpotThunk(spotId));
      })
      .catch((error) => {
        console.error('Failed to submit review:', error);
      });
  };

  const handleReviewChange = (e) => {
    const value = e.target.value;
    setReview(value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.review;
      return newErrors;
    })
  }

  // handling Stars
  const handleStarClick = (value) => {
    setRating(value);
    setStars(Array(value).fill(true));
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
      starElements.push(
        <span
          key={i}
          className={prv.star}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        >
          {i <= (hoveredRating || rating) ? (
            <FaStar className={prv.filled} />
          ) : (
            <FaRegStar className={prv.empty} />
          )}
        </span>
      )
    }
    return starElements;
  }

  useEffect(() => {
    const isValidForm = 
      review.length >= 10 &&
      stars.length >= 1 &&
      Object.keys(errors).length === 0;

    setIsSubmitDisabled(!isValidForm);
  }, [review, stars, errors]);

  return (
    <>
      <div className={prv.mainContainer} ref={modalRef}>
        <h2 className={prv.mainH2}>How was your stay?</h2>
        <form onSubmit={handleSubmit}>
          <div className={prv.reviewContainer}>
            <textarea
              className={prv.inputBox}
              type='text'
              value={review}
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
            Submit Your Review
          </button>

        </form>
      </div>
    </>
  )
}

export default PostReviewModal;