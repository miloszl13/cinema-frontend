import React from 'react'

function ProjectionOptions(props) {
    const projectionsOptions = props.projections.map((proj) => {
        return (
          <option key={proj.id} value={proj.id}>
            {proj.movieTitle}, {proj.projectionTime},{proj.projectionPrice}
          </option>
        );
      });
  return (
    <select onChange={props.change}>
      <option value='initial'>Choose projection..</option>
      {projectionsOptions}
    </select>
  )
}

export default ProjectionOptions
