export const logger = {
  log: (message: string | number): void => {
    console.log(message);
  },
  error: (message: string | number): void => {
    console.error(message);
  },
  warn: (message: string | number): void => {
    console.warn(message);
  },
  info: (message: string | number): void => {
    console.info(message);
  },
};
