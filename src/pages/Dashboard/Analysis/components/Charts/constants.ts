import { format } from 'd3-format';

export const yuan = (val: number | string) => `¥ ${format(",")(val as number)}`;
