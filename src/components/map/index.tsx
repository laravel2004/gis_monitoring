"use client";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import MarkerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
import Image from "next/image";


const icon = L.icon({
  iconUrl: MarkerIcon.src,
  iconRetinaUrl: MarkerIcon.src,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
  shadowUrl: MarkerShadow.src,
  shadowSize: [41, 41],
});

export default function Map({ sites, center, zoom, onMarkerClick } : any) {
  console.log(sites);

  const MapUpdater = () => {
    const map = useMap();

    useEffect(() => {
      map.setView(center, zoom);
    }, [map]);

    return null;
  };

  return (
    <div>
      <MapContainer
        style={{
          height: "80vh",
        }}
        center={center}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Array.from(sites).map((site : any, index : any) => (
          <Marker
            key={index}
            position={[site.LatLong.split(",")[0], site.LatLong.split(",")[1]]}
            icon={icon}
            eventHandlers={{
              click: () => {
                onMarkerClick(site);
              },
            }}
          >
            <Popup>
              <div className="grid gap-4">
                <div className="p-4 flex justify-between gap-4 bg-slate-500 text-slate-100 rounded-lg">
                  <h1>{site.place}</h1>
                  <Image src={site.images} alt={site.name} width={50} height={50} />
                </div>
                <div className="p-2 bg-slate-200 rounded-lg">
                  <ul>
                    {
                      Array.from(sites).map((check : any, index : any) => {
                        if (check.place === site.place) {
                          return <li key={index}>{check.name}</li>;
                        }
                      })
                    }
                  </ul>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        <MapUpdater />
      </MapContainer>
    </div>
  )
}