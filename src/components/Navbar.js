import React,{useContext,useState} from 'react'
import popcornLogo from '../assets/pop.jpg'
import {Link} from 'react-router-dom'
import AuthContext from '../store/auth-context'
import { Nav } from '../styles/Nav.styled'
import Modal from '../ui/Modal'
function Navbar() {
  const authCtx=useContext(AuthContext); 
  const loggedIn=authCtx.isLoggedIn;
  const isAdmin=authCtx.isAdmin;
  const bonusPoints=authCtx.bonusPoints;

  const [openedBonusPoints,setOpenedBonusPoints]=useState(false);
  
  const logoutHandler=()=>{
    authCtx.logout();
  }
  const onOpenBonusPoints=()=>{
    setOpenedBonusPoints(prev=>!prev);
  }
 console.log(bonusPoints)
  return (
    <>
      <Nav>
        <img src={popcornLogo} alt='logo'/>     
      <div>
        {loggedIn && 
        <>
        <Link to='/'>Home</Link>
        <Link to='/movies'>Movies</Link>
        <Link to='/reservations'>Reservations</Link>
        {isAdmin && <Link to='/cinemas'>Cinemas</Link>}
        <Link to='/login' onClick={logoutHandler}>Logout</Link>
        <a onClick={onOpenBonusPoints} style={{cursor:'pointer'}}>BonusPoints</a>
        </>
      }
      </div> 
      </Nav>
      {openedBonusPoints && <Modal onClose={onOpenBonusPoints}>
        <div>
          <h1>You currently have {bonusPoints} bonus points!</h1>
        </div>
      </Modal>}
      </>
  )
}

export default Navbar

