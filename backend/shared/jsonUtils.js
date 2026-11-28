/**
 * Safely parses JSON values returned as strings (MariaDB) or objects (MySQL 8).
 */
export function parseJsonColumn(value, fallback = null) {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'object') return value;
  if (typeof value !== 'string') return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

/**
 * Serializes a JS value into a compact JSON string compatible with both MySQL and MariaDB.
 */
export function serializeJsonParam(value, fallback = {}) {
  return JSON.stringify(value ?? fallback);
}
