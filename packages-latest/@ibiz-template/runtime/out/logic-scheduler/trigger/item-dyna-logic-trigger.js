import { RuntimeError } from '@ibiz-template/core';
import { LogicTrigger } from './logic-trigger';
export class ItemDynaLogicTrigger extends LogicTrigger {
    bindExecutor(executor) {
        super.bindExecutor(executor);
        if (this.executor.type !== 'SCRIPT') {
            throw new RuntimeError(ibiz.i18n.t('runtime.logicScheduler.trigger.triggerType'));
        }
    }
    bindScriptExecutor(executor) {
        executor.init(['context', 'viewparams', 'data', 'env', 'view', 'ctrl'], executeParams => {
            const { context, params, data, view, ctrl } = executeParams;
            return {
                context,
                params,
                data: (data === null || data === void 0 ? void 0 : data[0]) || {},
                env: ibiz.env,
                view,
                ctrl,
            };
        }, {
            singleRowReturn: true,
            isAsync: false,
        });
    }
    match(matchParams) {
        var _a, _b;
        const superResult = super.match(matchParams);
        return (superResult &&
            // 忽略大小写匹配
            ((_a = matchParams.itemName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = this.logic.itemName) === null || _b === void 0 ? void 0 : _b.toLowerCase()));
    }
    execute(executeParams) {
        const result = this.executor.execute(executeParams);
        return !!result;
    }
}
