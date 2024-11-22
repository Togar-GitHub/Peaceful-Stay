import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from './ProfileButton';
import peace from '../images/peace.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul id='nav-bar'>
      <li>
        <NavLink to="/">
          <img id='logo' src={peace} />
        </NavLink>
        <NavLink to="/">
          <h1>Peaceful Stay</h1>
        </NavLink>
      </li>
      {isLoaded && (
        <li className='profile-button-container'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  )
}

export default Navigation;