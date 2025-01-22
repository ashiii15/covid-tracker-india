import React from 'react'
import './Filter.css'

function Filter({data,handleDropDownChange}) {
  return (
    <div className="filter-container">
    <label className="filter-label">Choose an state :</label>
    <select  className="filter-select" onChange={handleDropDownChange}>
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