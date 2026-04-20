'use client';

import { useState, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  symbol: string;
  size: number;
  duration: number;
  delay: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
}

interface Connection {
  from: number;
  to: number;
  distance: number;
}

interface HeroParticlesProps {
  isAmberTheme?: boolean;
}

interface ParticleFieldSize {
  width: number;
  height: number;
}

const getParticleSettings = ({ width, height }: ParticleFieldSize) => {
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  return {
    particleCount: isMobile ? 12 : isTablet ? 18 : 25,
    connectionDistance: isMobile ? 118 : isTablet ? 170 : 220,
    edgePadding: isMobile ? 30 : 50,
    minDistance: Math.min(width, height) * (isMobile ? 0.22 : isTablet ? 0.18 : 0.15),
    fontMin: isMobile ? 0.58 : isTablet ? 0.68 : 0.7,
    fontRange: isMobile ? 0.42 : isTablet ? 0.74 : 1.2,
    centerClearance: {
      left: width * (isMobile ? 0.18 : 0.16),
      right: width * (isMobile ? 0.82 : 0.84),
      top: height * (isMobile ? 0.17 : 0.22),
      bottom: height * (isMobile ? 0.82 : 0.74),
    },
  };
};

const isInsideCenterClearance = (
  x: number,
  y: number,
  clearance: ReturnType<typeof getParticleSettings>['centerClearance'],
) => x > clearance.left && x < clearance.right && y > clearance.top && y < clearance.bottom;

const stockSymbols = [
  // Crypto
  'BTCUSD', 'ETHUSD', 'BNBUSD', 'ADAUSD', 'SOLUSD', 'DOTUSD', 'DOGEUSD', 'AVAXUSD',
  // Indian Stocks
  'NIFTY', 'RELIANCE', 'TCS', 'HDFCBANK', 'ICICIBANK', 'INFY', 'HINDUNILVR', 'ITC',
  'KOTAKBANK', 'LT', 'AXISBANK', 'MARUTI', 'BAJFINANCE', 'WIPRO', 'BHARTIARTL',
  // Forex
  'EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF', 'NZDUSD', 'GBPJPY',
  'EURJPY', 'AUDJPY', 'EURGBP', 'GBPAUD', 'USDSGD', 'USDHKD', 'USDMXN',
  // F&O / Commodities
  'XAUUSD', 'XAGUSD', 'WTI', 'BRENT', 'COPPER', 'ALUMINUM', 'ZINC', 'NICKEL',
  // Popular US Stocks
  'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'SPY',
];

const buildConnections = (particleList: Particle[], fieldSize: ParticleFieldSize) => {
  const newConnections: Connection[] = [];
  const { connectionDistance } = getParticleSettings(fieldSize);

  particleList.forEach((p1, i) => {
    particleList.slice(i + 1).forEach((p2, j) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        newConnections.push({
          from: i,
          to: i + j + 1,
          distance,
        });
      }
    });
  });

  if (newConnections.length < particleList.length * 2) {
    particleList.forEach((p1, i) => {
      particleList.slice(i + 2).forEach((p2, j) => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance * 1.35 && Math.random() < 0.24) {
          newConnections.push({
            from: i,
            to: i + j + 2,
            distance,
          });
        }
      });
    });
  }

  return newConnections;
};

