import React from "react";
import "./Filter.css"; 

interface FilterProps {
  handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  data: { loc: string }[];
}

const Filter: React.FC<FilterProps> = ({ data, handleFilterChange }) => {
  return (
    <div className="filter-container">
      <label className="filter-label">Choose a state:</label>
      <select className="filter-select" onChange={handleFilterChange}>
        {data.map((state) => (
          <option key={state.loc} value={state.loc}>
            {state.loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
