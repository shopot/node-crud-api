export type ProcessMessage<T> = {
  data?: T;
  status?: number;
  message: string;
};
