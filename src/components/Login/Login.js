import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT_EMAIL') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === "VALIDATE_EMAIL") {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT_PASSWORD") {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }

  if (action.type === "VALIDATE_PASSWORD") {
    console.log(state.value.trim().length > 6);
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  // return { value: '', isValid: false }
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    { value: '', isValid: null }
  );

  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    { value: '', isValid: null }
  );

  const authContext = useContext(AuthContext);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: "USER_INPUT_EMAIL",
      val: event.target.value,
    })
    // setEnteredEmail(event.target.value);

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({
      type: "USER_INPUT_PASSWORD",
      val: event.target.value,
    });


    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );

  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: "VALIDATE_EMAIL",
    });
    // setEmailIsValid(emailState.isValid);

  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: "VALIDATE_PASSWORD",
    });

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );

    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.onLogIn(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
