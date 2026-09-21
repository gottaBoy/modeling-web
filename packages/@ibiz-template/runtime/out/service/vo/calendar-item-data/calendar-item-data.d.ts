import { ISysCalendarItem } from '@ibiz/model-core';
import { ICalendarItemData } from '../../../interface';
/**
 * 日历项数据
 *
 * @export
 * @class CalendarItemData
 * @implements {ICalendarItemData}
 */
export declare class CalendarItemData implements ICalendarItemData {
    private model;
    private data;
    constructor(model: ISysCalendarItem, data: IData);
    get deData(): IData;
    get navId(): string;
    get itemType(): string;
    get bkColor(): string;
    get beginTime(): string;
    get color(): string;
    get content(): string;
    get endTime(): string;
    get icon(): string;
    get id(): string;
    get level(): string;
    get tag2(): string;
    get tag(): string;
    get text(): string;
    get tips(): string;
}
//# sourceMappingURL=calendar-item-data.d.ts.map