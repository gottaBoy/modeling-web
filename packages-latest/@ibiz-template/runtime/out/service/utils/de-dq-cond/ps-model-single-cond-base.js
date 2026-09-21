import { PSModelCondBase } from './ps-model-cond-base';
/**
 * 逻辑项
 *
 * @author chitanda
 * @date 2022-08-17 23:08:20
 * @export
 * @class PSModelSingleCondBase
 * @extends {PSModelCondBase}
 */
export class PSModelSingleCondBase extends PSModelCondBase {
    /**
     * 编译条件
     *
     * @author chitanda
     * @date 2022-08-17 23:08:35
     * @param {unknown[]} arr
     */
    parse(arr) {
        const nCount = arr.length;
        // 是否为条件起始
        let bOpStart = true;
        let bParamStart = false;
        let bValueStart = false;
        for (let i = 0; i < nCount; i++) {
            // 设置判断条件
            if (bOpStart) {
                const strText = arr[i];
                this.setCondOp(strText);
                bOpStart = false;
                bParamStart = true;
                continue;
            }
            // 设置参数标识
            if (bParamStart) {
                const strText = arr[i];
                this.setParam(strText);
                bParamStart = false;
                bValueStart = true;
                continue;
            }
            // 设置值
            if (bValueStart) {
                // 需要是对象
                const obj = arr[i];
                if (obj instanceof Object && !(obj instanceof Array)) {
                    const data = obj;
                    // 设置值类型
                    if (data.type != null) {
                        this.setValueType(data.type.toString());
                    }
                    // 设置条件值
                    if (data.value != null) {
                        this.setValue(data.value.toString());
                    }
                    // 设置忽略空值输入
                    if (data.ignoreEmpty != null) {
                        this.setIgnoreEmpty(data.ignoreEmpty);
                    }
                }
                else {
                    this.setValue(obj);
                }
                break;
            }
        }
    }
    getValueType() {
        return this.strValueType;
    }
    setValueType(strValueType) {
        this.strValueType = strValueType;
    }
    getValue() {
        return this.strValue;
    }
    setValue(strValue) {
        this.strValue = strValue;
    }
    getParamType() {
        return this.strParamType;
    }
    setParamType(strParamType) {
        this.strParamType = strParamType;
    }
    getParam() {
        return this.strParam;
    }
    setParam(strParam) {
        this.strParam = strParam;
    }
    getIgnoreEmpty() {
        return this.ignoreEmpty;
    }
    setIgnoreEmpty(ignoreEmpty) {
        this.ignoreEmpty = ignoreEmpty;
    }
}
