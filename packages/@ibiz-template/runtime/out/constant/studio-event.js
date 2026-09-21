/* eslint-disable max-classes-per-file */
/**
 * studio 视图事件
 * @author lxm
 * @date 2023-04-02 10:15:28
 * @export
 * @class StudioViewEvents
 */
export class StudioViewEvents {
}
/**
 * 视图加载
 */
StudioViewEvents.onViewMounted = 'onMounted';
/**
 * 视图销毁
 */
StudioViewEvents.onViewDestroyed = 'onDestroyed';
/**
 * studio 面板事件
 * @author lxm
 * @date 2023-04-02 10:15:40
 * @export
 * @class StudioPanelEvents
 */
export class StudioPanelEvents {
}
/**
 * 点击事件
 */
StudioPanelEvents.onClick = 'onClick';
/**
 * 值变更事件
 */
StudioPanelEvents.onChange = 'onChange';
/**
 * 输入事件
 */
StudioPanelEvents.onEnter = 'onEnter';
/**
 * 离开事件
 */
StudioPanelEvents.onLeave = 'onLeave';
/**
 * studio 部件事件
 * @author lxm
 * @date 2023-04-02 10:15:56
 * @export
 * @class StudioControlEvents
 */
export class StudioControlEvents {
}
/**
 * 加载之前
 */
StudioControlEvents.onBeforeLoad = 'onBeforeLoad';
/**
 * 加载成功
 */
StudioControlEvents.onLoadSuccess = 'onLoadSuccess';
/**
 * 加载失败
 */
StudioControlEvents.onLoadError = 'onLoadError';
/**
 * 加载草稿之前
 */
StudioControlEvents.onBeforeLoadDraft = 'onBeforeLoadDraft';
/**
 * 加载草稿成功
 */
StudioControlEvents.onLoadDraftSuccess = 'onLoadDraftSuccess';
/**
 * 加载草稿失败
 */
StudioControlEvents.onLoadDraftError = 'onLoadDraftError';
/**
 * 保存之前
 */
StudioControlEvents.onBeforeSave = 'onBeforeSave';
/**
 * 保存成功
 */
StudioControlEvents.onSaveSuccess = 'onSaveSuccess';
/**
 * 保存失败
 */
StudioControlEvents.onSaveError = 'onSaveError';
/**
 * 删除之前
 */
StudioControlEvents.onBeforeRemove = 'onBeforeRemove';
/**
 * 删除成功
 */
StudioControlEvents.onRemoveSuccess = 'onRemoveSuccess';
/**
 * 删除失败
 */
StudioControlEvents.onRemoveError = 'onRemoveError';
/**
 * 原生默认工具栏的点击事件名称
 */
StudioControlEvents.CLICK = 'onClick';
