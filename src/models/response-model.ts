export interface ResponseModel<T = void> {
  code: number;
  data?: T;
  msg?: string;
}
