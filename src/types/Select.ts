import type { Option } from '@/types'

export type Select = {
  label?: string;
  id?: string;
  name?: string;
  error?: string;
  options?: Option[];
  value?: number | string;
};