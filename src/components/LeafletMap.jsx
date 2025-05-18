import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './LeafletMap.css';

// Blue dot icon
const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const center = [43.896469, -79.455039]; // Your coordinates

export default function LeafletMap() {
  return (
    <MapContainer center={center} zoom={15} style={{ height: '300px', width: '100%' }} className="leaflet-z-fix">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={blueIcon}>
        <Popup>
          Devin Soup - Barber Shop
        </Popup>
      </Marker>
      <Circle
        center={center}
        radius={1000}
        pathOptions={{ color: '#4285F4', fillColor: '#4285F4', fillOpacity: 0.2 }}
      />
    </MapContainer>
  );
} 