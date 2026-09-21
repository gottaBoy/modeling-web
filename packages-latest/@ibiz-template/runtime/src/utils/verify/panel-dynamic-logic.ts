import {
  IPanelItemLogic,
  IPanelItemGroupLogic,
  IPanelItemSingleLogic,
} from '@ibiz/model-core';
import { ModelError } from '@ibiz-template/core';
import { testCond } from './verify';

function isGroupLogic(logic: IPanelItemLogic): logic is IPanelItemGroupLogic {
  return logic.logicType === 'GROUP';
}
function isSingleLogic(logic: IPanelItemLogic): logic is IPanelItemSingleLogic {
  return logic.logicType === 'SINGLE';
}

/**
 * 验证面板的逻辑分组
 *
 * @author lxm
 * @date 2023-02-14 10:11:41
 * @export
 * @param {IData} data 面板数据
 * @param {IPanelItemLogic} logic 逻辑模型
 */
export function verifyPanelGroupLogic(
  data: IData,
  logic: IPanelItemLogic,
): boolean {
  // 计算逻辑分组
  if (isGroupLogic(logic)) {
    // 检查是否有逻辑项
    const children = logic.panelItemLogics;
    let result: boolean = true;
    if (!children || children.length === 0) {
      ibiz.log.error(
        ibiz.i18n.t('runtime.utils.verify.emptyLogicGroupsProperly'),
      );
      return result;
    }
    if (logic.groupOP === 'AND') {
      // 逻辑与
      const falseItem = children.find(childLogic => {
        return !verifyPanelGroupLogic(data, childLogic);
      });
      result = falseItem === undefined;
    } else if (logic.groupOP === 'OR') {
      // 逻辑或
      const trueItem: IPanelItemLogic | undefined = logic.panelItemLogics!.find(
        childLogic => {
          return verifyPanelGroupLogic(data, childLogic);
        },
      );
      result = trueItem !== undefined;
    }

    // 是否取反
    return logic.notMode ? !result : result;
  }

  // 计算单个逻辑
  if (isSingleLogic(logic)) {
    return testCond(
      data[logic.dstModelField!.toLowerCase()],
      logic.condOp!,
      logic.value,
    );
  }

  throw new ModelError(
    logic,
    ibiz.i18n.t('runtime.utils.verify.unsupportedLogicTypes', {
      logicType: logic.logicType,
    }),
  );
}
