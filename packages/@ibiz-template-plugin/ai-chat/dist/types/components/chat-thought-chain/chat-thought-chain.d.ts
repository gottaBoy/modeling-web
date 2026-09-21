import { IChatThoughtChain } from '../../interface';
export interface ChatThoughtChainProps {
    /**
     * @description AI聊天思维链
     * @type {IChatThoughtChain[]}
     * @memberof ChatThoughtChainProps
     */
    items: IChatThoughtChain[];
}
export declare const ChatThoughtChain: (props: ChatThoughtChainProps) => import("preact").JSX.Element | null;
