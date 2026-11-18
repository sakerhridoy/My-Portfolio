// Create/Update global CSS for smooth floating animation if not already present
// I will rely on inline styles + existing animation definitions in the project
// Let's first modify the component for the requested design.
const TechLogo3D = ({
  icon,
  size,
  opacity,
  initialX,
  initialY,
  floatDelay,
  animationDuration = '6s',
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: initialY,
        left: initialX,
        width: size,
        height: size,
        opacity: opacity,
        animation: `floatAnim ${animationDuration} ease-in-out ${floatDelay} infinite`,
      }}
      className="pointer-events-none"
    >
      <div className="w-full h-full rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg shadow-cyan-500/10 flex items-center justify-center p-2">
        <div className="w-full h-full flex items-center justify-center text-white scale-75">
          {icon}
        </div>
      </div>
    </div>
  );
};
export default TechLogo3D;