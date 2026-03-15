'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

const userIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41],
});

const locationIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41],
});

const locations = [
  { id: "trang-an", name: "Tràng An", lat: 20.2541, lng: 105.9149, radius: 100 },
  { id: "hang-mua", name: "Hang Múa", lat: 20.2316, lng: 105.9189, radius: 50 },
  { id: "bai-dinh", name: "Chùa Bái Đính", lat: 20.2686, lng: 105.8481, radius: 150 },
  { id: "tam-coc", name: "Tam Cốc", lat: 20.2153, lng: 105.9218, radius: 80 },
  { id: "hoa-lu", name: "Cố đô Hoa Lư", lat: 20.2589, lng: 105.9256, radius: 40 },
  { id: "thien-ha", name: "Động Thiên Hà", lat: 20.2083, lng: 105.8944, radius: 30 },
  { id: "sen", name: "Cánh đồng Sen", lat: 20.2200, lng: 105.9100, radius: 120 },
];

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], map.getZoom(), { animate: true, duration: 1 });
  }, [lat, lng, map]);
  return null;
}

export default function MapComponent({ location }: { location: { lat: number; lng: number } | null }) {
  const defaultCenter: [number, number] = [20.2506, 105.9745];
  return (
    <MapContainer center={defaultCenter} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((loc) => (
        <div key={loc.id}>
          <Circle center={[loc.lat, loc.lng]} radius={loc.radius} pathOptions={{ color: '#3b82f6', fillOpacity: 0.1, dashArray: '5,5' }} />
          <Marker position={[loc.lat, loc.lng]} icon={locationIcon}>
            <Popup><b>{loc.name}</b><br/>Bán kính: {loc.radius}m</Popup>
          </Marker>
        </div>
      ))}
      {location && (
        <>
          <Marker position={[location.lat, location.lng]} icon={userIcon}>
            <Popup>📍 Vị trí của bạn</Popup>
          </Marker>
          <RecenterMap lat={location.lat} lng={location.lng} />
        </>
      )}
    </MapContainer>
  );
}
