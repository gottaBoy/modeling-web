import { ModelError, RuntimeModelError } from '@ibiz-template/core';
import { UILogicNode } from '../ui-logic-node';
/**
 * 消息弹窗节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class MsgBoxNode
 * @extends {UILogicNode}
 */
export class MsgBoxNode extends UILogicNode {
    constructor() {
        super(...arguments);
        this.typeMap = {
            INFO: 'info',
            QUESTION: 'success',
            WARNING: 'warning',
            ERROR: 'error',
        };
    }
    async exec(ctx) {
        const { msgBoxType, buttonsType, msgBoxParamId } = this.model;
        if (!msgBoxType) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.uiLogic.missingMessageTypeConfiguration'));
        }
        if (!buttonsType) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.uiLogic.missingButtonTypeConfiguration'));
        }
        // 处理标题和内容
        let { title, message } = this.model;
        if (msgBoxParamId) {
            const param = ctx.params[msgBoxParamId];
            if (param.title) {
                title = param.title;
            }
            if (param.message) {
                message = param.message;
            }
        }
        // 处理消息类型
        const type = this.typeMap[msgBoxType];
        const modalParams = {
            type,
            title: title || ibiz.i18n.t('runtime.uiLogic.message'),
            desc: message,
        };
        let resultTags = [];
        // 处理按钮类型
        switch (buttonsType) {
            case 'YESNO':
                modalParams.confirmButtonText = ibiz.i18n.t('runtime.uiLogic.yes');
                modalParams.cancelButtonText = ibiz.i18n.t('runtime.uiLogic.no');
                modalParams.showConfirmButton = true;
                modalParams.showCancelButton = true;
                resultTags = ['yes', 'no'];
                break;
            case 'YESNOCANCEL':
                modalParams.confirmButtonText = ibiz.i18n.t('runtime.uiLogic.yes');
                modalParams.cancelButtonText = ibiz.i18n.t('runtime.uiLogic.no');
                modalParams.showConfirmButton = true;
                modalParams.showCancelButton = true;
                if (ibiz.env.isMob) {
                    modalParams.options = {
                        closeOnClickOverlay: true,
                    };
                }
                else {
                    modalParams.options = {
                        distinguishCancelAndClose: true,
                    };
                }
                break;
            case 'OK':
                modalParams.confirmButtonText = ibiz.i18n.t('runtime.uiLogic.determine');
                modalParams.showConfirmButton = true;
                modalParams.showCancelButton = false;
                resultTags = ['ok'];
                break;
            case 'OKCANCEL':
                modalParams.confirmButtonText = ibiz.i18n.t('runtime.uiLogic.determine');
                modalParams.cancelButtonText = ibiz.i18n.t('runtime.uiLogic.cancel');
                modalParams.showConfirmButton = true;
                modalParams.showCancelButton = true;
                resultTags = ['ok', 'cancel'];
                break;
            default:
                throw new ModelError(this.model, ibiz.i18n.t('runtime.uiLogic.noSupportItem', {
                    name: buttonsType,
                }));
        }
        ibiz.log.debug(ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodeMessagePopup', {
            id: this.model.id,
            type,
            message,
        }));
        if (buttonsType === 'YESNOCANCEL') {
            const result = await ibiz.modal.extendConfirm(modalParams);
            ctx.setLastReturn(result);
            return;
        }
        const result = await ibiz.modal.confirm(modalParams);
        ctx.setLastReturn(resultTags[result ? 0 : 1]);
    }
}
