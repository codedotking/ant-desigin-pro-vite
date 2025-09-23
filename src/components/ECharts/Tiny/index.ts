import { Area, type AreaItem as TinyAreaItem } from "./Area";
import { Column, type ColumnItem as TinyColumnItem } from "./Column";
import { Progress, type ProgressItem as TinyProgressItem } from "./Progress";

const Tiny = {
    Area,
    Column,
    Progress,
}

export type { TinyAreaItem, TinyColumnItem, TinyProgressItem };

export { Area as TinyArea, Column as TinyColumn, Progress as TinyProgress, Tiny };