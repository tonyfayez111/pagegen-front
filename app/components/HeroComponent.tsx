'use client';

import JsxParser from 'react-jsx-parser';
import React from 'react';

interface HeroComponentProps {
  content?: string;
}

export default function HeroComponent({ content }: HeroComponentProps) {
  return (
    <JsxParser 
      jsx={content || ''} 
      bindings={{}}
      components={{}}
      showWarnings={true}
      renderInWrapper={false}
      onError={(err) => {
        console.error('JSX Parsing Error:', err);
        return <div>Error parsing component</div>;
      }}
    />
  );
} 