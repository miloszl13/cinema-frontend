import React,{useState,useCallback,useEffect} from 'react'
import classes from '../pages/Reservations.module.css'

function ProjectioinsForm() {
    const [cinemaFilter,setCinemaFilter]=useState(false);
    const [auditoriumFilter,setAuditoriumFilter]=useState(false);
    const [movieFilter,setMovieFilter]=useState(false);
  
    const [cinemas,setCinemas]=useState([]);
    const [auditoriums,setAuditoriums]=useState([]);
    const [movies,setMovies]=useState([]);

    const [projections, setProjections] = useState([]);
    const [projectionId, setProjectionId] = useState("");
    const [auditoriumId, setAuditoriumId] = useState();



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
      const fetchCinemas = useCallback(async () => {
    
        const response = await fetch("https://localhost:5001/api/Cinemas/all");
        const responseData=await response.json()
        if (!response.ok) {
    
          throw new Error();
        }
        const loadedCinemas = [];
    
        for (const key in responseData) {
          loadedCinemas.push({
            cinemaId: responseData[key].id,
            name: responseData[key].name,
          });
        }
        setCinemas(loadedCinemas);
      },[]);
      const fetchAuditoriums = useCallback(async () => {
        const response = await fetch("https://localhost:5001/api/Auditoriums/all");
        const responseData = await response.json();
    
        if (!response.ok) {
          throw new Error();
        }
        const loadedAuditoriums = [];
    
        for (const key in responseData) {
          loadedAuditoriums.push({
            id:responseData[key].id,
            cinemaId:responseData[key].cinemaId,
            name:responseData[key].name
          });
        }
        setAuditoriums(loadedAuditoriums);
      }, []);
      const fetchMovies = useCallback(async () => {
        const response = await fetch("https://localhost:5001/api/Movies/allMovies");
        const responseData=await response.json()
        if (!response.ok) {
    
          throw new Error();
        }
        const loadedMovies = [];
    
        for (const key in responseData) {
          loadedMovies.push({
            Movie_Id: responseData[key].id,
            Title: responseData[key].title,
            Year: responseData[key].year,
            Rating: responseData[key].rating,
            Current: responseData[key].current,
            WonOscar: responseData[key].wonOscar,
            ImageUrl: responseData[key].imageUrl,
          });
        }
        setMovies(loadedMovies);
      },[setMovies]);
      const fetchProjectionsByCinema = useCallback(async (cinemaId) => {
        const response = await fetch(`https://localhost:5001/api/Projections/GetProjectionsByCinema/${cinemaId}`);
        const responseData=await response.json()
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
      },[]);
      const fetchProjectionsByAuditorium = useCallback(async (auditoriumId) => {
        const response = await fetch(`https://localhost:5001/api/Projections/GetProjectionsByAuditorium/${auditoriumId}`);
        const responseData=await response.json()
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
      },[]);
      const fetchProjectionsByMovie = useCallback(async (movieId) => {
        const response = await fetch(`https://localhost:5001/api/Projections/GetProjectionsByMovie/${movieId}`);
        const responseData=await response.json()
        console.log(responseData)
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
      },[]);





    const chooseProjectionHandler = (event) => {
        if(event.target.value !== 'initial'){
        setProjectionId(event.target.value);
        setAuditoriumId(
          projections.filter((x) => x.id === event.target.value)[0].auditoriumId
        );
        console.log(
          projections.filter((x) => x.id === event.target.value)[0].auditoriumId
        );
        console.log(event.target.value);
        }
        else{
          setAuditoriumId()
        }
        
      };

      //FILTERING
  const filterByCinema=(event)=>{
    event.preventDefault()
    setCinemaFilter(prev=>!prev)
  }
  const filterByAuditorium=(event)=>{
    event.preventDefault()
    setAuditoriumFilter(prev=>!prev)
  }
  const filterByMovie=(event)=>{
    event.preventDefault()
    setMovieFilter(prev=>!prev)
  }

    //SELECT OPTIONS
    const projectionsOptions = projections.map((proj) => {
        return (
          <option key={proj.id} value={proj.id}>
            {proj.movieTitle}, {proj.projectionTime},{proj.projectionPrice}
          </option>
        );
      });
    const cinemasOptions = cinemas.map((cin) => {
        return (
          <option key={cin.cinemaId} value={cin.cinemaId}>
            {cin.cinemaId}, {cin.name}
          </option>
        );
      });
      const auditoriumOptions = auditoriums.map((auditorium) => {
        return (
          <option key={auditorium.id} value={auditorium.id}>
            {auditorium.name}
          </option>
        );
      });
      const movieOptions=movies.map((movie)=>{
        return (
          <option key={movie.Movie_Id} value={movie.Movie_Id}>
            {movie.Title}
          </option>
        )
      })

  //FILTER BY CINEMA
  const filterCinemaHadnler=(event)=>{
    event.preventDefault();
    if(event.target.value !== 'initial'){
    fetchProjectionsByCinema(event.target.value).catch(error=>{
     console.log('error occuer while filtering projections by cinema')
    })
   }
   else{
     fetchProjections().catch((error) => {
       console.log("error");
     });
   }
   }
   //FILTER BY AUDITORIUM
   const filterByAuditoriumHandler=(event)=>{
     event.preventDefault();
     if(event.target.value !== 'initial'){
     fetchProjectionsByAuditorium(event.target.value).catch(error=>{
      console.log('error occuer while filtering projections by auditorium')
     })
    }
    else{
      fetchProjections().catch((error) => {
        console.log("error");
      });
    }
    }
    //FILTER BY MOVIE
    const filterByMovieHandler=(event)=>{
     event.preventDefault();
     if(event.target.value !== 'initial'){
     fetchProjectionsByMovie(event.target.value).catch(error=>{
      console.log('error occuer while filtering projections by movie')
     })
    }
    else{
      fetchProjections().catch((error) => {
        console.log("error");
      });
    }
    }


    useEffect(() => {
        console.log('reservations')
        fetchProjections().catch((error) => {
          console.log("error");
        });
        fetchCinemas().catch(error=>{
          console.log('cinemasErrror');
        })
        fetchAuditoriums().catch(error=>{
          console.log('auditoriums fetching failed')
        })
        fetchMovies().catch(error=>{
          console.log('feching movies failed')
        })
      }, [fetchProjections,fetchCinemas,fetchAuditoriums,fetchMovies]);

  return (
    <div>
      <form>
          <label htmlFor="movie">Projection</label>
          <div>
            <button className={classes.filterBtn} onClick={filterByCinema}>filter by cinema</button>
            <button className={classes.filterBtn} onClick={filterByAuditorium}>filter by auditorium</button>
            <button className={classes.filterBtn} onClick={filterByMovie}>filter by movie</button>
          </div>

          {cinemaFilter && <select onChange={filterCinemaHadnler}>
            <option value='initial'>Choose cinema...</option>
            {cinemasOptions}
          </select>}
          {auditoriumFilter && <select onChange={filterByAuditoriumHandler}>
            <option value='initial'>Choose auditorium...</option>
            {auditoriumOptions}
          </select>}
          {movieFilter && <select onChange={filterByMovieHandler}>
            <option value='initial'>Choose movie...</option>
            {movieOptions}
          </select>}

          <select onChange={chooseProjectionHandler}>
            <option value='initial'>Choose projection..</option>
            {projectionsOptions}
          </select>
        </form>
    </div>
  )
}

export default ProjectioinsForm
