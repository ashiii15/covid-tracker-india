import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.rootnet.in/covid19-in/stats/latest"
        );
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        const result = await response.json();
        setData(result.data.regional);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  return (
    <div className="App">
      <h1>Covid Tracker</h1>
      <div>
        <label>Choose an state :</label>
        <select>
        {data.map((state) => {
          return (
              <option>{state.loc}</option>
            );
          })}
          </select>
      </div>
    </div>
  );
}

export default App;
