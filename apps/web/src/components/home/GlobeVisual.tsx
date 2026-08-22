import { Globe } from '@/components/ui/cobe-globe';

// Curated World Famous Travel Destinations with 2-letter Country Codes
const WORLD_FAMOUS_LANDMARKS = [
  // 🇻🇳 VIETNAM
  { id: 'danang', location: [16.0544, 108.2022] as [number, number], label: 'Đà Nẵng', countryCode: 'vn', highlight: true },
  { id: 'hanoi', location: [21.0285, 105.8542] as [number, number], label: 'Hà Nội', countryCode: 'vn', highlight: true },
  { id: 'hcm', location: [10.8231, 106.6297] as [number, number], label: 'TP. Hồ Chí Minh', countryCode: 'vn', highlight: true },
  { id: 'phuquoc', location: [10.2899, 103.984] as [number, number], label: 'Phú Quốc', countryCode: 'vn', highlight: true },
  { id: 'dalat', location: [11.9404, 108.4583] as [number, number], label: 'Đà Lạt', countryCode: 'vn' },
  { id: 'halong', location: [20.9505, 107.0734] as [number, number], label: 'Hạ Long', countryCode: 'vn' },

  // 🇯🇵 🇰🇷 🇹🇭 🇸🇬 🇮🇩 🇦🇺 ASIA & OCEANIA
  { id: 'tokyo', location: [35.6762, 139.6503] as [number, number], label: 'Tokyo', countryCode: 'jp', highlight: true },
  { id: 'kyoto', location: [35.0116, 135.7681] as [number, number], label: 'Kyoto', countryCode: 'jp' },
  { id: 'seoul', location: [37.5665, 126.9780] as [number, number], label: 'Seoul', countryCode: 'kr', highlight: true },
  { id: 'bangkok', location: [13.7563, 100.5018] as [number, number], label: 'Bangkok', countryCode: 'th', highlight: true },
  { id: 'singapore', location: [1.3521, 103.8198] as [number, number], label: 'Singapore', countryCode: 'sg', highlight: true },
  { id: 'bali', location: [-8.4095, 115.1889] as [number, number], label: 'Bali', countryCode: 'id', highlight: true },
  { id: 'sydney', location: [-33.8688, 151.2093] as [number, number], label: 'Sydney', countryCode: 'au', highlight: true },
  { id: 'auckland', location: [-36.8485, 174.7633] as [number, number], label: 'Auckland', countryCode: 'nz' },

  // 🇫🇷 🇮🇹 🇬🇧 🇪🇸 🇬🇷 🇨🇭 🇮🇸 EUROPE
  { id: 'paris', location: [48.8566, 2.3522] as [number, number], label: 'Paris', countryCode: 'fr', highlight: true },
  { id: 'rome', location: [41.9028, 12.4964] as [number, number], label: 'Rome', countryCode: 'it', highlight: true },
  { id: 'london', location: [51.5074, -0.1278] as [number, number], label: 'London', countryCode: 'gb', highlight: true },
  { id: 'barcelona', location: [41.3879, 2.1699] as [number, number], label: 'Barcelona', countryCode: 'es', highlight: true },
  { id: 'santorini', location: [36.3932, 25.4615] as [number, number], label: 'Santorini', countryCode: 'gr', highlight: true },
  { id: 'zurich', location: [47.3769, 8.5417] as [number, number], label: 'Zurich', countryCode: 'ch' },
  { id: 'amsterdam', location: [52.3676, 4.9041] as [number, number], label: 'Amsterdam', countryCode: 'nl' },
  { id: 'reykjavik', location: [64.1466, -21.9426] as [number, number], label: 'Iceland', countryCode: 'is' },

  // 🇦🇪 🇪🇬 🇹🇷 🇿🇦 🇲🇻 MIDDLE EAST & AFRICA
  { id: 'dubai', location: [25.2048, 55.2708] as [number, number], label: 'Dubai', countryCode: 'ae', highlight: true },
  { id: 'cairo', location: [30.0444, 31.2357] as [number, number], label: 'Cairo', countryCode: 'eg', highlight: true },
  { id: 'istanbul', location: [41.0082, 28.9784] as [number, number], label: 'Istanbul', countryCode: 'tr' },
  { id: 'capetown', location: [-33.9249, 18.4241] as [number, number], label: 'Cape Town', countryCode: 'za' },
  { id: 'maldives', location: [3.2028, 73.2207] as [number, number], label: 'Maldives', countryCode: 'mv', highlight: true },

  // 🇺🇸 🇨🇦 🇧🇷 🇵🇪 AMERICAS
  { id: 'nyc', location: [40.7128, -74.006] as [number, number], label: 'New York', countryCode: 'us', highlight: true },
  { id: 'sf', location: [37.7749, -122.4194] as [number, number], label: 'San Francisco', countryCode: 'us', highlight: true },
  { id: 'hawaii', location: [21.3069, -157.8583] as [number, number], label: 'Hawaii', countryCode: 'us', highlight: true },
  { id: 'vancouver', location: [49.2827, -123.1207] as [number, number], label: 'Vancouver', countryCode: 'ca' },
  { id: 'rio', location: [-22.9068, -43.1729] as [number, number], label: 'Rio de Janeiro', countryCode: 'br', highlight: true },
  { id: 'machupicchu', location: [-13.1631, -72.5450] as [number, number], label: 'Machu Picchu', countryCode: 'pe' },
];

