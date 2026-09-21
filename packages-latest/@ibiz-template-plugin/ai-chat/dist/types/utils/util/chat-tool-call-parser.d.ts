import { IChatToolCall } from '../../interface';

/**
 * @description 工具调用解析器
 * @export
 * @class ChatToolCallParser
 */
export declare class ChatToolCallParser {
    /**
     * 解析工具调用字符串
     * @param toolCallString
     * @returns
     */
    static parse(toolCallString: string): {
        completed: boolean;
        toolCalls: IChatToolCall[];
    };
}
