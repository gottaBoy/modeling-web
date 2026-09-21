import { IDEGrid, IAppCodeList, IDEDataExportItem } from '@ibiz/model-core';
import { ControlVO } from '../../../../service';
import { IGridEvent } from '../../event';
import { IGridRowState, IGridState } from '../../state';
import { IMDControlController } from './i-md-control.controller';
import { CodeListItem } from '../../../service';
/**
 * 表格控制器
 * @author lxm
 * @date 2023-05-04 01:47:16
 * @export
 * @interface IGridController
 * @extends {IMDControlController}
 */
export interface IGridController<T extends IDEGrid = IDEGrid, S extends IGridState = IGridState, E extends IGridEvent = IGridEvent> extends IMDControlController<T, S, E> {
    /**
     * 新建行
     *
     * @author zk
     * @date 2023-07-31 02:07:52
     * @memberof IGridController
     */
    newRow(): Promise<void>;
    /**
     * 保存单条数据
     *
     * @author zk
     * @date 2023-07-31 02:07:52
     * @memberof IGridController
     */
    save(data: ControlVO): Promise<void>;
    /**
     * 保存表格所有数据
     *
     * @author zk
     * @date 2023-07-31 02:07:52
     * @memberof IGridController
     */
    saveAll(): Promise<void>;
    /**
     * 切换表格的行编辑开启关闭状态
     * @author lxm
     * @date 2023-08-16 10:18:14
     * @param {IData} [rowData] 行数据
     */
    toggleRowEdit(): void;
    /**
     * 数据导出
     *
     * @author zk
     * @date 2023-07-31 02:07:26
     * @memberof IGridController
     */
    exportData(_args: {
        event: MouseEvent;
        params: IData;
    }): Promise<void>;
    /**
     * 值规则校验
     *
     * @author zzq
     * @date 2023-08-23 18:23:26
     * @memberof IGridController
     */
    validate(row: IGridRowState): Promise<boolean>;
    /**
     * 设置点击分组后回显相关参数
     * @param {IData} data
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-21 10:54:45
     */
    setGroupParams(data: IData): void;
    /**
     * @description 切换折叠
     * @param {IData} [params]
     * @memberof IGridController
     */
    changeCollapse(params?: IData): void;
}
interface AdditionalProperties {
    /**
     * 代码表模型
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-21 14:13:45
     */
    codeList?: IAppCodeList;
    /**
     * 代码表项
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-21 14:13:45
     */
    codeListItems?: readonly CodeListItem[];
}
/**
 * 封装的导出列模型
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-11-21 19:04:27
 */
export interface IExportColumn extends IDEDataExportItem, AdditionalProperties {
}
export {};
//# sourceMappingURL=i-grid.controller.d.ts.map