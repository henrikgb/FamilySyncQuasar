export const API_BASE = import.meta.env.DEV
  ? import.meta.env.VITE_API_BASE_DEV
  : import.meta.env.VITE_API_BASE;
if (!API_BASE) {
  throw new Error('Missing VITE_API_BASE environment variable');
}
