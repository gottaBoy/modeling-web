import { Ref } from 'vue';
/**
 * 给指定元素添加聚焦和失焦事件
 * 点击指定元素时会触发聚焦事件
 * 已经聚焦之后，点击指定元素外部会触发失焦事件。
 * @author lxm
 * @date 2023-05-31 08:36:04
 * @export
 * @return {*}
 */
export declare function useFocusAndBlur(focus: () => void, blur: () => void): {
    componentRef: Ref<any>;
    isFocus: Ref<boolean>;
    doBlur: () => void;
    pause: () => void;
    stop: () => void;
};
//# sourceMappingURL=focus-blur.d.ts.map