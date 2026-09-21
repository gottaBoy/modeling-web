/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { RuntimeModelError } from '@ibiz-template/core';
import { createUUID, isArray } from 'qx-util';
import { PredefinedControlRender } from '../../constant';
/**
 * 在数据模型中查找对应 id 模型
 *
 * @author chitanda
 * @date 2023-04-22 15:04:49
 * @export
 * @param {IModelObject[]} models
 * @param {string} id
 * @return {*}  {(IModelObject | null)}
 */
export function findModelChild(models, id) {
    if (models && id) {
        const model = models.find(item => {
            if (item.id) {
                return item.id.toLowerCase() === id.toLowerCase();
            }
            return false;
        });
        if (model) {
            return model;
        }
    }
    return null;
}
/**
 * 从视图里面获取部件模型
 * @author lxm
 * @date 2023-06-06 10:53:27
 * @export
 * @param {IAppView} view 视图模型
 * @param {string} key 先匹配name，后是codeName, 最后才是id
 * @return {*}
 */
export function getControl(view, key) {
    var _a, _b;
    let controls = view.controls || [];
    if ((_b = (_a = view.viewLayoutPanel) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b.length) {
        controls = controls.concat(view.viewLayoutPanel.controls);
    }
    return controls.find(item => {
        return item.name === key || item.codeName === key || item.id === key;
    });
}
/**
 * 从视图里找关联视图引用
 * @author lxm
 * @date 2023-07-04 03:26:34
 * @export
 * @param {IAppView} view
 * @param {string} key
 * @return {*}
 */
export function getAppViewRef(view, key) {
    var _a, _b;
    let appViewRefs = view.appViewRefs || [];
    if ((_b = (_a = view.viewLayoutPanel) === null || _a === void 0 ? void 0 : _a.appViewRefs) === null || _b === void 0 ? void 0 : _b.length) {
        appViewRefs = appViewRefs.concat(view.viewLayoutPanel.appViewRefs);
    }
    return appViewRefs.find(item => {
        return item.name === key || item.id === key;
    });
}
/**
 * 解析用户参数
 * @author lxm
 * @date 2023-07-05 06:11:27
 * @export
 * @param {Record<string, string>} userParams
 */
export function parseUserParams(userParams) {
    const navigateContexts = {};
    const navigateParams = {};
    const other = {};
    for (const key in userParams) {
        if (Object.prototype.hasOwnProperty.call(userParams, key)) {
            const param = userParams[key];
            if (key.indexOf('.') !== -1) {
                const splitArr = key.split('.');
                switch (splitArr[0].toUpperCase()) {
                    case 'SRFNAVPARAM':
                        Object.assign(navigateParams, { [splitArr[1]]: param });
                        break;
                    case 'SRFNAVCTX':
                        Object.assign(navigateContexts, { [splitArr[1]]: param });
                        break;
                    default:
                        Object.assign(other, { key: param });
                        break;
                }
            }
        }
    }
    return { navigateContexts, navigateParams, other };
}
/**
 * 从应用里面获取插件配置参数
 *
 * @author chitanda
 * @date 2023-11-21 14:11:06
 * @export
 * @param {string} id 插件标识
 * @param {string} [appId] 当前所在应用标识
 * @return {*}  {ISysPFPlugin}
 */
export function getPFPlugin(id, appId) {
    const app = ibiz.hub.getApp(appId);
    if (!app) {
        throw new RuntimeModelError(app, ibiz.i18n.t('runtime.model.utils.noFoundApplication'));
    }
    const { model } = app;
    if (!model.appPFPluginRefs) {
        throw new RuntimeModelError(model, ibiz.i18n.t('runtime.model.utils.unconfiguredPlugins'));
    }
    const plugin = model.appPFPluginRefs.find(item => item.pluginCode.toLowerCase() === id.toLowerCase());
    if (!plugin) {
        throw new Error(ibiz.i18n.t('runtime.model.utils.noFound', { id }));
    }
    return plugin;
}
/**
 * 获取部件布局面板
 * @author lxm
 * @date 2023-11-28 11:07:49
 * @export
 * @param {IControl} control
 * @return {*}  {(IPanel | undefined)}
 */
export function getControlPanel(control) {
    let layoutPanel;
    if (control.controlRenders) {
        let { controlRenders } = control;
        // 数据看板应排除预置门户部件绘制器(以_header、_header_caption、_header_bg、_header_action结尾)
        if (controlRenders &&
            controlRenders.length > 0 &&
            control.controlType === 'DASHBOARD') {
            controlRenders = controlRenders.filter(item => !(item.id.endsWith('_header') ||
                item.id.endsWith('_header_caption') ||
                item.id.endsWith('_header_bg') ||
                item.id.endsWith('_header_action')));
        }
        // 排除空数据显示内容绘制器
        const panelRender = controlRenders.find(item => item.renderType === 'LAYOUTPANEL' &&
            !!item.layoutPanel &&
            !Object.values(PredefinedControlRender).includes(item.id));
        layoutPanel = panelRender === null || panelRender === void 0 ? void 0 : panelRender.layoutPanel;
    }
    return layoutPanel;
}
/**
 * 在应用实体模型中查找对应 id 应用方法
 * 解决应用实体方法名和行为，数据集方法不一致的问题
 * @author lionlau
 * @date 2024-03-09 18:04:21
 * @export
 * @param {IAppDataEntity} appDataEntity
 * @param {string} id
 * @return {*}  {(IAppDEMethod | null)}
 */
export function findAppDEMethod(appDataEntity, id) {
    const models = appDataEntity.appDEMethods;
    if (models && id) {
        const model = findModelChild(models, id);
        if (model) {
            return model;
        }
        const model2 = models.find(item => {
            switch (item.methodType) {
                case 'DEACTION': {
                    const { actionTag } = item;
                    return (actionTag === null || actionTag === void 0 ? void 0 : actionTag.toLowerCase()) === id.toLowerCase();
                }
                case 'FETCH': {
                    const { dataSetTag } = item;
                    return `fetch${dataSetTag === null || dataSetTag === void 0 ? void 0 : dataSetTag.toLowerCase()}` === id.toLowerCase();
                }
                default:
                    return false;
            }
        });
        if (model2) {
            return model2;
        }
    }
    return null;
}
/**
 * 获取部件的Teleport参数
 * @author lxm
 * @date 2024-03-27 02:02:09
 * @export
 * @param {IControl} control
 * @return {*}  {(string | undefined)}
 */
export function getCtrlTeleportParams(control) {
    var _a, _b, _c, _d;
    const teleportTag = (_b = (_a = control.controlParam) === null || _a === void 0 ? void 0 : _a.ctrlParams) === null || _b === void 0 ? void 0 : _b.TELEPORTTAG;
    const teleportFlag = ((_d = (_c = control.controlParam) === null || _c === void 0 ? void 0 : _c.ctrlParams) === null || _d === void 0 ? void 0 : _d.TELEPORTFLAG) === 'true';
    return {
        teleportTag,
        teleportFlag,
    };
}
/**
 * @description 计算图标模型对象
 * @param {string} appId
 * @param {string} [_str]
 * @returns {*}  {(ISysImage | undefined)}
 */
const calcSysImage = (appId, _str) => {
    if (!_str)
        return undefined;
    // 默认为FontAwesome
    return {
        cssClass: _str,
        glyph: `${createUUID()}@FontAwesome`,
        appId,
    };
};
/**
 * @description 计算
 * @param {string} appId
 * @param {string} [_str]
 * @returns {*}  {(ISysCss | undefined)}
 */
const calcSysCss = (appId, _str) => {
    if (!_str)
        return undefined;
    return {
        cssName: _str,
        appId,
    };
};
/**
 * @description 计算单个动态界面行为组项数据
 * @export
 * @param {IData} refUIActionGroup
 * @param {IContext} context
 * @param {IParams} params
 * @returns {*}  {Promise<IAppDEUIActionGroupDetail[]>}
 */
export async function calcDyUiactionGroup(refUIActionGroup, context, params) {
    const { appId, detailAppDataEntityId, detailAppDEDataSetId, 
    // 界面行为标记
    uiactionTagAppDEFieldId, 
    // 文本属性
    textAppDEFieldId, 
    // 提示值属性
    tipsAppDEFieldId, 
    // 可见逻辑属性
    visibleScriptAppDEFieldId, 
    // 图标样式属性
    iconClsAppDEFieldId, 
    // 样式表属性
    clsAppDEFieldId, 
    // 按钮样式属性
    buttonStyleAppDEFieldId, 
    // 行为级别属性
    actionLevelAppDEFieldId, 
    // 启用逻辑属性
    enableScriptAppDEFieldId, } = refUIActionGroup;
    const details = [];
    try {
        if (detailAppDEDataSetId && detailAppDataEntityId) {
            const response = await ibiz.hub
                .getApp(appId)
                .deService.exec(detailAppDataEntityId, detailAppDEDataSetId, context, params);
            if (response.ok && isArray(response.data)) {
                response.data.forEach((_item) => {
                    const action = {
                        uiactionId: _item[uiactionTagAppDEFieldId],
                        caption: _item[textAppDEFieldId],
                        tooltip: _item[tipsAppDEFieldId],
                        visibleScriptCode: _item[visibleScriptAppDEFieldId],
                        sysImage: calcSysImage(appId, _item[iconClsAppDEFieldId]),
                        sysCss: calcSysCss(appId, _item[clsAppDEFieldId]),
                        buttonStyle: _item[buttonStyleAppDEFieldId],
                        actionLevel: _item[actionLevelAppDEFieldId],
                        enableScriptCode: _item[enableScriptAppDEFieldId],
                        // 适配显示逻辑
                        showCaption: !!_item[textAppDEFieldId],
                        showIcon: !!_item[iconClsAppDEFieldId],
                        detailType: 'DEUIACTION',
                        itemType: 'DEUIACTION',
                        id: `${createUUID()}`,
                        appId,
                    };
                    // 界面行为标识不能为空
                    if (action.uiactionId)
                        details.push(action);
                });
            }
        }
    }
    catch (error) {
        ibiz.log.error(error);
    }
    return details;
}
/**
 * @description 处理界面行为组（替换动态行为组模型为实际的行为项集合）
 * @export
 * @param {IUIActionGroupDetail[]} uiactionGroupDetails
 * @param {IContext} context
 * @param {IParams} params
 * @returns {*}  {Promise<IUIActionGroupDetail[]>}
 */
export async function calcUIActionDetails(uiactionGroupDetails, context, params) {
    // 筛选需要替换的项（保留原始索引）
    const refActionDetails = [];
    uiactionGroupDetails.forEach((detail, index) => {
        var _a, _b, _c, _d;
        if ((_a = detail.capLanguageRes) === null || _a === void 0 ? void 0 : _a.lanResTag)
            detail.caption = ibiz.i18n.t(detail.capLanguageRes.lanResTag, detail.caption);
        if ((_b = detail.tooltipLanguageRes) === null || _b === void 0 ? void 0 : _b.lanResTag)
            detail.tooltip = ibiz.i18n.t(detail.tooltipLanguageRes.lanResTag, detail.tooltip);
        // 过滤静态界面行为组
        if (detail.detailType === 'DEUIACTIONGROUP' &&
            ((_c = detail.refUIActionGroup) === null || _c === void 0 ? void 0 : _c.dynamicMode) === 1 &&
            !((_d = detail.refUIActionGroup) === null || _d === void 0 ? void 0 : _d.uiactionGroupDetails)) {
            refActionDetails.push({ detail, index });
        }
    });
    // 批量执行异步任务，获取所有动态界面行为组数据
    const asyncTasks = [];
    refActionDetails.forEach(({ detail }) => {
        const { refUIActionGroup } = detail;
        const task = calcDyUiactionGroup(refUIActionGroup, context, params);
        asyncTasks.push(task);
    });
    // 将模型数据合并至引用界面行为组对象
    const actionGroupDataList = await Promise.all(asyncTasks);
    refActionDetails.forEach(({ index }, i) => {
        const _uiactionGroupDetails = actionGroupDataList[i];
        Object.assign(uiactionGroupDetails[index].refUIActionGroup, {
            uiactionGroupDetails: _uiactionGroupDetails,
        });
    });
    return uiactionGroupDetails;
}
/**
 * @description 递归获取所有界面行为项（处理多层嵌套的动态行为组、替换动态行为组模型为实际的行为项集合）
 * @export
 * @param {IDEUIActionGroupDetail[]} details
 * @param {IContext} context
 * @param {IParams} params
 * @returns {*}  {Promise<IDEUIActionGroupDetail[]>}
 */
export async function calcAllUIActionDetails(details, context, params) {
    const actions = [];
    // 收集所有遍历过程中的异步任务
    const asyncTasks = [];
    const addAction = (items) => {
        if (!isArray(items) || !(items === null || items === void 0 ? void 0 : items.length))
            return;
        const task = calcUIActionDetails(items, context, params);
        asyncTasks.push(task);
        items.forEach(item => {
            var _a, _b;
            if (item.detailType === 'DEUIACTIONGROUP') {
                if ((_b = (_a = item.refUIActionGroup) === null || _a === void 0 ? void 0 : _a.uiactionGroupDetails) === null || _b === void 0 ? void 0 : _b.length)
                    addAction(item.refUIActionGroup.uiactionGroupDetails);
            }
        });
    };
    addAction(details || []);
    const allActionDetails = await Promise.all(asyncTasks);
    allActionDetails.forEach(_details => {
        _details.forEach(detail => {
            actions.push(detail);
        });
    });
    return actions;
}
/**
 * @description 处理界面行为组，动态界面行为组需请求数据并生成成员项模型
 * @export
 * @param {IDEUIActionGroup} uiactionGroup
 * @param {IContext} context
 * @param {IParams} params
 * @returns {*}  {Promise<IDEUIActionGroup>}
 */
export async function calcUIActionGroup(uiactionGroup, context, params) {
    if (uiactionGroup.dynamicMode === 1 && !uiactionGroup.uiactionGroupDetails) {
        // 实体数据集模式
        const uiactionGroupDetails = await calcDyUiactionGroup(uiactionGroup, context, params);
        Object.assign(uiactionGroup, {
            uiactionGroupDetails,
        });
    }
    else {
        // 静态模式
        // 收集所有遍历过程中的异步任务
        const asyncTasks = [];
        if (uiactionGroup === null || uiactionGroup === void 0 ? void 0 : uiactionGroup.uiactionGroupDetails) {
            const task = calcAllUIActionDetails(uiactionGroup.uiactionGroupDetails, context, params);
            asyncTasks.push(task);
        }
        await Promise.all(asyncTasks);
    }
    return uiactionGroup;
}
/**
 * @description 获取所有的界面行为项模型集合
 * @export
 * @param {IDEUIActionGroupDetail[]} details
 * @returns {*}  {IDEUIActionGroupDetail[]}
 */
export function getAllUIActionItems(details = []) {
    const actions = [];
    const addAction = (items) => {
        items.forEach(item => {
            var _a;
            actions.push(item);
            if (item.detailType === 'DEUIACTIONGROUP') {
                const childrenDetails = (_a = item.refUIActionGroup) === null || _a === void 0 ? void 0 : _a.uiactionGroupDetails;
                if (childrenDetails === null || childrenDetails === void 0 ? void 0 : childrenDetails.length)
                    addAction(childrenDetails);
            }
        });
    };
    addAction(details);
    return actions;
}
