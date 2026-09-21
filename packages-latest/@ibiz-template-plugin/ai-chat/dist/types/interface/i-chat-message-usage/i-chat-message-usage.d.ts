/**
 * @description 消息资源使用量
 * @export
 * @interface IChatMessageUsage
 */
export interface IChatMessageUsage {
    /**
     * 总消耗tokens数
     */
    totaltokens: number;
    /**
     * 输出消耗tokens数
     */
    completiontokens: number;
    /**
     * 工具调用次数
     */
    toolcalls: number;
    /**
     * 输入消耗tokens数
     */
    prompttokens: number;
}
