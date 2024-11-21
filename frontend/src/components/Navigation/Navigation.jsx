//! the comments showing the initial intention of having logout in this Navigation
//! then, it is moved to Profile Button
//! after understanding the logic - these comments can be removed
//! see README-frontend-phase-3.md on lines 304 to 342

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
import ProfileButton from './ProfileButton';
// import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  // const dispatch = useDispatch();

  // const logout = (e) => {
  //   e.preventDefault();
  //   dispatch(sessionActions.logout());
  // };

  const sessionLinks = sessionUser ? (
    <>
      <li>
        <ProfileButton user={sessionUser} />
      </li>
      {/* <li>
        <button onClick={logout}>Log Out</button>
      </li> */}
    </>
  ) : (
    <>
      <li>
        <NavLink to="/login">Log In</NavLink>
      </li>
      <li>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    </>
  );

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  )
}

export default Navigation;