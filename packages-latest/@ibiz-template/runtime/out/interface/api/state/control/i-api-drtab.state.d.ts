import { ISysImage } from '@ibiz/model-core';
import { IApiContext, IApiParams } from '@ibiz-template/core';
import { IApiControlState } from './i-api-control.state';
/**
 * @description  关系分页项状态接口
 * @export
 * @interface IApiDRTabPagesState
 */
export interface IApiDRTabPagesState {
    /**
     * @description 项标识
     * @type {string}
     * @memberof IApiDRTabPagesState
     */
    tag: string;
    /**
     * @description 是否隐藏
     * @type {boolean}
     * @memberof IApiDRTabPagesState
     */
    hidden: boolean;
    /**
     * @description 项标题
     * @type {string}
     * @memberof IApiDRTabPagesState
     */
    caption?: string;
    /**
     * @description 是否禁用
     * @type {boolean}
     * @memberof IApiDRTabPagesState
     */
    disabled?: boolean;
    /**
     * @description  图片资源
     * @type {ISysImage}
     * @memberof IApiDRTabPagesState
     */
    sysImage?: ISysImage;
    /**
     * @description 全路径
     * @type {string}
     * @memberof IApiDRTabPagesState
     */
    fullPath?: string;
    /**
     * @description  计数器标识
     * @type {string}
     * @memberof IApiDRTabPagesState
     */
    counterId?: string;
    /**
     * @description 实体数据操作标识
     * @type {string}
     * @memberof IApiDRTabPagesState
     */
    dataAccessAction?: string;
    /**
     * @description 启用模式
     * @type {string}
     * @memberof IApiDRTabPagesState
     */
    enableMode?: string;
    /**
     * @description  实体逻辑
     * @type {string}
     * @memberof IApiDRTabPagesState
     */
    testAppDELogicId?: string;
    /**
     * @description  脚本代码
     * @type {string}
     * @memberof IApiDRTabPagesState
     */
    testScriptCode?: string;
    /**
     * @description 计数器模式
     * @type {number}
     * @memberof IApiDRTabPagesState
     */
    counterMode?: number;
    /**
     * @description 项上下文
     * @type {IApiContext}
     * @memberof IApiDRTabPagesState
     */
    context?: IApiContext;
    /**
     * @description 项视图参数
     * @type {IApiParams}
     * @memberof IApiDRTabPagesState
     */
    params?: IApiParams;
}
/**
 * @description 数据关系分页UI状态接口
 * @primary
 * @export
 * @interface IApiDRTabState
 * @extends {IApiControlState}
 */
export interface IApiDRTabState extends IApiControlState {
    /**
     * @description 关系分页数据
     * @type {IApiDRTabPagesState[]}
     * @default []
     * @memberof IApiDRTabState
     */
    drTabPages: IApiDRTabPagesState[];
    /**
     * @description 当前激活分页的 tag 标识（与 IApiDRTabPagesState.tag 对应）
     * @type {string}
     * @default ''
     * @memberof IApiDRTabState
     */
    activeName: string;
    /**
     * @description 默认分页标识（如果有表单的话默认是空字符串）
     * @type {string}
     * @default ''
     * @memberof IApiDRTabState
     */
    defaultName: string;
    /**
     * @description 是否已计算项权限
     * @type {boolean}
     * @default false
     * @memberof IApiDRTabState
     */
    isCalculatedPermission?: boolean;
    /**
     * @description 显示更多
     * @type {boolean}
     * @default false
     * @memberof IApiDRTabState
     */
    showMore: boolean;
    /**
     * @description 隐藏编辑项
     * @type {boolean}
     * @default true
     * @memberof IApiDRTabState
     */
    hideEditItem?: boolean;
    /**
     * @description 给导航的视图附加的视图参数
     * @type {IApiParams}
     * @default {}
     * @memberof IApiDRTabState
     */
    expViewParams: IApiParams;
    /**
     * @description 展开项标识集合
     * @type {string[]}
     * @memberof IApiDRTabState
     */
    expandedKeys: string[];
}
//# sourceMappingURL=i-api-drtab.state.d.ts.map