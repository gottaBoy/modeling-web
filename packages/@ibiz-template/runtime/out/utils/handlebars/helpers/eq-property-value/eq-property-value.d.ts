import { HelperBase } from '../helper-base';
/**
 * 比较数组或对象是否存在某个属性的值
 *
 * @author zk
 * @date 2023-06-15 09:06:37
 * @export
 * @class HelperHaCtrl
 * @extends {HelperBase}
 */
export declare class HelperEqPropertyValue extends HelperBase {
    constructor(hbs: IData);
    onExecute(obj: unknown[] | unknown, key: string, val: unknown, options: Handlebars.HelperOptions): string | boolean;
}
//# sourceMappingURL=eq-property-value.d.ts.map