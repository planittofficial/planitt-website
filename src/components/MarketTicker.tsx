'use client';

import { useEffect, useRef, memo } from 'react';

/**
 * MarketTicker – TradingView Ticker Tape Widget
 *
 * A sticky, continuously scrolling live-market ticker bar pinned
 * directly below the fixed header. Remains visible throughout the
 * entire scroll journey.
 *
 * Uses BSE prefix for individual Indian stocks (BSE data is more
 * reliably available in TradingView's free widget tier than NSE,
 * which has data-sharing restrictions for embedded widgets).
 */
function MarketTickerInner() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Prevent duplicate script injection on HMR
    if (container.querySelector('script')) return;

    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.type = 'text/javascript';
    script.async = true;

    // BSE symbols are more reliable for free widget embeds than NSE
    // (NSE has data-sharing restrictions that cause ⚠ icons)
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'BSE:SENSEX', title: 'SENSEX' },
        { proName: 'BSE:RELIANCE', title: 'RELIANCE' },
        { proName: 'BSE:TCS', title: 'TCS' },
        { proName: 'BSE:HDFCBANK', title: 'HDFC BANK' },
        { proName: 'BSE:ICICIBANK', title: 'ICICI BANK' },
        { proName: 'BSE:SBIN', title: 'SBIN' },
        { proName: 'BSE:INFY', title: 'INFOSYS' },
        { proName: 'BSE:ITC', title: 'ITC' },
        { proName: 'BSE:BHARTIARTL', title: 'AIRTEL' },
        { proName: 'BSE:LT', title: 'L&T' },
        { proName: 'BINANCE:BTCUSDT', title: 'BTC/USDT' },
        { proName: 'BINANCE:ETHUSDT', title: 'ETH/USDT' },
        { proName: 'FX_IDC:USDINR', title: 'USD/INR' },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: 'adaptive',
      colorTheme: 'dark',
      locale: 'en',
    });

    container.appendChild(script);

    return () => {
      // Cleanup widget DOM on unmount
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div
      id="market-ticker"
      className="fixed top-16 left-0 right-0 z-40 w-full border-b border-white/[0.06] bg-[#080B13]/90 backdrop-blur-2xl"
    >
      {/* Left fade mask */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-[#080B13] to-transparent" />

      {/* Right fade mask */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-[#080B13] to-transparent" />

      {/* Subtle top-edge glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7C5CFF]/30 to-transparent" />

      {/* TradingView Ticker Tape Widget Container */}
      <div
        className="tradingview-widget-container"
        style={{ height: '46px', overflow: 'hidden' }}
      >
        <div
          ref={containerRef}
          className="tradingview-widget-container__widget"
          style={{ height: '46px' }}
        />
      </div>

      {/* Subtle bottom-edge glow line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
    </div>
  );
}

const MarketTicker = memo(MarketTickerInner);
export default MarketTicker;
