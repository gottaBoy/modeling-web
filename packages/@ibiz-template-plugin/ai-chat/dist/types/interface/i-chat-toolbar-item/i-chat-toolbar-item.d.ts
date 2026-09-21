import { VNode } from 'preact';
/**
 * 聊天自定义工具栏项接口
 *
 * @export
 * @interface IChatToolbarItem
 */
export interface IChatToolbarItem {
    /**
     * 标识
     *
     * @author tony001
     * @date 2025-02-28 17:02:52
     * @type {string}
     */
    id?: string;
    /**
     * 标题
     *
     * @memberof IChatToolbarItem
     */
    label?: string | VNode | ((h: Function) => VNode);
    /**
     * 提示信息
     *
     * @type {string}
     * @memberof IChatToolbarItem
     */
    title?: string;
    /**
     * 图标对象(内置工具栏走vnode、外挂走对象)
     *
     * @author tony001
     * @date 2025-03-12 17:03:07
     */
    icon: {
        showIcon: boolean;
        cssClass: string;
        imagePath: string;
    } | (() => VNode);
    /**
     * 是否禁用
     *
     * @memberof IChatToolbarItem
     */
    disabled?: boolean | ((data: object) => boolean);
    /**
     * 是否隐藏
     *
     * @memberof IChatToolbarItem
     */
    hidden?: boolean | ((data: object) => boolean);
    /**
     * 自定义类名
     *
     * @type {string}
     * @memberof IChatToolbarItem
     */
    customClass?: string;
    /**
     * 子项行为组
     *
     * @type {IChatToolbarItem[]}
     * @memberof IChatToolbarItem
     */
    children?: IChatToolbarItem[];
    /**
     * 行为项点击
     *
     * @author tony001
     * @date 2025-03-12 16:03:42
     */
    onClick?: (e: MouseEvent, item: object, context: object, params: object, data?: object) => Promise<object> | void;
}
