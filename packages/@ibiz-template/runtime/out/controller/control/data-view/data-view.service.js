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
