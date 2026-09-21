import { IChatMessage, IRemoteMessage } from '../../interface';

/**
 * 基于远程类型角色转换
 * @param type
 * @returns
 */
export declare function getMsgRoleByRemoteType(type: string): 'USER' | 'ASSISTANT' | 'SYSTEM';
/**
 * 基于远程状态转换至消息状态
 * @param state
 * @returns
 */
export declare function getMsgStateByRemoteState(state: 'pending' | 'sent' | 'failed' | 'canceled'): 10 | 20 | 30 | 40;
/**
 *  基于远程状态转换至消息类型
 * @param state
 * @returns
 */
export declare function getMsgTypeByRemoteState(state: 'pending' | 'sent' | 'failed' | 'canceled'): string | 'DEFAULT' | 'ERROR';
/**
 * 基于远程消息转换至本地消息
 * @param remoteMsg
 * @returns
 */
export declare function getMsgByRemoteMsg(remoteMsg: IRemoteMessage): IChatMessage;
