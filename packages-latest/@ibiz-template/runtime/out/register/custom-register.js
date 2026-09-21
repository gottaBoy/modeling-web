import { VIEW_PROVIDER_PREFIX, EDITOR_PROVIDER_PREFIX, PORTLET_PROVIDER_PREFIX, DELOGIC_PROVIDER_PREFIX, UILOGIC_PROVIDER_PREFIX, CONTROL_PROVIDER_PREFIX, DEMETHOD_PROVIDER_PREFIX, UIACTION_PROVIDER_PREFIX, PANELITEM_PROVIDER_PREFIX, FORMDETAIL_PROVIDER_PREFIX, GRIDCOLUMN_PROVIDER_PREFIX, APPMENUITEM_PROVIDER_PREFIX, UILOGICNODE_PROVIDER_PREFIX, DELOGICNODE_PROVIDER_PREFIX, TOOLBAR_ITEM_PROVIDER_PREFIX, } from './helper';
import { calcDeCodeNameById } from '../model';
/**
 * 自定义注册
 */
export class CustomRegister {
    /**
     * @description 获取适配器注册key
     * @static
     * @param {string} registerType
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static getRegisterKey(registerType, opts) {
        switch (registerType) {
            case VIEW_PROVIDER_PREFIX:
                return this.calcExtensionViewKey(opts);
            case CONTROL_PROVIDER_PREFIX:
            case PORTLET_PROVIDER_PREFIX:
                return this.calcExtensionControlKey(opts);
            case PANELITEM_PROVIDER_PREFIX:
                return this.calcExtensionPanelItemKey(opts);
            case FORMDETAIL_PROVIDER_PREFIX:
            case GRIDCOLUMN_PROVIDER_PREFIX:
            case APPMENUITEM_PROVIDER_PREFIX:
            case TOOLBAR_ITEM_PROVIDER_PREFIX:
                return this.calcExtensionControlItemKey(opts);
            case EDITOR_PROVIDER_PREFIX:
                return this.calcExtensionEditorKey(opts);
            case UIACTION_PROVIDER_PREFIX:
                return this.calcExtensionUIActionKey(opts);
            case DEMETHOD_PROVIDER_PREFIX:
                return this.calcExtensionMethodKey(opts);
            case UILOGIC_PROVIDER_PREFIX:
            case DELOGIC_PROVIDER_PREFIX:
                return this.calcExtensionLogicKey(opts);
            case UILOGICNODE_PROVIDER_PREFIX:
            case DELOGICNODE_PROVIDER_PREFIX:
                return this.calcExtensionLogicNodeKey(opts);
            default:
                return '';
        }
    }
    /**
     * @description 计算扩展视图key，（appId@codeName）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionViewKey(opts) {
        const { mainModel } = opts;
        let key = '';
        if (mainModel.appId) {
            key += `${mainModel.appId.toUpperCase()}`;
        }
        if (mainModel.codeName) {
            key += `@${mainModel.codeName.toUpperCase()}`;
        }
        return key;
    }
    /**
     * @description 计算扩展部件key，（appId/DEFAULT@实体codeName/APP@部件类型@部件codeName）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionControlKey(opts) {
        let key = '';
        const { mainModel } = opts;
        if (mainModel) {
            key = (mainModel.appId || 'DEFAULT').toUpperCase();
            const { appDataEntityId, controlType, codeName } = mainModel;
            if (appDataEntityId) {
                key += `@${calcDeCodeNameById(appDataEntityId).toUpperCase()}`;
            }
            else {
                key += '@APP';
            }
            if (controlType) {
                key += `@${controlType.toUpperCase()}`;
            }
            if (codeName) {
                key += `@${codeName.toUpperCase()}`;
            }
        }
        return key;
    }
    /**
     * @description 计算扩展面板key，（appId/DEFAULT@视图codeName@部件codeName@面板项标识）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionPanelItemKey(opts) {
        const { mainModel, view, control } = opts;
        let key = `${(mainModel.appId || 'DEFAULT').toUpperCase()}`;
        if (view === null || view === void 0 ? void 0 : view.codeName) {
            key += `@${view.codeName.toUpperCase()}`;
        }
        if (control === null || control === void 0 ? void 0 : control.codeName) {
            key += `@${control.codeName.toUpperCase()}`;
        }
        if (mainModel === null || mainModel === void 0 ? void 0 : mainModel.id) {
            key += `@${mainModel.id.toUpperCase()}`;
        }
        return key;
    }
    /**
     * @description 计算扩展部件项key，（appId/DEFAULT@实体codeName/APP@部件类型@部件codeName@部件项codeName/@部件项id）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionControlItemKey(opts) {
        const { mainModel, control } = opts;
        let key = '';
        if (mainModel) {
            key = (mainModel.appId || 'DEFAULT').toUpperCase();
            const { appDataEntityId, controlType, codeName } = control;
            if (appDataEntityId) {
                key += `@${calcDeCodeNameById(appDataEntityId).toUpperCase()}`;
            }
            else {
                key += '@APP';
            }
            if (controlType) {
                key += `@${controlType.toUpperCase()}`;
            }
            if (codeName) {
                key += `@${codeName.toUpperCase()}`;
            }
            const _codeName = mainModel.codeName || mainModel.id;
            if (_codeName) {
                key += `@${_codeName.toUpperCase()}`;
            }
        }
        return key;
    }
    /**
     * @description 计算扩展编辑器key，（appId/DEFAULT@实体codeName/APP@部件类型@部件codeName@项标识_EDITOR）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionEditorKey(opts) {
        const { mainModel, control } = opts;
        let key = (mainModel.appId || 'DEFAULT').toUpperCase();
        if (control) {
            const { appDataEntityId, controlType, codeName } = control;
            if (appDataEntityId) {
                key += `@${calcDeCodeNameById(appDataEntityId).toUpperCase()}`;
            }
            else {
                key += '@APP';
            }
            key += `@${(controlType || 'DEFAULT').toUpperCase()}`;
            key += `@${(codeName || 'DEFAULT').toUpperCase()}`;
        }
        if (mainModel.id) {
            key += `@${mainModel.id.toUpperCase()}_EDITOR`;
        }
        return key;
    }
    /**
     * @description 计算扩展界面行为key，（appId/DEFAULT@实体codeName/APP@界面行为标记）全大写
     * @author tony001
     * @date 2026-08-11 17:08:45
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionUIActionKey(opts) {
        const { mainModel } = opts;
        let key = (mainModel.appId || 'DEFAULT').toUpperCase();
        if (mainModel) {
            const { appDataEntityId, uiactionTag } = mainModel;
            if (appDataEntityId) {
                key += `@${calcDeCodeNameById(appDataEntityId).toUpperCase()}`;
            }
            else {
                key += '@APP';
            }
            if (uiactionTag) {
                key += `@${uiactionTag.toUpperCase()}`;
            }
        }
        return key;
    }
    /**
     * @description 计算扩展实体方法key，（appId/DEFAULT@实体codeName/方法类型/方法codeName）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionMethodKey(opts) {
        const { mainModel, entity } = opts;
        let key = (mainModel.appId || 'DEFAULT').toUpperCase();
        if (entity === null || entity === void 0 ? void 0 : entity.id) {
            key += `@${calcDeCodeNameById(entity.id).toUpperCase()}`;
        }
        if (mainModel) {
            const { methodType, codeName } = mainModel;
            if (methodType && codeName) {
                key += `@${methodType.toUpperCase()}@${codeName.toUpperCase()}`;
            }
        }
        return key;
    }
    /**
     * @description 计算逻辑key，（appId/DEFAULT@实体codeName@逻辑codeName）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionLogicKey(opts) {
        const { mainModel, entity } = opts;
        let key = (mainModel.appId || 'DEFAULT').toUpperCase();
        if (entity === null || entity === void 0 ? void 0 : entity.id) {
            key += `@${calcDeCodeNameById(entity.id).toUpperCase()}`;
        }
        if (mainModel.codeName) {
            key += `@${mainModel.codeName.toUpperCase()}`;
        }
        return key;
    }
    /**
     * @description 计算实体界面逻辑节点key，（appId/DEFAULT@实体codeName@逻辑codeName@逻辑节点codeName）全大写
     * @static
     * @param {IRegisterParams} opts
     * @returns {*}  {string}
     * @memberof CustomRegister
     */
    static calcExtensionLogicNodeKey(opts) {
        const { mainModel, entity, logic } = opts;
        let key = (mainModel.appId || 'DEFAULT').toUpperCase();
        if (entity === null || entity === void 0 ? void 0 : entity.id) {
            key += `@${calcDeCodeNameById(entity.id).toUpperCase()}`;
        }
        if (logic === null || logic === void 0 ? void 0 : logic.codeName) {
            key += `@${logic.codeName.toUpperCase()}`;
        }
        if (mainModel.codeName) {
            key += `@${mainModel.codeName.toUpperCase()}`;
        }
        return key;
    }
}
