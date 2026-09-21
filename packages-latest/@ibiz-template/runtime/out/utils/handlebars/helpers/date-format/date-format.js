import dayjs from 'dayjs';
import { HelperBase } from '../helper-base';
/**
 * @description 时间格式化，用法: 销售内示数据{{dateFormat now "YYYYMMDDHHmmss"}}.xlsx
 * @author tony001
 * @date 2026-07-06 15:07:49
 * @export
 * @class HelperDateFormat
 * @extends {HelperBase}
 */
export class HelperDateFormat extends HelperBase {
    constructor(hbs) {
        super(hbs, 'dateFormat');
    }
    onExecute(date, format) {
        return dayjs(date).format(format);
    }
}
