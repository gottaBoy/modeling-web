import { IInternalMessage } from '@ibiz-template/core';
import { IInternalMessageProvider } from '@ibiz-template/runtime';
import { VNode } from 'vue';
export declare class InternalMessageDefaultProvider implements IInternalMessageProvider {
    component: unknown;
    router: IData;
    render(props: IData & {
        message: IInternalMessage;
    }): VNode;
    onClick(message: IInternalMessage, _event: MouseEvent): Promise<boolean>;
    /**
     * 解析url并打开对应视图，打开视图前会先标记已读
     * @author lxm
     * @date 2024-02-02 11:56:07
     * @param {IInternalMessage} msg
     * @param {string} redirectUrl
     * @return {*}  {Promise<void>}
     */
    openRedirectView(msg: IInternalMessage, redirectUrl: string): Promise<void>;
    /**
     * 解析url并打开对应视图
     * @param {string} redirectUrl
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-03-04 11:16:40
     */
    openViewByUrl(redirectUrl: string | undefined): boolean;
}
