import { AiChatController } from '../ai-chat/ai-chat.controller';
import { CommonHelper } from './common-helper';
import { FileHelper } from './file-helper';
export declare class AIMaterialFactory {
    static getMaterialHelper(type: string, aiChat: AiChatController): CommonHelper | FileHelper;
}
