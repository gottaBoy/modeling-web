import { isBase64, isBase64Image, isSvg } from '@ibiz-template/core';
import { IAppMenu, IAppMenuItem, IControlAttribute } from '@ibiz/model-core';
import { PredefinedAttributes } from '../../constant';
import { ScriptFactory } from '../script';

/**
 * @description 计算动态菜单
 * @param {IAppMenu} menu
 */
export async function calcDynamicMenu(
  menu: IAppMenu,
  context: IContext,
  params: IParams,
): Promise<void> {
  const {
    appId,
    dynamicMode,
    clsAppDEFieldId,
    textAppDEFieldId,
    tipsAppDEFieldId,
    itemAppDEDataSetId,
    iconClsAppDEFieldId,
    itemAppDataEntityId,
    appFuncTagAppDEFieldId,
    enableScriptAppDEFieldId,
    visibleScriptAppDEFieldId,
  } = menu;
  if (dynamicMode !== 1 || !itemAppDataEntityId || !itemAppDEDataSetId) return;
  try {
    const app = ibiz.hub.getApp(appId);
    const res = await app.deService.exec(
      itemAppDataEntityId,
      itemAppDEDataSetId,
      context,
      params,
    );
    if (res.ok && res.data && Array.isArray(res.data)) {
      if (!menu.appMenuItems) menu.appMenuItems = [];
      res.data.forEach(item => {
        const menuItem: IAppMenuItem = {
          appId,
          id: item.srfkey,
          name: item.srfkey,
          itemType: 'MENUITEM',
          appFuncId: appFuncTagAppDEFieldId
            ? item[appFuncTagAppDEFieldId]
            : undefined,
          caption: textAppDEFieldId
            ? item[textAppDEFieldId]
            : item.srfmajortext,
          tooltip: tipsAppDEFieldId
            ? item[tipsAppDEFieldId]
            : item.srfmajortext,
        };

        if (clsAppDEFieldId && item[clsAppDEFieldId])
          menuItem.sysCss = { appId, cssName: item[clsAppDEFieldId] };

        if (iconClsAppDEFieldId && item[iconClsAppDEFieldId]) {
          const icon = item[iconClsAppDEFieldId];
          const imagePath =
            isBase64Image(icon) ||
            isBase64(icon) ||
            isSvg(icon) ||
            icon.endsWith('svg') ||
            icon.startsWith('http');
          menuItem.sysImage = {
            appId,
            [imagePath ? 'imagePath' : 'cssClass']: icon,
          };
        }

        let visible: boolean = true;
        if (visibleScriptAppDEFieldId && item[visibleScriptAppDEFieldId]) {
          visible = ScriptFactory.execScriptFn(
            { context, params },
            item[visibleScriptAppDEFieldId],
            { singleRowReturn: true },
          ) as boolean;
        }
        menuItem.hidden = !visible;

        let enable: boolean = true;
        if (enableScriptAppDEFieldId && item[enableScriptAppDEFieldId]) {
          enable = ScriptFactory.execScriptFn(
            { context, params },
            item[enableScriptAppDEFieldId],
            { singleRowReturn: true },
          ) as boolean;
        }
        menuItem.valid = enable;

        if (visible) menu.appMenuItems!.push(menuItem);
      });
    }
  } catch (error) {
    ibiz.log.error(error);
  }
}

/**
 * @description 预置属性数组
 */
const PREDEFINED_ATTR_NAMES: string[] = Object.values(PredefinedAttributes);

/**
 * @description 过滤预置注入属性
 * @export
 * @param {(IControlAttribute[] | undefined)} controlAttributes
 * @returns {*}  {IControlAttribute[]}
 */
export function filterPresetAttrs(
  controlAttributes: IControlAttribute[] | undefined,
): IControlAttribute[] {
  const targetAttrs = controlAttributes || [];
  if (targetAttrs.length === 0) return targetAttrs;
  return targetAttrs.filter(item => {
    return item.attrName && !PREDEFINED_ATTR_NAMES.includes(item.attrName);
  });
}
