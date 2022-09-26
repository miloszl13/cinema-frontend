import React ,{useState}from 'react'
import MovieDescription from './MovieDescription'
import Card from '../ui/Card'

function MovieItem({image,name,price,current,id,rerender}) {
  const [open,setOpen]=useState(false)

  const openHandler=()=>{
    setOpen(prev=>!prev)
    rerender()
  }

  return (
    <div>
    <Card onClick={openHandler}>
      <div style={{backgroundImage : `url(${image})`}}></div>
      <h1>{name}</h1>
      <p>{price}</p>
    </Card>
    {open && <MovieDescription render={rerender} id={id} image={image} name={name} price={price} onClose={openHandler} current={current}/>}
    </div>
  )
}

export default MovieItem