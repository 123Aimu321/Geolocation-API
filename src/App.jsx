import { useEffect, useState } from 'react';

export default function Home() {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => setError(err.message)
    );
  }, []);

  // Convert lat/lng to x/y (approximate for equirectangular projection)
  const getMarkerStyle = () => {
    if (!coords) return {};
    const x = ((coords.lng + 180) / 360) * 100; // % across width
    const y = ((90 - coords.lat) / 180) * 100;  // % down height
    return {
      left: `${x}%`,
      top: `${y}%`,
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">📍 Your Location on the World Map</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="relative w-full max-w-3xl">
        <img src="/map.avif" alt="World Map" className="w-full rounded shadow" />
        {coords && (
          <div
            className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white"
            style={getMarkerStyle()}
            title={`Lat: ${coords.lat}, Lng: ${coords.lng}`}
          />
        )}
      </div>
    </div>
  );
}
