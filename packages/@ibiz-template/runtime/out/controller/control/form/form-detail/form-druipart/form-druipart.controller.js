import { isOverlap } from '@ibiz-template/core';
import { createUUID, notNilEmpty } from 'qx-util';
import { SysUIActionTag, ViewCallTag } from '../../../../../constant';
import { convertNavData } from '../../../../../utils';
import { FormNotifyState } from '../../../../constant';
import { FormDetailController } from '../form-detail';
import { FormDruipartState } from './form-druipart.state';
/**
 * 表单关系界面控制器
 *
 * @author lxm
 * @date 2022-09-04 15:09:52
 * @export
 * @class FormDRUIPartController
 * @extends {FormDetailController}
 */
export class FormDRUIPartController extends FormDetailController {
    constructor() {
        super(...arguments);
        /**
         * 关联刷新项
         *
         * @author lxm
         * @date 2022-09-15 10:09:41
         * @type {string[]}
         */
        this.refreshItems = ['srfkey'];
        /**
         * 参数项名称（这个模型暂不使用，相关场景可以通过配置导航参数实现）
         *
         * @author lxm
         * @date 2022-09-15 19:09:36
         * @type {string}
         */
        this.paramItem = 'srfkey';
        /**
         * 是否是新建数据（即无主键）
         * @author lxm
         * @date 2023-07-28 04:09:21
         * @type {boolean}
         */
        this.isNewData = false;
    }
    createState() {
        var _a;
        return new FormDruipartState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
    async onInit() {
        await super.onInit();
        Object.assign(this.state.layout.extraStyle, {
            overflow: 'auto',
        });
        // 初始化关联刷新项
        if (this.model.refreshItems) {
            let strArr = this.model.refreshItems.split(';');
            strArr = strArr.filter(item => !!item); // 去除空字符串
            this.refreshItems.push(...strArr);
        }
        // 初始化参数项名称
        if (this.model.paramItem) {
            this.paramItem = this.model.paramItem;
        }
    }
    /**
     * 表单数据变更通知(由表单控制器调用)
     *
     * @author lxm
     * @date 2022-09-01 20:09:54
     * @param {String[]} names
     */
    async dataChangeNotify(names) {
        await super.dataChangeNotify(names);
        // 关联刷新项发生变更时触发刷新
        if (isOverlap(this.refreshItems, names)) {
            this.calcViewParams();
        }
    }
    async formStateNotify(state) {
        await super.formStateNotify(state);
        this.isNewData = state === FormNotifyState.DRAFT;
        if (this.model.maskMode !== 0) {
            this.state.showMask = this.isNewData;
        }
        if (state === FormNotifyState.LOAD ||
            state === FormNotifyState.DRAFT ||
            state === FormNotifyState.SAVE) {
            // 表单数据加载变更后，计算关系界面参数
            this.calcViewParams();
        }
    }
    /**
     * 计算视图上下文和视图参数,
     * *调用该方法一定会刷新视图。
     *
     * @author lxm
     * @date 2022-09-14 18:09:35
     */
    calcViewParams() {
        // 计算导航上下文
        let newContext = this.form.context.clone();
        const navContexts = this.model.navigateContexts;
        if (notNilEmpty(navContexts)) {
            newContext = Object.assign(newContext, convertNavData(navContexts, this.data, this.form.params, this.form.context));
        }
        // 处理导航视图参数
        const newParams = convertNavData(this.model.navigateParams, this.data, this.form.params, this.form.context);
        if (!this.state.viewComponentKey) {
            // 第一次直接修改然后render
            this.state.viewComponentKey = createUUID();
            this.navContext = newContext;
            this.navParams = newParams;
        }
        else if (JSON.stringify(this.navContext) !== JSON.stringify(newContext) ||
            JSON.stringify(this.navParams) !== JSON.stringify(newParams)) {
            // 后续算出来不一致的情况下，修改，force走render，下层视图自己刷新
            this.navContext = newContext;
            this.navParams = newParams;
            // 强制刷新
            this.force();
        }
        else if (this.embedView) {
            // 无主键时不刷新
            if (this.isNewData) {
                return;
            }
            // 其他情况下没变，调视图控制器触发刷新
            this.embedView.callUIAction(SysUIActionTag.REFRESH);
        }
    }
    /**
     * 设置嵌入视图的神经元
     *
     * @author lxm
     * @date 2022-09-15 10:09:22
     * @param {ViewNeuron} neuron
     */
    setEmbedView(view) {
        this.embedView = view;
        this.embedView.evt.on('onMounted', () => {
            if (!this.isNewData) {
                this.embedView.call(ViewCallTag.LOAD);
            }
        });
        this.embedView.evt.on('onDataChange', event => {
            if (['LOAD', 'LOADDRAFT'].includes(event.actionType)) {
                return;
            }
            ibiz.log.debug(ibiz.i18n.t('runtime.controller.control.form.relationshipInterface'), event);
            // 有表单项更新，且是自身变更时，触发表单项更新
            if (this.model.deformItemUpdateId) {
                this.form.updateFormItem(this.model.deformItemUpdateId);
            }
        });
    }
    /**
     * @description 关系界面校验
     * @return {*}  {Promise<boolean>}
     * @memberof FormDRUIPartController
     */
    async validate() {
        if (this.embedView) {
            const { xdataControlName } = this.embedView.model;
            if (xdataControlName) {
                const xdataControl = this.embedView.getController(xdataControlName);
                // 目前只有表格
                if (xdataControl && xdataControl.validateAll) {
                    return xdataControl.validateAll();
                }
            }
        }
        return true;
    }
    /**
     * 静默校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormDRUIPartController
     */
    async silentValidate() {
        if (this.embedView) {
            const { xdataControlName } = this.embedView.model;
            if (xdataControlName) {
                const xdataControl = this.embedView.getController(xdataControlName);
                // 目前只有表格
                if (xdataControl && xdataControl.validateAll) {
                    return xdataControl.validateAll();
                }
            }
        }
        return true;
    }
}
