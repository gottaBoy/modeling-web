import { Ref } from 'vue';
import { DRTabController } from './drtab.controller';
/**
 * 获取显示内容
 *
 * @author ljx
 * @date 2024-06-12 17:09:09
 * @export
 * @param {DRTabController} c
 * @param {Ref<IData | undefined>} controlRef
 * @param {IData} counterData
 * @returns {*}
 */
export declare function useAppDRTab(c: DRTabController, controlRef: Ref<IData | undefined>, counterData: IData): {
    visibleItems: Ref<IData>;
    moreItems: Ref<IData>;
};
