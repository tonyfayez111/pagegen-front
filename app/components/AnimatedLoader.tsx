'use client';

import { useEffect } from 'react';

export default function AnimatedLoader() {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes glowBorder {
        0% {
          box-shadow: 0 0 5px #A9C4D6, 0 0 10px #A9C4D6, 0 0 15px #A9C4D6;
        }
        50% {
          box-shadow: 0 0 10px #A9C4D6, 0 0 20px #A9C4D6, 0 0 30px #A9C4D6;
        }
        100% {
          box-shadow: 0 0 5px #A9C4D6, 0 0 10px #A9C4D6, 0 0 15px #A9C4D6;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      style={{
        width: '300px',
        height: '150px',
        borderRadius: '16px',
        border: '4px solid #A9C4D6',
        animation: 'glowBorder 2s infinite ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#253442',
        fontWeight: 600,
        fontSize: '18px',
        backgroundColor: '#ffffff',
        margin: 'auto',
      }}
    >
      Preparing your page...
    </div>
  );
}
