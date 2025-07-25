'use client';

import JsxParser from 'react-jsx-parser';
import React from 'react';

interface AboutComponentProps {
  content?: string;
}

export default function AboutComponent({ content }: AboutComponentProps) {
  console.log(content,"content")
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