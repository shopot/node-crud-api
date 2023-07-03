export type InternalMessage = {
  action: string;
  payload: {
    id?: string;
    fields?: {
      [key: string]: string | string[] | number;
    };
  };
};
