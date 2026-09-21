import { IEditorContainerController, IEditorController, IEditorProvider, PanelItemController } from '@ibiz-template/runtime';
import { IPanelField } from '@ibiz/model-core';
import { PanelFieldState } from './panel-field.state';
/**
 * 面板按钮控制器
 *
 * @export
 * @class PanelFieldController
 * @extends {PanelItemController<IPanelField>}
 */
export declare class PanelFieldController extends PanelItemController<IPanelField> implements IEditorContainerController {
    state: PanelFieldState;
    unitName: string | undefined;
    /**
     * 值格式化
     * @author lxm
     * @date 2023-05-24 05:46:56
     * @readonly
     * @type {(string | undefined)}
     */
    get valueFormat(): string | undefined;
    get dataType(): number | undefined;
    get context(): IContext;
    get params(): IParams;
    /**
     * 父容器数据对象数据
     * @author lxm
     * @date 2023-07-15 01:33:58
     * @readonly
     * @type {IData}
     */
    get data(): IData;
    /**
     * 面板属性成员的值
     * @author lxm
     * @date 2023-07-14 02:30:58
     * @readonly
     */
    get value(): string | number;
    /**
     * 编辑器控制器
     *
     * @author lxm
     * @date 2022-08-24 20:08:42
     * @type {IEditorController}
     */
    editor?: IEditorController;
    /**
     * 编辑器适配器
     *
     * @author lxm
     * @date 2022-08-24 20:08:42
     */
    editorProvider?: IEditorProvider;
    protected createState(): PanelFieldState;
    /**
     * 值校验
     * @return {*}  {Promise<boolean>}
     * @memberof PanelFieldController
     */
    validate(): Promise<boolean>;
    /**
     * 初始化
     *
     * @author lxm
     * @date 2022-08-24 20:08:42
     * @protected
     * @returns {*}  {Promise<void>}
     */
    protected onInit(): Promise<void>;
    /**
     * 设置面板数据的值
     *
     * @author lxm
     * @date 2022-08-24 10:08:40
     * @param {unknown} value 要设置的值
     * @param {string} name 要设置的面板数据的属性名称
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
}
//# sourceMappingURL=panel-field.controller.d.ts.map