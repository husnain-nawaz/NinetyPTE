import { useCallback, useState } from 'react';
import {
  PORTAL_DARK_MODE_KEY,
  PORTAL_MODE_KEY,
  PortalContext,
} from './portalContext';

function readInitialMode() {
  try {
    const saved = localStorage.getItem(PORTAL_MODE_KEY);
    return saved === 'core' ? 'core' : 'academic';
  } catch {
    return 'academic';
  }
}

function readInitialDark() {
  try {
    return localStorage.getItem(PORTAL_DARK_MODE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Persists active dashboard track ('academic' for PTE A/UKVI vs 'core' for PTE Core)
 * and portal dark theme across all student portal routes.
 */
export default function PortalProvider({ children }) {
  const [portalMode, setModeState] = useState(readInitialMode);
  const [portalDarkMode, setDarkState] = useState(readInitialDark);

  const setPortalMode = useCallback((nextMode) => {
    const valid = nextMode === 'core' ? 'core' : 'academic';
    setModeState(valid);
    try {
      localStorage.setItem(PORTAL_MODE_KEY, valid);
    } catch {
      // Ignore storage quota / privacy mode failures gracefully
    }
  }, []);

  const setPortalDarkMode = useCallback((nextVal) => {
    setDarkState((prev) => {
      const resolved = typeof nextVal === 'function' ? Boolean(nextVal(prev)) : Boolean(nextVal);
      try {
        localStorage.setItem(PORTAL_DARK_MODE_KEY, String(resolved));
      } catch {
        // Ignore storage quota / privacy mode failures gracefully
      }
      return resolved;
    });
  }, []);

  return (
    <PortalContext.Provider
      value={{ portalMode, setPortalMode, portalDarkMode, setPortalDarkMode }}
    >
      {children}
    </PortalContext.Provider>
  );
}
