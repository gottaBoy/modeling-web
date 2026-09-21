/**
 * @description AI聊天思维链
 * @export
 * @interface IChatThoughtChain
 */
export interface IChatThoughtChain {
    /**
     * 消息标识
     *
     * @author chitanda
     * @date 2023-09-05 15:09:43
     * @type {string}
     */
    title: string;
    /**
     * 消息名称
     *
     * @author chitanda
     * @date 2023-09-05 15:09:49
     * @type {string}
     */
    description: string;
    /**
     * @description 图标
     * @type {React.ReactNode}
     * @memberof IChatThoughtChain
     */
    icon?: React.ReactNode;
    /**
     * @description 是否完成
     * @type {boolean}
     * @memberof IChatThoughtChain
     */
    done?: boolean;
}
