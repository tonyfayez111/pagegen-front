'use client';

import JsxParser from 'react-jsx-parser';
import React from 'react';

interface ContactComponentProps {
  content?: string;
}

export default function ContactComponent({ content }: ContactComponentProps) {
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