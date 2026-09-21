/**
 * 日历项数据
 *
 * @export
 * @class CalendarItemData
 * @implements {ICalendarItemData}
 */
export class CalendarItemData {
    constructor(model, data) {
        this.model = model;
        this.data = data;
    }
    get deData() {
        return this.data;
    }
    get navId() {
        return `${this.itemType}@${this.id}`;
    }
    get itemType() {
        return this.model.itemType;
    }
    get bkColor() {
        const fieldName = this.model.bkcolorAppDEFieldId;
        return fieldName && this.data[fieldName]
            ? this.data[fieldName]
            : this.model.bkcolor;
    }
    get beginTime() {
        const fieldName = this.model.beginTimeAppDEFieldId;
        return fieldName ? this.data[fieldName] : undefined;
    }
    get color() {
        const fieldName = this.model.colorAppDEFieldId;
        return fieldName && this.data[fieldName]
            ? this.data[fieldName]
            : this.model.color;
    }
    get content() {
        const fieldName = this.model.contentAppDEFieldId;
        return fieldName ? this.data[fieldName] : undefined;
    }
    get endTime() {
        const fieldName = this.model.endTimeAppDEFieldId;
        return fieldName ? this.data[fieldName] : undefined;
    }
    get icon() {
        const fieldName = this.model.iconAppDEFieldId;
        return fieldName ? this.data[fieldName] : undefined;
    }
    get id() {
        const fieldName = this.model.idAppDEFieldId;
        return fieldName && this.data[fieldName]
            ? this.data[fieldName]
            : this.data.srfkey;
    }
    get level() {
        const fieldName = this.model.levelAppDEFieldId;
        return fieldName ? this.data[fieldName] : undefined;
    }
    get tag2() {
        const fieldName = this.model.tag2AppDEFieldId;
        return fieldName ? this.data[fieldName] : undefined;
    }
    get tag() {
        const fieldName = this.model.tagAppDEFieldId;
        return fieldName ? this.data[fieldName] : undefined;
    }
    get text() {
        const fieldName = this.model.textAppDEFieldId;
        return fieldName ? this.data[fieldName] : undefined;
    }
    get tips() {
        const fieldName = this.model.tipsAppDEFieldId;
        return fieldName ? this.data[fieldName] : undefined;
    }
}
