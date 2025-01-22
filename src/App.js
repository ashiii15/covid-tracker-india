import { useEffect, useState } from "react";
import "./App.css";
import PieChart from "./components/PieChart";
import Filter from "./components/Filter";
import LineChart from "./components/LineChart";
import Map from "./components/Map";

function App() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [coordinates, setCoordinates] = useState([10.1632,76.6413]);

  const { loc, ...rest } = selectedItem;
  const valuesArray = Object.values(rest);
  const LabelsArray = Object.keys(rest);

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
        setSelectedItem(result.data.regional[0]);
        getCoordinates(result.data.regional[0].loc.split(' ')[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

  }, []);

  const getCoordinates = async (loc) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?state=${loc}&country=India&format=json`
    );
    const data = await response.json();
    const [{lat,lon}] = data;
    setCoordinates([lat,lon])
  };

  const handleDropDownChange = (event) => {
    const selectedItem = event.target.value;
    const selectedData = data.find((item) => item.loc === selectedItem);
    setSelectedItem(selectedData);
    getCoordinates(selectedData.loc)
  };

  return (
    <div className="App">
      <h1>Covid Tracker</h1>
      <Filter data={data} handleDropDownChange={handleDropDownChange} />
      <div className="container">
        <PieChart values={valuesArray} labels={LabelsArray} />
        <LineChart />
        <Map latlong={coordinates} />
      </div>
    </div>
  );
}

export default App;
