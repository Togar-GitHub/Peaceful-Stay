import { csrfFetch } from "./csrf";

//ACTION TYPES
const GET_REVIEW_BY_ID = 'review/GET_REVIEW_BY_ID';
const UPDATE_REVIEW = 'review/UPDATE_REVIEW';

// ACTION CREATORS
const getReviewById = (reviewId) => {
  return {
    type: GET_REVIEW_BY_ID,
    reviewId
  }
}

const updateReview = (reviewId, incomingReview) => {
  return {
    type: UPDATE_REVIEW,
    reviewId,
    incomingReview
  }
}

// THUNK
export const getReviewByIdThunk = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`);

  if (res.ok) {
    const review = await res.json();
    dispatch(getReviewById);
    return review;
  }
}

export const updateReviewThunk = (reviewId, incomingReview) => async (dispatch) => {
  console.log('update in thunk ', reviewId, incomingReview)
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(incomingReview),
  })
  console.log('return from update ', res)
  if (res.ok) {
    const updatedReview = await res.json();
    dispatch(updateReview(updatedReview));
    return updatedReview;
  }
}

// INITIAL STATE
const initialState = {
  reviews: null
}

// REDUCER
const reviewReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_REVIEW_BY_ID:
      return { ...state, reviews: action.reviews }

    case UPDATE_REVIEW:
      return { ...state, updateReview: action.updateReview }

    default:
      return state;
  }
}

export default reviewReducer;