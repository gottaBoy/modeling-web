export type MarkOpenDataAction = 'VIEW' | 'EDIT' | 'UPDATE' | 'CLOSE';
export interface IMarkOpenData {
    /**
     * 行为类型
     * @author lxm
     * @date 2024-01-23 01:53:09
     * @type {string}
     */
    action: MarkOpenDataAction;
    /**
     * 实体名称
     * @author lxm
     * @date 2024-01-23 01:53:08
     * @type {string}
     */
    entity: string;
    /**
     * 实体主键
     * @author lxm
     * @date 2024-01-23 01:53:06
     * @type {string}
     */
    key: string;
    /**
     * 时间戳
     * @author lxm
     * @date 2024-02-01 03:40:31
     * @type {number}
     */
    time: number;
    /**
     * 消息数据
     */
    data?: IData;
    /**
     * 用户名
     * @author lxm
     * @date 2024-02-01 03:40:47
     * @type {string}
     */
    username: string;
}
//# sourceMappingURL=i-mark-open-data.d.ts.map