import { InputmaskOptions } from './types';

export const createMask = <T>(
  options: string | InputmaskOptions<T>
): InputmaskOptions<T> =>
  typeof options === 'string' ? { mask: options } : options;
