import { IAppView } from '@ibiz/model-core';
import { WFLink } from '../../interface';
/**
 * 预置工作流相关数据处理并生成需要的上下文参数
 *
 * @export
 * @param {IData} data
 * @returns {*}
 */
export declare function getWFContext(data: IData): IData;
/**
 * 获取流程操作视图id
 * @author lxm
 * @date 2023-07-13 05:40:49
 * @export
 * @param {IAppView} view 当前视图模型
 * @param {WFLink} link WFLink操作对象
 * @return {*}
 */
export declare function getWFSubmitViewId(view: IAppView, link: WFLink): string | undefined;
//# sourceMappingURL=wf-helper.d.ts.map