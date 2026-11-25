import { useCallback, useState } from 'react';
import { PORTAL_MODE_KEY, PortalContext } from './portalContext';

function readInitialMode() {
  try {
    const saved = localStorage.getItem(PORTAL_MODE_KEY);
    return saved === 'core' ? 'core' : 'academic';
  } catch {
    return 'academic';
  }
}

/**
 * Persists active dashboard track ('academic' for PTE A/UKVI vs 'core' for PTE Core)
 * across all student portal routes.
 */
export default function PortalProvider({ children }) {
  const [portalMode, setModeState] = useState(readInitialMode);

  const setPortalMode = useCallback((nextMode) => {
    const valid = nextMode === 'core' ? 'core' : 'academic';
    setModeState(valid);
    try {
      localStorage.setItem(PORTAL_MODE_KEY, valid);
    } catch {
      // Ignore storage quota / privacy mode failures gracefully
    }
  }, []);

  return (
    <PortalContext.Provider value={{ portalMode, setPortalMode }}>
      {children}
    </PortalContext.Provider>
  );
}
