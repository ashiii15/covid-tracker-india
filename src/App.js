import { useEffect, useState } from "react";
import "./App.css";
import PieChart from "./components/PieChart";
import Filter from "./components/Filter";

function App() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState()
  

  

  let values = ['10039','0','9907','129']
  let labels = ['confirmedCasesIndian','confirmedCasesForeign','discharged','deaths']


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
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);

  const handleDropDownChange = (event) => {
    const selectedItem = event.target.value;
    const selectedData = data.find((item) => item.loc === selectedItem);
    setSelectedItem(selectedData);
  }; 

  return (
    <div className="App">
      <h1>Covid Tracker</h1>
      <Filter data={data} handleDropDownChange={handleDropDownChange} />
      <PieChart values= {values} labels ={labels} />
      

      {/* <div>
        <h3>
          confirmed Cases India : {selectedItem?.confirmedCasesIndian}
        </h3>
        <h3>
          confirmedCasesForeign : {selectedItem?.confirmedCasesForeign}
        </h3>
        <h3>Number of discharges : {selectedItem?.discharged}</h3>
        <h3>Number of discharges : {selectedItem?.deaths}</h3>
      </div> */}
    </div>
  );
}

export default App;
