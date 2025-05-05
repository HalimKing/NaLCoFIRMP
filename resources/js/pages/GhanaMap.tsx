import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Type definitions for city data
interface City {
  name: string;
  position: [number, number];
  type: 'capital' | 'regional' | 'major';
  region: string;
}

// Fix for default marker icons in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Type assertion for Leaflet icon fix
const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

const GhanaMap: React.FC = () => {
  // Coordinates for Ghana (centered map)
  const ghanaCenter: [number, number] = [7.9465, -1.0232];
  
  // Some major cities in Ghana
  const cities: City[] = [
    // Regional Capitals
    { name: "Accra", position: [5.6037, -0.1870], type: "capital", region: "Greater Accra" },
    { name: "Kumasi", position: [6.7000, -1.6167], type: "regional", region: "Ashanti" },
    { name: "Tamale", position: [9.4000, -0.8500], type: "regional", region: "Northern" },
    { name: "Sekondi-Takoradi", position: [4.9433, -1.7040], type: "regional", region: "Western" },
    { name: "Sunyani", position: [7.3333, -2.3333], type: "regional", region: "Bono" },
    { name: "Ho", position: [6.6000, 0.4667], type: "regional", region: "Volta" },
    { name: "Bolgatanga", position: [10.7833, -0.8500], type: "regional", region: "Upper East" },
    { name: "Wa", position: [10.0667, -2.5000], type: "regional", region: "Upper West" },
    { name: "Cape Coast", position: [5.1000, -1.2500], type: "regional", region: "Central" },
    { name: "Koforidua", position: [6.0833, -0.2500], type: "regional", region: "Eastern" },
    { name: "Nkawkaw", position: [6.5500, -0.7667], type: "major", region: "Eastern" },
    { name: "Techiman", position: [7.5833, -1.9333], type: "regional", region: "Bono East" },
    { name: "Dambai", position: [8.0667, -0.1667], type: "regional", region: "Oti" },
    { name: "Damongo", position: [9.0833, -1.8167], type: "regional", region: "Savannah" },
    { name: "Goaso", position: [6.8000, -2.5167], type: "regional", region: "Ahafo" },
    { name: "Sefwi Wiawso", position: [6.2000, -2.4833], type: "regional", region: "Western North" },
    
    // Additional Major Cities
    { name: "Tema", position: [5.6667, -0.0167], type: "major", region: "Greater Accra" },
    { name: "Obuasi", position: [6.2000, -1.6667], type: "major", region: "Ashanti" },
    { name: "Tarkwa", position: [5.3000, -1.9833], type: "major", region: "Western" },
    { name: "Elmina", position: [5.0833, -1.3500], type: "major", region: "Central" },
    { name: "Axim", position: [4.8667, -2.2333], type: "major", region: "Western" },
    { name: "Berekum", position: [7.4500, -2.5833], type: "major", region: "Bono" },
    { name: "Winneba", position: [5.3333, -0.6333], type: "major", region: "Central" },
    { name: "Hohoe", position: [7.1500, 0.4667], type: "major", region: "Volta" },
    { name: "Yendi", position: [9.4333, -0.0167], type: "major", region: "Northern" },
    { name: "Bawku", position: [11.0500, -0.2333], type: "major", region: "Upper East" },
    { name: "Navrongo", position: [10.8833, -1.0833], type: "major", region: "Upper East" },
    { name: "Ejura", position: [7.3833, -1.3667], type: "major", region: "Ashanti" },
    { name: "Konongo", position: [6.6167, -1.2167], type: "major", region: "Ashanti" },
    { name: "Nsawam", position: [5.8000, -0.3500], type: "major", region: "Eastern" },
    { name: "Akim Oda", position: [5.9167, -0.9833], type: "major", region: "Eastern" },
    { name: "Asamankese", position: [5.8667, -0.6667], type: "major", region: "Eastern" },
    { name: "Saltpond", position: [5.2000, -1.0667], type: "major", region: "Central" },
    { name: "Dunkwa-on-Offin", position: [5.9667, -1.7833], type: "major", region: "Central" },
    { name: "Prestea", position: [5.4333, -2.1500], type: "major", region: "Western" },
    { name: "Bibiani", position: [6.4667, -2.3333], type: "major", region: "Western North" },
    { name: "Suhum", position: [6.0333, -0.4500], type: "major", region: "Eastern" },
    { name: "Agogo", position: [6.8000, -1.0833], type: "major", region: "Ashanti" },
    { name: "Mampong", position: [7.0667, -1.4000], type: "major", region: "Ashanti" },
    { name: "Effiduase", position: [6.2500, -0.6667], type: "major", region: "Ashanti" },
    { name: "Akwatia", position: [6.0333, -0.8000], type: "major", region: "Eastern" },
    { name: "Kintampo", position: [8.0500, -1.7333], type: "major", region: "Bono East" },
    { name: "Atebubu", position: [7.7500, -0.9833], type: "major", region: "Bono East" },
    { name: "Savelugu", position: [9.6167, -0.8167], type: "major", region: "Northern" },
    { name: "Bimbilla", position: [9.6833, 0.1167], type: "major", region: "Northern" },
    { name: "Salaga", position: [8.5500, -0.5167], type: "major", region: "Savannah" },
    { name: "Sawla", position: [9.2167, -2.4833], type: "major", region: "Savannah" },
    { name: "Nalerigu", position: [10.5167, -0.3667], type: "major", region: "North East" },
    { name: "Walewale", position: [10.3500, -0.8167], type: "major", region: "North East" }
  ];
  return (
    <div style={{ height: "500px", width: "100%", margin: "20px 0" }}>
      {/* <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Ghana Interactive Map</h2> */}
      <MapContainer 
        center={ghanaCenter} 
        zoom={7} 
        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {cities.map((city, index) => (
          <Marker key={index} position={city.position}>
            <Popup>
              <div style={{ fontWeight: "bold" }}>{city.name}</div>
              <div>Region: {city.region}</div>
              <div>Type: {city.type === 'capital' ? 'National Capital' : 
                          city.type === 'regional' ? 'Regional Capital' : 'Major City'}</div>
              <div>Coordinates: {city.position[0].toFixed(4)}, {city.position[1].toFixed(4)}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GhanaMap;