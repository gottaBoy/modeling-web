import { IChatToolbarItem } from '../../../interface';
export interface ChatToolberItemProps {
    /**
     * 工具栏项模型
     *
     * @type {IChatToolbarItem}
     * @memberof ChatToolberItemProps
     */
    model: IChatToolbarItem;
    /**
     * 业务数据
     *
     * @type {*}
     * @memberof ChatToolberItemProps
     */
    data: any;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof ChatToolberItemProps
     */
    disabled?: boolean;
    /**
     * 类名
     *
     * @type {string}
     * @memberof ChatToolberItemProps
     */
    className?: string;
    /**
     * 按钮类型
     *
     * @type {('default' | 'circle')}
     * @memberof ChatToolberItemProps
     */
    buttonType?: 'default' | 'circle';
    /**
     * 点击事件
     *
     * @memberof ChatToolberItemProps
     */
    onClick: (e: MouseEvent, item: IChatToolbarItem) => void;
}
export declare const ChatToolberItem: (props: ChatToolberItemProps) => import("preact").JSX.Element;
