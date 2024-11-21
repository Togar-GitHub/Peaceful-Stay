//! the comments showing the initial intention of having logout in this Navigation
//! then, it is moved to Profile Button
//! after understanding the logic - these comments can be removed
//! see README-frontend-phase-3.md on lines 304 to 342

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
import ProfileButton from './ProfileButton';
// import * as sessionActions from '../../store/session';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  // const dispatch = useDispatch();

  // const logout = (e) => {
  //   e.preventDefault();
  //   dispatch(sessionActions.logout());
  // };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
   } else {
    sessionLinks = (
      <div>
        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </li>
      </div>
    );
  }

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