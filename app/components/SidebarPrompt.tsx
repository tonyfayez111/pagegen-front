'use client';

import { useState } from 'react';
import PromptForm from './PromptForm';

interface SidebarPromptProps {
  onSubmit: (prompt: string) => void;
  loading: boolean;
}

export default function SidebarPrompt({ onSubmit, loading }: SidebarPromptProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Menu Icon */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded shadow ${open ? 'hidden' : ''}`}
      >
        ☰
      </button>

      {/* Sidebar */}
      {open && (
        <div className="fixed top-0 left-0 w-80 h-full bg-white shadow-lg p-6 z-40">
          <button
            className="text-sm text-gray-500 mb-4"
            onClick={() => setOpen(false)}
          >
            ✕ Close
          </button>

          <h2 className="text-xl font-bold mb-4">Generate New Site</h2>
          <PromptForm onSubmit={onSubmit} loading={loading} />
        </div>
      )}
    </>
  );
}
