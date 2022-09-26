import React,{useState,useCallback, useEffect} from "react";

function FilterByAuditorium(props) {
  const [auditoriums, setAuditoriums] = useState([]);

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

  const auditoriumOptions = auditoriums.map((auditorium) => {
    return (
      <option key={auditorium.id} value={auditorium.id}>
        {auditorium.name}
      </option>
    );
  });

  useEffect(()=>{
    console.log('filter auditoriums')
    fetchAuditoriums().catch(error=>{
        console.log('error occured while trying to fecht auditoriums')
    })
  },[fetchAuditoriums])


  return <div>
    <select onChange={props.change}>
            <option value='initial'>Choose auditorium...</option>
            {auditoriumOptions}
    </select>
  </div>;
}

export default FilterByAuditorium;
