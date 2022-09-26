import React, { useState,useContext, useCallback, useEffect } from "react";

import classes from "./Reservations.module.css";
import SeatsTable from "../components/SeatsTable";
import FilterByCinema from "../components/filterComponents/FilterByCinema";
import FilterByAuditorium from "../components/filterComponents/FilterByAuditorium";
import FilterByMovie from "../components/filterComponents/FilterByMovie";
import SeatsToReserve from "../components/SeatsToReserve";
import ProjectionOptions from "../components/ProjectionOptions";
import AuthContext from "../store/auth-context";
import ReservationList from "../components/ReservationList";
import Button from "../ui/Button";

function Contact() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsNumber, setSelectedSeatsNumber] = useState([]);
  const [projections, setProjections] = useState([]);
  const [projectionId, setProjectionId] = useState("");
  const [auditoriumId, setAuditoriumId] = useState();
  
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  
  const [cinemaFilter, setCinemaFilter] = useState(false);
  const [auditoriumFilter, setAuditoriumFilter] = useState(false);
  const [movieFilter, setMovieFilter] = useState(false);

  const authCtx=useContext(AuthContext);
  const userId=authCtx.user;
  const isAdmin=authCtx.isAdmin;

  const selectSeats = (event) => {
    setSuccessMessage();
    if (selectedSeats.includes(event.target.value)) {
      setSelectedSeats((current) =>
        current.filter((seat) => seat !== event.target.value)
      );
      setSelectedSeatsNumber((current) =>
        current.filter((seat) => seat !== event.target.textContent)
      );
      event.target.style.backgroundColor = "red";
    } else {
      setSelectedSeats((current) => [...current, event.target.value]);
      setSelectedSeatsNumber((current) => [
        ...current,
        event.target.textContent,
      ]);
      event.target.style.backgroundColor = "grey";
    }
  };
  const fetchProjections = useCallback(async () => {
    const response = await fetch("https://localhost:5001/api/Projections/all");
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error();
    }
    const loadedProjections = [];

    for (const key in responseData) {
      loadedProjections.push({
        id: responseData[key].id,
        movieId: responseData[key].movieId,
        movieTitle: responseData[key].movieTitle,
        auditoriumId: responseData[key].auditoriumId,
        aditoriumName: responseData[key].aditoriumName,
        projectionTime: responseData[key].projectionTime,
        projectionPrice: responseData[key].projectionPrice,
      });
    }
    setProjections(loadedProjections);
  }, []);
  const createReservation = useCallback(async (projectionIdd, selectedSeatss) => {
    const token=localStorage.getItem('token');
      const reservation = JSON.stringify({
        seats: selectedSeatss,
        user_Id: userId,
        projection_Id: projectionIdd,
      });
      console.log(reservation);
      const response = await fetch(
        "https://localhost:5001/api/Reservations/CreateReservation",
        {
          method: "POST",
          body: reservation,
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer '+token
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        setErrorMessage(responseData.errorMessage);
        throw new Error();
      }
      setSuccessMessage("Successfully created!");
      authCtx.increaseBonusPoints(1);
      console.log(selectedSeatss);
      for (let i = 0; i < selectedSeatss.length; i++) {
        const seat = document.getElementById(selectedSeatss[i]);
        console.log(selectedSeatss[i]);
        console.log(seat);
        seat.style.backgroundColor = "red";
      }
      setSelectedSeatsNumber([]);
      setSelectedSeats([]);
      console.log(responseData);
    },
    [userId]
  );

  const fetchProjectionsByCinema = useCallback(async (cinemaId) => {
    const response = await fetch(
      `https://localhost:5001/api/Projections/GetProjectionsByCinema/${cinemaId}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error();
    }
    const loadedProjections = [];

    for (const key in responseData) {
      loadedProjections.push({
        id: responseData[key].id,
        movieId: responseData[key].movieId,
        movieTitle: responseData[key].movieTitle,
        auditoriumId: responseData[key].auditoriumId,
        aditoriumName: responseData[key].aditoriumName,
        projectionTime: responseData[key].projectionTime,
        projectionPrice: responseData[key].projectionPrice,
      });
    }
    setProjections(loadedProjections);
  }, []);
  const fetchProjectionsByAuditorium = useCallback(async (auditoriumId) => {
    const response = await fetch(
      `https://localhost:5001/api/Projections/GetProjectionsByAuditorium/${auditoriumId}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error();
    }
    const loadedProjections = [];

    for (const key in responseData) {
      loadedProjections.push({
        id: responseData[key].id,
        movieId: responseData[key].movieId,
        movieTitle: responseData[key].movieTitle,
        auditoriumId: responseData[key].auditoriumId,
        aditoriumName: responseData[key].aditoriumName,
        projectionTime: responseData[key].projectionTime,
        projectionPrice: responseData[key].projectionPrice,
      });
    }
    setProjections(loadedProjections);
  }, []);
  const fetchProjectionsByMovie = useCallback(async (movieId) => {
    const response = await fetch(
      `https://localhost:5001/api/Projections/GetProjectionsByMovie/${movieId}`
    );
    const responseData = await response.json();
    console.log(responseData);
    if (!response.ok) {
      throw new Error();
    }
    const loadedProjections = [];

    for (const key in responseData) {
      loadedProjections.push({
        id: responseData[key].id,
        movieId: responseData[key].movieId,
        movieTitle: responseData[key].movieTitle,
        auditoriumId: responseData[key].auditoriumId,
        aditoriumName: responseData[key].aditoriumName,
        projectionTime: responseData[key].projectionTime,
        projectionPrice: responseData[key].projectionPrice,
      });
    }
    setProjections(loadedProjections);
  }, []);

  const submitReservationHandler = (event) => {
    event.preventDefault();
    console.log(projectionId, selectedSeats);
    createReservation(projectionId, selectedSeats).catch((error) => {
      console.log("error");
    });
  };

  const chooseProjectionHandler = (event) => {
    setSuccessMessage();
    if (event.target.value !== "initial") {
      setProjectionId(event.target.value);
      setAuditoriumId(
        projections.filter((x) => x.id === event.target.value)[0].auditoriumId
      );
      console.log(
        projections.filter((x) => x.id === event.target.value)[0].auditoriumId
      );
      console.log(event.target.value);
    } else {
      setAuditoriumId();
    }
  };

  const retryHandler = () => {
    setErrorMessage(null);
    for (let i = 0; i < selectedSeats.length; i++) {
      const seat = document.getElementById(selectedSeats[i]);
      console.log(selectedSeats[i]);
      console.log(seat);
      seat.style.backgroundColor = "red";
    }
    setSelectedSeats([]);
    setSelectedSeatsNumber([]);
  };

  useEffect(() => {
    console.log("reservations");
    fetchProjections().catch((error) => {
      console.log("error");
    });
  }, [fetchProjections, selectedSeatsNumber, selectedSeats]);

  //FILTERING
  const filterByCinema = (event) => {
    setSuccessMessage();
    event.preventDefault();
    setCinemaFilter((prev) => !prev);
    if (auditoriumFilter) {
      setAuditoriumFilter(false);
    }
    if (movieFilter) {
      setMovieFilter(false);
    }
  };
  const filterByAuditorium = (event) => {
    setSuccessMessage();
    event.preventDefault();
    setAuditoriumFilter((prev) => !prev);
    if (cinemaFilter) {
      setCinemaFilter(false);
    }
    if (movieFilter) {
      setMovieFilter(false);
    }
  };
  const filterByMovie = (event) => {
    setSuccessMessage();
    event.preventDefault();
    setMovieFilter((prev) => !prev);
    if (auditoriumFilter) {
      setAuditoriumFilter(false);
    }
    if (cinemaFilter) {
      setCinemaFilter(false);
    }
  };
  //FILTER BY CINEMA
  const filterCinemaHadnler = (event) => {
    event.preventDefault();
    if (event.target.value !== "initial") {
      fetchProjectionsByCinema(event.target.value).catch((error) => {
        console.log("error occuer while filtering projections by cinema");
      });
    } else {
      fetchProjections().catch((error) => {
        console.log("error");
      });
    }
  };
  //FILTER BY AUDITORIUM
  const filterByAuditoriumHandler = (event) => {
    event.preventDefault();
    if (event.target.value !== "initial") {
      fetchProjectionsByAuditorium(event.target.value).catch((error) => {
        console.log("error occuer while filtering projections by auditorium");
      });
    } else {
      fetchProjections().catch((error) => {
        console.log("error");
      });
    }
  };
  //FILTER BY MOVIE
  const filterByMovieHandler = (event) => {
    event.preventDefault();
    if (event.target.value !== "initial") {
      fetchProjectionsByMovie(event.target.value).catch((error) => {
        console.log("error occuer while filtering projections by movie");
      });
    } 
    else {
       fetchProjections().catch((error) => {
        console.log("error");
      });
    }
  };
  return (
    <div>
    {!isAdmin && (
    <div className={classes.reservations}>
      <div className={classes.leftSide}>
        <form>
          <label htmlFor="movie" style={{ color: "black", fontSize: "26px", fontWeight: "700" }}>PROJECTIONS</label>
          <>
            <Button onClick={filterByCinema}>filter by cinema</Button>
            <Button onClick={filterByAuditorium}>filter by auditorium</Button>
            <Button onClick={filterByMovie}>filter by movie</Button>
          </>
          {cinemaFilter && <FilterByCinema change={filterCinemaHadnler} />}
          {auditoriumFilter && (<FilterByAuditorium change={filterByAuditoriumHandler} />)}
          {movieFilter && <FilterByMovie change={filterByMovieHandler} />}
          <ProjectionOptions change={chooseProjectionHandler} projections={projections} />
        </form>
        <div className={classes.tab}>
          {auditoriumId && (<SeatsTable auditId={auditoriumId} select={selectSeats} />)}
        </div>
      </div>
      <div className={classes.rightSide}>
        <h1> RESERVATION</h1>
        {selectedSeats && <SeatsToReserve seats={selectedSeatsNumber} />}
        <br />
        {errorMessage && (<label className={classes.errorMess}>{errorMessage}</label>)}
        {successMessage && (<label style={{ color: "green", fontSize: "25px", fontWeight: "700" }}>{successMessage}</label>)}
        <div>
          {errorMessage && <Button onClick={retryHandler}>Reset</Button>}
          <Button onClick={submitReservationHandler}>Create reservation</Button>
        </div>
      </div>
    </div>)}
    {isAdmin && <div>
      <ReservationList/>
      </div>}
    </div>
  );
}

export default Contact;
