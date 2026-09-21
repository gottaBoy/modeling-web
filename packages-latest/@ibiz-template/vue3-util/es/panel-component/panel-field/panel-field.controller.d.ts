import { IEditorContainerController, IEditorController, IEditorProvider, PanelItemController } from '@ibiz-template/runtime';
import { IPanelField } from '@ibiz/model-core';
import { PanelFieldState } from './panel-field.state';
/**
 * 面板属性项控制器
 *
 * @export
 * @class PanelFieldController
 * @extends {PanelItemController<IPanelField>}
 */
export declare class PanelFieldController extends PanelItemController<IPanelField> implements IEditorContainerController {
    /**
     * @description 面板属性项控制器状态
     * @exposedoc
     * @type {PanelFieldState}
     * @memberof PanelFieldController
     */
    state: PanelFieldState;
    /**
     * @description 单位名称
     * @exposedoc
     * @type {(string | undefined)}
     * @memberof PanelFieldController
     */
    unitName: string | undefined;
    /**
     * @description 可冒泡点击事件的编辑器类型
     * @static
     * @memberof PanelFieldController
     */
    static enableClickType: string[];
    /**
     * @exposedoc
     * @description 值格式化
     * @readonly
     * @type {(string | undefined)}
     * @memberof PanelFieldController
     */
    get valueFormat(): string | undefined;
    /**
     * @exposedoc
     * @description 数据类型
     * @readonly
     * @type {(number | undefined)}
     * @memberof PanelFieldController
     */
    get dataType(): number | undefined;
    /**
     * @exposedoc
     * @description 上下文
     * @readonly
     * @type {IContext}
     * @memberof PanelFieldController
     */
    get context(): IContext;
    /**
     * @exposedoc
     * @description 视图参数
     * @readonly
     * @type {IParams}
     * @memberof PanelFieldController
     */
    get params(): IParams;
    /**
     * @exposedoc
     * @description 父容器数据对象数据
     * @readonly
     * @type {IData}
     * @memberof PanelFieldController
     */
    get data(): IData;
    /**
     * @exposedoc
     * @description 面板属性成员的值
     * @readonly
     * @type {(string | number)}
     * @memberof PanelFieldController
     */
    get value(): string | number;
    /**
     * @exposedoc
     * @description 编辑器控制器
     * @type {IEditorController}
     * @memberof PanelFieldController
     */
    editor?: IEditorController;
    /**
     * @description 编辑器适配器
     * @type {IEditorProvider}
     * @memberof PanelFieldController
     */
    editorProvider?: IEditorProvider;
    protected createState(): PanelFieldState;
    /**
     * @description 值校验
     * @returns {*}  {Promise<boolean>}
     * @memberof PanelFieldController
     */
    validate(): Promise<boolean>;
    /**
     * @description 初始化
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof PanelFieldController
     */
    protected onInit(): Promise<void>;
    /**
     * @exposedoc
     * @description 设置面板数据的值
     * @param {unknown} value
     * @param {string} [name]
     * @returns {*}  {Promise<void>}
     * @memberof PanelFieldController
     */
    setDataValue(value: unknown, name?: string): Promise<void>;
    /**
     * 聚焦事件
     * @author lxm
     * @date 2023-10-11 05:03:26
     */
    onFocus(event: MouseEvent): void;
    /**
     * 失焦事件
     * @author lxm
     * @date 2023-10-11 05:03:26
     */
    onBlur(event: MouseEvent): void;
    /**
     * 回车事件
     * @author lxm
     * @date 2023-10-11 05:03:26
     */
    onEnter(event: MouseEvent): void;
    /**
     * @description 点击事件
     * @param {MouseEvent} [event]
     * @memberof PanelFieldController
     */
    onClick(event?: MouseEvent): void;
}
//# sourceMappingURL=panel-field.controller.d.ts.map