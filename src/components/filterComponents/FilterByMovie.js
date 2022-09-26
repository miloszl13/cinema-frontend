import React,{useState,useCallback, useEffect} from "react";

function FilterByMovie(props) {
  const [movies, setMovies] = useState([]);

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
  },[]);


  const movieOptions=movies.map((movie)=>{
    return (
      <option key={movie.Movie_Id} value={movie.Movie_Id}>
        {movie.Title}
      </option>
    )
  })

  useEffect(()=>{
    console.log('filtecinemas')
    fetchMovies().catch(error=>{
        console.log('error occured while trying to fecht movies')
    })
  },[fetchMovies])


  return <div>
    <select onChange={props.change}>
            <option value='initial'>Choose movie...</option>
            {movieOptions}
    </select>
  </div>;
}

export default FilterByMovie;
