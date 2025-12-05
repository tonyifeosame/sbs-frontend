import React from 'react';

// Very small, dependency-free sparkline component.
// Expects an array of numbers (points). Renders an SVG polyline.
const Sparkline = ({ points = [], width = 100, height = 28, stroke = '#6366F1' }) => {
  if (!points || points.length === 0) return <svg width={width} height={height} />;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const step = width / Math.max(1, points.length - 1);
  const coords = points.map((p, i) => {
    const x = i * step;
    const y = height - ((p - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <polyline fill="none" points={coords} stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default Sparkline;
