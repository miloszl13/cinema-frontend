import React from 'react'
import classes from './SeatsToReserve.module.css'

function SeatsToReserve(props) {
    const seatsToReserve = props.seats.map((seat) => {
        return (
          <label className={classes.seatsToReserve} key={seat}>
            {seat}
          </label>
        );
      });
  return (
    <div className={classes.labels}>
    {seatsToReserve}
    </div>
  )
}

export default SeatsToReserve
