import React, { useEffect } from "react";
import { MapContainer, TileLayer, Popup, Circle, useMap } from "react-leaflet";

const UpdateMapCenter = ({ latlong }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.setView(latlong);
    }
  }, [latlong, map]);

  return null;
};

const Map = ({ latlong }) => {
  return (
    <MapContainer
      center={latlong}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "50vh", width: "100%" }}
    >
      {/* Tile Layer for the map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Circle with Popup */}
      <Circle
        center={latlong}
        color="red"
        fillColor="#f03"
        fillOpacity={0.25}
        radius={200000}
      >
        <Popup>This is a circle with a radius of 200,000 meters.</Popup>
      </Circle>
      <UpdateMapCenter latlong={latlong} />
    </MapContainer>
  );
};

export default Map;
