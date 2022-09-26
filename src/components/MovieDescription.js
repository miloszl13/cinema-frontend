import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import Modal from "../ui/Modal";
import classes from "./MovieDescription.module.css";
import Button from "../ui/Button";

const MovieDescription = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;
  const [available, setAvailable] = useState(props.current);
  const [error, setError] = useState(false);

  const changeStatus = async (id, curr) => {
    console.log(id);
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://localhost:5001/api/Movies/ActivateDeactivate/${id},${curr}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      setError(data.errorMessage);
      throw new Error(data.errorMessage);
    }
    setAvailable(curr);
  };

  const statusChangeHandler = () => {
    changeStatus(props.id, !available).catch((error) => {
      console.log(error);
    });
  };
  const navigateToReservations = () => {
    history.push("/reservations");
  };

  return (
    <Modal onClose={props.onClose}>
      <div>
        <div className={classes.desc}>
          <div
            style={{
              backgroundImage: `url(${props.image})`,
              marginLeft: "25%",
            }}
          ></div>
        </div>
        <h1>{props.name}</h1>
        <p>{props.price}</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <p>{props.current}</p>
        {available && <h2>This movie is currently available!</h2>}
        {!available && <h2>This movie is currently NOT available!</h2>}
        {error && (
          <p style={{ color: "red", fontSize: "large", fontWeight: "700" }}>
            {error}
          </p>
        )}
        {isAdmin && (
          <Button onClick={statusChangeHandler}>Change status</Button>
        )}
        <Button onClick={props.onClose}>Close</Button>
        {!isAdmin && (
          <Button onClick={navigateToReservations}>Go to reservations</Button>
        )}
      </div>
    </Modal>
  );
};

export default MovieDescription;
