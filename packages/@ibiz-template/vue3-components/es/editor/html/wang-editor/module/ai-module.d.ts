import { IButtonMenu, IDomEditor } from '@wangeditor/editor';
/**
 * AI菜单项
 *
 * @export
 * @class AIButtonMenu
 * @implements {IButtonMenu}
 */
declare class AIButtonMenu implements IButtonMenu {
    /**
     *
     *
     * @type {string}
     * @memberof AIButtonMenu
     */
    title: string;
    /**
     *
     *
     * @type {string}
     * @memberof AIButtonMenu
     */
    iconSvg: string;
    /**
     *
     *
     * @type {string}
     * @memberof AIButtonMenu
     */
    tag: string;
    /**
     * 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
     *
     * @return {*}  {boolean}
     * @memberof AIButtonMenu
     */
    isActive(): boolean;
    /**
     * 获取菜单执行时的 value ，用不到则返回空 字符串或 false
     *
     * @return {*}  {(string | boolean)}
     * @memberof AIButtonMenu
     */
    getValue(): string | boolean;
    /**
     * 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
     *
     * @return {*}  {boolean}
     * @memberof AIButtonMenu
     */
    isDisabled(): boolean;
    /**
     * 点击菜单时触发的函数
     *
     * @param {IDomEditor} editor
     * @memberof AIButtonMenu
     */
    exec(editor: IDomEditor): void;
}
/**
 * Ai菜单
 */
export declare const AIMenu: {
    key: string;
    factory(): AIButtonMenu;
};
export {};