export default function HeroParticles({ isAmberTheme = false }: HeroParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [fieldSize, setFieldSize] = useState<ParticleFieldSize | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateFieldSize = () => {
      const rect = container.getBoundingClientRect();
      setFieldSize({
        width: Math.max(rect.width, 1),
        height: Math.max(rect.height, 1),
      });
    };

    updateFieldSize();

    const resizeObserver = new ResizeObserver(updateFieldSize);
    resizeObserver.observe(container);
    window.addEventListener('orientationchange', updateFieldSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('orientationchange', updateFieldSize);
    };
  }, []);

  useEffect(() => {
    if (!fieldSize) return;

    const { width, height } = fieldSize;
    const {
      particleCount,
      edgePadding,
      minDistance,
      fontMin,
      fontRange,
      centerClearance,
    } = getParticleSettings(fieldSize);
    const newParticles: Particle[] = [];
    const usedSymbols = new Set<string>();
    const symbolPool = width < 640
      ? stockSymbols.filter(symbol => symbol.length <= 6)
      : stockSymbols;

    const maxAttempts = 25; // Maximum attempts to place each particle

    for (let i = 0; i < particleCount && i < symbolPool.length; i++) {
      let symbol: string;
      do {
        symbol = symbolPool[Math.floor(Math.random() * symbolPool.length)];
      } while (usedSymbols.has(symbol)); // Ensure no duplicate symbols

      usedSymbols.add(symbol);

      let x: number, y: number;
      let attempts = 0;
      let validPosition = false;

      // Try to find a valid position that's not too close to existing particles
      do {
        x = Math.random() * (width - edgePadding * 2) + edgePadding;
        y = Math.random() * (height - edgePadding * 2) + edgePadding;

        validPosition = !isInsideCenterClearance(x, y, centerClearance);
        for (const particle of newParticles) {
          const dx = x - particle.x;
          const dy = y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < minDistance) {
            validPosition = false;
            break;
          }
        }
        attempts++;
      } while (!validPosition && attempts < maxAttempts);

      // If we couldn't find a good position, just place it randomly
      if (!validPosition) {
        const placeOnSide = Math.random() > 0.5;
        x = placeOnSide
          ? (Math.random() > 0.5 ? width - edgePadding : edgePadding)
          : Math.random() * (width - edgePadding * 2) + edgePadding;
        y = placeOnSide
          ? Math.random() * (height - edgePadding * 2) + edgePadding
          : (Math.random() > 0.5 ? height - edgePadding : edgePadding);
      }

      newParticles.push({
        id: i,
        left: (x / width) * 100,
        top: (y / height) * 100,
        symbol,
        size: Math.random() * fontRange + fontMin,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        x,
        y,
        vx: 0,
        vy: 0,
        originalX: x,
        originalY: y,
      });
    }

    particlesRef.current = newParticles;
    setParticles(newParticles);
    setConnections(buildConnections(newParticles, fieldSize));
  }, [fieldSize]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && isHovering) {
        const rect = containerRef.current.getBoundingClientRect();
        const newMousePos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };

        setMousePos(newMousePos);
        setIsMouseMoving(true);

        // Clear existing timeout
        if (mouseTimeoutRef.current) {
          clearTimeout(mouseTimeoutRef.current);
        }

        // Set mouse as not moving after 100ms
        mouseTimeoutRef.current = setTimeout(() => {
          setIsMouseMoving(false);
        }, 100);
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsMouseMoving(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        if (mouseTimeoutRef.current) {
          clearTimeout(mouseTimeoutRef.current);
        }
      };
    }
  }, [isHovering]);

  useEffect(() => {
    if (!fieldSize) return;

    const animateParticles = () => {
      const nextParticles = particlesRef.current.map(particle => {
          let newVx = particle.vx;
          let newVy = particle.vy;
          const { width, height } = fieldSize;

          if (isHovering && isMouseMoving) {
            // Stronger mouse interaction when moving and hovering
            const dx = mousePos.x - particle.x;
            const dy = mousePos.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) { // Increased attraction range
              const force = (200 - distance) / 200;
              // Stronger attraction to make particles follow cursor
              newVx += (dx / distance) * force * 2.5;
              newVy += (dy / distance) * force * 2.5;
            }
          } else {
            // Gentle return to original position when not hovering or mouse stops
            const dx = particle.originalX - particle.x;
            const dy = particle.originalY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 20) {
              newVx += (dx / distance) * 0.01;
              newVy += (dy / distance) * 0.01;
            }
          }

          // Apply velocity with adjusted damping for smoother following
          newVx *= 0.85; // Reduced damping for more responsive movement
          newVy *= 0.85;

          let newX = particle.x + newVx;
          let newY = particle.y + newVy;

          // Gentle bounce off edges
          if (newX <= 20 || newX >= width - 20) {
            newVx *= -0.8;
            newX = Math.max(20, Math.min(width - 20, newX));
          }
          if (newY <= 20 || newY >= height - 20) {
            newVy *= -0.8;
            newY = Math.max(20, Math.min(height - 20, newY));
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            left: (newX / width) * 100,
            top: (newY / height) * 100,
          };
        });

      particlesRef.current = nextParticles;
      setParticles(nextParticles);
      setConnections(buildConnections(nextParticles, fieldSize));
    };

    const interval = setInterval(animateParticles, 16); // ~60fps
    return () => clearInterval(interval);
  }, [fieldSize, mousePos, isMouseMoving, isHovering]);

  const particleColor = isAmberTheme
    ? ['#ffd27a', '#f5b544', '#f97316']
    : ['#7C5CFF', '#38BDF8', '#c9bcff'];

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        zIndex: 0,
      }}
    >
      <style>{`
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .particle-text {
          font-family: 'Courier New', monospace;
          font-weight: 600;
          font-size: 13px;
          text-shadow: 0 0 12px currentColor;
          animation: gentle-float 6s ease-in-out infinite;
          transition: all 0.3s ease;
          user-select: none;
          opacity: ${isHovering ? 1 : 0.7};
          transform: translate(-50%, -50%) ${isHovering ? 'scale(1.05)' : 'scale(1)'};
          white-space: nowrap;
        }

        .particle-text:hover {
          animation: pulse-glow 1s ease-in-out infinite;
          transform: translate(-50%, -50%) scale(1.2);
        }

        .connection-line {
          stroke: ${isAmberTheme ? '#f5b544' : '#7C5CFF'};
          stroke-width: 2;
          opacity: ${isHovering ? 0.8 : 0.4};
          filter: blur(0.3px);
          animation: ${isHovering ? 'pulse-connection 3s ease-in-out infinite' : 'none'};
          transition: all 0.5s ease;
        }

        @keyframes pulse-connection {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        .cursor-trail {
          pointer-events: none;
          mix-blend-mode: screen;
        }

        @media (max-width: 639px) {
          .particle-text {
            opacity: ${isAmberTheme ? 0.34 : 0.4};
            text-shadow: 0 0 8px currentColor;
          }

          .connection-line {
            opacity: ${isAmberTheme ? 0.12 : 0.16};
            stroke-width: 1;
          }
        }
      `}</style>

      {/* Connection Lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: -1 }}
      >
        {connections.map((conn, index) => {
          const p1 = particles[conn.from];
          const p2 = particles[conn.to];
          if (!p1 || !p2) return null;

          return (
            <line
              key={index}
              x1={`${p1.left}%`}
              y1={`${p1.top}%`}
              x2={`${p2.left}%`}
              y2={`${p2.top}%`}
              className="connection-line"
              style={{
                opacity: Math.max(0.12, 0.72 - conn.distance / getParticleSettings(fieldSize ?? { width: 1024, height: 768 }).connectionDistance),
                strokeWidth: Math.max(0.8, 2.6 - conn.distance / 110),
                animationDelay: `${conn.from * 0.1}s`,
              }}
            />
          );
        })}
      </svg>

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute flex items-center justify-center particle-text"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            color: particleColor[particle.id % particleColor.length],
            fontSize: `${particle.size * 14}px`,
            animationDelay: `${particle.delay}s`,
            textShadow: `0 0 ${particle.size * 10}px ${particleColor[particle.id % particleColor.length]}`,
          }}
          onMouseEnter={() => {
            // Add hover effect - particles grow when hovered
            setParticles(prev =>
              prev.map(p =>
                p.id === particle.id
                  ? { ...p, size: p.size * 1.2 }
                  : p
              )
            );
          }}
          onMouseLeave={() => {
            // Reset size
            setParticles(prev =>
              prev.map(p =>
                p.id === particle.id
                  ? { ...p, size: p.size / 1.2 }
                  : p
              )
            );
          }}
        >
          {particle.symbol}
        </div>
      ))}
    </div>
  );
}
