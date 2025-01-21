import React from 'react'

function Filter({data,handleDropDownChange}) {
  return (
    <div>
    <label>Choose an state :</label>
    <select onChange={handleDropDownChange}>
    {data.map((state) => {
      return (
          <option key={state.loc}>{state.loc}</option>
        );
      })}
      </select>
  </div>
  )
}

export default Filter