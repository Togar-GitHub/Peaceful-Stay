import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PiUserListBold } from "react-icons/pi";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
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
    navigate('/');
    closeMenu();
  };

  const ulClassName = showMenu ? pbt.profileDropdown : pbt.hidden;

  return (
    <>
      <button className={pbt.mainButton} onClick={toggleMenu}>
        <PiUserListBold size='60px' />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div id={pbt.userDetails}>
            <li className={pbt.helloUser}>
              <li>Hello {user.username}</li>
              <li>email: {user.email}</li>
            </li>
            <hr className={pbt.line} />
            <li className={pbt.manageSpots}>
              <NavLink to="/api/spots/current">
                <h4>Manage Spots</h4>
              </NavLink>
            </li>
            <hr className={pbt.line} />
            <li className={pbt.logoutContainer}>
              <button id={pbt.logoutButton} onClick={logout}>Log Out</button>
            </li>
          </div>
          </>
        ) : (
          <>
          <div id={pbt.dropLoginSignup} >
            <div className={pbt.loginSignup}>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className={pbt.loginSignup}>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;