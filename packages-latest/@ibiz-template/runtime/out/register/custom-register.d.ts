import { IRegisterParams } from '../interface';
/**
 * 自定义注册
 */
export declare class CustomRegister {
    /**
     * @description 获取适配器注册key
     * @static
     * @param {string} registerType
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static getRegisterKey(registerType: string, opts: IRegisterParams): string;
    /**
     * @description 计算扩展视图key，（appId@codeName）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionViewKey(opts: IRegisterParams): string;
    /**
     * @description 计算扩展部件key，（appId/DEFAULT@实体codeName/APP@部件类型@部件codeName）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionControlKey(opts: IRegisterParams): string;
    /**
     * @description 计算扩展面板key，（appId/DEFAULT@视图codeName@部件codeName@面板项标识）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionPanelItemKey(opts: IRegisterParams): string;
    /**
     * @description 计算扩展部件项key，（appId/DEFAULT@实体codeName/APP@部件类型@部件codeName@部件项codeName/@部件项id）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionControlItemKey(opts: IRegisterParams): string;
    /**
     * @description 计算扩展编辑器key，（appId/DEFAULT@实体codeName/APP@部件类型@部件codeName@项标识_EDITOR）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionEditorKey(opts: IRegisterParams): string;
    /**
     * @description 计算扩展界面行为key，（appId/DEFAULT@实体codeName/APP@界面行为标记）全大写
     * @author tony001
     * @date 2026-08-11 17:08:45
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionUIActionKey(opts: IRegisterParams): string;
    /**
     * @description 计算扩展实体方法key，（appId/DEFAULT@实体codeName/方法类型/方法codeName）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionMethodKey(opts: IRegisterParams): string;
    /**
     * @description 计算逻辑key，（appId/DEFAULT@实体codeName@逻辑codeName）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionLogicKey(opts: IRegisterParams): string;
    /**
     * @description 计算实体界面逻辑节点key，（appId/DEFAULT@实体codeName@逻辑codeName@逻辑节点codeName）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionLogicNodeKey(opts: IRegisterParams): string;
}
//# sourceMappingURL=custom-register.d.ts.map