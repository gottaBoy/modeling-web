import { ViewController } from './view.controller';
export class WFStepTraceViewController extends ViewController {
    initState() {
        super.initState();
        this.state.historyData = null;
    }
    async onCreated() {
        var _a;
        await super.onCreated();
        const app = ibiz.hub.getApp(this.context.srfappid);
        const view = (_a = this.ctx.parent) === null || _a === void 0 ? void 0 : _a.view;
        if (view && view.model.appDataEntityId) {
            const entityService = await app.deService.getService(view.context, view.model.appDataEntityId);
            const params = Object.assign(this.context.clone(), this.params);
            const res = await entityService.wf.getWFHistory(params);
            if (res.data) {
                this.state.historyData = res.data;
            }
        }
    }
}
