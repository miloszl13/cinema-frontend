import React,{useState} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import Button from '../ui/Button';

//react query 
import {useMutation,useQueryClient} from 'react-query'

const createCinema=async(cinema)=>{
  const cinemaToCreate=JSON.stringify(cinema);
  const response = await fetch("https://localhost:5001/api/Cinemas/CreateCinema",{
    method:'POST',
    body: cinemaToCreate,
    headers:{
      'Content-Type':'application/json'
    }
  });
  return await response.json()
}

function CreateCinemaForm(props) {
    const [error,setError]=useState('')
    const [success,setSuccess]=useState('')

    const {mutateAsync,isError}=useMutation(createCinema)
  
    if(isError){
      setError('Error occured while creating new cinema!')
    }

    const queryClient=useQueryClient()

    const formik=useFormik({
        initialValues:{
            Id:'',
            Name:'',
            auditName:'',
            seatRows:'',
            numberOfSeats:''
        },
        validationSchema:yup.object({
            Id:yup.number().positive().integer().required(),
            Name:yup.string().required(),
            auditName:yup.string().required(),
            seatRows:yup.number().positive().integer().min(2).required(),
            numberOfSeats:yup.number().positive().integer().min(2).required(),
        }),
        onSubmit:async(values)=>{
            await mutateAsync(values)
            queryClient.invalidateQueries('cinemas')
            setSuccess('Successfully created!')
        }
      });

      const resetMessagesHandler=()=>{
        setError('')
        setSuccess('')
      }

  return (
     <form onSubmit={formik.handleSubmit} onClick={resetMessagesHandler}>
          <label>cinema id:</label>
            <input 
            id="Id"
            name="Id"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Id}
            />
            {formik.touched.Id && formik.errors.Id && <p>{formik.errors.Id}</p>}
          <label>cinema name:</label>
            <input 
            id="Name"
            name="Name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Name}
            />
            {formik.touched.Name && formik.errors.Name && <p>{formik.errors.Name}</p>}
            <label>auditorium name:</label>
            <input 
            id="auditName"
            name="auditName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.auditName}
            />
            {formik.touched.auditName && formik.errors.auditName && <p>{formik.errors.auditName}</p>}
            <label>seats:</label>
            <input 
            id="seatRows"
            name="seatRows"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.seatRows}
            />
            {formik.touched.seatRows && formik.errors.seatRows && <p>{formik.errors.seatRows}</p>}
            <label>rows:</label>
            <input 
            id="numberOfSeats"
            name="numberOfSeats"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.numberOfSeats}
            />
            {formik.touched.numberOfSeats && formik.errors.numberOfSeats && <p>{formik.errors.numberOfSeats}</p>}
            {error && <p style={{color:'red'}}>{error}</p>}
            {success && <p style={{color:'green'}}>{success}</p>}
          <Button onClick={props.onClose}>close</Button>
          <Button type='submit'>create</Button>
     </form>
  )
}

export default CreateCinemaForm
