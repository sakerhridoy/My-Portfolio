const TechLogo3D = ({
  icon,
  size,
  opacity,
  initialX,
  initialY,
  floatDelay,
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
        animation: `floatAnim 6s ease-in-out ${floatDelay} infinite`,
      }}
    >
      <div className="w-full h-full text-white text-4xl flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
};
export default TechLogo3D