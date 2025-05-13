import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface ProfileLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface MapComponentProps {
  profiles: ProfileLocation[];
  selectedProfileId?: string;
  onMarkerClick?: (id: string) => void;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

const MapComponent: React.FC<MapComponentProps> = ({ profiles, selectedProfileId, onMarkerClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!MAPBOX_TOKEN) return;
    if (mapRef.current) return;
    mapboxgl.accessToken = MAPBOX_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [profiles[0]?.longitude || 0, profiles[0]?.latitude || 0],
      zoom: 2,
    });
  }, [profiles]);

  useEffect(() => {
    if (!mapRef.current) return;
    // Remove existing markers
    (mapRef.current as any)._markers?.forEach((m: mapboxgl.Marker) => m.remove());
    (mapRef.current as any)._markers = [];
    profiles.forEach(profile => {
      const marker = new mapboxgl.Marker({ color: profile.id === selectedProfileId ? 'red' : 'blue' })
        .setLngLat([profile.longitude, profile.latitude])
        .setPopup(new mapboxgl.Popup().setText(profile.name))
        .addTo(mapRef.current!);
      if (onMarkerClick) {
        marker.getElement().addEventListener('click', () => onMarkerClick(profile.id));
      }
      (mapRef.current as any)._markers.push(marker);
    });
    // Center on selected profile
    if (selectedProfileId) {
      const selected = profiles.find(p => p.id === selectedProfileId);
      if (selected) {
        mapRef.current.flyTo({ center: [selected.longitude, selected.latitude], zoom: 10 });
      }
    }
  }, [profiles, selectedProfileId, onMarkerClick]);

  if (!MAPBOX_TOKEN) {
    return <div className="text-red-500">Mapbox token is missing. Please set VITE_MAPBOX_TOKEN in your .env file.</div>;
  }

  return (
    <div ref={mapContainer} className="w-full h-96 rounded-lg shadow" />
  );
};

export default MapComponent;
