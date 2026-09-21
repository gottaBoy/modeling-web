/* eslint-disable no-prototype-builtins */
import { ModelError } from '@ibiz-template/core';
/**
 * 界面逻辑参数
 *
 * @author chitanda
 * @date 2023-02-07 21:02:45
 * @export
 * @class UILogicParam
 */
export class UILogicParam {
    /**
     * Creates an instance of UILogicParam.
     *
     * @author chitanda
     * @date 2023-02-08 16:02:22
     * @param {UILogicParamModel} model
     */
    constructor(model) {
        this.model = model;
    }
    /**
     * 向界面逻辑中计算基础参数
     *
     * @author chitanda
     * @date 2023-02-08 20:02:33
     * @param {UILogicContext} ctx
     */
    calc(ctx) {
        const tag = this.model.id;
        const m = this.model;
        const { parameters } = ctx;
        const { context, params, data } = parameters;
        const app = ibiz.hub.getApp(m.appId);
        // 特殊变量的特殊处理
        if (m.codeName === 'layoutPanel') {
            ctx.params[tag] = parameters.view.layoutPanel.panelItems;
            return;
        }
        if (m.default) {
            // 配置了数据对象列表的，default给数组格式的数据
            if (m.entityListParam) {
                ctx.params[tag] = data || [];
            }
            else {
                ctx.params[tag] = data && data.length > 0 ? data[0] : {};
            }
        }
        else if (m.activeContainerParam) {
            // 当前容器对象
            ctx.params[tag] = parameters.ctrl || parameters.view;
        }
        else if (m.activeCtrlParam) {
            // 当前部件对象
            ctx.params[tag] = parameters.ctrl;
        }
        else if (m.ctrlParam) {
            // 指定部件对象
            // 部件模型名称会被小写
            const control = parameters.view.getController(m.codeName.toLowerCase());
            if (control) {
                ctx.params[tag] = control;
            }
            else {
                ibiz.log.error(ibiz.i18n.t('runtime.uiLogic.viewLogicInitializationParameter', {
                    codeName: m.codeName,
                }));
            }
        }
        else if (m.activeViewParam) {
            // 当前视图对象
            ctx.params[tag] = parameters.view;
        }
        else if (m.appGlobalParam) {
            // 应用全局变量
            let value = ibiz.util.getGlobalParam();
            if (m.paramFieldName) {
                if (!value.hasOwnProperty(m.paramFieldName)) {
                    value[m.paramFieldName] = {};
                }
                value = value[m.paramFieldName];
            }
            ctx.params[tag] = value;
        }
        else if (m.applicationParam) {
            // 当前应用
            ctx.params[tag] = app;
        }
        else if (m.entityListParam) {
            // 数据对象列表变量
            ctx.params[tag] = [];
        }
        else if (m.entityPageParam) {
            // 分页查询结果变量
            ctx.params[tag] = [];
        }
        else if (m.entityParam) {
            // 数据对象变量
            ctx.params[tag] = {};
        }
        else if (m.lastReturnParam) {
            // 上一次调用返回变量
            ctx.initLastReturnParam(tag);
        }
        else if (m.navContextParam) {
            // 应用上下文变量
            ctx.params[tag] = context;
        }
        else if (m.navViewParamParam) {
            // 视图路由参数变量
            ctx.params[tag] = ibiz.util.getRouterParams();
        }
        else if (m.routeViewSessionParam) {
            // 路由视图会话
            let value = parameters.view.getTopView().state;
            if (m.paramFieldName) {
                if (!value.hasOwnProperty(m.paramFieldName)) {
                    value[m.paramFieldName] = {};
                }
                value = value[m.paramFieldName];
            }
            ctx.params[tag] = value;
        }
        else if (m.simpleListParam) {
            // 简单数据列表变量
            ctx.params[tag] = [];
        }
        else if (m.simpleParam) {
            // 简单数据变量
            ctx.params[tag] = {};
        }
        else if (m.viewNavDataParam) {
            // 视图导航数据变量
            ctx.params[tag] = params;
        }
        else if (m.viewSessionParam) {
            // 当前视图会话
            let value = parameters.view.state;
            if (m.paramFieldName) {
                if (!value.hasOwnProperty(m.paramFieldName)) {
                    value[m.paramFieldName] = {};
                }
                value = value[m.paramFieldName];
            }
            ctx.params[tag] = value;
        }
        else if (m.filterParam) {
            // 过滤器对象变量
            ctx.params[tag] = {};
        }
        else if (m.envParam) {
            // 应用环境变量
            ctx.params[tag] = ibiz.env;
        }
        else if (m.sessionParam) {
            // 操作会话变量
            ctx.params[tag] = ctx.session;
        }
        ibiz.log.debug(ibiz.i18n.t('runtime.uiLogic.calculateInterfaceLogicParameters', {
            tag,
        }), ibiz.i18n.t('runtime.deLogic.deLogicNode.value'), Object.assign({}, ctx.params[tag]));
    }
    /**
     * 重新建立变量
     * @author lxm
     * @date 2023-03-24 09:20:42
     * @param {DELogicContext} ctx
     */
    renew(ctx) {
        const tag = this.model.id;
        const m = this.model;
        if (m.entityListParam || m.simpleListParam || m.entityPageParam) {
            ctx.params[tag] = [];
        }
        else if (m.simpleParam || m.entityParam) {
            ctx.params[tag] = {};
        }
        else {
            throw new ModelError(m, ibiz.i18n.t('runtime.deLogic.deLogicNode.recreatingVariables'));
        }
        ibiz.log.debug(ibiz.i18n.t('runtime.uiLogic.restablishInterfaceLogic', {
            tag,
        }), ibiz.i18n.t('runtime.deLogic.deLogicNode.value'), Object.assign({}, ctx.params[tag]));
    }
}
