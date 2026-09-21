import { VNode } from 'preact';

type Option = {
    value: string;
    label: string;
};
interface MultipleSelectProps {
    /**
     * @description 选项列表
     * @type {Option[]}
     * @memberof MultipleSelectProps
     */
    options: Option[];
    /**
     * @description 图标
     * @memberof MultipleSelectProps
     */
    icon?: () => VNode;
    /**
     * @description 占位符文本
     * @type {string}
     * @memberof MultipleSelectProps
     */
    placeholder?: string;
    /**
     * @description 当前选中值
     * @type {string[]}
     * @memberof MultipleSelectProps
     */
    value?: string[];
    /**
     * 启用搜索
     */
    enableSearch?: boolean;
    /**
     * 弹出框样式
     */
    popperStyle?: any;
    /**
     * 类名
     */
    className?: string;
    /**
     * @description 值变更回调
     * @memberof MultipleSelectProps
     */
    onChange?: (value: string[]) => void;
    /**
     * 搜索
     * @param value
     * @returns
     */
    onSearch?: (value: string) => Promise<Option[]>;
    /**
     * 启用状态变更
     * @returns
     */
    onEnableChange?: () => void;
}
export declare const MultipleSelect: (props: MultipleSelectProps) => import("preact").JSX.Element;
export {};
