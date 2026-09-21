import { ISysImage } from '@ibiz/model-core';
import { IControlState } from './i-control.state';
/**
 * 数据关系栏UI状态
 *
 * @export
 * @interface IDRBarState
 * @extends {IControlState}
 */
export interface IDRBarState extends IControlState {
    /**
     * 默认显示的项的id
     * @author lxm
     * @date 2023-12-11 05:53:27
     * @type {string}
     */
    defaultItem: string;
    /**
     * 选中的项的id
     * @author lxm
     * @date 2023-12-11 07:10:05
     * @type {string}
     */
    selectedItem: string;
    /**
     * 隐藏编辑项
     * @type {boolean}
     * @default false
     * 来源  isHideEditItem
     */
    hideEditItem?: boolean;
    /**
     * 导航数据
     * @author lxm
     * @date 2023-12-11 05:52:57
     * @type {string}
     */
    srfnav: string;
    /**
     * 关系项集合
     *
     * @type {IDRBarItemsState[]}
     * @memberof IDRBarState
     */
    drBarItems: IDRBarItemsState[];
    /**
     * 是否已计算项权限
     *
     * @author zhanghengfeng
     * @date 2024-05-20 14:05:44
     * @type {boolean}
     */
    isCalculatedPermission?: boolean;
}
/**
 * 关系项状态
 *
 * @export
 * @interface IDRBarItemsState
 */
export interface IDRBarItemsState {
    /**
     * 项标识
     *
     * @type {string}
     * @memberof IDRBarItemsState
     */
    tag: string;
    /**
     * 项标题
     *
     * @type {string}
     * @memberof IDRBarItemsState
     */
    caption?: string;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof IDRBarItemsState
     */
    disabled?: boolean;
    /**
     * 是否展示
     *
     * @type {boolean}
     * @memberof IDRBarItemsState
     */
    visible?: boolean;
    /**
     * 标识
     *
     * @type {boolean}
     * @memberof IDRBarItemsState
     */
    dataAccessAction?: string;
    /**
     * 图片资源
     *
     * @type {ISysImage}
     * @memberof IDRBarItemsState
     */
    sysImage?: ISysImage;
    /**
     * 子成员
     *
     * @type {IDRBarItemsState[]}
     * @memberof IDRBarItemsState
     */
    children?: IDRBarItemsState[];
    /**
     * 全路径
     *
     * @type {string}
     * @memberof IDRBarItemsState
     */
    fullPath?: string;
    /**
     * 计数器标识
     * @author lxm
     * @date 2024-01-18 05:41:26
     * @type {string}
     */
    counterId?: string;
    /**
     * 启用模式
     *
     * @author zhanghengfeng
     * @date 2024-05-16 17:05:51
     * @type {string}
     */
    enableMode?: string;
    /**
     * 实体逻辑
     *
     * @author zhanghengfeng
     * @date 2024-05-16 17:05:08
     * @type {string}
     */
    testAppDELogicId?: string;
    /**
     * 脚本代码
     *
     * @author zhanghengfeng
     * @date 2024-05-16 17:05:28
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
//# sourceMappingURL=i-drbar.state.d.ts.map