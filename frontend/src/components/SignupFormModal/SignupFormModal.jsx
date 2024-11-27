import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import sfm from './SignupForm.module.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.email;
      return newErrors;
    });
  };
  
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.username;
      return newErrors;
    });
  };
    
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.password;
      return newErrors;
    });
  };
      
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.confirmPassword;
      return newErrors;
    });
  };

  useEffect(() => {
    const isValidForm = 
      email &&
      email.includes('@') &&
      username.length >= 4 &&
      firstName &&
      lastName &&
      password.length >= 6 &&
      confirmPassword &&
      Object.keys(errors).length === 0;

    setIsSubmitDisabled(!isValidForm);
  }, [email, username, firstName, lastName, password, confirmPassword, errors]);

  return (
    <>
    <div id={sfm.signupModal}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email 
          <input
            type='text'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <p className={sfm.signupNotes}>Please enter email with @ in it</p>
        {errors.email && <p className={sfm.error}>{errors.email}</p>}
        <label>
          Username 
          <input
            type='text'
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </label>
        <p className={sfm.signupNotes}>Please enter at least 4 characters for username</p>
        {errors.username && <p className={sfm.error}>{errors.username}</p>}
        <label>
          First Name
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className={sfm.error}>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className={sfm.error}>{errors.lastName}</p>}
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <p className={sfm.signupNotes}>Please have at least 6 characters for Password</p>
        {errors.password && <p className={sfm.error}>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type='password'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </label>
        <p className={sfm.signupNotes}>Please ensure the Confirm Password is the same with Password</p>
        {errors.confirmPassword && <p className={sfm.error}>{errors.confirmPassword}</p>}
        
        {isSubmitDisabled && (
          <p className={sfm.disabledMessage}>Please check your input before submitting</p>
        )}

        <button className={sfm.buttonSubmit}
          type='submit'
          disabled={isSubmitDisabled}>
          Sign Up
        </button>
      </form>
    </div>
    </>
  );
}

export default SignupFormModal;