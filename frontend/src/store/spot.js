// import { csrfFetch } from "./csrf";

// ACTION TYPES
const GET_ALL_SPOTS = 'spot/GET_ALL_SPOTS';
const GET_SPOT_DETAIL = 'spot/GET_SPOT_DETAIL';
const GET_REVIEWS_BY_SPOT = 'spot/GET_REVIEWS_BY_SPOT';

// ACTION CREATORS
const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots
  }
}

const getSpotDetail = (spotDetail) => {
  return {
    type: GET_SPOT_DETAIL,
    spotDetail
  }
}

const getReviewsBySpot = (reviewLists) => {
  return {
    type: GET_REVIEWS_BY_SPOT,
    reviewLists
  }
}

// THUNK
export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await fetch('/api/spots');

  if (res.ok) {
    const spots = await res.json();
    dispatch(getAllSpots(spots))
  }
}

export const getSpotDetailThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spotDetail = await res.json();
    dispatch(getSpotDetail(spotDetail))
  }
}

export const getReviewsBySpotThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviewsBySpot = await res.json();
    dispatch(getReviewsBySpot(reviewsBySpot))
  } else {
    dispatch(getReviewsBySpot({}))
  }
}

// INITIAL STATE
const initialState = { allSpots: [] };

// REDUCER
const spotReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_SPOTS:
      return { ...state, allSpots: action.spots }

    case GET_SPOT_DETAIL:
      return { ...state, spotDetail: action.spotDetail }

    case GET_REVIEWS_BY_SPOT:
      return { ...state, reviewLists: action.reviewLists }

    default:
      return state;
  }
}

export default spotReducer;