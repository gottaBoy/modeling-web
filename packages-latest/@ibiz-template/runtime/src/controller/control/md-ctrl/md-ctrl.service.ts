import { IDEMobMDCtrl } from '@ibiz/model-core';
import { MDControlService, UIMapField } from '../../../service';

/**
 * 多数据部件服务
 *
 * @author lxm
 * @date 2023-05-15 09:53:35
 * @export
 * @class MDCtrlService
 * @extends {MDControlService<IDEMobMDCtrl>}
 */
export class MDCtrlService extends MDControlService<IDEMobMDCtrl> {
  /**
   * 初始化属性映射
   *
   * @author lxm
   * @date 2022-08-31 18:08:37
   */
  initUIDataMap(): void {
    super.initUIDataMap();
    // *初始化表格数据项的属性映射
    this.model.delistDataItems?.forEach(item => {
      const uiKey = item.id!.toLowerCase();
      const deField = item.appDEFieldId;
      let mapField: UIMapField;
      // 后台实体属性
      if (deField) {
        const deFieldKey = deField.toLowerCase();
        mapField = new UIMapField(uiKey, deFieldKey, {
          isOriginField: true,
          dataType: item.dataType,
        });
      } else {
        // 前台属性
        mapField = new UIMapField(uiKey, uiKey);
      }
      this.dataUIMap.set(uiKey, mapField);
    });
  }
}
