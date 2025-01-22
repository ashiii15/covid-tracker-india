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

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [covidCounts, setCovidCounts] = useState<any>([]);
  const [pieChartLabels, setPieChartLabels] = useState<any>([]);

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
    const { loc, ...rest } = selectedItem;
    setCovidCounts(Object.values(rest));
    setPieChartLabels(Object.keys(rest));
  }, [selectedItem]);

  const handleFilterChange = (event: any) => {
    const selectedItem = event.target.value;
    const selectedData = data.find((item) => item.loc === selectedItem);
    setSelectedItem(selectedData);
    dispatch(fetchGeoLocationByState(selectedData.loc));
  };

  const linesData = [
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
  ];

  const categories = ["Confirmed Cases", "Foreign Cases", "Discharged", "Deaths"];

  return (
    <div>
      <h1>Covid Tracker</h1>
      <Filter data={data} handleFilterChange={handleFilterChange} />
      <div className="container">
        <PieChart values={covidCounts} labels={pieChartLabels} />
        <LineChart  title={`COVID-19 Cases in ${selectedItem.loc}`}
          xAxisLabel="Categories"
          yAxisLabel="Number of Cases"
          categories={categories}
          linesData={linesData} />
        <MapView geoLocation={geoLocation} />
      </div>
    </div>
  );
};
export default Dashboard;
