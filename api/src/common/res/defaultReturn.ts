export type RetornoType = {
  statusCode: number;
  message: string;
};

export const ReturnApi = (statusCode: number, message: string): RetornoType => {
  const data = {
    statusCode: statusCode,
    message: message,
  } as RetornoType;

  return data;
};
