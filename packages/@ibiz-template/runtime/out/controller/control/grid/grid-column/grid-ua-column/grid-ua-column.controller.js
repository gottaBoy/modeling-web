/* eslint-disable no-param-reassign */
import { RuntimeModelError } from '@ibiz-template/core';
import { UIActionUtil } from '../../../../../ui-action';
import { ButtonContainerState, UIActionButtonState } from '../../../../utils';
import { GridColumnController } from '../../grid/grid-column.controller';
/**
 * 表格操作列控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-09-01 18:25:20
 */
export class GridUAColumnController extends GridColumnController {
    /**
     * 给rowController初始化操作列的状态
     *
     * @author lxm
     * @date 2022-09-07 21:09:43
     * @param {GridRowState} row
     */
    initActionStates(row) {
        var _a;
        // 操作列按钮状态控制
        const { deuiactionGroup } = this.model;
        if (!deuiactionGroup) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.grid.behaviorGroup'));
        }
        if (!((_a = deuiactionGroup.uiactionGroupDetails) === null || _a === void 0 ? void 0 : _a.length)) {
            ibiz.log.debug(ibiz.i18n.t('runtime.controller.control.grid.interfaceBehavior'));
            return;
        }
        const containerState = new ButtonContainerState();
        deuiactionGroup.uiactionGroupDetails.forEach(detail => {
            const actionid = detail.uiactionId;
            if (actionid) {
                const buttonState = new UIActionButtonState(detail.id, this.grid.context.srfappid, actionid, detail);
                containerState.addState(detail.id, buttonState);
            }
        });
        row.uaColStates[this.model.codeName] = containerState;
    }
    /**
     * 触发操作列点击事件
     *
     * @author lxm
     * @date 2022-09-07 22:09:46
     * @param {IPSUIActionGroupDetail} detail
     * @param {MouseEvent} event
     */
    async onActionClick(detail, row, event) {
        const actionId = detail.uiactionId;
        await UIActionUtil.execAndResolved(actionId, {
            context: this.context,
            params: this.params,
            data: [row.data],
            view: this.grid.view,
            ctrl: this.grid,
            event,
        }, detail.appId);
    }
}
