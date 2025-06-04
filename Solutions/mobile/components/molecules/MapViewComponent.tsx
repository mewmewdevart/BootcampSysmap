import React, { useState } from "react";
import { Platform, StyleSheet } from "react-native";

interface MapPickerProps {
  initialPosition?: [number, number];
  onLocationSelect: (lat: number, lng: number) => void;
}

//----------------------------------------------------
// Version web:  react-leaflet
//----------------------------------------------------
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapPickerWeb: React.FC<MapPickerProps> = ({
  initialPosition = [-23.55052, -46.633308],
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
      zoom={13}
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

//----------------------------------------------------
// Version Native: react-native-maps
//----------------------------------------------------
import MapView, { Marker as RNMarker, MapPressEvent } from "react-native-maps";

const MapPickerNative: React.FC<MapPickerProps> = ({
  initialPosition = [-23.55052, -46.633308],
  onLocationSelect,
}) => {
  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);

  const initialRegion = {
    latitude: initialPosition[0],
    longitude: initialPosition[1],
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handlePress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
    onLocationSelect(latitude, longitude);
  };

  return (
    <MapView style={styles.map} initialRegion={initialRegion} onPress={handlePress}>
      {marker && <RNMarker coordinate={marker} />}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 208,
    width: "100%",
    borderRadius: 10,
  },
});

//----------------------------------------------------
// Componente Condicional: escolhe a implementação baseada na plataforma
//----------------------------------------------------
const MapPicker: React.FC<MapPickerProps> = (props) => {
  if (Platform.OS === "web") {
    return <MapPickerWeb {...props} />;
  }
  return <MapPickerNative {...props} />;
};

export default MapPicker;
