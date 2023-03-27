import { MapContainer, TileLayer, useMapEvent, Marker } from "react-leaflet"
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import coordinatesDTO from './coordinates.model'
import { useState } from "react";

let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [15, 37]
});

L.Marker.prototype.options.icon = defaultIcon;

export default function Map(props: mapProps) {
  const [coordinates, setCoordinates] = useState<coordinatesDTO[]>([]);
  return (
    <MapContainer
      center={[45.756217, 21.228762]}
      zoom={13}
      style={{ height: props.height }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[45.756217, 21.228762]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}

      <MapClick setCoordinates={coordinates => {
                setCoordinates([coordinates]);
            }} />

      {coordinates.map((coordinates, index) => (
        <Marker key={index} position={[coordinates.lat, coordinates.lng]} />
      ))}
    </MapContainer>
  );
}

interface mapProps {
  height: string;
  //coordinates: coordinatesDTO[];
}

Map.defaultProps = {
  height: "300px",
};

function MapClick(props: mapClickProps) {
  useMapEvent("click", (eventArgs) => {
    props.setCoordinates({
      lat: eventArgs.latlng.lat,
      lng: eventArgs.latlng.lng,
    });
  });
  return null;
}

interface mapClickProps {
  setCoordinates(coordinates: coordinatesDTO): void;
}
