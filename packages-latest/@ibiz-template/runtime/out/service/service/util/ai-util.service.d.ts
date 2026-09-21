import { IAppUtil } from '@ibiz/model-core';
/**
 * 应用功能扩展参数
 */
export type IUtilParam = {
    getSessionAppDEActionId: string | undefined;
    deleteSessionAppDEActionId: string | undefined;
    updateSessionAppDEActionId: string | undefined;
    getMessageAppDEActionId: string | undefined;
    deleteMessageAppDEActionId: string | undefined;
    likeMessageAppDEActionId: string | undefined;
    dislikeMessageAppDEActionId: string | undefined;
    cancelFeedbackMessageAppDEActionId: string | undefined;
    clearAllSessionAppDEActionId: string | undefined;
    clearAllMessageSessionAppDEActionId: string | undefined;
    sessionmodelMapping: IData | undefined;
    messagemodelMapping: IData | undefined;
};
/**
 * 应用功能组件服务
 */
export declare class AIUtilService {
    protected appUtil: IAppUtil;
    /**
     * 会话应用实体名称
     */
    private sessionAppEntityName;
    /**
     * 会话应用实体服务
     */
    private sessionService;
    /**
     * 消息应用实体名称
     */
    private messageAppEntityName;
    /**
     * 消息应用实体服务
     */
    private messageService;
    /**
     * 应用功能参数
     */
    private utilParams;
    /**
     *  构造函数
     * @param appUtil
     */
    constructor(appUtil: IAppUtil);
    /**
     * 解析用户自定义功能参数
     * @returns
     */
    private parseUserUtilParams;
    /**
     * 获取会话服务
     * @param context
     * @returns
     */
    private getSessionService;
    /**
     * 获取消息服务
     * @param context
     * @returns
     */
    private getMessageService;
    /**
     * 处理请求数据
     * @param data
     * @returns
     */
    private handleUserRequestData;
    /**
     * 处理响应数据
     * @param response
     * @param key
     * @returns
     */
    private handleUserResponse;
    /**
     * 获取会话列表
     * @param context
     * @param params
     * @returns
     */
    getSessionList(context: IContext, params: IParams): Promise<IData[]>;
    /**
     * 更新会话
     * @param context
     * @param params
     * @param data
     * @returns
     */
    updateSession(context: IContext, params: IParams, realID: string, data: IData): Promise<IData>;
    /**
     * 删除会话(多个以逗号分割)
     * @param context
     * @param params
     * @returns
     */
    deleteSession(context: IContext, params: IParams, realID: string): Promise<boolean>;
    /**
     * 获取消息列表
     * @param context
     * @param params
     * @param sessionID
     * @returns
     */
    getMessageList(context: IContext, params: IParams): Promise<IData[]>;
    /**
     * 删除消息(多个以逗号分割)
     * @param context
     * @param params
     * @param messageID
     */
    deleteMessage(context: IContext, params: IParams, messageID: string): Promise<boolean>;
    /**
     * 点赞
     * @param context
     * @param params
     * @param messageID
     * @returns
     */
    likeMessage(context: IContext, params: IParams, messageID: string): Promise<boolean>;
    /**
     * 点踩
     * @param context
     * @param params
     * @param messageID
     * @returns
     */
    dislikeMessage(context: IContext, params: IParams, messageID: string, feedbackContent: string): Promise<boolean>;
    /**
     * 取消点赞或者点踩
     * @param context
     * @param params
     * @param messageID
     * @returns
     */
    cancelFeedback(context: IContext, params: IParams, messageID: string): Promise<boolean>;
    /**
     * 清空所有会话
     * @param context
     * @param params
     * @param excludeSessionID 排除的sessionid
     * @returns
     */
    clearAllSession(context: IContext, params: IParams, excludeSessionID: string): Promise<boolean>;
    /**
     * 删除指定会话的所有的消息
     * @param context
     * @param params
     * @param sessionid 会话真实id
     * @returns
     */
    clearAllMessageBySessionId(context: IContext, params: IParams, realID: string): Promise<boolean>;
}
//# sourceMappingURL=ai-util.service.d.ts.map