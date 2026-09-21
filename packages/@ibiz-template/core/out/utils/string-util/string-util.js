import { notNilEmpty } from 'qx-util';
/**
 * 字符串工具类
 *
 * @author chitanda
 * @date 2021-04-23 20:04:27
 * @export
 * @class StringUtil
 */
export class StringUtil {
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
    static fill(str, context, data) {
        if (notNilEmpty(str)) {
            if (notNilEmpty(context)) {
                const strArr = str.match(this.contextReg);
                strArr === null || strArr === void 0 ? void 0 : strArr.forEach(_key => {
                    const key = _key.slice(10, _key.length - 1);
                    str = str.replace(`\${context.${key}}`, context[key] || '');
                });
            }
            if (notNilEmpty(data)) {
                const strArr = str.match(this.dataReg);
                strArr === null || strArr === void 0 ? void 0 : strArr.forEach(_key => {
                    const key = _key.slice(7, _key.length - 1);
                    str = str.replace(`\${data.${key}}`, data[key] || '');
                });
            }
        }
        return str;
    }
}
/**
 * 上下文替换正则
 *
 * @author chitanda
 * @date 2021-04-23 20:04:01
 * @static
 */
StringUtil.contextReg = /\$\{context.[a-zA-Z_$][a-zA-Z0-9_$]{1,}\}/g;
/**
 * 数据替换正则
 *
 * @author chitanda
 * @date 2021-04-23 20:04:09
 * @static
 */
StringUtil.dataReg = /\$\{data.[a-zA-Z_$][a-zA-Z0-9_$]{1,}\}/g;
