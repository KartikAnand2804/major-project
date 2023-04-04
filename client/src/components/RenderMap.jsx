import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

export default function RenderMap() {
  const positionCoordinates = [28.4629, 77.4907];
  const locationCoordinates = [28.5942, 77.4431];
  return (
    <div className="h-full w-full">
      <MapContainer
        className="h-[700px]"
        center={positionCoordinates}
        zoom={11}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={positionCoordinates}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Marker position={locationCoordinates}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
