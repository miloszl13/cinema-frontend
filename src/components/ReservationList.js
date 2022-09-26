import React, { useEffect,useState,useCallback } from 'react'
import classes from './ReservationList.module.css'
function ReservationList() {
const [reservations,setReservations]=useState([]);
    const fetchReservations = useCallback(async () => {
    
        const response = await fetch("https://localhost:5001/api/Reservations/GetAllReservations");
        const responseData=await response.json()
        console.log(responseData)
        if (!response.ok) {
    
          throw new Error();
        }
        const loadedReservations = [];
    
        for (const key in responseData) {
          loadedReservations.push({
            reservationId:responseData[key].reservation_Id,
            reservationPrice:responseData[key].reservation_Price,
            userId:responseData[key].user_Id,
            username:responseData[key].username,
            projectionId:responseData[key].projections_Id,
            movieTitle:responseData[key].movie_Title,
           // reservedSeats:responseData[key].reservedSeats,
          });
        }
        setReservations(loadedReservations);
        console.log(loadedReservations)
      },[]);

      useEffect(()=>{
        fetchReservations().catch(error=>{
            console.log('error occured while fetching reservations!');
        })
      },[fetchReservations]);

  return (
    <div className={classes.container}>
    <div className={classes.card}>
      {reservations.map((res)=>{
        console.log(res)
            return ( 
            <div key={res.reservationId}>
            <div className={classes.reservationInfo}>
               <p>Reservation ID:{res.reservationId}</p>
               <p>User: {res.username}</p>
               <p>Movie: {res.movieTitle}</p>
               <p>Price: {res.reservationPrice}</p>
            </div>
            </div>
            )
        })}
    </div>
    </div>
  )
}
export default ReservationList