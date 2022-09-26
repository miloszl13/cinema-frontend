import React,{useState} from 'react'
import classes from './Cinemas.module.css'
import Modal from '../ui/Modal'
import Button from '../ui/Button';
import CreateCinemaForm from '../components/CreateCinemaForm';

//use query
import {useQuery,useMutation,useQueryClient} from 'react-query'

const fetchCinemas = async () => {
    
  const response = await fetch("https://localhost:5001/api/Cinemas/all");
  const responseData=await response.json()
  return responseData;
};
const deleteCinema=async(id)=>{
  console.log(id)
  const response = await fetch(`https://localhost:5001/api/Cinemas/delete,${id}`, {
    method: 'DELETE',
  });
  return response.json()
}


function Cinemas() {
  const [cinemaForm,setCinemaForm]=useState(false);
  const [deleteAlert,setDeleteAlert]=useState(false);
  const [id,setId]=useState();
  
  
  const {data:allCinemas,isLoading:fetchLoading,isError:fetchError}=useQuery('cinemas',fetchCinemas)
  
  const queryClient=useQueryClient();
  const {mutateAsync,isLoading:deleteLoading,isError:deleteError} = useMutation(deleteCinema)
  

   const cinemaFormHandler=()=>{
    setCinemaForm(prev=>!prev);
   }
    

   const deleteHandler=async()=>{
    await mutateAsync(id)
    queryClient.invalidateQueries('cinemas')
   }

   const deleteAlertHandler=(event)=>{
    event.preventDefault()
    setId(event.target.value)
    setDeleteAlert(prev=>!prev);
   }

  return (
    <div className={classes.card}>
        <div>
          <Button onClick={cinemaFormHandler}>Create cinema</Button>        
        </div>
      {allCinemas?.map((cinema)=>{
            return ( 
            <div key={cinema.id}>
              <div className={classes.cinemaInfo}>
               <h2>{cinema.name}</h2>
               <Button onClick={deleteAlertHandler} value={cinema.id}>delete</Button>
              </div>
            </div>
            )
        })}
        {fetchLoading && 
        <div>
          <h2>Loading cinemas...</h2>
        </div>
        }
        {fetchError && 
        <div>
          <h2>Error occured while fetching cinemas! </h2>
        </div>
          }
          {deleteLoading && 
        <div>
          <h2>Deleting...</h2>
        </div>
        }
        {deleteError && 
        <div>
          <h2>Error occured while trying to delete cinema!</h2>
        </div>
          }
     {cinemaForm &&
      <Modal onClose={cinemaFormHandler}>
       <CreateCinemaForm onClose={cinemaFormHandler}/>
      </Modal>}
      {deleteAlert && 
      <Modal onClose={deleteAlertHandler}>
        <form onSubmit={deleteHandler}>
          <label>Are you sure u want to delete cinema?</label>
          <Button type='submit'>yes</Button>
          <Button onClick={deleteAlertHandler}>no</Button>
        </form>
      </Modal> 
      }
    </div>
  )
}

export default Cinemas
