import React, { useEffect } from "react";
import { MapContainer, TileLayer, Circle, Popup, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";

interface UpdateMapCenterProps {
  geoLocation: LatLngExpression; 
}

interface MapViewProps {
  geoLocation: LatLngExpression;
}

const UpdateMapCenter: React.FC<UpdateMapCenterProps> = ({ geoLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.setView(geoLocation); // Update the map center when geoLocation changes
    }
  }, [geoLocation, map]);

  return null;
};

const MapView: React.FC<MapViewProps> = ({ geoLocation }) => {
  return (
    <MapContainer
      center={geoLocation} 
      zoom={5} 
      scrollWheelZoom={true} 
      style={{ height: "50vh", width: "40%" }} 
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Circle
        center={geoLocation} 
        color="red" 
        fillColor="#f03" 
        fillOpacity={0.25} 
        radius={200000} 
      >
        <Popup>This is a circle with a radius of 200,000 meters.</Popup>
      </Circle>

      {/* Component to update the map center */}
      <UpdateMapCenter geoLocation={geoLocation} />
    </MapContainer>
  );
};

export default MapView;
