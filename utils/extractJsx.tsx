export function extractJSXFromCode(code: string): string | null {
  if (!code || typeof code !== 'string') return null;

  // Find first JSX tag
  const jsxStart = code.indexOf('<');
  if (jsxStart === -1) return null;

  // Slice from the first tag to the end
  const jsx = code.slice(jsxStart).trim();

  return jsx;
}
