export const Log = (message: string | unknown): void => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  console.log(`${message}`.cyan.underline);
};

export const LogSuccess = (message: string | unknown): void => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  console.log(`SUCCESS ${message}`.green.underline);
};

export const LogWarning = (message: string | unknown): void => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  console.log(`WARNING ${message}`.yellow.underline);
};

export const LogError = (message: string | unknown): void => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  console.log(`ERROR ${message}`.red.underline);
};
