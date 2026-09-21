import { VNode } from 'preact';

type Option = {
    value: string | number;
    label: string;
};
interface SingleSelectProps {
    /**
     * 选项列表
     *
     * @type {Option[]}
     * @memberof SingleSelectProps
     */
    options: Option[];
    /**
     * 当前选中值
     *
     * @type {string | number}
     * @memberof SingleSelectProps
     */
    value?: string | number;
    /**
     * 占位符文本
     *
     * @type {string}
     * @memberof SingleSelectProps
     */
    placeholder?: string;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof SingleSelectProps
     */
    disabled?: boolean;
    /**
     * 启用搜索
     *
     * @type {boolean}
     * @memberof SingleSelectProps
     */
    enableSearch?: boolean;
    /**
     * 显示边框
     *
     * @type {boolean}
     * @memberof SingleSelectProps
     */
    showBorder?: boolean;
    /**
     * 弹出框样式
     *
     * @type {any}
     * @memberof SingleSelectProps
     */
    popperStyle?: any;
    /**
     * 类名
     *
     * @type {string}
     * @memberof SingleSelectProps
     */
    className?: string;
    /**
     * 图标
     * @returns
     */
    icon?: () => VNode;
    /**
     * 值改变回调
     *
     */
    onChange?: (value: string | number) => void;
    /**
     * 搜索
     * @param value
     * @returns
     */
    onSearch?: (value: string) => Promise<Option[]>;
}
export declare const SingleSelect: (props: SingleSelectProps) => import("preact").JSX.Element;
export {};
