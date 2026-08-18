import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { formatINR } from '@/utils/currency';
import type { Project } from '@/data/types';

// Custom div-icon markers coloured by status
function makeIcon(status: string): L.DivIcon {
  const colors: Record<string, string> = {
    Completed: '#2E7D32',
    'In Progress': '#006A6A',
    Delayed: '#ED6C02',
    Flagged: '#C62828',
    Planned: '#0F4C81',
  };
  const color = colors[status] ?? '#727780';
  return L.divIcon({
    className: 'fundledger-marker',
    html: `<div style="width:18px;height:18px;background:${color};border:3px solid white;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,0.3)"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function FlyTo({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 9, { duration: 0.8 });
  }, [center, map]);
  return null;
}

export default function ProjectMap({ projects, focus }: { projects: Project[]; focus?: [number, number] }) {
  const navigate = useNavigate();
  const center: [number, number] = focus ?? [11.5, 78.5]; // Tamil Nadu centre
  const mapRef = useRef<L.Map | null>(null);

  return (
    <MapContainer
      center={center}
      zoom={7}
      style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
      ref={(m) => { if (m) mapRef.current = m; }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {focus && <FlyTo center={center} />}

      {projects.map((p) => (
        <Marker key={p.id} position={[p.location.lat, p.location.lng]} icon={makeIcon(p.status)}>
          <Popup>
            <div className="min-w-[200px]">
              <p className="font-semibold text-sm text-ink">{p.name}</p>
              <p className="text-xs text-ink-secondary mt-1">{p.department}</p>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-ink-secondary">Budget</span>
                <span className="font-bold text-primary">{formatINR(p.budget)}</span>
              </div>
              <div className="flex items-center justify-between mt-1 text-xs">
                <span className="text-ink-secondary">Progress</span>
                <span className="font-bold text-secondary">{p.progress}%</span>
              </div>
              <button
                onClick={() => navigate(`/projects/${p.id}`)}
                className="mt-3 w-full bg-primary text-white text-xs font-semibold py-1.5 rounded hover:bg-primary-container transition-colors"
              >
                View Full Report
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
