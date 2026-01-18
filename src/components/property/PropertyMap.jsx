'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

// Fix for default marker icon in Leaflet with Next.js
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const PropertyMap = ({ properties }) => {

    useEffect(() => {
        // Fix Leaflet's default icon path issues in Next.js
        let DefaultIcon = L.icon({
            iconUrl: icon.src,
            shadowUrl: iconShadow.src,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
        });
        L.Marker.prototype.options.icon = DefaultIcon;
    }, []);

    // Default center (e.g., New York) or calculate from properties
    const defaultCenter = [40.7128, -74.0060];

    // Filter properties with valid coordinates. 
    // If your backend uses specific field names for lat/lng, ensure they match here.
    // Assuming 'latitude' and 'longitude' or similar. 
    // Sometimes location is an object { lat, lng }.
    // Let's support flat latitude/longitude for now as per common Mongoose schemas or a 'coordinates' array.

    // Fallback: If no lat/lng, we can't plot them.
    // Correctly access coordinates from the schema structure
    const validProperties = properties.filter(p =>
        (p.coordinates && p.coordinates.lat !== 0 && p.coordinates.lng !== 0) ||
        (p.latitude && p.longitude)
    );

    const getPosition = (p) => {
        if (p.coordinates?.lat && p.coordinates?.lng) return [p.coordinates.lat, p.coordinates.lng];
        if (p.latitude && p.longitude) return [p.latitude, p.longitude];
        return defaultCenter;
    };

    const center = validProperties.length > 0
        ? getPosition(validProperties[0])
        : defaultCenter;

    const createCustomIcon = (imageUrl) => {
        return L.divIcon({
            className: 'custom-map-icon',
            html: `<div style="width: 48px; height: 48px; border-radius: 9999px; border: 3px solid #d4af35; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); overflow: hidden; background: white;">
                     <img src="${imageUrl}" style="width: 100%; height: 100%; object-fit: cover;" />
                   </div>`,
            iconSize: [48, 48],
            iconAnchor: [24, 24],
            popupAnchor: [0, -24]
        });
    };

    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="h-full w-full rounded-3xl z-0">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {validProperties.map(property => (
                <Marker
                    key={property._id}
                    position={getPosition(property)}
                    icon={createCustomIcon(property.images?.[0] || '/placeholder.jpg')}
                >
                    <Popup>
                        <div className="min-w-[200px]">
                            <div className="relative h-32 w-full mb-2">
                                <Image
                                    src={property.images?.[0] || '/placeholder.jpg'}
                                    alt={property.title}
                                    fill
                                    className="object-cover rounded-lg"
                                    sizes="(max-width: 768px) 100vw, 200px"
                                />
                            </div>
                            <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{property.title}</h3>
                            <p className="text-xs text-gray-500 mb-1">{typeof property.location === 'string' ? property.location : 'Location'}</p>
                            <p className="text-[#d4af35] font-bold text-base">${property.price?.toLocaleString()}</p>
                            <Link href={`/properties/${property._id}`} className="text-charcoal hover:text-[#d4af35] font-bold text-xs mt-2 block underline">
                                View Details
                            </Link>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default PropertyMap;
