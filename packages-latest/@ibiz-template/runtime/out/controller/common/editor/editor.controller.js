import { DataTypes } from '@ibiz-template/core';
import dayjs from 'dayjs';
import { convertNavData } from '../../../utils';
import { ValueExUtil } from '../../utils';
import { PredefinedAttributes } from '../../../constant';
/**
 * 编辑器控制器基类
 *
 * @author lxm
 * @date 2022-08-24 20:08:15
 * @export
 * @class EditorController
 */
export class EditorController {
    /**
     * 是否只读
     *
     * @author lxm
     * @date 2022-12-12 21:12:51
     * @readonly
     */
    get readonly() {
        return !!this.model.readOnly;
    }
    /**
     * 值格式化
     * @author lxm
     * @date 2024-01-11 10:18:33
     * @readonly
     * @type {(string | undefined)}
     */
    get valueFormat() {
        return this.parent.valueFormat;
    }
    /**
     * 数据类型
     * @author lxm
     * @date 2024-01-11 10:18:55
     * @readonly
     * @type {(number  | undefined)}
     */
    get dataType() {
        return this.parent.dataType;
    }
    /**
     * 触发值变更模式
     *
     * @readonly
     * @type {string}
     * @memberof EditorController
     */
    get triggerMode() {
        if (this.editorParams.triggerMode) {
            return this.editorParams.triggerMode;
        }
        if (this.editorParams.triggermode) {
            return this.editorParams.triggermode;
        }
        const { form, grid, treeGrid } = this.parent;
        const control = form || grid || treeGrid;
        if (control === null || control === void 0 ? void 0 : control.controlParams.triggermode) {
            return control.controlParams.triggermode;
        }
        const app = ibiz.hub.getApp(this.context.srfappid);
        const appUserParam = app.model.userParam || {};
        if (appUserParam.triggerMode) {
            return appUserParam.triggerMode;
        }
        return 'blur';
    }
    /**
     * 无数据时是否显示占位文本
     *
     * @readonly
     * @type {boolean}
     * @memberof EditorController
     */
    get emptyShowPlaceholder() {
        var _a, _b;
        if (!this.placeHolder)
            return false;
        // 表单控件参数
        if ((_b = (_a = this.parent.form) === null || _a === void 0 ? void 0 : _a.controlParams) === null || _b === void 0 ? void 0 : _b.emptyshowmode) {
            return (this.parent.form.controlParams.emptyshowmode ===
                'PLACEHOLDER');
        }
        return ibiz.config.common.emptyShowMode === 'PLACEHOLDER';
    }
    /**
     * @description 获取下载凭证参数
     * @readonly
     * @type {{
     *     appEntityTag?: string;
     *     dataFieldTag?: string;
     *   }}
     * @memberof EditorController
     */
    get downloadTicketParams() {
        const downloadTicketParams = {};
        if (!this.model.editorParams) {
            return downloadTicketParams;
        }
        if (this.model.editorParams.appentitytag) {
            Object.assign(downloadTicketParams, {
                appEntityTag: this.model.editorParams.appentitytag,
            });
        }
        if (this.model.editorParams.datafieldtag) {
            Object.assign(downloadTicketParams, {
                dataFieldTag: this.model.editorParams.datafieldtag,
            });
        }
        return downloadTicketParams;
    }
    /**
     * @description 当前视图
     * @readonly
     * @type {IViewController}
     * @memberof EditorController
     */
    get view() {
        const ctrl = this.parent.form ||
            this.parent.grid ||
            this.parent.treeGrid ||
            this.parent.panel;
        return ctrl.view;
    }
    /**
     * 当前部件
     *
     * @readonly
     * @type {IControlController}
     * @memberof EditorController
     */
    get ctrl() {
        const ctrl = this.parent.form ||
            this.parent.grid ||
            this.parent.treeGrid ||
            this.parent.panel;
        return ctrl;
    }
    /**
     * Creates an instance of EditorController.
     * @author lxm
     * @date 2022-08-24 20:08:19
     * @param {T} model
     */
    constructor(model, parent) {
        /**
         * 编辑器样式
         *
         * @author chitanda
         * @date 2023-09-12 16:09:40
         * @type {IData}
         */
        this.style = {};
        /**
         * 占位
         * @return {*}
         * @author: zhujiamin
         * @Date: 2022-08-25 14:33:14
         */
        this.placeHolder = '';
        /**
         * 占位
         * @return {*}
         * @author: zhujiamin
         * @Date: 2022-08-25 14:33:14
         */
        this.editorParams = {};
        /**
         * 额外参数
         *
         * @type {IData}
         * @memberof EditorController
         */
        this.extraParams = {};
        this.model = model;
        this.parent = parent;
        this.context = parent.context;
        this.params = parent.params;
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
        var _a, _b, _c, _d;
        // 异步初始化
        if (this.model.placeHolder) {
            this.placeHolder = this.model.placeHolder;
        }
        if ((_a = this.model.phlanguageRes) === null || _a === void 0 ? void 0 : _a.lanResTag) {
            this.placeHolder = ibiz.i18n.t((_b = this.model.phlanguageRes) === null || _b === void 0 ? void 0 : _b.lanResTag, this.placeHolder);
        }
        if (this.model.editorParams) {
            Object.keys(this.model.editorParams).forEach(key => {
                this.editorParams[key] = this.model.editorParams[key];
            });
        }
        if (this.model.editorWidth) {
            const width = this.model.editorWidth;
            if (width > 0 && width <= 1) {
                this.style.width = `${width * 100}%`;
            }
            else {
                this.style.width = `${width}px`;
            }
        }
        if (this.model.editorHeight) {
            const height = this.model.editorHeight;
            if (height > 0 && height <= 1) {
                this.style.height = `${height * 100}%`;
            }
            else {
                this.style.height = `${height}px`;
            }
        }
        if (this.model.cssStyle) {
            // 解析字符串形式的cssStyle为对象
            const stylesObject = {};
            const stylesArray = this.model.cssStyle.split(';').filter(Boolean);
            stylesArray.forEach(style => {
                const [key, value] = style.split(':');
                if (key && value) {
                    stylesObject[key.trim()] = value.trim();
                }
                Object.assign(this.style, stylesObject);
            });
        }
        // 值项过滤掉自身
        if (this.model.editorItems) {
            this.model.editorItems = this.model.editorItems.filter((item) => item.id !== this.model.id);
        }
        // 合并语义化埋点属性
        const controlAttributes = ((_d = (_c = this.parent.model) === null || _c === void 0 ? void 0 : _c.controlAttributes) === null || _d === void 0 ? void 0 : _d.filter((item) => PredefinedAttributes.CLASSNAMES === item.attrName ||
            PredefinedAttributes.STYLES === item.attrName)) || [];
        if (controlAttributes.length) {
            if (!this.model.controlAttributes)
                this.model.controlAttributes = [];
            this.model.controlAttributes.push(...controlAttributes);
        }
        this.initExtraParams();
    }
    /**
     * @description 初始化额外参数
     * @protected
     * @memberof FormItemController
     */
    initExtraParams() {
        var _a, _b;
        // 额外参数
        const extraParams = {};
        // 是否隐藏无值的单位
        let emptyHiddenUnit = true;
        if (((_a = this.parent) === null || _a === void 0 ? void 0 : _a.emptyHiddenUnit) === false) {
            emptyHiddenUnit = (_b = this.parent) === null || _b === void 0 ? void 0 : _b.emptyHiddenUnit;
        }
        // 编辑器参数优先级最高
        const { EMPTYHIDDENUNIT, emptyhiddenunit } = this.editorParams;
        if (EMPTYHIDDENUNIT) {
            emptyHiddenUnit = Object.is(EMPTYHIDDENUNIT, 'true');
        }
        if (emptyhiddenunit) {
            emptyHiddenUnit = Object.is(emptyhiddenunit, 'true');
        }
        Object.assign(extraParams, {
            emptyHiddenUnit,
        });
        this.extraParams = extraParams;
    }
    /**
     * 公共参数处理，计算上下文和视图参数
     *
     * @return {*}
     * @author: zhujiamin
     * @Date: 2022-08-25 15:44:14
     */
    handlePublicParams(data, context, params) {
        const { navigateContexts, navigateParams } = this
            .model;
        let selfContext = {};
        if (navigateContexts && data) {
            selfContext = convertNavData(navigateContexts, data, params, context);
        }
        const _context = Object.assign(context.clone(), selfContext);
        let selfParams = {};
        if (navigateParams && data) {
            selfParams = convertNavData(navigateParams, data, params, context);
        }
        return { context: _context, params: selfParams };
    }
    /**
     * 字符串转对象、数组对象
     *
     * @author chitanda
     * @date 2023-08-02 17:08:03
     * @param {string} value
     * @return {*}  {(IData | IData[] | undefined)}
     */
    toObj(value) {
        if (!value) {
            return undefined;
        }
        // eslint-disable-next-line no-new-func
        const func = new Function(`return (${value});`);
        return func();
    }
    /**
     * 字符串布尔转布尔类型
     *
     * @author chitanda
     * @date 2023-08-02 17:08:34
     * @param {string} value
     * @return {*}  {boolean}
     */
    toBoolean(value) {
        return Object.is('true', value);
    }
    /**
     * 值格式化
     * @author lxm
     * @date 2023-08-25 05:18:11
     * @param {unknown} value
     * @return {*}  {string}
     */
    formatValue(value = '') {
        // 根据数据类型增强转换显示文本
        if (this.model.valueType !== 'SIMPLE') {
            return ValueExUtil.toText(this.model, value);
        }
        // 根据格式化配置格式化显示
        const strVal = `${value}`;
        if (!this.valueFormat) {
            return strVal;
        }
        const isDate = DataTypes.isDate(this.dataType);
        if (isDate) {
            const formatVal = dayjs(strVal).format(this.valueFormat);
            if (formatVal !== 'Invalid Date') {
                return formatVal;
            }
            return strVal;
        }
        return ibiz.util.text.format(strVal, this.valueFormat);
    }
}
