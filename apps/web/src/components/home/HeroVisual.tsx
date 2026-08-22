import GlobeVisual from './GlobeVisual';

export default function HeroVisual() {
  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] aspect-square flex items-center justify-center mx-auto lg:ml-auto">
      {/* Pristine 3D Interactive WebGL Cobe Globe with Landmarks & National Flags */}
      <GlobeVisual />
    </div>
  );
}
