import { createContext, useContext } from 'react';

export const PORTAL_MODE_KEY = 'ninetypte_portal_mode';

export const PortalContext = createContext({
  portalMode: 'academic',
  setPortalMode: () => {},
});

/**
 * Access current portal track ('academic' | 'core') and mode setter across PTEDashboard pages.
 */
export function usePortal() {
  return useContext(PortalContext);
}
