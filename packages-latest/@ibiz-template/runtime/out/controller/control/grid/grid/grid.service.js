import { RuntimeModelError } from '@ibiz-template/core';
import { MDControlService, UIMapField } from '../../../../service';
import { calcDeCodeNameById } from '../../../../model';
/**
 * 表格部件服务
 * @author lxm
 * @date 2023-05-15 09:53:35
 * @export
 * @class GridService
 * @extends {MDControlService<IDEGrid>}
 */
export class GridService extends MDControlService {
    /**
     * 初始化属性映射
     *
     * @author lxm
     * @date 2022-08-31 18:08:37
     */
    initUIDataMap() {
        var _a;
        super.initUIDataMap();
        if (this.model.degridColumns) {
            const dataItems = this.model.degridDataItems || [];
            // *初始化表格属性列和实体数据的属性映射
            (_a = this.model.degridColumns) === null || _a === void 0 ? void 0 : _a.forEach((column) => {
                const uiKey = column.id.toLowerCase();
                // 列映射应用实体属性
                const deField = column.appDEFieldId;
                let mapField;
                // 后台实体属性
                if (deField) {
                    const deFieldKey = deField.toLowerCase();
                    const dataItem = dataItems.find(item => item.id === column.dataItemName);
                    if (dataItem) {
                        mapField = new UIMapField(uiKey, deFieldKey, {
                            isOriginField: true,
                            dataType: dataItem.dataType,
                        });
                    }
                    else {
                        throw new RuntimeModelError(column, ibiz.i18n.t('runtime.controller.control.grid.corresponding', {
                            deField,
                        }));
                    }
                }
                else {
                    // 前台属性
                    mapField = new UIMapField(uiKey, uiKey);
                }
                this.dataUIMap.set(uiKey, mapField);
            });
        }
    }
    /**
     * 编辑列更新
     *
     * @author lxm
     * @date 2022-09-15 21:09:34
     * @param {string} methodName
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @returns {*}  {Promise<IHttpResponse<ControlVO>>}
     */
    async updateGridEditItem(methodName, context, data = {}, params = {}) {
        const entityService = await this.app.deService.getService(context, this.model.appDataEntityId);
        Object.assign(params, { srfupdateitem: true });
        let res = await entityService.exec(methodName, context, data, params);
        res = this.handleResponse(res);
        return res;
    }
    /**
     * 移动并排序数据
     *
     * @param {IContext} context
     * @param {ControlVO} data
     * @param {IData} args
     * @return {*}  {Promise<IHttpResponse<ControlVO[]>>}
     * @memberof GridService
     */
    async moveOrderItem(context, data, params) {
        const moveAction = this.model.moveControlAction.appDEMethodId;
        const deName = calcDeCodeNameById(this.model.appDataEntityId);
        const tempContext = context.clone();
        tempContext[deName] = data.srfkey;
        let res = await this.exec(moveAction, tempContext, params);
        res = this.handleResponse(res);
        return res;
    }
}
