import { clone } from '@ibiz-template/core';
import { MDControlService, UIMapField } from '../../../service';
/**
 * 数据视图（卡片）部件服务
 *
 * @export
 * @class DataViewControlService
 * @extends {MDControlService<IDEDataView>}
 */
export class DataViewControlService extends MDControlService {
    /**
     * @description 移动并排序数据
     * @param {IContext} context
     * @param {ControlVO} data
     * @param {IData} args
     * @returns {*}  {Promise<IHttpResponse<ControlVO[]>>}
     * @memberof DataViewControlService
     */
    async moveOrderItem(context, data, args) {
        const moveAction = this.model.moveControlAction.appDEMethodId;
        const params = clone(data.getOrigin());
        Object.assign(params, args);
        let res = await this.exec(moveAction, context, params, {
            srfupdateitem: true,
        });
        res = this.handleResponse(res);
        return res;
    }
    /**
     * 初始化属性映射
     *
     * @memberof DataViewControlService
     */
    initUIDataMap() {
        var _a;
        super.initUIDataMap();
        // *初始化数据项的属性映射
        (_a = this.model.dedataViewDataItems) === null || _a === void 0 ? void 0 : _a.forEach(item => {
            const uiKey = item.id.toLowerCase();
            const deField = item.appDEFieldId;
            let mapField;
            // 后台实体属性
            if (deField) {
                const deFieldKey = deField.toLowerCase();
                mapField = new UIMapField(uiKey, deFieldKey, {
                    isOriginField: true,
                    dataType: item.dataType,
                });
            }
            else {
                // 前台属性
                mapField = new UIMapField(uiKey, uiKey);
            }
            this.dataUIMap.set(uiKey, mapField);
        });
    }
}
