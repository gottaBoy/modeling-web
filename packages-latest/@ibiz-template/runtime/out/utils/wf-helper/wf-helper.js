/**
 * 预置工作流相关数据处理并生成需要的上下文参数
 *
 * @export
 * @param {IData} data
 * @returns {*}
 */
export function getWFContext(data) {
    const tempContext = {};
    if (data.param09) {
        tempContext.srfprocessinstanceid = data.param09;
    }
    return tempContext;
}
/**
 * 获取流程操作视图id
 * @author lxm
 * @date 2023-07-13 05:40:49
 * @export
 * @param {IAppView} view 当前视图模型
 * @param {WFLink} link WFLink操作对象
 * @return {*}
 */
export function getWFSubmitViewId(view, link) {
    var _a;
    const { type, sequenceflowview, sequenceflowmobview } = link;
    const appViewRefs = ((_a = view.viewLayoutPanel) === null || _a === void 0 ? void 0 : _a.appViewRefs) || view.appViewRefs;
    const key = type
        ? `WFUTILACTION@${type.toUpperCase()}`
        : `WFACTION@${ibiz.env.isMob ? sequenceflowmobview : sequenceflowview}`;
    const submitViewRef = appViewRefs === null || appViewRefs === void 0 ? void 0 : appViewRefs.find(viewRef => {
        return viewRef.name.indexOf(key) !== -1;
    });
    return submitViewRef === null || submitViewRef === void 0 ? void 0 : submitViewRef.refAppViewId;
}
