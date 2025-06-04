import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapPickerProps {
  initialPosition?: [number, number];
  zoom?: number;
  onLocationSelect: (lat: number, lng: number) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({
  initialPosition = [-23.55052, -46.633308], 
  zoom = 13,
  onLocationSelect,
}) => {
  const [marker, setMarker] = useState<[number, number] | null>(null);

  const LocationMarker: React.FC = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarker([lat, lng]); 
        onLocationSelect(lat, lng); 
      },
    });

    return marker ? <Marker position={marker} /> : null;
  };

  return (
    <MapContainer
      center={initialPosition}
      zoom={zoom}
      style={{ height: "208px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapPicker;
