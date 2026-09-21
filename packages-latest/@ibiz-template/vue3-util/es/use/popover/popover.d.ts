import { Ref } from 'vue';
import { ControlController } from '@ibiz-template/runtime';
/**
 * @description 管理部件popover层级
 * @export
 * @param {ControlController} controller
 */
export declare function useControlPopoverzIndex(controller: ControlController): void;
/**
 * 手动管理popover层级
 *
 * @export
 * @param {string} uuid
 * @param {string} zIndexClass
 */
export declare function usePopoverzIndex(): {
    popoverid: string;
    setPopoverZIndex: (zIndexClass: string) => void;
};
/**
 * 判断两个元素是否存在任意层级的共同祖先
 *
 * @param element1 第一个元素（允许为 null，表示未挂载的虚拟节点）
 * @param element2 第二个元素（允许为 null，表示未挂载的虚拟节点）
 * @returns 是否共享至少一个共同祖先（包括自身或父子关系）
 */
export declare function shareCommonAncestor(element1: Node | null, element2: Node | null): boolean;
/**
 * 手动管理popover打开关闭状态
 *
 * @author tony001
 * @date 2025-02-27 16:02:17
 * @export
 * @param {Ref<unknown>} triggerRef
 * @param {(ele: IData) => Node} getElement
 * @return {*}  {{
 *   popoverVisible: Ref<boolean>;
 *   setPopoverVisible: (visible: boolean) => void;
 * }}
 */
export declare function usePopoverVisible(triggerRef: Ref<unknown>, getElement: (ele: IData) => Node): {
    popoverVisible: Ref<boolean>;
    setPopoverVisible: (visible: boolean) => void;
};
//# sourceMappingURL=popover.d.ts.map