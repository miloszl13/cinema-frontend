import { useFormik } from "formik";
import React,{useState} from "react";
import * as yup from "yup";
import classes from './CreateMovieForm.module.css'
import Button from '../ui/Button'

function CreateMovieForm(props) {
    const [success,setSuccess]=useState('');

    const createNewMovie=async(movie)=>{
        const movieToCreate=JSON.stringify(movie);
        console.log(movieToCreate)
        const response = await fetch("https://localhost:5001/api/Movies",{
          method:'POST',
          body: movieToCreate,
          headers:{
            'Content-Type':'application/json'
          }
        });
        const data=await response.json()
        if (!response.ok) {
          console.log(data)
          throw new Error('error');
        }
        setSuccess('Successfully added')
    }


  const formik = useFormik({
    initialValues: {
      title: "",
      year: "",
      rating: "",
      current: true,
      wonOscar: false,
      imageUrl: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("Required!"),
      year: yup
        .number()
        .integer("Must be whole number!")
        .positive("Must be positive number!")
        .required("Required!"),
      rating: yup
        .number()
        .positive("Must be positive number!")
        .min(1, "Cant be less than 1!")
        .max(10, "Cant be greather than 10!")
        .required("Required!"),
      current: yup.boolean().required(),
      wonOscar: yup.boolean().required(),
      imageUrl: yup.string().required("Image url is required!"),
    }),
    onSubmit: (values,{resetForm}) => {
        createNewMovie(values).catch(error=>{
            console.log('error occured while creating new movie')
           })
        resetForm();
    },
  });
 const resetSuccess=()=>{
    setSuccess('')
 }

  return (
    <form onSubmit={formik.handleSubmit} onClick={resetSuccess}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="title..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title && <p className={classes.error}>{formik.errors.title}</p>}
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <input
          id="year"
          name="year"
          type="number"
          placeholder="year..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.year}
        />
        {formik.touched.year && formik.errors.year && <p className={classes.error}>{formik.errors.year}</p>}
      </div>
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          id="rating"
          name="rating"
          type="number"
          placeholder="rating..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rating}
        />
        {formik.touched.rating && formik.errors.rating && <p className={classes.error}>{formik.errors.rating}</p>}
      </div>
      <div>
        <label htmlFor="current">Current:</label>
        <select id="current" name="current" onChange={formik.handleChange} value={formik.values.current}>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </div>
      <div>
        <label htmlFor="wonOscar">Oscar:</label>
        <select id="wonOscar" name="wonOscar" onChange={formik.handleChange} value={formik.values.wonOscar}>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
      </div>
      <div>
        <label htmlFor="imageUrl">Image url:</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          placeholder="image..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.imageUrl}
        />
        {formik.touched.image && formik.errors.image && <p className={classes.error}>{formik.errors.image}</p>}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {success && <p>{success}</p>}
        <Button type="submit">create</Button>
        <Button onClick={props.onClose}>cancel</Button>
      </div>
    </form>
  );
}

export default CreateMovieForm;