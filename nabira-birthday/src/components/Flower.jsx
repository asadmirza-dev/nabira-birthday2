
export default function Flower({ className = "", size = 120 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="-50 -50 100 100" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((r) => (
        <path key={r} transform={`rotate(${r})`} d="M0 -4 C 14 -18, 14 -40, 0 -46 C -14 -40, -14 -18, 0 -4Z"
          fill="#D99BAA" fillOpacity=".55" stroke="#C78F9C" strokeOpacity=".6" strokeWidth=".8" />
      ))}
      <circle r="6" fill="#FFF9F5" stroke="#C78F9C" strokeOpacity=".6" strokeWidth=".8" />
    </svg>
  );
}

export function Sparkle({ style }) {
  return (
    <svg className="sparkle" style={style} width="14" height="14" viewBox="-10 -10 20 20" aria-hidden="true">
      <path d="M0 -9 Q1 -1 9 0 Q1 1 0 9 Q-1 1 -9 0 Q-1 -1 0 -9Z" fill="#C78F9C" />
    </svg>
  );
}
