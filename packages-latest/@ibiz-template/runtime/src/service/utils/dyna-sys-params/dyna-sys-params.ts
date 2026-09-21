import { getMatchResPath } from '../res-path/res-path';

/**
 * 计算动态系统接口参数
 * @author lxm
 * @date 2024-01-25 03:30:18
 * @export
 * @param {string} appDataEntityId 实体id
 * @param {IContext} context 视图上下文
 * @param {{
 *     viewParams?: IParams; 视图参数
 *     appId?: string; 应用id
 *   }} [opts={}]
 */
export async function calcDynaSysParams(
  appDataEntityId: string,
  context: IContext,
  opts: {
    viewParams?: IParams;
    appId?: string;
  } = {},
): Promise<{
  srfkey?: string | undefined;
  srfparentkey?: string | undefined;
  srfparentdename?: string | undefined;
}> {
  const appId = opts.appId || context.srfappid;
  const viewParams = opts.viewParams || {};
  const loadModelParams: {
    srfkey?: string;
    srfparentkey?: string;
    srfparentdename?: string;
  } = {};

  const appDe = await ibiz.hub.getAppDataEntity(appDataEntityId, appId);

  // *计算srfkey
  if (viewParams.srfkey) {
    loadModelParams.srfkey = viewParams.srfkey;
  } else {
    // * 计算资源路径上下文参数
    // 主键
    const srfkey = context[appDe.codeName!.toLowerCase()];
    if (srfkey) {
      loadModelParams.srfkey = srfkey;
    }
  }

  // *计算上层父实体主键和name
  if (viewParams.srfparentkey && viewParams.srfparentdename) {
    loadModelParams.srfparentkey = viewParams.srfparentkey;
    loadModelParams.srfparentdename = viewParams.srfparentdename;
  } else {
    // 上层资源路径主实体名称和主键
    const match = getMatchResPath(context, appDe);
    if (match && match.keys.length > 1) {
      const parentDeKey = match.keys[match.keys.length - 2];
      loadModelParams.srfparentkey =
        viewParams.srfparentkey || context[parentDeKey];
      loadModelParams.srfparentdename =
        viewParams.srfparentdename || parentDeKey;
    }
  }

  return loadModelParams;
}
