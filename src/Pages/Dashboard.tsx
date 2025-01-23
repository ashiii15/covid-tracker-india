import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

import {
  fetchCovidData,
  fetchGeoLocationByState,
} from "../redux/slices/covidSlice";
import PieChart from "../components/PieChart";
import MapView from "../components/MapView";
import { LatLngExpression } from "leaflet";
import "./Dashboard.css";
import LineChart from "../components/LineChart";
interface CovidData {
  loc: string;
  confirmedCasesIndian: number;
  confirmedCasesForeign: number;
  discharged: number;
  deaths: number;
}

interface LinesData {
  label: string;
  color: string;
  data: number[];
}

const Dashboard: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<CovidData | null>(null);
  const [covidCounts, setCovidCounts] = useState<number[]>([]);
  const [pieChartLabels, setPieChartLabels] = useState<string[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.covid.data);
  const geoLocation: LatLngExpression = useSelector(
    (state: RootState) => state.covid.geolocation
  );

  useEffect(() => {
    dispatch(fetchCovidData());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      dispatch(fetchGeoLocationByState(data[0].loc));
      setSelectedItem(data[0]);
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (selectedItem) {
      const { loc, ...rest } = selectedItem;
      setCovidCounts(Object.values(rest));
      setPieChartLabels(Object.keys(rest));
    }
  }, [selectedItem]);

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedItem: string = event.target.value;
    const selectedData: CovidData = data.find(
      (item) => item.loc === selectedItem
    );
    setSelectedItem(selectedData);
    dispatch(fetchGeoLocationByState(selectedData.loc));
  };

  const linesData: LinesData[] = selectedItem
    ? [
        {
          label: "Indian Cases",
          color: "blue",
          data: [selectedItem.confirmedCasesIndian],
        },
        {
          label: "Foreign Cases",
          color: "green",
          data: [selectedItem.confirmedCasesForeign],
        },
        {
          label: "Discharged",
          color: "orange",
          data: [selectedItem.discharged],
        },
        {
          label: "Deaths",
          color: "red",
          data: [selectedItem.deaths],
        },
      ]
    : [];

  const categories: string[] = [
    "Confirmed Cases",
    "Foreign Cases",
    "Discharged",
    "Deaths",
  ];
  return (
    <div className="dashboard">
      <h1>Covid Tracker</h1>
      <Filter data={data} handleFilterChange={handleFilterChange} />
      <div className="cases">
        <h3> Active Cases : {selectedItem?.confirmedCasesIndian}</h3>
        <h3> Recovered Cases :{selectedItem?.discharged}</h3>
        <h3> Death Cases :{selectedItem?.deaths}</h3>
      </div>
      <div className="pieContainer">
        <PieChart values={covidCounts} labels={pieChartLabels} />
      </div>
      <div className="lineMapContainer">
      <div className="lineChartContainer">
        <LineChart
          title={`COVID-19 Cases in ${selectedItem?.loc}`}
          xAxisLabel="Categories"
          yAxisLabel="Number of Cases"
          categories={categories}
          linesData={linesData}
        />
        </div>
          <MapView geoLocation={geoLocation}/>
      </div>
    </div>
  );
};
export default Dashboard;
