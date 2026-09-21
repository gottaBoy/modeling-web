/**
 * @description AI聊天思维链
 * @export
 * @interface IChatThink
 */
export interface IChatThink {
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
     * @description 是否完成
     * @type {boolean}
     * @memberof IChatThink
     */
    done?: boolean;
    /**
     * @description 开始时间
     * @type {number}
     * @memberof IChatThink
     */
    beginTime?: number;
    /**
     * @description 结束时间
     * @type {number}
     * @memberof IChatThink
     */
    endTime?: number;
    /**
     * @description 是否折叠
     * @type {boolean}
     * @memberof IChatThink
     */
    collapse?: boolean;
}
