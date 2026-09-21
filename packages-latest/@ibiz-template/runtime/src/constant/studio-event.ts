/* eslint-disable max-classes-per-file */

/**
 * studio 视图事件
 * @author lxm
 * @date 2023-04-02 10:15:28
 * @export
 * @class StudioViewEvents
 */
export class StudioViewEvents {
  /**
   * 视图加载
   */
  static readonly onViewMounted = 'onMounted';

  /**
   * 视图销毁
   */
  static readonly onViewDestroyed = 'onDestroyed';
}

/**
 * studio 面板事件
 * @author lxm
 * @date 2023-04-02 10:15:40
 * @export
 * @class StudioPanelEvents
 */
export class StudioPanelEvents {
  /**
   * 点击事件
   */
  static readonly onClick = 'onClick';

  /**
   * 值变更事件
   */
  static readonly onChange = 'onChange';

  /**
   * 输入事件
   */
  static readonly onEnter = 'onEnter';

  /**
   * 离开事件
   */
  static readonly onLeave = 'onLeave';
}

/**
 * studio 部件事件
 * @author lxm
 * @date 2023-04-02 10:15:56
 * @export
 * @class StudioControlEvents
 */
export class StudioControlEvents {
  /**
   * 加载之前
   */
  static readonly onBeforeLoad = 'onBeforeLoad';

  /**
   * 加载成功
   */
  static readonly onLoadSuccess = 'onLoadSuccess';

  /**
   * 加载失败
   */
  static readonly onLoadError = 'onLoadError';

  /**
   * 加载草稿之前
   */
  static readonly onBeforeLoadDraft = 'onBeforeLoadDraft';

  /**
   * 加载草稿成功
   */
  static readonly onLoadDraftSuccess = 'onLoadDraftSuccess';

  /**
   * 加载草稿失败
   */
  static readonly onLoadDraftError = 'onLoadDraftError';

  /**
   * 保存之前
   */
  static readonly onBeforeSave = 'onBeforeSave';

  /**
   * 保存成功
   */
  static readonly onSaveSuccess = 'onSaveSuccess';

  /**
   * 保存失败
   */
  static readonly onSaveError = 'onSaveError';

  /**
   * 删除之前
   */
  static readonly onBeforeRemove = 'onBeforeRemove';

  /**
   * 删除成功
   */
  static readonly onRemoveSuccess = 'onRemoveSuccess';

  /**
   * 删除失败
   */
  static readonly onRemoveError = 'onRemoveError';

  /**
   * 原生默认工具栏的点击事件名称
   */
  static readonly CLICK = 'onClick';
}
