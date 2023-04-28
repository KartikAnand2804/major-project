import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";

export default function RenderMap(props) {
  const locationCoordinates = [
    props.lat ? props.lat : 28.5942,
    props.lon ? props.lon : 77.4431,
  ];
  const destinationCoordinates = [
    props.destLat ? props.destLat : 28.598,
    props.destLon ? props.destLon : 77.5431,
  ];

  const locationMarker = new L.icon({
    iconUrl: "https://www.svgrepo.com/show/513450/location-pin.svg",
    iconSize: [70, 50],
  });

  const destinationMarker = new L.icon({
    iconUrl: "https://www.svgrepo.com/show/292182/pointer-pin.svg",
    iconSize: [70, 50],
  });

  return (
    <div className="h-full w-full">
      <MapContainer
        className="h-[700px]"
        center={locationCoordinates}
        zoom={10}
        scrollWheelZoom={true}
        bounds={(locationCoordinates, destinationCoordinates)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={locationCoordinates} icon={locationMarker}>
          <Popup>You are here.</Popup>
        </Marker>

        <Marker position={destinationCoordinates} icon={destinationMarker}>
          <Popup>Here's where you want to go.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
