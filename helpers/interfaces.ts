export interface YelpSearchConfig {
  headers: {
    Authorization: string;
    'Content-Type': string;
  };
}

export interface IOutput {
  status: number;
  data: {
    body?: any;
    message?: string;
  };
}
