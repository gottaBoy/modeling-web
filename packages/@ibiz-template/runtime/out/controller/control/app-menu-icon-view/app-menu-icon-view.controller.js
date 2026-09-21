import { findRecursiveChild, RuntimeError, RuntimeModelError, } from '@ibiz-template/core';
import { AppFuncCommand } from '../../../command';
import { AppMenuController } from '../app-menu/app-menu.controller';
export class AppMenuIconViewController extends AppMenuController {
    async onClickMenuItem(id, event) {
        const menuItem = findRecursiveChild(this.model, id, {
            compareField: 'id',
            childrenFields: ['appMenuItems'],
        });
        if (!menuItem) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.menu.noFindMenu', { id }));
        }
        this.evt.emit('onClick', {
            eventArg: id,
            event,
        });
        if (!menuItem.appFuncId) {
            throw new RuntimeModelError(menuItem, ibiz.i18n.t('runtime.controller.control.menu.noConfigured'));
        }
        const tempContext = this.context.clone();
        // 一级跳一级，其他跳默认二级
        if (this.routeDepth === 1) {
            Object.assign(tempContext, {
                toRouteDepth: 1,
            });
        }
        await ibiz.commands.execute(AppFuncCommand.TAG, menuItem.appFuncId, tempContext, this.params);
    }
}
