import { csrfFetch } from "./csrf";

// ACTION TYPES
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

// ACTION CREATORS
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  }
}

const removeUser = () => {
  return {
    type: REMOVE_USER
  }
}

// THUNK 
export const login = (user) => async (dispatch) => {
  const { credential, password } = user
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      credential,
      password
    })
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
  }
}

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
}

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
}

// REDUCERS
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER:
      return { ...state, user: action.payload }

    case REMOVE_USER:
      return { ...state, user: null}

    default:
      return state
  }
}

export default sessionReducer;