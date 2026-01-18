'use client';

import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icon
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconUrl: markerIcon.src,
//     iconRetinaUrl: markerIcon2x.src,
//     shadowUrl: markerShadow.src,
// });
// The above imports don't work in Next.js easily without webpack config, so we use CDN images for simplicity
const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


const LocationMarker = ({ setPosition, position }) => {
    const map = useMap();

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position ? <Marker position={position} icon={defaultIcon} /> : null;
};

const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, 13);
        }
    }, [center, map]);
    return null;
}


const LocationPicker = ({ onLocationSelect, initialLocation }) => {
    const [position, setPosition] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (initialLocation && initialLocation.lat && initialLocation.lng) {
            setPosition(initialLocation);
        }
    }, [initialLocation]);

    const handleLocationChange = async (latlng) => {
        setPosition(latlng);
        // Reverse geocoding to get address
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`);
            const data = await response.json();
            onLocationSelect({
                lat: latlng.lat,
                lng: latlng.lng,
                address: data.display_name || ''
            });
        } catch (error) {
            console.error("Failed to reverse geocode:", error);
            onLocationSelect({
                lat: latlng.lat,
                lng: latlng.lng,
                address: ''
            });
        }
    };

    // Add search functionality
    const handleSearch = async () => {
        if (!searchQuery) return;
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const newPos = { lat: parseFloat(lat), lng: parseFloat(lon) };
                setPosition(newPos);
                // also update parent
                handleLocationChange(newPos); // This triggers reverse lookup again which is redundant but keeps it consistent, or we can just pass name
            }
        } catch (e) {
            console.error("Search failed", e);
        }
    }


    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Search for a city or area..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch} className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-bold">Find</button>
            </div>
            <div className="h-[300px] w-full rounded-xl overflow-hidden shadow-inner border border-gray-200 z-0 relative">
                <MapContainer center={[34.0522, -118.2437]} zoom={10} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker setPosition={handleLocationChange} position={position} />
                    {position && <MapUpdater center={position} />}
                </MapContainer>
            </div>
            <p className="text-xs text-gray-400 text-center">Click on the map to drop a pin and set the precise location.</p>
        </div>
    );
};

export default LocationPicker;
