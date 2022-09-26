import React, { useState, useEffect, useCallback } from 'react';


let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  isAdmin:false,
  user:'',
  bonusPoints:0,
  increaseBonusPoints:(points)=>{}
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const [admin, setAdmin] = useState(false);
  const [id, setId] = useState('');
  const [bonusPoints, setBonusPoints] = useState(0);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    setAdmin(false)
    setId('')
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (tokenn, expirationTime) => {
    setToken(tokenn);
    console.log('loginHandler')
    localStorage.setItem('token', tokenn);
    localStorage.setItem('expirationTime', expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    
    let jwtData = tokenn.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    let Admin = decodedJwtData.role
    if(Admin==='admin'){
      setAdmin(true);
    }
    console.log(decodedJwtJsonData)
    console.log(decodedJwtData.id)
    setId(decodedJwtData.id)
    setBonusPoints(decodedJwtData.bonusPoints)

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };
  
  const onIncreaseBonusPoints=(points)=>{
    setBonusPoints(prev=>+prev+ +points)
  }

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    isAdmin:admin,
    user:id,
    bonusPoints:bonusPoints,
    increaseBonusPoints:onIncreaseBonusPoints
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;