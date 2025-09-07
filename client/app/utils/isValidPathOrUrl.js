export const isValidPathOrUrl = (str) => {
  try {
    return String(str).startsWith('/') || new URL(String(str)).protocol;
  } catch (err) {
    return false;
  }
};
