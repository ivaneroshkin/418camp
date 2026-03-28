const getEnvVar = (key: string, defaultValue: string): string => {
  return import.meta.env[key] ?? defaultValue;
};

export const config = {
  apiUrl: getEnvVar('VITE_API_URL', 'http://localhost:2000'),
} as const;

export const endpoints = {
  field: `${config.apiUrl}/getField`,
  move: `${config.apiUrl}/move`,
  winner: `${config.apiUrl}/winner`,
  reset: `${config.apiUrl}/reset`,
} as const;
