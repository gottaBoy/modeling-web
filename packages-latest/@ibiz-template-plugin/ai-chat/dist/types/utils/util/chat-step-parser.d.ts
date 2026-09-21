import { IChatStep } from '../../interface';

/**
 * 聊天步骤解析器
 */
export declare class ChatStepParser {
    /**
     * 解析聊天步骤字符串
     * @param chatStepString
     * @returns
     */
    static parse(chatStepString: string): IChatStep[];
}
