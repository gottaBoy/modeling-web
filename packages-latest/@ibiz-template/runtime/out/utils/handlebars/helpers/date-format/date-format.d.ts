import { HelperBase } from '../helper-base';
/**
 * @description 时间格式化，用法: 销售内示数据{{dateFormat now "YYYYMMDDHHmmss"}}.xlsx
 * @author tony001
 * @date 2026-07-06 15:07:49
 * @export
 * @class HelperDateFormat
 * @extends {HelperBase}
 */
export declare class HelperDateFormat extends HelperBase {
    constructor(hbs: IData);
    onExecute(date: Date, format: string): string;
}
//# sourceMappingURL=date-format.d.ts.map