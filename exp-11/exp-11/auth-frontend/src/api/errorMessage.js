const getErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return fallbackMessage;
};

export default getErrorMessage;
