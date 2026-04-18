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

export default function HeroParticles({ isAmberTheme = false }: HeroParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'SPY', 'QQQ'
  ];

  useEffect(() => {
    const particleCount = 25; // Increased to show more stocks
    const newParticles: Particle[] = [];
    const usedSymbols = new Set<string>();

    // Create well-distributed positions using improved algorithm
    const minDistance = Math.min(window.innerWidth, window.innerHeight) * 0.15; // Minimum distance between particles
    const maxAttempts = 50; // Maximum attempts to place each particle

    for (let i = 0; i < particleCount && i < stockSymbols.length; i++) {
      let symbol: string;
      do {
        symbol = stockSymbols[Math.floor(Math.random() * stockSymbols.length)];
      } while (usedSymbols.has(symbol)); // Ensure no duplicate symbols

      usedSymbols.add(symbol);

      let x: number, y: number;
      let attempts = 0;
      let validPosition = false;

      // Try to find a valid position that's not too close to existing particles
      do {
        x = Math.random() * (window.innerWidth - 100) + 50; // Keep away from edges
        y = Math.random() * (window.innerHeight - 100) + 50; // Keep away from edges

        validPosition = true;
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
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
      }

      newParticles.push({
        id: i,
        left: (x / window.innerWidth) * 100,
        top: (y / window.innerHeight) * 100,
        symbol,
        size: Math.random() * 1.2 + 0.7,
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

    setParticles(newParticles);
  }, []);

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
    const updateConnections = () => {
      const newConnections: Connection[] = [];
      const maxDistance = 220; // Increased for better connectivity

      // Create connections between all particles within range
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2, j) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            newConnections.push({
              from: i,
              to: i + j + 1,
              distance,
            });
          }
        });
      });

      // If we have fewer connections than desired, create some longer-range connections
      if (newConnections.length < particles.length * 2) {
        particles.forEach((p1, i) => {
          particles.slice(i + 2).forEach((p2, j) => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance * 1.5 && Math.random() < 0.3) {
              newConnections.push({
                from: i,
                to: i + j + 2,
                distance,
              });
            }
          });
        });
      }

      setConnections(newConnections);
    };

    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          let newVx = particle.vx;
          let newVy = particle.vy;

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
          if (newX <= 20 || newX >= window.innerWidth - 20) {
            newVx *= -0.8;
            newX = Math.max(20, Math.min(window.innerWidth - 20, newX));
          }
          if (newY <= 20 || newY >= window.innerHeight - 20) {
            newVy *= -0.8;
            newY = Math.max(20, Math.min(window.innerHeight - 20, newY));
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            left: (newX / window.innerWidth) * 100,
            top: (newY / window.innerHeight) * 100,
          };
        })
      );

      updateConnections();
    };

    const interval = setInterval(animateParticles, 16); // ~60fps
    return () => clearInterval(interval);
  }, [particles.length, mousePos, isMouseMoving, isHovering]);

  const particleColor = isAmberTheme
    ? ['#ffd27a', '#f5b544', '#f97316']
    : ['#7C5CFF', '#38BDF8', '#c9bcff'];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
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
          cursor: pointer;
          opacity: ${isHovering ? 1 : 0.7};
          transform: ${isHovering ? 'scale(1.05)' : 'scale(1)'};
        }

        .particle-text:hover {
          animation: pulse-glow 1s ease-in-out infinite;
          transform: scale(1.2);
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
                opacity: Math.max(0.2, 0.8 - conn.distance / 220),
                strokeWidth: Math.max(1, 3 - conn.distance / 110),
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
