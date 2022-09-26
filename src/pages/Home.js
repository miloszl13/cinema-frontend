import React from 'react'
import {Link} from 'react-router-dom'
import BannerImage from '../assets/cinemawalp2.jpg'
import classes from './Home.module.css'
import Button from '../ui/Button'

function Home() {
  return (
    <div className={classes.home} style={{backgroundImage:`url(${BannerImage})` , backgroundSize:'cover'}}>
      <div className={classes.headerContainer}>
         <h1>Welcome</h1>
         <p>Catch films before everyone :)</p>
         <Link to='/movies'>
         <Button>Go to movie list</Button>
         </Link>
      </div>
    </div>
  )
}

export default Home
