import { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { closeModal } = useModal();

  const demoUser = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential: 'johndoe', password: 'password1' }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  const handleCredentialChange = (e) => {
    const value = e.target.value;
    setCredential(value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.credential;
      return newErrors;
    });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.password;
      delete newErrors.credential;
      return newErrors;
    });
  };

  useEffect(() => {
    const isValidForm = 
    credential.length >= 4 &&
    password.length >= 6 &&
    Object.keys(errors).length === 0;
    
    setIsSubmitDisabled(!isValidForm);
  }, [credential, password, errors]);

  return (
    <>
    <div id='login-modal'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email 
          <input
            type='text'
            value={credential}
            onChange={handleCredentialChange}
            required
          />
        </label>
        <p className='login-notes'>Please enter your username or email at least 4 characters</p>
        <label>
          Password 
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <p className='login-notes'>Please enter your password at least 6 characters</p>
        {errors.credential && <p className='error'>{errors.credential}</p>}

        {isSubmitDisabled && (
          <p className='disabled-message'>Please check your input before submitting</p>
        )}
        <button 
          type='submit'
          disabled={isSubmitDisabled}>
          Log In
        </button>

        <div className='demo-user-container'>
          <span className='demo-user' onClick={demoUser}>Demo User</span>
        </div>

      </form>
    </div>
    </>
  );
}

export default LoginFormModal;