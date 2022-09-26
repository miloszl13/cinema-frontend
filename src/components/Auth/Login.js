import { useState, useContext ,useCallback} from 'react';

import { useHistory } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';


const Login = (props) => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const schema = yup.object().shape({
        username: yup.string().required('username is required!'),  //full name mora da bude string i mora da bude unesesno
        password: yup.string().min(4).max(14).required('password must be greather than or equal to 4'),  //od 4 do 14 karaktera
    })

    const {register,handleSubmit,formState:{errors},reset}=useForm({
        resolver:yupResolver(schema)
    })

  const loginUser = useCallback(async(user)=>{
  const userToLogin = JSON.stringify(user);
  console.log(userToLogin)
  const response = await fetch("https://localhost:5001/api/Users/login",
    {
      method: "POST",
      body: userToLogin,
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json',
        
      }
    }
  )
  const data= await response.json()
  
  console.log(data)
  if (!response.ok) {
    setError(data)
    throw new Error()
  }
  const expirationTimee = new Date(
    new Date(new Date().getTime() + 1*60*60*1000)
  );
  
  authCtx.login(data, expirationTimee.toString());
  history.replace('/');
  isLoading(false)
},[authCtx,history,isLoading]);


  const submitHandler = (data) => {
      setIsLoading(true);
        loginUser(data).catch(error=>{
          setIsLoading(false)
        });

    reset();
    
  };


  return (
    <section>
        <h1>Login</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
           <div className={classes.control}>
            <input type='text' placeholder="username..." {...register("username")}/>
            {errors.username?.message && <p>{errors.username?.message}</p>}
            </div>
            <div className={classes.control}>
            <input type='text' placeholder="Password..." {...register("password")}/>
            {errors.password?.message && <p>{errors.password?.message}</p>}
            </div>
            <div className={classes.actions}>
          {!isLoading && (
            <button type='submit'>Login</button>
          )}
          {isLoading && <p>Sending request...</p>}
          {error && <p>{error}</p>}
        </div>
        </form>
        <button
            type='button'
            className={classes.toggle}
            onClick={props.onChange}
          >
            Create new account
          </button>
    </section>
  );
};

export default Login;