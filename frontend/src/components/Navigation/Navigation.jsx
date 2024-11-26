import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from './ProfileButton';
import peace from '../images/eco-friendly-recycling-concept.jpg';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul id='nav-bar'>
      <div className='nav-bar-left'>
        <li className='logo-container'>
          <NavLink to="/">
            <img id='logo' src={peace} />
          </NavLink>
        </li>
        <li className='h1-container'>
          <NavLink to="/" className='h1-name'>
            <h1>Peaceful Stay</h1>
          </NavLink>
        </li>
      </div>

      <div className='nav-bar-right'>
        {sessionUser && (
          <li className='create-spot'>
            <NavLink to="/createNewSpot" className='create-spot-link'>
              Create a New Spot
            </NavLink>
          </li>
        )}

        {isLoaded && (
          <li className='profile-button-container'>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </ul>
  )
}

export default Navigation;