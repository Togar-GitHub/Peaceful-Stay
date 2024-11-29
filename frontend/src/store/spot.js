import { csrfFetch } from "./csrf";

// ACTION TYPES
const GET_ALL_SPOTS = 'spot/GET_ALL_SPOTS';
const GET_CURRENT_USER_SPOTS = 'spot/GET_CURRENT_USER_SPOTS';
const GET_SPOT_DETAIL = 'spot/GET_SPOT_DETAIL';
const CREATE_NEW_SPOT = 'spot/CREATE_NEW_SPOT';
const UPDATE_SPOT = 'spot/UPDATE_SPOT';
const ADD_SPOT_IMAGE = 'spot/ADD_SPOT_IMAGE';
const UPDATE_SPOT_IMAGE = 'spot/UPDATE_SPOT_IMAGE';
const DELETE_SPOT_IMAGE = 'spot/DELETE_SPOT_IMAGE';
const GET_REVIEWS_BY_SPOT = 'spot/GET_REVIEWS_BY_SPOT';
const CREATE_NEW_REVIEW = 'spot/CREATE_NEW_REVIEW';
const SET_NO_SPOTS_AVAILABLE = 'spots/SET_NO_SPOTS_AVAILABLE';
const CLEAR_NO_SPOTS_MESSAGE = 'spots/CLEAR_NO_SPOTS_MESSAGE';

// ACTION CREATORS
const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots
  }
}

const getCurrentUserSpots = (spotsCurrent) => {
  return {
    type: GET_CURRENT_USER_SPOTS,
    spotsCurrent
  }
}

const getSpotDetail = (spotDetail) => {
  return {
    type: GET_SPOT_DETAIL,
    spotDetail
  }
}

const createNewSpot = (incomingSpot) => {
  return {
    type: CREATE_NEW_SPOT,
    incomingSpot
  }
}

const updateSpot = (spotId, incomingSpot) => {
  return {
    type: UPDATE_SPOT,
    spotId,
    incomingSpot
  }
}

const addSpotImage = (incomingSpotImage) => {
  return {
    type: ADD_SPOT_IMAGE,
    incomingSpotImage
  }
}

const updateSpotImage = (imageId, incomingImage) => {
  return {
    type: UPDATE_SPOT_IMAGE,
    imageId,
    incomingImage
  }
}

const deleteSpotImage = (imageId) => {
  return {
    type: DELETE_SPOT_IMAGE,
    imageId
  }
}

const getReviewsBySpot = (reviewLists) => {
  return {
    type: GET_REVIEWS_BY_SPOT,
    reviewLists
  }
}

const createNewReview = (incomingReview) => {
  return {
    type: CREATE_NEW_REVIEW,
    incomingReview
  }
}

const setNoSpotsAvailable = (message) => {
  return {
    type: SET_NO_SPOTS_AVAILABLE,
    message
  }
}

const clearNoSpotsMessage = () => {
  return {
    type: CLEAR_NO_SPOTS_MESSAGE
  }
}

// THUNK
export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await fetch('/api/spots');

  if (res.ok) {
    const spots = await res.json();
    dispatch(getAllSpots(spots));
    dispatch(clearNoSpotsMessage());
  } else {
    dispatch(setNoSpotsAvailable('No Spots available or failed to fetch Spots.'))
  }
}

export const getCurrentUserSpotsThunk= () => async (dispatch) => {
  const res = await csrfFetch('/api/spots/current');

  if (res.ok) {
    const spotsCurrent = await res.json();
    dispatch(getCurrentUserSpots(spotsCurrent));
    dispatch(clearNoSpotsMessage());
  } else {
    dispatch(setNoSpotsAvailable('No Spots available for this User or failed to fetch Spots.'))
  }
}

export const getSpotDetailThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spotDetail = await res.json();
    dispatch(getSpotDetail(spotDetail))
    return spotDetail;
  }
}

export const createNewSpotThunk = (incomingSpot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(incomingSpot),
  })

  if (res.ok) {
    const createdSpot = await res.json();
    dispatch(createNewSpot(createdSpot));
    return createdSpot;
  }
}

export const updateSpotThunk = (spotId, incomingSpot) => async (dispatch) => {

  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(incomingSpot),
  })

  if (res.ok) {
    const updatedSpot = await res.json();
    dispatch(updateSpot(updateSpot));
    return updatedSpot;
  }
}

export const addSpotImageThunk = (incomingSpotImage) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${incomingSpotImage.spotId}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(incomingSpotImage)
  })

  if (res.ok) {
    const createdSpotImage = await res.json();
    dispatch(addSpotImage(createdSpotImage));
  }
}

export const updateSpotImageThunk = (imageId, incomingImage) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${imageId}/images`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(incomingImage)
  })

  if (res.ok) {
    const updatedSpotImage = await res.json();
    dispatch(updateSpotImage(updatedSpotImage));
  }
}

export const deleteSpotImageThunk = (imageId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${imageId}/images`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'}
  })

  if (res.ok) {
    const deletedSpotImage = await res.json();
    dispatch(deleteSpotImage(deletedSpotImage));
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

export const createNewReviewThunk = (incomingReview) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${incomingReview.spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(incomingReview)
  })

  if (res.ok) {
    const createdReview = await res.json();
    dispatch(createNewReview(createdReview));
  }
}

// INITIAL STATE
const initialState = { 
  allSpots: [],
  spotsCurrent: [],
  noSpotsMessage: null,
  error: null
};

// REDUCER
const spotReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_SPOTS:
      return { ...state, allSpots: action.spots }

    case GET_CURRENT_USER_SPOTS:
      return { ...state, spotsCurrent: action.spotsCurrent }

    case GET_SPOT_DETAIL:
      return { ...state, spotDetail: action.spotDetail }

    case CREATE_NEW_SPOT:
      return { ...state, newSpot: action.newSpot }

    case UPDATE_SPOT:
      return { ...state, updateSpot: action.updateSpot }

    case ADD_SPOT_IMAGE:
      return { ...state, newSpotImage: action.newSpotImage }

    case UPDATE_SPOT_IMAGE:
      return { ...state, updateSpotImage: action.updateSpotImage }

    case DELETE_SPOT_IMAGE:
      return { ...state, deleteSpotImage: action.deleteSpotImage }

    case GET_REVIEWS_BY_SPOT:
      return { ...state, reviewLists: action.reviewLists }

    case CREATE_NEW_REVIEW:
      return { ...state, newReview: action.newReview }

    case SET_NO_SPOTS_AVAILABLE:
      return { ...state, noSpotsMessage: action.message }
      
    case CLEAR_NO_SPOTS_MESSAGE:
      return { ...state, noSpotsMessage: null }

    default:
      return state;
  }
}

export default spotReducer;