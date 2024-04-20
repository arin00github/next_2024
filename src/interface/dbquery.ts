export type LangDataItem = {
  code: string;
  like: string;
  langType: string;
  regDate: Date;
};

export type ResultItem = {
  code: string;
  count: number;
  like: number;
  dislike: number;
  none: number;
};
