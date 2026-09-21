import { HelperBase } from '../helper-base';
/**
 * 驼峰转蛇形命名法
 *
 * @description 用法 {{snakeCase word}}，效果: myName => my_name
 * @author chitanda
 * @date 2021-12-24 15:12:06
 * @export
 * @class HelperSnakeCase
 * @extends {HelperBase}
 */
export declare class HelperSnakeCase extends HelperBase {
    constructor(hbs: IData);
    onExecute(param: string): string;
}
//# sourceMappingURL=snake-case.d.ts.map