import { ISysImage } from '@ibiz/model-core';
import { IControlState } from './i-control.state';
/**
 * 数据关系分页UI状态
 *
 * @export
 * @interface IDRTabState
 * @extends {IControlState}
 */
export interface IDRTabState extends IControlState {
    /**
     * 关系分页数据
     *
     * @type {IDRTabPagesState[]}
     * @memberof IDRTabState
     */
    drTabPages: IDRTabPagesState[];
    /**
     * 激活分页标识
     *
     * @type {string}
     * @memberof IDRTabState
     */
    activeName: string;
    /**
     * 默认分页标识（如果有表单的话默认是空字符串）
     * @author lxm
     * @date 2024-04-22 01:35:28
     * @type {string}
     */
    defaultName: string;
    /**
     * 是否已计算项权限
     *
     * @author zhanghengfeng
     * @date 2024-05-20 14:05:24
     * @type {boolean}
     */
    isCalculatedPermission?: boolean;
    /**
     * 显示更多
     *
     * @author lijianxiong
     * @date 2024-06-12 15:05:24
     * @type {boolean}
     */
    showMore: boolean;
    /**
     * 隐藏编辑项
     * @type {boolean}
     * @default false
     * 来源  isHideEditItem
     */
    hideEditItem?: boolean;
}
/**
 * 关系分页状态
 *
 * @export
 * @interface IDRTabPagesState
 */
export interface IDRTabPagesState {
    /**
     * 项标识
     *
     * @type {string}
     * @memberof IDRTabPagesState
     */
    tag: string;
    /**
     * 是否隐藏
     *
     * @type {boolean}
     * @memberof IDRTabPagesState
     */
    hidden: boolean;
    /**
     * 项标题
     *
     * @type {string}
     * @memberof IDRTabPagesState
     */
    caption?: string;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof IDRTabPagesState
     */
    disabled?: boolean;
    /**
     * 图片资源
     *
     * @type {ISysImage}
     * @memberof IDRTabPagesState
     */
    sysImage?: ISysImage;
    /**
     * 全路径
     *
     * @type {string}
     * @memberof IDRTabPagesState
     */
    fullPath?: string;
    /**
     * 计数器标识
     * @author lxm
     * @date 2024-01-18 05:55:11
     * @type {string}
     */
    counterId?: string;
    /**
     * 实体数据操作标识
     *
     * @author zhanghengfeng
     * @date 2024-05-16 17:05:48
     * @type {string}
     */
    dataAccessAction?: string;
    /**
     * 启用模式
     *
     * @author zhanghengfeng
     * @date 2024-05-16 17:05:04
     * @type {string}
     */
    enableMode?: string;
    /**
     * 实体逻辑
     *
     * @author zhanghengfeng
     * @date 2024-05-16 17:05:11
     * @type {string}
     */
    testAppDELogicId?: string;
    /**
     * 脚本代码
     *
     * @author zhanghengfeng
     * @date 2024-05-16 17:05:21
     * @type {string}
     */
    testScriptCode?: string;
    /**
     * 计数器模式
     *
     * @author zhanghengfeng
     * @date 2024-05-30 10:05:43
     * @type {number}
     */
    counterMode?: number;
}
//# sourceMappingURL=i-drtab.state.d.ts.map