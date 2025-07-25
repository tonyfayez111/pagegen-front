'use client';

import { useEffect, useState } from 'react';
import HeroComponent from './components/HeroComponent';
import AboutComponent from './components/AboutComponent';
import ContactComponent from './components/ContactComponent';
import PromptForm from './components/PromptForm';
import SidebarPrompt from './components/SidebarPrompt';
import { extractJSXFromCode } from '@/utils/extractJsx';
import AnimatedLoader from './components/AnimatedLoader';

type SectionData = {
  name: string;
  code: string;
};

export default function Home() {
  const [componentContents, setComponentContents] = useState<{
    Hero?: string;
    About?: string;
    Contact?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasData, setHasData] = useState(false);

  const fetchSections = async () => {
    try {
      const res = await fetch('http://localhost:3000/sections');
      const data = await res.json();

      if (data.length > 0 && data[0].sections) {
        const contents: typeof componentContents = {};
        data[0].sections.forEach((section: SectionData) => {
          const jsx = extractJSXFromCode(section.code);
          if (jsx) contents[section.name as keyof typeof contents] = jsx;
        });

        setComponentContents(contents);
        setHasData(true);
      } else {
        setHasData(false);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch sections');
    } finally {
      setLoading(false);
    }
  };

  const handlePromptSubmit = async (prompt: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error('Failed to generate');

      await fetchSections();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <main className="min-h-screen relative p-6 bg-gray-50">
      
      {loading &&
      <div className='flex items-center justify-center h-screen'>
        <AnimatedLoader />
      </div>
      }


      {error && (
        <div className="p-4 bg-red-100 text-red-700 mt-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* If no data yet, show form in center */}
      {!hasData && !loading && (
        <div className="h-screen flex items-center justify-center">
          <div className="max-w-md w-full">
            <PromptForm onSubmit={handlePromptSubmit} loading={loading} />
          </div>
        </div>
      )}

      {/* If we have data, show components and sidebar */}
      {hasData && !loading && (
        <>
          <SidebarPrompt onSubmit={handlePromptSubmit} loading={loading} />

          <HeroComponent content={componentContents.Hero || ''} />
          <AboutComponent content={componentContents.About || ''} />
          <ContactComponent content={componentContents.Contact || ''} />
        </>
      )}
    </main>
  );
}
