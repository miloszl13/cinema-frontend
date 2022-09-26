import { useState} from 'react';

import classes from './AuthForm.module.css';

import Login from './Login';
import Register from './Register';

const AuthForm = () => {
  const [isLogin,setIsLogin]=useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
          {isLogin && <Login onChange={switchAuthModeHandler}/>}
          {!isLogin && <Register onChange={switchAuthModeHandler}/>}
    </section>
  );
};

export default AuthForm;