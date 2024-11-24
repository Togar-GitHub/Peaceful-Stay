import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

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

  useEffect(() => {
    const isValidForm = 
      email &&
      email.includes('@') &&
      username.length >= 4 &&
      firstName &&
      lastName &&
      password.length >= 6 &&
      confirmPassword &&
      password === confirmPassword &&
      Object.keys(errors).length === 0;

    setIsSubmitDisabled(!isValidForm);
  }, [email, username, firstName, lastName, password, confirmPassword, errors]);

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

  return (
    <>
    <div id='signup-modal'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email 
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <p className='signup-notes'>Please enter email with @ in it</p>
        {errors.email && <p className='error'>{errors.email}</p>}
        <label>
          Username 
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <p className='signup-notes'>Please enter at least 4 characters for username</p>
        {errors.username && <p className='error'>{errors.username}</p>}
        <label>
          First Name
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className='error'>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className='error'>{errors.lastName}</p>}
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <p className='signup-notes'>Please have at least 6 characters for Password</p>
        {errors.password && <p className='error'>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <p className='signup-notes'>Please ensure the Confirm Password is the same with Password</p>
        {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
        
        {isSubmitDisabled && (
          <p className='disabled-message'>Please check your input before submitting</p>
        )}

        <button 
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