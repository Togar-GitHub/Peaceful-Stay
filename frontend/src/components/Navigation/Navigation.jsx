import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from './ProfileButton';
import peace from '../images/eco-friendly-recycling-concept.jpg';
import nvg from './Navigation.module.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul id={nvg.navBar}>
      <div className={nvg.navBarLeft}>
        <li className={nvg.logoContainer}>
          <NavLink to="/">
            <img id={nvg.logo} src={peace} />
          </NavLink>
        </li>
        <li className={nvg.h1Container}>
          <NavLink to="/" className={nvg.h1Name}>
            <h1 className={nvg.h1Line}>Peaceful Stay</h1>
          </NavLink>
        </li>
      </div>

      <div className={nvg.navBarRight}>
        {sessionUser && (
          <li className={nvg.createSpot}>
            <NavLink to="/createNewSpot" className={nvg.createSpotLink}>
              Create a New Spot
            </NavLink>
          </li>
        )}

        {isLoaded && (
          <li className={nvg.profileButtonContainer}>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </ul>
  )
}

export default Navigation;