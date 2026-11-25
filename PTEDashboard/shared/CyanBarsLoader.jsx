import { useEffect, useState } from 'react';

/**
 * Three-bar cyan vertical wave loader shown while portal routes or data fetch.
 */
export function CyanBarsLoader({ fullScreen = false, className = '' }) {
  const wrapperClass = fullScreen
    ? 'fixed inset-0 z-[100] bg-white flex items-center justify-center'
    : 'w-full flex items-center justify-center py-14';

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className={`${wrapperClass} ${className}`.trim()}
    >
      <div className="ninetypte-cyan-bars inline-flex items-center gap-[3.5px]">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

/**
 * Gate component displaying CyanBarsLoader until async data or route hydration completes.
 */
export function PortalLoadGate({
  children,
  loading,
  refreshKey = '',
  delayMs = 180,
}) {
  const [readyKey, setReadyKey] = useState(null);

  useEffect(() => {
    if (loading !== undefined) return undefined;
    const timer = setTimeout(() => setReadyKey(refreshKey), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs, loading, refreshKey]);

  const isBusy = loading !== undefined ? Boolean(loading) : readyKey !== refreshKey;
  if (isBusy) {
    return <CyanBarsLoader fullScreen />;
  }

  return children;
}

export default CyanBarsLoader;
