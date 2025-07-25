'use client';

import { useState } from 'react';

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
  loading: boolean;
}

export default function PromptForm({ onSubmit, loading }: PromptFormProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt.trim());
    setPrompt('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Enter your website idea"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
        disabled={loading}
      >
        {loading ? 'Preparing...' : 'Generate'}
      </button>
    </form>
  );
}
