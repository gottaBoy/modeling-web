import { isOverlap } from '@ibiz-template/core';
import { FormDetailEventName, } from '../../../../../interface';
import { calcLayoutHeightWidth, calcDynaClass } from '../../../../../model';
import { ScriptFactory, verifyFormGroupLogic } from '../../../../../utils';
import { FormDetailState } from './form-detail.state';
export class FormDetailController {
    /**
     * 表单数据
     *
     * @author lxm
     * @date 2022-09-01 22:09:48
     * @readonly
     */
    get data() {
        return this.form.data;
    }
    /**
     * 上下文
     *
     * @author lxm
     * @date 2023-11-22 11:43:47
     * @readonly
     * @type {IContext}
     */
    get context() {
        return this.form.context;
    }
    /**
     *  视图参数
     * @author lxm
     * @date 2023-11-22 11:43:41
     * @readonly
     * @type {IParams}
     */
    get params() {
        return this.form.params;
    }
    /**
     * 获取容器类名集合
     * @author lxm
     * @date 2023-08-02 06:06:12
     * @readonly
     * @type {string[]}
     */
    get containerClass() {
        return [...this.state.class.container, ...this.state.class.containerDyna];
    }
    /**
     * 获取标题类名集合
     * @author lxm
     * @date 2023-08-02 06:16:48
     * @readonly
     * @type {string[]}
     */
    get labelClass() {
        return [...this.state.class.label, ...this.state.class.labelDyna];
    }
    /**
     * Creates an instance of FormDetailController.
     * @author lxm
     * @date 2022-08-24 20:08:22
     * @param {T} model
     */
    constructor(model, form, parent) {
        var _a;
        /**
         * 动态逻辑结果
         * @author lxm
         * @date 2023-09-21 03:36:37
         * @protected
         */
        this.dynaLogicResult = {
            visible: undefined,
            disabled: undefined,
            required: undefined,
        };
        this.model = model;
        this.form = form;
        this.parent = parent;
        this.state = this.createState();
        this.state.context = this.context;
        // 如果有项显示逻辑默认隐藏
        const tag = (_a = this.model.defdgroupLogics) === null || _a === void 0 ? void 0 : _a.findIndex((item) => {
            return item.logicCat === 'PANELVISIBLE';
        });
        if (tag !== undefined && tag > -1) {
            this.state.visible = false;
        }
    }
    /**
     * 子类不可覆盖或重写此方法，在 init 时需要重写的使用 onInit 方法。
     *
     * @author lxm
     * @date 2022-08-18 22:08:30
     * @returns {*}  {Promise<void>}
     */
    async init() {
        await this.onInit();
    }
    async onInit() {
        this.state.showMoreMode = this.model.showMoreMode;
        // 初始化布局参数
        const { layoutPos, sysCss, labelSysCss, capLanguageRes } = this.model;
        // 初始化高宽
        if (layoutPos) {
            const { width, height } = calcLayoutHeightWidth(layoutPos);
            this.state.layout.width = `${width}`;
            this.state.layout.height = `${height}`;
        }
        if (sysCss === null || sysCss === void 0 ? void 0 : sysCss.cssName) {
            this.state.class.container.push(sysCss.cssName);
        }
        if (labelSysCss === null || labelSysCss === void 0 ? void 0 : labelSysCss.cssName) {
            this.state.class.label.push(labelSysCss.cssName);
        }
        // 初始化多语言
        if (capLanguageRes && capLanguageRes.lanResTag) {
            this.model.caption = ibiz.i18n.t(capLanguageRes.lanResTag, this.model.caption);
        }
    }
    /**
     * 创建表单状态对象
     *
     * @author chitanda
     * @date 2023-01-04 10:01:00
     * @protected
     * @return {*}  {FormDetailState}
     */
    createState() {
        var _a;
        return new FormDetailState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
    /**
     * 表单数据变更通知(由表单控制器调用)
     *
     * @author lxm
     * @date 2022-09-20 18:09:56
     * @param {string[]} names
     */
    async dataChangeNotify(names) {
        // 计算动态控制逻辑（单单基于变更项计算相关动态逻辑不够，其关联项存在动态逻辑，可能会导致界面计算动态逻辑异常，因此需整体计算一遍）
        this.calcDynamicLogic(names, true);
        // 计算显示，禁用，必填状态
        this.calcDetailDisabled(this.data);
        this.calcDetailVisible(this.data);
        this.calcDetailRequired(this.data);
        // 计算动态样式表
        this.calcDynaClass(this.data);
    }
    /**
     * 表单状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    async formStateNotify(_state) {
        // 计算动态控制逻辑
        this.calcDynamicLogic([], true);
        // 计算显示，禁用，必填状态
        this.calcDetailDisabled(this.data);
        this.calcDetailVisible(this.data);
        this.calcDetailRequired(this.data);
        // 计算动态样式表
        this.calcDynaClass(this.data);
    }
    /**
     * 计算动态逻辑
     *
     * @author lxm
     * @date 2022-09-20 19:09:20
     * @protected
     * @param {string[]} names 变更的属性集合
     * @param {boolean} [mustCalc=false] 是否强制计算一遍动态逻辑
     * @returns {*}  {void}
     */
    calcDynamicLogic(names, mustCalc = false) {
        var _a;
        // 逻辑优化，当父容器存在且为不显示时，不去计算自己的动态逻辑
        if (this.parent && !this.parent.state.visible && !mustCalc) {
            return;
        }
        // 根据自身的动态逻辑计算
        (_a = this.model.defdgroupLogics) === null || _a === void 0 ? void 0 : _a.forEach(logic => {
            const relatedNames = logic.relatedDetailNames || [];
            // name是动态逻辑涉及到的时或state存在时
            if (logic.logicCat &&
                ['ITEMBLANK', 'ITEMENABLE', 'PANELVISIBLE'].includes(logic.logicCat) &&
                (mustCalc || isOverlap(relatedNames, names))) {
                try {
                    const ok = verifyFormGroupLogic(this.data, logic);
                    switch (logic.logicCat) {
                        // 动态空输入，不满足则必填
                        case 'ITEMBLANK':
                            this.dynaLogicResult.required = !ok;
                            break;
                        // 动态启用，满足则启用
                        case 'ITEMENABLE':
                            this.dynaLogicResult.disabled = !ok;
                            break;
                        // 动态显示，满足则显示
                        case 'PANELVISIBLE':
                            this.dynaLogicResult.visible = ok;
                            break;
                        default:
                    }
                }
                catch (error) {
                    ibiz.log.error(error);
                }
            }
        });
    }
    /**
     * 强制更新视图
     *
     * @author lxm
     * @date 2022-09-15 09:09:05
     * @param {() => void} [_callback] 更新之后，组件渲染完成后的回调
     */
    force(_callback) {
        // 在界面数据发生变更时，会调用此方法。
        // 可外部覆盖实例的此方法，实现自定义的数据更新逻辑。
    }
    /**
     * 计算动态样式表
     * @author lxm
     * @date 2023-08-02 06:15:08
     * @param {IData} data
     */
    calcDynaClass(data) {
        if (this.model.dynaClass) {
            const dynaClass = calcDynaClass(this.model.dynaClass, data);
            this.state.class.containerDyna = dynaClass;
        }
        if (this.model.labelDynaClass) {
            const dynaClass = calcDynaClass(this.model.labelDynaClass, data);
            this.state.class.labelDyna = dynaClass;
        }
    }
    /**
     * 计算项的禁用状态
     *
     * @param {IData} data
     */
    calcDetailDisabled(data) {
        let { disabled } = this.dynaLogicResult;
        // 上层计算为启用时计算预定义项启用逻辑
        if (disabled !== true && this.form.scheduler) {
            const itemEnable = this.form.scheduler.triggerItemEnable(this.model.id, {
                data: [data],
            });
            if (itemEnable !== undefined) {
                disabled = !itemEnable;
            }
        }
        // 有值的时候才会去修改state
        if (disabled !== undefined) {
            this.state.disabled = disabled;
        }
    }
    /**
     * 计算项的显示状态
     *
     * @param {IData} data
     */
    calcDetailVisible(data) {
        let { visible } = this.dynaLogicResult;
        // 上层计算为显示时计算预定义项显示逻辑
        if (visible !== false && this.form.scheduler) {
            const itemVIsible = this.form.scheduler.triggerItemVisible(this.model.id, {
                data: [data],
            });
            if (itemVIsible !== undefined) {
                visible = itemVIsible;
            }
        }
        // 有值的时候才会去修改state
        if (visible !== undefined) {
            this.state.visible = visible;
        }
    }
    /**
     * 计算项的必填状态
     *
     * @param {IData} data
     */
    calcDetailRequired(data) {
        let { required } = this.dynaLogicResult;
        // 上层计算为启用时计算预定义项空输入逻辑
        if (required !== true && this.form.scheduler) {
            const itemAllowEmpty = this.form.scheduler.triggerItemBlank(this.model.id, {
                data: [data],
            });
            if (itemAllowEmpty !== undefined) {
                required = !itemAllowEmpty;
            }
        }
        // 有值的时候才会去修改state
        if (required !== undefined) {
            this.state.required = required;
        }
    }
    /**
     * 执行脚本代码
     * - 表单项值变更，点击，获取焦点，失去焦点时触发
     * @protected
     * @param {('SCRIPTCODE_CHANGE'
     *       | 'SCRIPTCODE_CLICK'
     *       | 'SCRIPTCODE_FOCUS'
     *       | 'SCRIPTCODE_BLUR')} logicCat 逻辑类型 SCRIPTCODE_CHANGE：表单项值变更（脚本处理）、 SCRIPTCODE_CLICK：表单项点击（脚本处理）、 SCRIPTCODE_FOCUS：表单项获取焦点（脚本处理）、 SCRIPTCODE_BLUR：表单项失去焦点（脚本处理）
     * @memberof FormDetailController
     */
    executeScriptCode(logicCat) {
        var _a;
        (_a = this.model.defdgroupLogics) === null || _a === void 0 ? void 0 : _a.forEach(logic => {
            var _a;
            const child = (_a = logic.defdlogics) === null || _a === void 0 ? void 0 : _a[0];
            if (logic.logicCat === logicCat && child && child.value) {
                ScriptFactory.execScriptFn({
                    ctrl: this.form,
                    view: this.form.view,
                    data: this.form.data,
                    params: this.params,
                    context: this.context,
                }, child.value);
            }
        });
    }
    /**
     * 点击事件
     * @author lxm
     * @date 2023-10-11 05:03:26
     */
    async onClick(event) {
        if (event) {
            // 阻止冒泡
            event.stopPropagation();
        }
        this.executeScriptCode('SCRIPTCODE_CLICK');
        this.form.evt.emit('onFormDetailEvent', {
            formDetailName: this.model.id,
            formDetailEventName: FormDetailEventName.CLICK,
            event,
        });
    }
}
