import { ITopic } from '../../interface';

/**
 * 话题实体
 *
 * @author tony001
 * @date 2025-02-20 16:02:29
 * @export
 * @class ChatTopic
 * @implements {ITopic}
 */
export declare class ChatTopic implements ITopic {
    data: ITopic;
    get appid(): ITopic['appid'];
    get id(): ITopic['id'];
    get type(): ITopic['type'];
    get caption(): ITopic['caption'];
    get sourceCaption(): ITopic['sourceCaption'];
    get url(): ITopic['url'];
    get aiChat(): ITopic['aiChat'];
    get captionMode(): ITopic['captionMode'];
    get realid(): ITopic['realid'];
    get sequence(): ITopic['sequence'];
    get isTop(): ITopic['isTop'];
    get isShow(): boolean;
    get disableStorage(): boolean;
    get captionComputed(): boolean;
    constructor(data: ITopic);
}
