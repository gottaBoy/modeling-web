import { Editor } from '@tiptap/core';
import { AiChatController } from '../../controller';

export interface ChatEditorProps {
    /**
     * @description 聊天控制器
     * @type {AiChatController}
     * @memberof ChatEditorProps
     */
    c: AiChatController;
    /**
     * @description 空白占位
     * @type {string}
     * @memberof ChatEditorProps
     */
    placeholder?: string;
    /**
     * @description 编辑器值
     * @type {string}
     * @memberof ChatEditorProps
     */
    value: string;
    /**
     * @description 是否禁用
     * @type {boolean}
     * @memberof ChatEditorProps
     */
    disabled: boolean;
    /**
     * @description 编辑器创建事件
     * @memberof ChatEditorProps
     */
    onCreate: (editor: Editor) => void;
    /**
     * @description 值改变事件
     * @memberof ChatEditorProps
     */
    onChange: (value: string) => void;
    /**
     * @description 键盘输入事件
     * @memberof ChatEditorProps
     */
    onKeyDown: (e: KeyboardEvent) => boolean | void;
}
export declare const ChatEditor: ({ c, value, disabled, placeholder, onCreate, onChange, onKeyDown, }: ChatEditorProps) => import("preact").JSX.Element;
