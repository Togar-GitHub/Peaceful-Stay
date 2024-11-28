import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PiUserListBold } from "react-icons/pi";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { setCustomProp, clearCustomProp } from '../../store/customProp';
import pbt from './ProfileButton.module.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(clearCustomProp());
    navigate('/');
    closeMenu();
  };

  const handleNavLinkClick = () => {
    dispatch(setCustomProp('manageSpots'));
  };
  const handleLoginSuccess = () => {
    dispatch(clearCustomProp());
  };
  const handleSignupSuccess = () => {
    dispatch(clearCustomProp());
  };

  const divClassName = showMenu ? pbt.profileDropdown : pbt.hidden;

  return (
    <>
      <button className={pbt.mainButton} onClick={toggleMenu}>
        <PiUserListBold size='60px' />
      </button>
      <div className={divClassName} ref={ulRef}>
        {user ? (
          <>
          <div id={pbt.userDetails}>
            <div className={pbt.helloUser}>
              <li>Hello {user.username}</li>
              <li>email: {user.email}</li>
            </div>
            <hr className={pbt.line} />
            <div className={pbt.manageSpots}>
              <NavLink
                to='/'
                onClick={handleNavLinkClick}
              >
                <h4 className={pbt.manageSpots}>Manage Spots</h4>
              </NavLink>
            </div>
            <hr className={pbt.line} />
            <div className={pbt.logoutContainer}>
              <button id={pbt.logoutButton} onClick={logout}>Log Out</button>
            </div>
          </div>
          </>
        ) : (
          <>
          <div id={pbt.dropLoginSignup} >
            <div className={pbt.loginSignup}>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal 
                onSuccess={handleLoginSuccess} />}
              />
            </div>
            <div className={pbt.loginSignup}>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal 
                onSuccess={handleSignupSuccess} />}
              />
            </div>
          </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;