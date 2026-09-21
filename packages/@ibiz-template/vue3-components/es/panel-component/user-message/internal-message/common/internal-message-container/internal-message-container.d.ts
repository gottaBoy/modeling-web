import { PropType } from 'vue';
import { IInternalMessage } from '@ibiz-template/core';
import './internal-message-container.scss';
import { IInternalMessageProvider } from '@ibiz-template/runtime';
export type ToolbarItem = {
    /**
     * 提示文本信息
     * @author lxm
     * @date 2024-01-30 03:27:33
     * @type {string}
     */
    tooltip: string;
    /**
     * 图标名称
     * @author lxm
     * @date 2024-01-30 03:27:23
     * @type {string}
     */
    icon: string;
    /**
     * 唯一标识
     * @author lxm
     * @date 2024-01-30 03:27:16
     * @type {string}
     */
    key: string;
};
export declare const InternalMessageContainer: import("vue").DefineComponent<{
    message: {
        type: PropType<IInternalMessage>;
        required: true;
    };
    provider: {
        type: PropType<IInternalMessageProvider>;
        required: true;
    };
    clickable: {
        type: BooleanConstructor;
        default: undefined;
    };
    toolbarItems: {
        type: {
            (arrayLength: number): ToolbarItem[];
            (...items: ToolbarItem[]): ToolbarItem[];
            new (arrayLength: number): ToolbarItem[];
            new (...items: ToolbarItem[]): ToolbarItem[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => ToolbarItem[];
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    isUnread: import("vue").ComputedRef<boolean>;
    isClickable: import("vue").ComputedRef<boolean>;
    finalToolbarItems: import("vue").ComputedRef<ToolbarItem[]>;
    onToolbarClick: (event: MouseEvent, key: string) => void;
    onClick: (event: MouseEvent) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    toolbarClick: (_key: string) => true;
    close: () => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    message: {
        type: PropType<IInternalMessage>;
        required: true;
    };
    provider: {
        type: PropType<IInternalMessageProvider>;
        required: true;
    };
    clickable: {
        type: BooleanConstructor;
        default: undefined;
    };
    toolbarItems: {
        type: {
            (arrayLength: number): ToolbarItem[];
            (...items: ToolbarItem[]): ToolbarItem[];
            new (arrayLength: number): ToolbarItem[];
            new (...items: ToolbarItem[]): ToolbarItem[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => ToolbarItem[];
    };
}>> & {
    onClose?: (() => any) | undefined;
    onToolbarClick?: ((_key: string) => any) | undefined;
}, {
    clickable: boolean;
    toolbarItems: ToolbarItem[];
}, {}>;
