export type InputmaskOptions<T> = Inputmask.Options & {
  parser?: (value: any) => T;
};
