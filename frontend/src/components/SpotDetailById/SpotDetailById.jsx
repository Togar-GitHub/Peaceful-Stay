import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetailThunk, getReviewsBySpotThunk } from '../../store/spot';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import PostReviewModal from '../PostReview/PostReviewModal';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import sdi from './SpotDetailById.module.css';
import { deleteReviewThunk } from '../../store/review';

function SpotDetailById() {
  const { spotId } = useParams();
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [loadingSpot, setLoadingSpot] = useState(true);
  const [loadingReview, setLoadingReview] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [reviewAction, setReviewAction] = useState(null);
  const [reviewIdValue, setReviewIdValue] = useState(null);
  const [spotName, setSpotName] = useState(null);
  const sessionUser = useSelector(state => state.session.user);
  const spotDetail = useSelector((state) => state.spots.spotDetail);
  const reviewLists = useSelector((state) => state.spots.reviewLists);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const deleteModalRef = useRef(null);

  let userHasReview;
  if (sessionUser) {
    userHasReview = reviewLists?.Reviews?.filter((review) => {
      return sessionUser.id === review.userId
  })}

  // First useEffect for fetching spot details
  useEffect(() => {
    dispatch(getSpotDetailThunk(spotId)).finally(() => {
      setLoadingSpot(false);
    });
  }, [spotId, dispatch]);

  // Second useEffect for fetching reviews, triggered after the spot details are loaded
  useEffect(() => {
    dispatch(getReviewsBySpotThunk(spotId)).finally(() => {
      setLoadingReview(false);
      setIsReviewSubmitted(false); // Reset after fetching reviews
    });
  }, [loadingSpot, isReviewSubmitted, dispatch, spotId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (modalRef.current && !modalRef.current.contains(event.target)) ||
        (deleteModalRef.current && !deleteModalRef.current.contains(event.target)) 
      ) {
        closeModal();
        setReviewToDelete(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  function openModal(action, reviewId, spotCurrentName) {
    setReviewAction(action);
    setReviewIdValue(reviewId);
    setSpotName(spotCurrentName);
    setShowModal(true);
  }

  function openDeleteModal(reviewId) {
    setReviewToDelete(reviewId);
    setShowDeleteModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setShowDeleteModal(false);
    setIsReviewSubmitted(false);
  }

  const handleDeleteConfirm = async () => {
    if (reviewToDelete) {
      await dispatch(deleteReviewThunk(reviewToDelete))
      await dispatch(getSpotDetailThunk(spotId))
      await dispatch(getReviewsBySpotThunk(spotId))
        .then(() => {
          closeModal();
        })
    }
    closeModal();
  }

  function handleDeleteCancel() {
    setReviewToDelete(null);
    closeModal();
  }

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
      {showModal && <div className={sdi.overlay} onClick={closeModal}></div>}
      {showModal && (
        <div className={sdi.mainContainer}>
          <PostReviewModal 
            closeModal={closeModal} 
            spotId={spotId} 
            reviewAction={reviewAction}
            reviewIdValue={reviewIdValue}
            spotName={spotName}
          />
        </div>
      )}

      {showDeleteModal && (
        <DeleteReviewModal
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          onClose={closeModal}
          reviewId={reviewToDelete}
        />
      )}

      <div className={sdi.mainContainer} style={{ marginTop: "120px" }}>
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
            <button className={sdi.buttonReservation} onClick={reservation}>Reserve</button>
          </div>
        </div>  
        <hr className={sdi.hrLine}/>
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

            {sessionUser && sessionUser.id !== spotDetail.ownerId && (!userHasReview || userHasReview.length === 0) && (
              <div className={sdi.postReview}>
                <button onClick={() => openModal('create', null, null)}
                  className={sdi.buttonPostReview}>
                  Post Your Review
                </button>
              </div>
            )}

            {!reviewLists?.Reviews || reviewLists?.Reviews?.length === 0 ? (
              <h3>Be the first to post a review!</h3>
            ) : (
              reviewLists?.Reviews?.map((review) => (
                <div key={review.id} className={sdi.reviewListDetails}>
                  <h3>{review.User.firstName}</h3>
                  <h4>{DisplayedDate({ updatedAt: review.updatedAt })}</h4>
                  <p>{review.review}</p>

                  {sessionUser && sessionUser.id !== spotDetail.ownerId && sessionUser.id === review.userId && (
                    <div className={sdi.updateDeleteButtonContainer}>
                      <div className={sdi.updateButton}>
                        <button onClick={() => openModal('update', review.id, spotDetail.name)}
                          className={sdi.updateButtonLink}>
                          Update
                        </button>
                      </div>
                      <div className={sdi.deleteButton}>
                        <button 
                          onClick={() => openDeleteModal(review.id)}
                          className={sdi.deleteButtonLink}>
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
            )))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SpotDetailById;