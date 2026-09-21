import { IApiContext, IApiParams } from '@ibiz-template/core';
import { IDETreeColumn } from '@ibiz/model-core';
import { IApiTreeGridEXController } from '../i-api-tree-grid-ex.controller';
/**
 * @description 树表格增强列
 * @export
 * @interface IApiTreeGridExColumnController
 */
export interface IApiTreeGridExColumnController {
    /**
     * @description 树表格列模型
     * @type {IDETreeColumn}
     * @memberof IApiTreeGridExColumnController
     */
    readonly model: IDETreeColumn;
    /**
     * @description 树表格控制器(反向引用)
     * @type {IApiTreeGridEXController}
     * @memberof IApiTreeGridExColumnController
     */
    readonly treeGrid: IApiTreeGridEXController;
    /**
     * @description 是否是自适应列
     * @type {boolean}
     * @memberof IApiTreeGridExColumnController
     */
    isAdaptiveColumn: boolean;
    /**
     * @description 是否是脚本代码列
     * @type {boolean}
     * @memberof IApiTreeGridExColumnController
     */
    isCustomCode: boolean;
    /**
     * @description 上下文
     * @type {IApiContext}
     * @memberof IApiTreeGridExColumnController
     */
    readonly context: IApiContext;
    /**
     * @description 视图参数
     * @type {IApiParams}
     * @memberof IApiTreeGridExColumnController
     */
    readonly params: IApiParams;
}
//# sourceMappingURL=i-api-grid-ex-column.controller.d.ts.map