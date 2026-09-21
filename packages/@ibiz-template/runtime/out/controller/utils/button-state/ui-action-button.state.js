import { getUIActionById } from '../../../model';
import { ScriptFactory } from '../../../utils';
/**
 * 界面行为按钮状态
 * @author lxm
 * @date 2023-05-10 02:04:12
 * @export
 * @class UIActionButtonState
 * @implements {IButtonState}
 */
export class UIActionButtonState {
    constructor(name, appId, uiActionId, model) {
        this.disabled = false;
        this.visible = true;
        this.loading = false;
        /**
         * 是否有权限
         */
        this.permitted = true;
        /**
         * 没权限时是否隐藏
         */
        this.noPermissionHidden = true;
        /**
         * 有权限时且没数据时，是否禁用
         *
         * @author chitanda
         * @date 2023-11-30 11:11:14
         * @protected
         * @type {boolean}
         */
        this.noDataDisabled = false;
        /**
         * 有权限时且没主键时，是否禁用
         *
         * @author chitanda
         * @date 2023-11-30 11:11:03
         * @protected
         * @type {boolean}
         */
        this.noKeyDisabled = false;
        /**
         *  是否初始化
         */
        this.isInit = false;
        this.name = name;
        this.uiActionId = uiActionId;
        this.appId = appId;
        this.model = model;
    }
    /**
     * 初始化，没有界面行为id就是普通的buttonState
     * @author lxm
     * @date 2023-05-10 02:16:22
     * @protected
     * @return {*}
     */
    async init() {
        if (!this.uiActionId) {
            this.isInit = true;
            return;
        }
        const uiAction = await getUIActionById(this.uiActionId, this.appId);
        [, this.appDeName] = this.uiActionId.split('@');
        if (!uiAction) {
            return;
        }
        const { dataAccessAction, noPrivDisplayMode, actionTarget, uiactionMode, uiactionTag, } = uiAction;
        this.dataAccessAction = dataAccessAction;
        this.actionTarget = actionTarget;
        // 设置无权限显示模式,1:禁用，2隐藏，6隐藏且默认隐藏
        if (noPrivDisplayMode === 1) {
            this.noPermissionHidden = false;
        }
        else if (noPrivDisplayMode === 6) {
            this.visible = false;
        }
        if ([2, 6].includes(noPrivDisplayMode) && this.dataAccessAction) {
            // 有权限标识且无权限隐藏的，先隐藏
            this.visible = false;
        }
        // 数据目标不为空，和一些要数据的预置界面行为，没数据的时候禁用
        if ((actionTarget && actionTarget !== 'NONE') ||
            (uiactionMode === 'SYS' &&
                [
                    'Save',
                    'SaveAndExit',
                    'SaveAndNew',
                    'Edit',
                    'Remove',
                    'RemoveAndExit',
                ].includes(uiactionTag))) {
            this.noDataDisabled = true;
            // 单项数据主键或者多项数据主键的时候，没主键的时候需要禁用
            if (actionTarget === 'SINGLEKEY' || actionTarget === 'MULTIKEY') {
                this.noKeyDisabled = true;
            }
        }
        this.isInit = true;
    }
    /**
     * 计算按钮权限
     * @author lxm
     * @date 2023-05-11 07:46:09
     * @protected
     * @param {IData} [data] 数据
     * @param {string} [appDeId] 数据对应的实体id
     * @return {*}
     */
    async calcPermission(context, data, appDeId) {
        if (!this.dataAccessAction) {
            return;
        }
        const app = await ibiz.hub.getApp(this.appId);
        if (this.actionTarget && this.actionTarget === 'NONE') {
            this.permitted = await app.authority.calcByNoDataAccessAction(this.dataAccessAction, context, appDeId || this.appDeName);
            return;
        }
        // 界面行为实体和数据实体不一致时报警告
        if (this.appDeName && appDeId && !appDeId.includes(this.appDeName)) {
            ibiz.log.warn(ibiz.i18n.t('runtime.controller.utils.buttonState.isFinitenconsistency', {
                uiActionId: this.uiActionId,
                appDeName: this.appDeName,
                appDeId,
            }));
        }
        this.permitted = await app.authority.calcByDataAccessAction(this.dataAccessAction, context, data, appDeId || this.appDeName);
    }
    // 计算启用逻辑
    async calcEnableScript(context, data) {
        if (this.model && this.model.enableScriptCode) {
            this.visible = ScriptFactory.execScriptFn({ context, data }, this.model.enableScriptCode, { singleRowReturn: true });
        }
    }
    // 计算可见逻辑
    async calcVisibleScript(context, data) {
        if (this.model && this.model.visibleScriptCode) {
            this.visible = ScriptFactory.execScriptFn({ context, data }, this.model.visibleScriptCode, { singleRowReturn: true });
        }
    }
    async update(context, data, appDeId) {
        if (!this.isInit) {
            await this.init();
        }
        await this.calcPermission(context, data, appDeId);
        // 赋值,没权限时都禁用，没权限时隐藏的才会不显示
        if (!this.permitted) {
            this.disabled = true;
            this.visible = !this.noPermissionHidden;
        }
        else {
            // 有权限时显示
            this.visible = true;
            // 有权限时没数据有些要禁用，有数据没主见时(单项数据)需要禁用
            this.disabled =
                this.noDataDisabled && (!data || (this.noKeyDisabled && !data.srfkey));
        }
        await this.calcEnableScript(context, data);
        await this.calcVisibleScript(context, data);
    }
}
