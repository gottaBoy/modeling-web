import { IChatUIAction } from '../../interface';

/**
 * 聊天界面操作解析器
 */
export declare class ChatUIActionParser {
    /**
     * 解析界面操作字符串
     * @param chatStepString
     * @returns
     */
    static parse(str: string): IChatUIAction[];
}
