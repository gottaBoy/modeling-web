/**
 * 字符串工具类
 *
 * @author chitanda
 * @date 2021-04-23 20:04:27
 * @export
 * @class StringUtil
 */
export declare class StringUtil {
    /**
     * 上下文替换正则
     *
     * @author chitanda
     * @date 2021-04-23 20:04:01
     * @static
     */
    static contextReg: RegExp;
    /**
     * 数据替换正则
     *
     * @author chitanda
     * @date 2021-04-23 20:04:09
     * @static
     */
    static dataReg: RegExp;
    /**
     * 填充字符串中的数据
     *
     * @description 填充字符串中的数据 用法：传入需要替换的字符串和对象 返回值是string类型
     * @example
     * ```
     * StringUtil.fill('姓名:${context.name},年龄:${data.age}', { name: '张三', age: 10 }, { name: '李四', age: 25 }); // => '姓名:张三,年龄:25'
     * StringUtil.fill('', { name: '张三', age: 10 }, { name: '李四', age: 25 }); // => ''
     * ```
     * @author chitanda
     * @date 2021-04-23 20:04:17
     * @static
     * @param {string} str
     * @param {*} [context]
     * @param {*} [data]
     * @return {*}  {string}
     */
    static fill(str: string, context?: IContext, data?: IData): string;
}
//# sourceMappingURL=string-util.d.ts.map