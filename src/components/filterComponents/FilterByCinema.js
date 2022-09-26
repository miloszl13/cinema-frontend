import React,{useState,useCallback, useEffect} from "react";

function FilterByCinema(props) {
  const [cinemas, setCinemas] = useState([]);

  const fetchCinemas = useCallback(async () => {
    const response = await fetch("https://localhost:5001/api/Cinemas/all");
    const responseData = await response.json();
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
  }, []);


  const cinemasOptions = cinemas.map((cin) => {
    return (
      <option key={cin.cinemaId} value={cin.cinemaId}>
        {cin.cinemaId}, {cin.name}
      </option>
    );
  });

  useEffect(()=>{
    console.log('filtecinemas')
    fetchCinemas().catch(error=>{
        console.log('error occured while trying to fecht cinemas')
    })
  },[fetchCinemas])


  return <div>
    <select onChange={props.change}>
            <option value='initial'>Choose cinema...</option>
            {cinemasOptions}
    </select>
  </div>;
}

export default FilterByCinema;
