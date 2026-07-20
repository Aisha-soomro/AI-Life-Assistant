import { useEffect, useState } from "react";

/**
 * useState persisted to localStorage as JSON.
 * Pass `migrate` to validate/upgrade previously stored data.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  migrate?: (stored: unknown) => T
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return initialValue;
      const parsed: unknown = JSON.parse(raw);
      return migrate ? migrate(parsed) : (parsed as T);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
