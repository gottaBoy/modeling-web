import { PanelItemState } from '@ibiz-template/runtime';
export interface BreadcrumbMsg {
    viewName: string;
    fullPath: string;
    caption?: string;
    dataInfo?: string;
    isEmbed?: boolean;
    isModal?: boolean;
}
/**
 * 导航标签页占位状态
 *
 * @author lxm
 * @date 2023-02-07 06:04:27
 * @export
 * @class NavBreadcrumbState
 * @extends {PanelItemState}
 */
export declare class NavBreadcrumbState extends PanelItemState {
    /**
     * @description 面包屑导航项
     * @type {BreadcrumbMsg[]}
     * @memberof NavBreadcrumbState
     */
    breadcrumbItems: BreadcrumbMsg[];
}
