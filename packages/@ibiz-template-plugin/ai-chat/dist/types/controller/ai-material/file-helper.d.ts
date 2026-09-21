import { IChatToolbarItem, IMaterial } from '../../interface';
import { MaterialHelper } from './material-helper';
export declare class FileHelper extends MaterialHelper {
    /**
     * 执行操作
     *
     * @author tony001
     * @date 2025-02-28 15:02:27
     * @return {*}  {Promise<void>}
     */
    excuteAction(event: MouseEvent, item?: IChatToolbarItem): Promise<void>;
    /**
     * 构建素材对象
     *
     * @author tony001
     * @date 2025-02-28 15:02:12
     * @param {File} file
     * @return {*}  {IMaterial}
     */
    buildMaterialObject(file: File): IMaterial;
}
