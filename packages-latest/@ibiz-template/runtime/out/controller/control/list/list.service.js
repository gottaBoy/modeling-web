import { clone } from '@ibiz-template/core';
import { MDControlService, UIMapField } from '../../../service';
/**
 * 列表部件服务
 * @author lxm
 * @date 2023-05-15 09:53:35
 * @export
 * @class GridService
 * @extends {MDControlService<IDEList>}
 */
export class ListService extends MDControlService {
    /**
     * @description 移动并排序数据
     * @param {IContext} context
     * @param {ControlVO} data
     * @param {IData} args
     * @returns {*}  {Promise<IHttpResponse<ControlVO[]>>}
     * @memberof ListService
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
     * @author lxm
     * @date 2022-08-31 18:08:37
     */
    initUIDataMap() {
        var _a;
        super.initUIDataMap();
        // *初始化表格数据项的属性映射
        (_a = this.model.delistDataItems) === null || _a === void 0 ? void 0 : _a.forEach(item => {
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
