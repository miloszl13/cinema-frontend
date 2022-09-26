import { useState, useCallback } from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import classes from "./AuthForm.module.css";


const Register = (props) => {


  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [error,setError] = useState(false);
 

  const schema = yup.object().shape({
    username: yup.string().required("username is required!"), //full name mora da bude string i mora da bude unesesno
    password: yup.string().min(4).max(14).required("password must be greather than or equal to 4"), //od 4 do 14 karaktera
    firstname: yup.string(), //full name mora da bude string i mora da bude unesesno
    lastname: yup.string(), //full name mora da bude string i mora da bude unesesno
    role: yup.string().oneOf(["admin", "user"]).required(), //full name mora da bude string i mora da bude unesesno
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });


  const registerUser = useCallback(async (user) => {
    const newUser = JSON.stringify(user);
    const response = await fetch(
      "https://localhost:5001/api/Users/RegisterUser",
      {
        method: "POST",
        body: newUser,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log(response);
      console.log(responseData);
      console.log(responseData.errors);
      setError(responseData.errors)
      throw new Error(responseData.errors);
    }
    console.log(responseData);
    setSuccessMsg("Succesfully created!");
    setIsLoading(false);
  }, []);

  
  const submitHandler = (data) => {

      console.log(data);
      setIsLoading(true);
      registerUser(data).catch((error) => {
        setIsLoading(false);
        setError("Error occured ,try again");
      });
    
    reset();
  };


  return (
    <section>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={classes.control}>
          <input
            type="text"
            placeholder="username..."
            {...register("username")}
          />
          {errors.username?.message && <p>{errors.username?.message}</p>}
        </div>
        <div className={classes.control}>
          <input
            type="text"
            placeholder="Password..."
            {...register("password")}
          />
          {errors.password?.message && <p>{errors.password?.message}</p>}
        </div>
        <div className={classes.control}>
          <input
            type="text"
            placeholder="firstname..."
            {...register("firstname")}
          />
          {errors.firstname?.message && <p>{errors.firstname?.message}</p>}
        </div>
        <div className={classes.control}>
          <input
            type="text"
            placeholder="lastname..."
            {...register("lastname")}
          />
          {errors.lastname?.message && <p>{errors.lastname?.message}</p>}
        </div>
        <div className={classes.control}>
          <input type="text" placeholder="role..." {...register("role")} />
          {errors.role?.message && <p>{errors.role?.message}</p>}
        </div>
        <div className={classes.actions}>
    
            <button type="submit">
              Create Account
            </button>
          
          {isLoading && <p>Sending request...</p>}
          {error && <p>{error}</p>}
          {successMsg && <p>{successMsg}</p>}
        </div>
      </form>
      <button
        type="button"
        className={classes.toggle}
        onClick={props.onChange}
      >
       Login
      </button>
    </section>
  )
  
};

export default Register;
