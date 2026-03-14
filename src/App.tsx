/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { renderToString } from 'react-dom/server';
import { MapContainer, TileLayer, Marker, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet map not rendering correctly in some containers
function MapResizeFix() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}
import { 
  MapPin, 
  Pizza, 
  Palmtree, 
  Users, 
  Info, 
  QrCode, 
  ExternalLink,
  Navigation,
  Heart,
  Activity
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Hardcoded points for Pogodno Szczecin based on local knowledge
const POGODNO_POINTS = [
  {
    id: 'wujka',
    name: 'Plac Jakuba Wujka',
    description: 'Serce Pogodna. Okrągły plac z piękną zielenią, idealny na spacer i spotkanie.',
    type: 'meeting_spot',
    coords: [53.446665618014315, 14.515843546188176] as [number, number],
    mapsUrl: 'https://maps.google.com/?q=Plac+Jakuba+Wujka+Szczecin'
  },
  {
    id: 'verde',
    name: 'Pizzeria VERDE',
    description: 'Rynek Pogodno, Reymonta 3/pawilon 73, 71-276 Szczecin. Pyszna lokalna pizza.',
    type: 'food',
    coords: [53.44233690649671, 14.512065502957366] as [number, number],
    mapsUrl: 'https://maps.google.com/?q=Pizzeria+VERDE+Szczecin+Pogodno'
  },
  {
    id: 'perugia',
    name: 'Pizzeria Perugia',
    description: 'Kolejna świetna pizzeria na mapie Pogodna, oferująca autentyczne włoskie smaki.',
    type: 'food',
    coords: [53.441061415011276, 14.489714369539369] as [number, number],
    mapsUrl: 'https://maps.google.com/?q=Pizzeria+Perugia+Szczecin'
  },
  {
    id: 'boisko',
    name: 'Boisko',
    description: 'Lokalne boisko sportowe, idealne miejsce na aktywność fizyczną na świeżym powietrzu.',
    type: 'sports',
    coords: [53.444883955473, 14.513121982033137] as [number, number],
    mapsUrl: 'https://maps.google.com/?q=53.444883955473,14.513121982033137'
  },
  {
    id: 'stadion',
    name: 'Stadion Miejski im. Floriana Krygiera',
    description: 'Dom Pogoni Szczecin. Miejsce wielkich emocji sportowych na granicy osiedla.',
    type: 'sports',
    coords: [53.43664836756705, 14.518619034191563] as [number, number],
    mapsUrl: 'https://maps.google.com/?q=Stadion+Miejski+Szczecin'
  },
  {
    id: 'kosciol',
    name: 'Kościół Rzymskokatolicki pw. Świętego Krzyża',
    description: 'Ważny ośrodek duchowy i charakterystyczny punkt na mapie Pogodna.',
    type: 'monument',
    coords: [53.4402100237174, 14.509410054587796] as [number, number],
    mapsUrl: 'https://maps.google.com/?q=Kosciol+Swietego+Krzyza+Szczecin'
  }
];

const CATEGORY_ICONS = {
  food: <Pizza className="w-5 h-5" />,
  monument: <Info className="w-5 h-5" />,
  meeting_spot: <Users className="w-5 h-5" />,
  nature: <Palmtree className="w-5 h-5" />,
  sports: <Activity className="w-5 h-5" />,
};

const CATEGORY_COLORS = {
  food: 'bg-orange-500',
  monument: 'bg-amber-600',
  meeting_spot: 'bg-blue-500',
  nature: 'bg-emerald-500',
  sports: 'bg-indigo-500',
};

const createIcon = (type: string, isSelected: boolean) => {
  const colorClass = CATEGORY_COLORS[type as keyof typeof CATEGORY_COLORS];
  const IconComponent = CATEGORY_ICONS[type as keyof typeof CATEGORY_ICONS];
  
  const html = renderToString(
    <div className={cn(
      "w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg border-2 transition-transform",
      colorClass,
      isSelected ? "border-white scale-125 ring-4 ring-black/10" : "border-white/80 hover:scale-110"
    )}>
      {IconComponent}
    </div>
  );

  return L.divIcon({
    html,
    className: 'bg-transparent border-none',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

export default function App() {
  const [selectedPoint, setSelectedPoint] = useState<typeof POGODNO_POINTS[0] | null>(null);
  const [showQR, setShowQR] = useState(false);
  const appUrl = 'https://pogodno.nsip.ovh';

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#4a4a40] font-serif selection:bg-emerald-200">
      {/* Header */}
      <header className="p-8 md:p-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-light tracking-tight text-[#2d2d24]"
          >
            Power Map <span className="italic text-emerald-800">dzielnicy Pogodno</span>
          </motion.h1>
          <p className="mt-4 text-lg opacity-80 max-w-md font-sans">
            Odkryj ukryte skarby, najlepsze smaki i historyczne zakątki najbardziej urokliwego osiedla Szczecina.
          </p>
        </div>
        
        <button 
          onClick={() => setShowQR(!showQR)}
          className="group relative flex items-center gap-3 px-6 py-3 bg-white border border-[#d1d1c1] rounded-full hover:bg-emerald-50 transition-colors font-sans text-sm uppercase tracking-widest"
        >
          <QrCode className="w-4 h-4" />
          {showQR ? 'Ukryj Kod' : 'Pokaż Kod QR'}
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-8 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Map Section */}
        <div className="lg:col-span-2 relative aspect-square md:aspect-video lg:aspect-auto lg:h-[70vh] min-h-[400px] bg-white rounded-[40px] shadow-xl shadow-black/5 border border-white overflow-hidden group z-0">
          
          <MapContainer 
            center={[53.442, 14.518]} 
            zoom={14} 
            zoomControl={false}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <ZoomControl position="topright" />
            <MapResizeFix />
            {POGODNO_POINTS.map((point) => (
              <Marker 
                key={point.id} 
                position={point.coords}
                icon={createIcon(point.type, selectedPoint?.id === point.id)}
                eventHandlers={{
                  click: () => setSelectedPoint(point),
                }}
              />
            ))}
          </MapContainer>

          {/* Map Legend (Bottom Left) */}
          <div className="absolute bottom-8 left-8 flex flex-wrap gap-4 font-sans text-[10px] uppercase tracking-wider opacity-80 bg-white/80 backdrop-blur-md p-3 rounded-2xl z-[400] shadow-sm">
            {Object.entries(CATEGORY_COLORS).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div className={cn("w-3 h-3 rounded-full", color)} />
                {type.replace('_', ' ')}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar / Info Panel */}
        <div className="flex flex-col gap-8">
          <AnimatePresence mode="wait">
            {selectedPoint ? (
              <motion.div
                key={selectedPoint.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 rounded-[32px] shadow-lg border border-white flex-1"
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6",
                  CATEGORY_COLORS[selectedPoint.type as keyof typeof CATEGORY_COLORS]
                )}>
                  {CATEGORY_ICONS[selectedPoint.type as keyof typeof CATEGORY_ICONS]}
                </div>
                
                <h2 className="text-3xl font-medium text-[#2d2d24] mb-4">{selectedPoint.name}</h2>
                <p className="text-lg leading-relaxed opacity-80 mb-8 font-sans">
                  {selectedPoint.description}
                </p>
                
                <div className="flex flex-col gap-3">
                  <a 
                    href={selectedPoint.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl text-emerald-900 hover:bg-emerald-100 transition-colors font-sans font-medium"
                  >
                    <span className="flex items-center gap-3">
                      <Navigation className="w-5 h-5" />
                      Prowadź do celu
                    </span>
                    <ExternalLink className="w-4 h-4 opacity-50" />
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white/50 p-8 rounded-[32px] border border-dashed border-[#d1d1c1] flex-1 flex flex-col items-center justify-center text-center">
                <MapPin className="w-12 h-12 opacity-20 mb-4" />
                <h3 className="text-xl font-medium opacity-40">Wybierz punkt na mapie</h3>
                <p className="mt-2 text-sm opacity-30 font-sans">Kliknij w ikonę, aby poznać szczegóły miejsca.</p>
              </div>
            )}
          </AnimatePresence>

          {/* QR Code Panel */}
          <AnimatePresence>
            {showQR && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#2d2d24] text-white p-8 rounded-[32px] flex flex-col items-center text-center"
              >
                <div className="bg-white p-4 rounded-2xl mb-6">
                  <QRCodeSVG value={appUrl} size={160} />
                </div>
                <h4 className="text-xl font-medium mb-2">Zabierz mapę ze sobą</h4>
                <p className="text-sm opacity-60 font-sans">Zeskanuj kod, aby otworzyć tę mapę na swoim telefonie podczas spaceru.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats / Footer Card */}
          <div className="bg-emerald-900 text-white p-8 rounded-[32px] relative overflow-hidden">
            <Heart className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
            <div className="relative z-10">
              <div className="text-4xl font-light mb-1">100%</div>
              <div className="text-xs uppercase tracking-widest opacity-60 font-sans">Lokalnej Miłości</div>
              <p className="mt-4 text-sm opacity-80 font-sans leading-relaxed">
                Pogodno to nie tylko miejsce na mapie, to stan umysłu. Ciesz się spokojem i pięknem naszej dzielnicy.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-100/50 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
