import React, { useEffect, useMemo, useRef, useState } from 'react';

export type Candle = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function mulberry32(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function generateCandles(count: number, startPrice = 100, volatility = 0.025, seed = 1): Candle[] {
  const rand = mulberry32(seed);
  const candles: Candle[] = [];
  let price = startPrice;

  for (let i = 0; i < count; i += 1) {
    const open = price;
    const delta = (rand() - 0.5) * volatility * price * 2;
    const close = Math.max(1, open + delta);
    const high = Math.max(open, close) + rand() * volatility * price;
    const low = Math.min(open, close) - rand() * volatility * price;

    candles.push({
      time: `${i + 1}`,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
    });

    price = close;
  }

  return candles;
}

export default function CandlestickChart({
  width = 360,
  height = 240,
  initialData,
}: {
  width?: number;
  height?: number;
  initialData?: Candle[];
}) {
  const padding = 16;
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<Candle[]>(() => initialData ?? generateCandles(32, 100, 0.025, 1234));
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  const values = useMemo(() => data.flatMap((d) => [d.high, d.low]), [data]);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);

  // Expand the range slightly so candles fill the chart area and avoid large empty gaps.
  const paddingFactor = 0.16;
  const extendedMin = rawMin - (rawMax - rawMin) * paddingFactor;
  const extendedMax = rawMax + (rawMax - rawMin) * paddingFactor;
  const valueRange = extendedMax - extendedMin || 1;

  const candleWidth = Math.max(8, Math.floor(innerWidth / data.length) - 6);
  const step = innerWidth / data.length;

  const yScale = (value: number) => {
    const normalized = (value - extendedMin) / valueRange;
    return innerHeight - normalized * innerHeight;
  };

  const signals = useMemo(() => {
    const list: { index: number; type: 'buy' | 'sell'; price: number }[] = [];

    for (let i = 1; i < data.length; i += 1) {
      const prev = data[i - 1];
      const curr = data[i];

      // simple signal: buy if price breaks to new high; sell if it breaks to new low
      if (curr.close > prev.high * 1.005) {
        list.push({ index: i, type: 'buy', price: curr.close });
      } else if (curr.close < prev.low * 0.995) {
        list.push({ index: i, type: 'sell', price: curr.close });
      }
    }

    return list;
  }, [data]);

  const handleMouseMove = (event: React.MouseEvent<SVGRectElement>) => {
    const rect = (event.target as SVGRectElement).getBoundingClientRect();
    const x = event.clientX - rect.left - padding;
    const index = clamp(Math.floor(x / step), 0, data.length - 1);
    const candle = data[index];

    setHoverIndex(index);
    setTooltip({
      x: event.clientX - rect.left + 8,
      y: event.clientY - rect.top + 8,
      content: `T:${candle.time}  O:${candle.open.toFixed(2)}  H:${candle.high.toFixed(2)}  L:${candle.low.toFixed(2)}  C:${candle.close.toFixed(2)}`,
    });
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
    setTooltip(null);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = window.setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1];
        const volatility = 0.02;
        const open = last.close;
        const delta = (Math.random() - 0.5) * volatility * open * 2;
        const close = Math.max(1, open + delta);
        const high = Math.max(open, close) + Math.random() * volatility * open;
        const low = Math.min(open, close) - Math.random() * volatility * open;

        const next: Candle = {
          time: `${Number(last.time) + 1}`,
          open: Number(open.toFixed(2)),
          high: Number(high.toFixed(2)),
          low: Number(low.toFixed(2)),
          close: Number(close.toFixed(2)),
        };

        return [...prev.slice(1), next];
      });
    }, 1400);

    return () => window.clearInterval(interval);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="relative inline-block">
        <div className="flex items-center justify-between gap-3 pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live trading view
          </div>
        </div>

        <div className="h-52 w-[340px] rounded-3xl bg-white/5" />
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <div className="flex items-center justify-between gap-3 pb-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Live trading view
        </div>
      </div>

      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-label="Candlestick chart" role="img">
        <defs>
          <linearGradient id="chartBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B1220" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#070A10" stopOpacity="0.92" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.35" />
          </filter>
        </defs>

        <rect x="0" y="0" width={width} height={height} rx="28" fill="url(#chartBg)" />
        <rect x="2" y="2" width={width - 4} height={height - 4} rx="26" fill="none" stroke="#2F3B53" strokeWidth="2" />

        <g transform={`translate(${padding}, ${padding})`} filter="url(#shadow)">
          {data.map((d, index) => {
            const xCenter = index * step + step / 2;
            const openY = yScale(d.open);
            const closeY = yScale(d.close);
            const highY = yScale(d.high);
            const lowY = yScale(d.low);
            const candleTop = Math.min(openY, closeY);
            const candleBottom = Math.max(openY, closeY);
            const bodyHeight = Math.max(2, candleBottom - candleTop);
            const isBullish = d.close >= d.open;
            const fill = isBullish ? '#2EE67C' : '#F33F5B';
            const isActive = index === hoverIndex;

            return (
              <g key={d.time}>
                <line
                  x1={xCenter}
                  x2={xCenter}
                  y1={clamp(highY, 0, innerHeight)}
                  y2={clamp(lowY, 0, innerHeight)}
                  stroke={fill}
                  strokeWidth={isActive ? 3 : 2}
                  strokeLinecap="round"
                  opacity={0.8}
                />
                <rect
                  x={xCenter - candleWidth / 2}
                  y={clamp(candleTop, 0, innerHeight)}
                  width={candleWidth}
                  height={bodyHeight}
                  rx={2}
                  fill={fill}
                  opacity={isActive ? 1 : 0.9}
                />
              </g>
            );
          })}

        {signals.map((signal) => {
          const xCenter = signal.index * step + step / 2;
          const y = signal.type === 'buy' ? padding + 12 : padding + innerHeight - 12;
          const color = signal.type === 'buy' ? '#2EE67C' : '#F33F5B';
          const points =
            signal.type === 'buy'
              ? `${xCenter},${y} ${xCenter - 6},${y + 10} ${xCenter + 6},${y + 10}`
              : `${xCenter},${y} ${xCenter - 6},${y - 10} ${xCenter + 6},${y - 10}`;

          return (
            <g key={`${signal.type}-${signal.index}`}>
              <polygon points={points} fill={color} opacity={0.85} />
              <text
                x={xCenter}
                y={signal.type === 'buy' ? y + 26 : y - 14}
                textAnchor="middle"
                fill="rgba(255,255,255,0.75)"
                fontSize="9"
                fontWeight="600"
              >
                {signal.type.toUpperCase()}
              </text>
            </g>
          );
        })}
      </g>
      </svg>
      {tooltip ? (
        <div
          className="pointer-events-none absolute z-10 rounded-lg bg-slate-950/90 px-3 py-2 text-xs text-white shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y, whiteSpace: 'nowrap' }}
        >
          {tooltip.content}
        </div>
      ) : null}
    </div>
  );
}
