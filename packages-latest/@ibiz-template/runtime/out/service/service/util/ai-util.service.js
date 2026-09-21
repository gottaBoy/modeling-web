import { RuntimeError } from '@ibiz-template/core';
import { handleAllSettled } from '../../../utils';
/**
 * 应用功能组件服务
 */
export class AIUtilService {
    /**
     *  构造函数
     * @param appUtil
     */
    constructor(appUtil) {
        this.appUtil = appUtil;
        this.sessionAppEntityName = appUtil.utilDEName;
        this.messageAppEntityName = appUtil.utilDE2Name;
        this.utilParams = this.parseUserUtilParams();
    }
    /**
     * 解析用户自定义功能参数
     * @returns
     */
    parseUserUtilParams() {
        const { utilParams } = this.appUtil;
        const result = {};
        if (utilParams && Object.keys(utilParams).length > 0) {
            Object.keys(utilParams).forEach(key => {
                if (key !== 'appId') {
                    // 数据映射关系格式如：id:appid|caption:display_name|order:order,key为界面定义字段名称，value为数据源字段名称
                    if (key === 'sessionmodelMapping' || key === 'messagemodelMapping') {
                        const tempParams = {};
                        if (utilParams[key]) {
                            const pairs = utilParams[key].split('|');
                            pairs.forEach((pair) => {
                                const [tempKey, tempVal] = pair.split(':');
                                if (tempKey && tempVal) {
                                    tempParams[tempKey] = tempVal;
                                }
                            });
                        }
                        Object.assign(result, { [key]: tempParams });
                    }
                    else {
                        Object.assign(result, { [key]: utilParams[key] });
                    }
                }
            });
        }
        return result;
    }
    /**
     * 获取会话服务
     * @param context
     * @returns
     */
    async getSessionService(context) {
        if (this.sessionService) {
            return this.sessionService;
        }
        if (!this.sessionAppEntityName) {
            return;
        }
        const app = ibiz.hub.getApp(ibiz.env.appId);
        this.sessionService = await app.deService.getService(context, this.sessionAppEntityName);
        return this.sessionService;
    }
    /**
     * 获取消息服务
     * @param context
     * @returns
     */
    async getMessageService(context) {
        if (this.messageService) {
            return this.messageService;
        }
        if (!this.messageAppEntityName) {
            return;
        }
        const app = ibiz.hub.getApp(ibiz.env.appId);
        this.messageService = await app.deService.getService(context, this.messageAppEntityName);
        return this.messageService;
    }
    /**
     * 处理请求数据
     * @param data
     * @returns
     */
    handleUserRequestData(data, mappingField) {
        const modelMapping = this.utilParams[mappingField];
        if (!modelMapping)
            return data;
        let result;
        const convertData = (sourceObj) => {
            const targetObj = {};
            if (Object.keys(modelMapping).length === 0) {
                return sourceObj;
            }
            Object.keys(modelMapping).forEach(key => {
                targetObj[modelMapping[key]] = sourceObj[key];
            });
            return targetObj;
        };
        if (!data) {
            throw new Error(ibiz.i18n.t('runtime.service.dataException'));
        }
        if (Array.isArray(data) && data.length > 0) {
            result = data.map(item => {
                return convertData(item);
            });
            return result;
        }
        result = convertData(data);
        return result;
    }
    /**
     * 处理响应数据
     * @param response
     * @param key
     * @returns
     */
    handleUserResponse(response, mappingField) {
        const { data } = response;
        const modelMapping = this.utilParams[mappingField];
        if (!modelMapping) {
            return data;
        }
        let result;
        const convertData = (sourceObj) => {
            const targetObj = {};
            if (Object.keys(modelMapping).length === 0) {
                return sourceObj;
            }
            Object.keys(modelMapping).forEach(key => {
                targetObj[key] = sourceObj[modelMapping[key]];
            });
            return targetObj;
        };
        if (!data) {
            throw new Error(ibiz.i18n.t('runtime.service.dataException'));
        }
        if (Array.isArray(data)) {
            if (data.length > 0) {
                result = data.map(item => {
                    return convertData(item);
                });
            }
            else {
                result = [];
            }
            return result;
        }
        result = convertData(data);
        return result;
    }
    /**
     * 获取会话列表
     * @param context
     * @param params
     * @returns
     */
    async getSessionList(context, params) {
        var _a;
        const getSessionAppDEActionId = (_a = this.utilParams) === null || _a === void 0 ? void 0 : _a.getSessionAppDEActionId;
        if (!getSessionAppDEActionId)
            throw new RuntimeError('getSessionAppDEActionId is null');
        const sessionService = await this.getSessionService(context);
        if (!sessionService)
            throw new RuntimeError('sessionService is null');
        const response = await sessionService.exec(getSessionAppDEActionId, context, Object.assign({}, params));
        const result = this.handleUserResponse(response, 'sessionmodelMapping');
        return result;
    }
    /**
     * 更新会话
     * @param context
     * @param params
     * @param data
     * @returns
     */
    async updateSession(context, params, realID, data) {
        var _a;
        const updateSessionAppDEActionId = (_a = this.utilParams) === null || _a === void 0 ? void 0 : _a.updateSessionAppDEActionId;
        if (!updateSessionAppDEActionId)
            throw new RuntimeError('updateSessionAppDEActionId is null');
        if (!data || Object.keys(data).length === 0)
            throw new RuntimeError('data is null');
        const sessionService = await this.getSessionService(context);
        if (!sessionService)
            throw new RuntimeError('sessionService is null');
        const tempContext = context.clone();
        tempContext[this.sessionAppEntityName.toLowerCase()] = realID;
        const tempData = this.handleUserRequestData(data, 'sessionmodelMapping');
        const response = await sessionService.exec(updateSessionAppDEActionId, tempContext, Object.assign({}, tempData), Object.assign({}, params));
        const result = this.handleUserResponse(response, 'sessionmodelMapping');
        return result;
    }
    /**
     * 删除会话(多个以逗号分割)
     * @param context
     * @param params
     * @returns
     */
    async deleteSession(context, params, realID) {
        var _a;
        if (!realID)
            return false;
        const sessionIDs = realID.split(',').filter(session => {
            return !!session;
        });
        const deleteSessionAppDEActionId = (_a = this.utilParams) === null || _a === void 0 ? void 0 : _a.deleteSessionAppDEActionId;
        if (!deleteSessionAppDEActionId)
            return false;
        const sessionService = await this.getSessionService(context);
        if (!sessionService)
            return false;
        await handleAllSettled(sessionIDs.map(async (sessionid) => {
            const tempContext = context.clone();
            tempContext[this.sessionAppEntityName.toLowerCase()] = sessionid;
            await sessionService.exec(deleteSessionAppDEActionId, tempContext, {
                id: sessionid,
            }, Object.assign({}, params));
        }));
        return true;
    }
    /**
     * 获取消息列表
     * @param context
     * @param params
     * @param sessionID
     * @returns
     */
    async getMessageList(context, params) {
        var _a;
        const getMessageAppDEActionId = (_a = this.utilParams) === null || _a === void 0 ? void 0 : _a.getMessageAppDEActionId;
        if (!getMessageAppDEActionId)
            throw new RuntimeError('getMessageAppDEActionId is null');
        const messageService = await this.getMessageService(context);
        if (!messageService)
            throw new RuntimeError('messageService is null');
        const response = await messageService.exec(getMessageAppDEActionId, context, Object.assign({}, params));
        const result = this.handleUserResponse(response, 'messagemodelMapping');
        return result;
    }
    /**
     * 删除消息(多个以逗号分割)
     * @param context
     * @param params
     * @param messageID
     */
    async deleteMessage(context, params, messageID) {
        if (!messageID)
            return false;
        const { deleteMessageAppDEActionId } = this.utilParams;
        if (!deleteMessageAppDEActionId)
            return false;
        const messageService = await this.getMessageService(context);
        if (!messageService)
            return false;
        // 准备参数
        const messageIDs = messageID.split(',').filter(message => {
            return !!message;
        });
        const tempContext = context.clone();
        // 批量删除
        await handleAllSettled(messageIDs.map(async (messageid) => {
            tempContext[this.messageAppEntityName.toLowerCase()] = messageid;
            await messageService.exec(deleteMessageAppDEActionId, tempContext, Object.assign({}, params));
        }));
        return true;
    }
    /**
     * 点赞
     * @param context
     * @param params
     * @param messageID
     * @returns
     */
    async likeMessage(context, params, messageID) {
        if (!messageID)
            return false;
        const { likeMessageAppDEActionId } = this.utilParams;
        if (!likeMessageAppDEActionId)
            throw new RuntimeError('likeMessageAppDEActionId is null');
        const messageService = await this.getMessageService(context);
        if (!messageService)
            throw new RuntimeError('messageService is null');
        // 准备参数
        const tempContext = context.clone();
        tempContext[this.messageAppEntityName.toLowerCase()] = messageID;
        // 点赞
        await messageService.exec(likeMessageAppDEActionId, tempContext, { id: messageID }, Object.assign({}, params));
        return true;
    }
    /**
     * 点踩
     * @param context
     * @param params
     * @param messageID
     * @returns
     */
    async dislikeMessage(context, params, messageID, feedbackContent) {
        if (!messageID)
            return false;
        const { dislikeMessageAppDEActionId } = this.utilParams;
        if (!dislikeMessageAppDEActionId)
            throw new RuntimeError('dislikeMessageAppDEActionId is null');
        const messageService = await this.getMessageService(context);
        if (!messageService)
            throw new RuntimeError('messageService is null');
        // 准备参数
        const tempContext = context.clone();
        tempContext[this.messageAppEntityName.toLowerCase()] = messageID;
        // 点踩
        await messageService.exec(dislikeMessageAppDEActionId, tempContext, { id: messageID, feedback_content: feedbackContent }, Object.assign({}, params));
        return true;
    }
    /**
     * 取消点赞或者点踩
     * @param context
     * @param params
     * @param messageID
     * @returns
     */
    async cancelFeedback(context, params, messageID) {
        if (!messageID)
            return false;
        const { cancelFeedbackMessageAppDEActionId } = this.utilParams;
        if (!cancelFeedbackMessageAppDEActionId)
            throw new RuntimeError('cancelFeedbackAppDEActionId is null');
        const messageService = await this.getMessageService(context);
        if (!messageService)
            throw new RuntimeError('messageService is null');
        // 准备参数
        const tempContext = context.clone();
        tempContext[this.messageAppEntityName.toLowerCase()] = messageID;
        // 点踩
        await messageService.exec(cancelFeedbackMessageAppDEActionId, tempContext, { id: messageID }, Object.assign({}, params));
        return true;
    }
    /**
     * 清空所有会话
     * @param context
     * @param params
     * @param excludeSessionID 排除的sessionid
     * @returns
     */
    async clearAllSession(context, params, excludeSessionID) {
        if (!excludeSessionID)
            return false;
        const { clearAllSessionAppDEActionId } = this.utilParams;
        if (!clearAllSessionAppDEActionId)
            return false;
        const sessionService = await this.getSessionService(context);
        if (!sessionService)
            return false;
        await sessionService.exec(clearAllSessionAppDEActionId, context, { session_id: excludeSessionID }, Object.assign({}, params));
        return true;
    }
    /**
     * 删除指定会话的所有的消息
     * @param context
     * @param params
     * @param sessionid 会话真实id
     * @returns
     */
    async clearAllMessageBySessionId(context, params, realID) {
        if (!realID)
            return false;
        const { clearAllMessageSessionAppDEActionId } = this.utilParams;
        if (!clearAllMessageSessionAppDEActionId)
            return false;
        const sessionService = await this.getSessionService(context);
        if (!sessionService)
            return false;
        // 准备参数
        const tempContext = context.clone();
        tempContext[this.sessionAppEntityName.toLowerCase()] = realID;
        // 删除所有会话下的消息
        await sessionService.exec(clearAllMessageSessionAppDEActionId, tempContext, { id: realID }, Object.assign({}, params));
        return true;
    }
}
