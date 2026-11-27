'use client';

import { useEffect } from 'react';

export default function SiteUnreachable() {
  // Block all navigation attempts
  useEffect(() => {
    // Override pushState and replaceState to prevent any navigation
    const noop = () => {};
    const originalPushState = history.pushState.bind(history);
    const originalReplaceState = history.replaceState.bind(history);

    history.pushState = noop;
    history.replaceState = noop;

    // Intercept all link clicks
    const handleClick = (e) => {
      const target = e.target.closest('a');
      if (target) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Intercept form submissions
    const handleSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('submit', handleSubmit, true);

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('submit', handleSubmit, true);
    };
  }, []);

  const handleReload = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "'Segoe UI', Arial, sans-serif",
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {/* Global style reset injected inline */}
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
        }
        body {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden;
        }
        /* Hide any scroll progress bars or overlays from the layout */
        [class*="scroll"], [class*="progress"], [class*="cursor"] {
          display: none !important;
        }
      `}</style>

      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          padding: '0 24px',
          textAlign: 'left',
        }}
      >
        {/* Error illustration */}
        <div style={{ marginBottom: '28px' }}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Globe icon */}
            <circle cx="40" cy="40" r="36" stroke="#dadce0" strokeWidth="3" fill="none" />
            <ellipse cx="40" cy="40" rx="16" ry="36" stroke="#dadce0" strokeWidth="2.5" fill="none" />
            <line x1="4" y1="40" x2="76" y2="40" stroke="#dadce0" strokeWidth="2.5" />
            <line x1="10" y1="22" x2="70" y2="22" stroke="#dadce0" strokeWidth="2" />
            <line x1="10" y1="58" x2="70" y2="58" stroke="#dadce0" strokeWidth="2" />
            {/* Red X overlay */}
            <circle cx="58" cy="58" r="18" fill="#ffffff" />
            <circle cx="58" cy="58" r="16" fill="#d93025" />
            <line x1="51" y1="51" x2="65" y2="65" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="65" y1="51" x2="51" y2="65" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontSize: '24px',
            fontWeight: '400',
            color: '#202124',
            margin: '0 0 12px 0',
            lineHeight: '1.4',
          }}
        >
          This site can&apos;t be reached
        </h1>

        {/* Domain line */}
        <p
          style={{
            fontSize: '14px',
            color: '#5f6368',
            margin: '0 0 20px 0',
            lineHeight: '1.6',
          }}
        >
          <strong style={{ color: '#202124' }}>planitt.in</strong> refused to connect.
        </p>

        {/* Details box */}
        <div
          style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #dadce0',
            borderRadius: '8px',
            padding: '16px 20px',
            marginBottom: '24px',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: '#5f6368',
              margin: '0 0 10px 0',
              fontWeight: '500',
              letterSpacing: '0.01em',
            }}
          >
            Try:
          </p>
          <ul
            style={{
              margin: 0,
              padding: '0 0 0 20px',
              fontSize: '13px',
              color: '#5f6368',
              lineHeight: '2',
            }}
          >
            <li>Checking the connection</li>
            <li>Checking the proxy and the firewall</li>
            <li>Running Windows Network Diagnostics</li>
          </ul>
        </div>

        {/* Error code */}
        <p
          style={{
            fontSize: '12px',
            color: '#9aa0a6',
            margin: '0 0 24px 0',
            fontFamily: 'monospace',
            letterSpacing: '0.03em',
          }}
        >
          ERR_CONNECTION_REFUSED
        </p>

        {/* Reload button */}
        <button
          onClick={handleReload}
          style={{
            backgroundColor: '#1a73e8',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            fontFamily: "'Segoe UI', Arial, sans-serif",
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1557b0')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a73e8')}
        >
          Reload
        </button>
      </div>
    </div>
  );
}
