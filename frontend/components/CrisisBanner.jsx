import { useState } from 'react';

export default function CrisisBanner({ isVisible, onClose }) {
  if (!isVisible) return null;

  const helplines = [
    { name: 'AASRA', phone: '+91-9820466726', url: 'https://aasra.info' },
    { name: 'Vandrevala Foundation', phone: '+91-9999666555', url: 'https://www.vandrevalafoundation.com/' }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          <div className="font-semibold mb-1">🚨 You are not alone</div>
          <div className="text-sm opacity-90">
            If you're having thoughts of self-harm, please reach out for help immediately.
          </div>
          <div className="flex gap-4 mt-2 text-sm">
            {helplines.map((helpline, index) => (
              <a
                key={index}
                href={helpline.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition"
              >
                {helpline.name}: {helpline.phone}
              </a>
            ))}
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-4 p-2 hover:bg-white/20 rounded transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

