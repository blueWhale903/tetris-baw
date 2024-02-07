let lines = 0;

export default function Level({
  level,
  percentage,
  lineCleared,
}: {
  level: number;
  percentage: number;
  lineCleared: number;
}) {
  const width = 200;
  const radius = width * 0.38;
  let full = radius * Math.PI * 2;
  let offset = full - full * percentage;

  return (
    <div>
      <p className="text-center text-2xl">LEVEL</p>
      <svg width={width} height={width} viewBox={`0 0 ${width} ${width}`}>
        <circle
          r={radius}
          cx={width / 2}
          cy={width / 2}
          strokeWidth="10px"
          className="fill-none stroke-[#333]"
        ></circle>
        <circle
          r={radius}
          cx={width / 2}
          cy={width / 2}
          strokeWidth="10px"
          className="fill-none stroke-white"
          style={{
            strokeDasharray: full,
            strokeDashoffset: offset,
          }}
          transform={`rotate(-90 ${width / 2} ${width / 2})`}
        ></circle>
        <text>
          <tspan
            x="50%"
            y="50%"
            textAnchor="middle"
            dy="0.2em"
            className="text-[38px] fill-white"
          >
            {level}
          </tspan>
          <tspan x="50%" y="50%" textAnchor="middle" dy="2em" className="fill-white">
            {lineCleared} lines
          </tspan>
        </text>
      </svg>
    </div>
  );
}
