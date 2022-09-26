import React,{useState,useEffect,useCallback, useContext} from 'react'
import MovieItem from '../components/MovieItem'
import AuthContext from '../store/auth-context';
import Modal from '../ui/Modal';
import classes from './Movies.module.css'
import Button from '../ui/Button';
import CreateMovieForm from '../components/CreateMovieForm';


const Movies=()=> {
  const [movies,setMovies]=useState([]);
  const [rerender,setRerender]=useState(false);
  const [topRated,showTopRated]=useState(false);
  const [searchError,setSearchError]= useState('');
  const [createMovie,setCreateMovie]= useState(false);


  const authCtx=useContext(AuthContext)
  const isAdmin=authCtx.isAdmin

  const handlerRerender=()=>{
    setRerender(prev=>!prev);
  }

  const fetchMovies = useCallback(async () => {
    const token=localStorage.getItem('token')
    const response = await fetch("https://localhost:5001/api/Movies/allMovies",{
      headers:{
        'Authorization': 'Bearer '+token
      }
    });
    const responseData=await response.json()
    console.log(responseData)
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
    console.log(loadedMovies)
  },[setMovies]);

  const fetchTopTenMovies = useCallback(async () => {
    const token=localStorage.getItem('token')
    const response = await fetch("https://localhost:5001/api/Movies/Get10TopRatedMovies",
    {
      headers:{
        'Authorization': 'Bearer '+token
      }
    });
    const responseData=await response.json()
    console.log(responseData)
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
    console.log(loadedMovies)
  },[setMovies]);
  const searchMovies = useCallback(async (characters) => {
    const token=localStorage.getItem('token')
   // console.log(token)
    const response = await fetch(`https://localhost:5001/api/Movies/SearchMovies,${characters}`,
    {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }
    });
    const responseData=await response.json()
    console.log(responseData)
    if (!response.ok) {

      throw new Error();
    }
    const loadedMovies = [];
    if(responseData.length===0){
      setSearchError('No movies found! :(')
    }
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
    console.log(loadedMovies)
  },[setMovies]);

         
 const topRatedHandler=()=>{
  if(!topRated){
  fetchTopTenMovies().catch(error=>{
    console.log('error')
  })
  }
  else{
    fetchMovies().catch(error=>{
      console.log('error')
    })
  }
  showTopRated(prev=>!prev)
 }

  const searchHandler=(event)=>{
  setSearchError('')
  if(event.target.value.trim()===''){
    fetchMovies().catch(error=>{
      console.log('error')
    })
  }
  console.log(event.target.value)
  searchMovies(event.target.value).catch(error=>{
    console.log('error occured while searching movies!')
  })
}
const showCreateMovie=useCallback(()=>{
   setCreateMovie(prev=>!prev)
},[]);

useEffect(() => {
  console.log('movies')
   fetchMovies().catch((error) => {
    console.log('error')
    
  });
}, [fetchMovies,rerender,showCreateMovie]);

  return (
    <div className={classes.movies}>
      <h1 className={classes.movTitle}>Movie list:</h1>
      <div className={classes.movieBtns}> 
      <Button onClick={topRatedHandler}>
       {!topRated ? '10 top rated' : 'back to all movies'}
      </Button>
      {isAdmin && <Button onClick={showCreateMovie}>
        create new movie
      </Button>}
       
      </div>
      <form>
        <label>search movie</label>
        <input type='text' onChange={searchHandler}></input>
        {searchError && <h2 style={{fontSize:'25px',fontWeight:'600',color:'white',border:'5px solid grey',padding:'5px',backgroundColor:'red'}}>{searchError}</h2>}
       </form>

      {createMovie &&
       <Modal onClose={showCreateMovie}>
        <CreateMovieForm onClose={showCreateMovie}/>
       </Modal>}
      <div className={classes.movieList}>
        {movies.map((menuItem,key)=>{
            return <MovieItem rerender={handlerRerender} id={menuItem.Movie_Id} key={key} image={menuItem.ImageUrl} name={menuItem.Title} price={menuItem.Rating} current={menuItem.Current}/>
        })}        
      </div>
    </div>
  )
}

export default Movies
