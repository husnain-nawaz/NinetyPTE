import { createContext, useContext } from 'react';

export const PORTAL_MODE_KEY = 'ninetypte_portal_mode';
export const PORTAL_DARK_MODE_KEY = 'ninetypte_portal_dark';

export const PortalContext = createContext({
  portalMode: 'academic',
  setPortalMode: () => {},
  portalDarkMode: false,
  setPortalDarkMode: () => {},
});

/**
 * Access current portal track ('academic' | 'core'), mode setter, and portal dark theme
 * across PTEDashboard pages.
 */
export function usePortal() {
  return useContext(PortalContext);
}
