import React, { useState, useCallback, useEffect } from "react";

import classes from './SeatsTable.module.css'

function SeatsTable(props) {
  const [seats, setSeats] = useState();
  

  const fetchSeats = useCallback(async (auditoriumId) => {
    const response = await fetch(`https://localhost:5001/api/Seats/allByAuditorium/${auditoriumId}`);
    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      throw new Error();
    }
    const loadedSeatLists = [];

    for (const key in responseData) {
      loadedSeatLists.push(responseData[key]);
    }
    setSeats(loadedSeatLists);
  }, [setSeats]);

  useEffect(() => {
    console.log("seats");
    fetchSeats(props.auditId);
  }, [fetchSeats,props.auditId]);


  let tabela;

  if (seats) {
    tabela = seats.map((rowList) => {
      return (
        <tr key={rowList[0].id}>
          {rowList.map((seat) => {
            return <td key={seat.id}><button id={seat.id} value={seat.id} onClick={props.select}>{seat.row}.{seat.number}</button></td>;
          })}
        </tr>
      );
    });
  }

  return (
    <div>
      <table className={classes.tabel} id="table1" border="1">
        <tbody>
            {tabela && tabela}
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr>
                  <td colSpan={5} className={classes.screen}>
                    <div>
                      MOVIE SCREEN
                    </div>
                  </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SeatsTable;
