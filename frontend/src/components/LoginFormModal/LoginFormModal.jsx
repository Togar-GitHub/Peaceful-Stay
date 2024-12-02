import { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import lgf from './LoginForm.module.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const loginMessage = useSelector((state) => state.session.errorMessage);
  const { closeModal } = useModal();
  const [shouldClose, setShouldClose] = useState(false);

  useEffect(() => {
    if (shouldClose && Object.keys(errors).length === 0 && !loginMessage) {
      closeModal();
    }
  }, [shouldClose, errors, loginMessage, closeModal])

  const demoUser = (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitted(false);
    return dispatch(sessionActions.login({ credential: 'johndoe', password: 'password1' }))
    .then(() => {
      if (Object.keys(errors).length === 0 && !loginMessage) {
        setIsSubmitted(true);
        closeModal();
      }
    })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
        setIsSubmitted(true);
      }
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitDisabled(true);
    setErrors({});
    setIsSubmitted(true);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        if (Object.keys(errors).length === 0 && !loginMessage) {
          setShouldClose(true);
        }
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
        setShouldClose(false);
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
    <div id={lgf.loginModal}>
      <h1>Log In</h1>

      {isSubmitted && loginMessage && (
        <p className={lgf.errorMessage}>
          {loginMessage}
        </p>
      )}

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
        <p className={lgf.loginNotes}>Please enter your username or email at least 4 characters</p>
        <label>
          Password 
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <p className={lgf.loginNotes}>Please enter your password at least 6 characters</p>
        {errors.credential && <p className={lgf.error}>{errors.credential}</p>}

        {isSubmitDisabled && (
          <p className={lgf.disabledMessage}>Please check your input before submitting</p>
        )}
        <button 
          className={lgf.submitButton}
          type='submit'
          disabled={isSubmitDisabled}>
          Log In
        </button>

        <div className={lgf.demoUserContainer}>
          <span className={lgf.demoUser} onClick={demoUser}>Demo User</span>
        </div>

      </form>
    </div>
    </>
  );
}

export default LoginFormModal;