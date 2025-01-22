import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LatLngExpression } from "leaflet";

interface CovidState {
  data: any[];
  filteredData: any[];
  loading: boolean;
  geolocation: LatLngExpression;
}

const initialState: CovidState = {
  data: [],
  filteredData: [],
  loading: false,
  geolocation: [10.1632, 76.6413]
};

// Async thunk to fetch data
export const fetchCovidData = createAsyncThunk("covid/fetchData", async () => {
  const response = await axios.get(
    "https://api.rootnet.in/covid19-in/stats/latest"
  );
  console.log(response.data.data.regional);
  return response.data.data.regional;
});

export const fetchGeoLocationByState = createAsyncThunk(
  "covid/fetchGeoLocationByState",
  async (loc: string) => {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?state=${loc}&country=India&format=json`
    );
    console.log(response.data);
    return response.data;
  }
);

const covidSlice = createSlice({
  name: "covid",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCovidData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCovidData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      });

      builder
      .addCase(fetchGeoLocationByState.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGeoLocationByState.fulfilled, (state, action) => {
        const [{ lat, lon }] = action.payload;
        state.geolocation = [lat,lon];
        state.loading = false;
      })
      .addCase(fetchGeoLocationByState.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default covidSlice.reducer;