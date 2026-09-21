import { IChatToolbarItem } from '../../interface';
import { MaterialHelper } from './material-helper';

export declare class CommonHelper extends MaterialHelper {
    /**
     * 执行操作
     *
     * @author tony001
     * @date 2025-02-28 15:02:48
     * @return {*}  {Promise<void>}
     */
    excuteAction(event: MouseEvent, item?: IChatToolbarItem): Promise<void>;
}
