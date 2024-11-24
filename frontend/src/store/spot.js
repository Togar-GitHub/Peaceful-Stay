import { csrfFetch } from "./csrf";

// ACTION TYPES
const GET_ALL_SPOTS = 'spot/GET_ALL_SPOTS';
const GET_SPOT_DETAIL = 'spot/GET_SPOT_DETAIL';

// ACTION CREATORS
const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots
  }
}

const getSpotDetail = (spotId) => {
  return {
    type: GET_SPOT_DETAIL,
    spotId
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
  const res = await fetch('/api/spots/spotId');

  if (res.ok) {
    const spotDetail = await res.json();
    dispatch(getSpotDetail(spotDetail))
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

    default:
      return state;
  }
}

export default spotReducer;