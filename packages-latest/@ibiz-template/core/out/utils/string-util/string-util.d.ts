/**
 * @description 字符串工具类
 * @export
 * @class StringUtil
 */
export declare class StringUtil {
    /**
     * @description 上下文替换正则
     * @static
     * @memberof StringUtil
     */
    static contextReg: RegExp;
    /**
     * @description 数据替换正则
     * @static
     * @memberof StringUtil
     */
    static dataReg: RegExp;
    /**
     * @description 参数替换正则
     * @static
     * @memberof StringUtil
     */
    static paramsReg: RegExp;
    /**
     * @description 填充字符串中的数据 用法：传入需要替换的字符串和对象 返回值是string类型
     * @example
     * ```
     * StringUtil.fill('姓名:${context.name},年龄:${data.age}', { name: '张三', age: 10 }, {name: '王二', age: 19}, { name: '李四', age: 25 }); // => '姓名:张三,年龄:25'
     * StringUtil.fill('', { name: '张三', age: 10 }, {name: '王二', age: 19}, { name: '李四', age: 25 }); // => ''
     * ```
     * @static
     * @param {string} str 需填充字符串
     * @param {IContext} [context] 上下文
     * @param {IParams} [params] 参数
     * @param {IData} [data] 数据
     * @return {*}  {string}
     * @memberof StringUtil
     */
    static fill(str: string, context?: IContext, params?: IParams, data?: IData): string;
}
//# sourceMappingURL=string-util.d.ts.map