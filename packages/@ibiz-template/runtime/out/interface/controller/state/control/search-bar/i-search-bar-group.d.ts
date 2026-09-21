import { IColumnState } from '../i-grid.state';
/**
 * 搜索分组数据接口
 *
 */
export interface ISearchGroupData {
    /**
     * 表格列状态
     */
    columnstates?: Array<IColumnState>;
    /**
     * 自定义搜索条件
     */
    searchconds?: IData[];
    /**
     * 表格排序查询条件
     */
    sort?: string;
}
/**
 * 后台分组接口
 *
 */
export interface IBackendSearchBarGroup {
    /**
     * 唯一标识
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-01-17 18:28:45
     */
    id?: string;
    /**
     * 标题
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-22 14:25:09
     */
    caption?: string;
    /**
     * 分组项名称（模型的id, 新建的为viewtag___caption）
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-22 14:25:09
     */
    name: string;
    /**
     * 是否保存过
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-22 14:25:09
     */
    saved: boolean;
    /**
     * 是否显示
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-21 11:36:54
     */
    show: boolean;
    /**
     * 分组排序值
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-26 11:21:02
     */
    order: number;
    /**
     * 搜索分组数据
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-21 11:24:21
     */
    searchGroupData: ISearchGroupData;
    /**
     * 是否默认选中
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-21 11:24:21
     */
    defaultSelect?: boolean;
    /**
     * 是否不可编辑
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-01-17 17:24:28
     */
    noEdit?: boolean;
    /**
     * 所属类型
     *
     * @author tony001
     * @date 2024-10-24 15:10:03
     * @type {'SYSTEM' | 'PERSONAL'}
     */
    ownerType?: 'SYSTEM' | 'PERSONAL';
}
//# sourceMappingURL=i-search-bar-group.d.ts.map