// Flight Arcs with exactly 4 curated, orderly airplane flights
const WORLD_TRAVEL_ARCS = [
  // ✈️ 4 SELECTED MAJOR FLIGHTS WITH ORDERLY AIRPLANES:
  { id: 'flight-danang-tokyo', from: [16.0544, 108.2022] as [number, number], to: [35.6762, 139.6503] as [number, number], hasAirplane: true, flightSpeed: 0.07, flightOffset: 0.0 },
  { id: 'flight-hanoi-paris', from: [21.0285, 105.8542] as [number, number], to: [48.8566, 2.3522] as [number, number], hasAirplane: true, flightSpeed: 0.05, flightOffset: 0.35 },
  { id: 'flight-nyc-london', from: [40.7128, -74.006] as [number, number], to: [51.5074, -0.1278] as [number, number], hasAirplane: true, flightSpeed: 0.06, flightOffset: 0.7 },
  { id: 'flight-dubai-bali', from: [25.2048, 55.2708] as [number, number], to: [-8.4095, 115.1889] as [number, number], hasAirplane: true, flightSpeed: 0.065, flightOffset: 0.2 },

  // OTHER LIGHT ARCS (DECORATIVE GLOWING LINES ONLY, NO PLANES):
  { id: 'arc-hcm-sydney', from: [10.8231, 106.6297] as [number, number], to: [-33.8688, 151.2093] as [number, number], hasAirplane: false },
  { id: 'arc-phuquoc-singapore', from: [10.2899, 103.984] as [number, number], to: [1.3521, 103.8198] as [number, number], hasAirplane: false },
  { id: 'arc-tokyo-hawaii', from: [35.6762, 139.6503] as [number, number], to: [21.3069, -157.8583] as [number, number], hasAirplane: false },
  { id: 'arc-hawaii-sf', from: [21.3069, -157.8583] as [number, number], to: [37.7749, -122.4194] as [number, number], hasAirplane: false },
  { id: 'arc-sf-nyc', from: [37.7749, -122.4194] as [number, number], to: [40.7128, -74.006] as [number, number], hasAirplane: false },
  { id: 'arc-london-paris', from: [51.5074, -0.1278] as [number, number], to: [48.8566, 2.3522] as [number, number], hasAirplane: false },
  { id: 'arc-paris-rome', from: [48.8566, 2.3522] as [number, number], to: [41.9028, 12.4964] as [number, number], hasAirplane: false },
  { id: 'arc-barcelona-santorini', from: [41.3879, 2.1699] as [number, number], to: [36.3932, 25.4615] as [number, number], hasAirplane: false },
  { id: 'arc-rome-cairo', from: [41.9028, 12.4964] as [number, number], to: [30.0444, 31.2357] as [number, number], hasAirplane: false },
  { id: 'arc-cairo-dubai', from: [30.0444, 31.2357] as [number, number], to: [25.2048, 55.2708] as [number, number], hasAirplane: false },
  { id: 'arc-dubai-maldives', from: [25.2048, 55.2708] as [number, number], to: [3.2028, 73.2207] as [number, number], hasAirplane: false },
  { id: 'arc-nyc-rio', from: [40.7128, -74.006] as [number, number], to: [-22.9068, -43.1729] as [number, number], hasAirplane: false },
  { id: 'arc-rio-machupicchu', from: [-22.9068, -43.1729] as [number, number], to: [-13.1631, -72.5450] as [number, number], hasAirplane: false },
  { id: 'arc-sydney-auckland', from: [-33.8688, 151.2093] as [number, number], to: [-36.8485, 174.7633] as [number, number], hasAirplane: false },
];

export default function GlobeVisual() {
  return (
    <div className="relative flex items-center justify-center w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] lg:w-[490px] lg:h-[490px] select-none">
      {/* Expansive Translucent Outer Aura Halo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 via-cyan-400/25 to-purple-500/20 blur-[85px] transform scale-120 pointer-events-none" />
      <div className="absolute w-[105%] h-[105%] rounded-full bg-radial from-cyan-400/15 via-blue-600/10 to-transparent blur-2xl pointer-events-none" />

      {/* Subtle Translucent Outer Orbit Guide Ring */}
      <div className="absolute w-[106%] h-[106%] rounded-full border border-cyan-400/15 dark:border-cyan-300/10 pointer-events-none" />

      {/* Main 3D WebGL Cobe Globe with Exact Orderly Airplanes */}
      <div className="relative w-full h-full rounded-full bg-transparent overflow-visible">
        <Globe
          className="w-full h-full"
          markers={WORLD_FAMOUS_LANDMARKS}
          arcs={WORLD_TRAVEL_ARCS}
          markerColor={[0.22, 0.74, 0.97]} // Bright Glowing Cyan
          baseColor={[0.2, 0.45, 0.95]}    // Luminous Royal Blue
          arcColor={[0.45, 0.72, 0.98]}    // Sky Blue flight arcs
          glowColor={[0.25, 0.78, 0.98]}   // Cyan Atmosphere Halo
          dark={1}
          mapBrightness={9}
          markerSize={0.036}
          markerElevation={0.018}
          arcWidth={0.7}
          arcHeight={0.32}
          speed={0.0012} // Silky smooth slow rotation
          diffuse={1.6}
          mapSamples={26000}
        />
      </div>
    </div>
  );
}
