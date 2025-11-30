const GlowBall = ({ size, color, top, left }) => {
  return (
    <div
      className="absolute rounded-full blur-3xl opacity-30 animate-pulse"
      style={{
        width: size,
        height: size,
        top: top,
        left: left,
        background: color,
      }}
    ></div>
  );
};

export default GlowBall;
