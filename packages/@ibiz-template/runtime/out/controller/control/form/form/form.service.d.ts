import { IDEForm } from '@ibiz/model-core';
import { ControlService } from '../../../../service';
/**
 * 表单的部件服务
 * @author lxm
 * @date 2023-12-13 03:04:57
 * @export
 * @class FormService
 * @extends {ControlService<T>}
 * @template T
 */
export declare class FormService<T extends IDEForm = IDEForm> extends ControlService<T> {
    /**
     * 属性key和界面key映射，key为属性key，value为多个界面key集合
     *
     * @author tony001
     * @date 2025-01-14 14:01:14
     */
    fieldToUIMap: Map<string, string[]>;
    /**
     * 设置表单项的默认值
     * @author lxm
     * @date 2023-12-13 03:16:19
     * @param {IData} data 表单数据
     * @param {IContext} context 上下文
     * @param {IParams} params 视图参数
     * @param {('create' | 'update')} type 新建还是更新
     */
    setDefault(data: IData, context: IContext, params: IParams, type: 'create' | 'update'): void;
    /**
     * 获取加载参数
     *
     * @author tony001
     * @date 2024-11-27 18:11:24
     * @param {IParams} args
     * @return {*}  {IParams}
     */
    getLoadParams(params: IParams): IParams;
    /**
     * 初始化属性映射
     *
     * @author tony001
     * @date 2025-01-14 14:01:23
     * @protected
     */
    protected initUIDataMap(): void;
    /**
     * 根据表单项过滤出数据
     *
     * @author tony001
     * @date 2025-01-09 17:01:21
     * @param {IData} data
     * @param {Map<string, UIMapField>} [dataUIMap]
     * @return {*}  {IData}
     */
    getFilteredData(data: IData): IData;
}
//# sourceMappingURL=form.service.d.ts.map