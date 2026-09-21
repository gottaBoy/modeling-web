import { IApiMDViewCall } from './i-api-md-view.call';
/**
 * @description 实体多表单编辑视图（部件视图）能力
 * @export
 * @interface IApiMEditView9Call
 * @extends {Omit<IApiMDViewCall, 'New'>}
 */
export interface IApiMEditView9Call extends Omit<IApiMDViewCall, 'New'> {
    /**
     * @description 打开新建数据视图
     * @type {{
     *     args: undefined;
     *   }}
     * @memberof IApiMEditView9Call
     */
    New: {
        args: undefined;
    };
    /**
     * @description 刷新视图
     * @type {{
     *     args: undefined;
     *   }}
     * @memberof IApiMEditView9Call
     */
    Refresh: {
        args: undefined;
    };
    /**
     * @description 保存
     * @type {{
     *     args: undefined;
     *   }}
     * @memberof IApiMEditView9Call
     */
    Save: {
        args: undefined;
    };
    /**
     * @description 保存并关闭
     * @type {{
     *     args: undefined;
     *   }}
     * @memberof IApiMEditView9Call
     */
    SaveAndExit: {
        args: undefined;
    };
}
//# sourceMappingURL=i-api-medit-view9.call.d.ts.map